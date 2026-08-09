import { 
	ClientSample as InputClientSample, 
} from "./InputSamples";
import { 
	ClientSample_ClientEvent,
	ClientSample_ClientEventSchema,
	ClientSample_ClientIssue,
	ClientSample_ClientIssueSchema,
	ClientSample_ClientMetaData,
	ClientSample_ClientMetaDataSchema,
	ClientSample_ExtensionStat,
	ClientSample_ExtensionStatSchema,
	ClientSample_PeerConnectionSample,
	ClientSample_PeerConnectionSampleSchema,
	ClientSampleSchema,
	ClientSample as OutputClientSample,
} from './OutputSamples';
import { AttachmentEncoder, AttachmentsEncoderFactory, ClientSampleEncoderSettings, convertUint8ToBase64, DefaultAttachmentEncoderFactory, Encoder, NumberToNumberEncoder, OneTimePassStringToUint8ArrayEncoder, OneTimePassUuidToByteArrayEncoder, StringToStringEncoder, stringToBytesArray, uuidToByteArray } from "./utils";
import { PeerConnectionSampleEncoder } from "./PeerConnectionSampleEncoder";
import { ClientEventEncoder, DefaultClientEventEncoder } from "./ClientEventEncoder";
import { ClientMetaDataEncoder, DefaultClientMetaDataEncoder } from "./ClientMetaDataEncoder";
import { DefaultExtensionStatsEncoder, ExtensionStatsEncoder } from "./ExtensionStatsEncoder";
import { ClientIssueEncoder, DefaultClientIssueEncoder } from "./ClientIssueEncoder";
import { toBinary, create as createMessage, MessageInitShape } from "@bufbuild/protobuf";


export class ClientSampleEncoder {
	public readonly settings: ClientSampleEncoderSettings;

	public readonly attachmentEncoderFactory: AttachmentsEncoderFactory = new DefaultAttachmentEncoderFactory();
	public clientEventEncoder: ClientEventEncoder = new DefaultClientEventEncoder();
	public clientIssueEncoder: ClientIssueEncoder = new DefaultClientIssueEncoder();
	public clientMetaDataEncoder: ClientMetaDataEncoder = new DefaultClientMetaDataEncoder();	
	public extensionStatsEncoder: ExtensionStatsEncoder = new DefaultExtensionStatsEncoder();
	
	private readonly _clientId: Uint8Array;
	private readonly _callIdEncoder: Encoder<string, Uint8Array>;
	private readonly _timestampEncoder = new NumberToNumberEncoder();
	private _attachmentEncoder: AttachmentEncoder;
	private _scoreEncoder = new NumberToNumberEncoder();
	private _scoreReasonsEncoder = new StringToStringEncoder();
	private _visited = false;

	private _peerConnectionSampleEncoders = new Map<string, PeerConnectionSampleEncoder>();

	public constructor(clientId: string, settings?: Partial<ClientSampleEncoderSettings>) {
		this.settings = {
			clientIdIsUuid: false,
			peerConnectionIdIsUuid: false,
			callIdIsUuid: false,
			trackIdIsUuid: false,
			...(settings ?? {}),
		}

		this._clientId = this.settings.clientIdIsUuid ? uuidToByteArray(clientId) : stringToBytesArray(clientId);
		this._callIdEncoder = this.settings.callIdIsUuid ? new OneTimePassUuidToByteArrayEncoder() : new OneTimePassStringToUint8ArrayEncoder();
		this._attachmentEncoder = this.attachmentEncoderFactory.createClientSampleAttachmentEncoder();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encodeToBytes(clientSample: InputClientSample): Uint8Array {
		return toBinary(ClientSampleSchema, this.encodeToProtobufSamples(clientSample));
	}

	public encodeToBase64(clientSample: InputClientSample): string {
		const bytes = toBinary(ClientSampleSchema, this.encodeToProtobufSamples(clientSample));
		return convertUint8ToBase64(bytes);
	}

	public encodeToProtobufSamples(clientSample: InputClientSample): OutputClientSample {
		this._visited = true;

		const clientEvents: MessageInitShape<typeof ClientSample_ClientEventSchema>[] | undefined = clientSample
			.clientEvents
			?.map(this.clientEventEncoder.encode.bind(this.clientEventEncoder))
			?.filter((event) => event !== undefined) as ClientSample_ClientEvent[];

		const clientMetaItems: MessageInitShape<typeof ClientSample_ClientMetaDataSchema>[] | undefined = clientSample
			.clientMetaItems
			?.map(this.clientMetaDataEncoder.encode.bind(this.clientMetaDataEncoder))
			?.filter((metaItem) => metaItem !== undefined) as ClientSample_ClientMetaData[];

		const extensionStats: MessageInitShape<typeof ClientSample_ExtensionStatSchema>[] | undefined = clientSample
			.extensionStats
			?.map(this.extensionStatsEncoder.encode.bind(this.extensionStatsEncoder))
			?.filter((extensionStat) => extensionStat !== undefined) as ClientSample_ExtensionStat[];

		const peerConnections: MessageInitShape<typeof ClientSample_PeerConnectionSampleSchema>[] | undefined = clientSample
			.peerConnections
			?.map(this._encodePeerConnectionSample.bind(this))
			?.filter((peerConnection) => peerConnection !== undefined) as ClientSample_PeerConnectionSample[];

		const clientIssues: MessageInitShape<typeof ClientSample_ClientIssueSchema>[] | undefined = clientSample
			.clientIssues
			?.map(this.clientIssueEncoder.encode.bind(this.clientIssueEncoder))
			?.filter((issue) => issue !== undefined) as ClientSample_ClientIssue[];

		const result = createMessage(ClientSampleSchema, {
			timestamp: this._timestampEncoder.encode(clientSample.timestamp),
			callId: this._callIdEncoder.encode(clientSample.callId),
			clientId: this._clientId,
			attachments: this._attachmentEncoder.encode(clientSample.attachments),
			score: this._scoreEncoder.encode(clientSample.score),
			scoreReasons: this._scoreReasonsEncoder.encode(clientSample.scoreReasons),
			peerConnections,
			clientEvents,
			clientIssues,
			clientMetaItems,
			extensionStats,
		});
		

		// console.warn("ClientSampleEncoder: ", clientSample, " -> ", result);

		this._checkVisitsAndClean();

		return result;
	}

	public reset() {
		this._timestampEncoder.reset();
		this._callIdEncoder.reset();
		this._attachmentEncoder.reset();
		this._scoreEncoder.reset();
		this._scoreReasonsEncoder.reset();
		this._peerConnectionSampleEncoders.forEach((encoder) => encoder.reset());
		this.clientEventEncoder.reset();
		this.clientIssueEncoder.reset();
		this.clientMetaDataEncoder.reset();
		this.extensionStatsEncoder.reset();
	}
	  

	private _encodePeerConnectionSample(
		input: Required<InputClientSample>['peerConnections'][number], 
	): MessageInitShape<typeof ClientSample_PeerConnectionSampleSchema> {
		let encoder = this._peerConnectionSampleEncoders.get(input.peerConnectionId);
		if (!encoder) {
			encoder = new PeerConnectionSampleEncoder(input.peerConnectionId, this);
			this._peerConnectionSampleEncoders.set(input.peerConnectionId, encoder);
		}
		return encoder.encode(input);
	}


	private _checkVisitsAndClean() {
		let visited = false;
		for (const [peerConnectionId, encoder] of Array.from(this._peerConnectionSampleEncoders.entries())) {
			const visited = encoder.checkVisitsAndClean();
			
			if (!visited) {
				this._peerConnectionSampleEncoders.delete(peerConnectionId);
			}
		}

		return visited;
	}
}
