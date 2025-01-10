import { 
	ClientSample as InputClientSample, 
} from "./InputSamples";
import { 
	ClientSample_ClientEvent,
	ClientSample_ClientMetaData,
	ClientSample_ExtensionStat,
	ClientSample as OutputClientSample,
} from './OutputSamples';
import { AppDataEncoder, AppDataEncoderFactory, ClientSampleEncoderSettings, convertUint8ToBase64, DefaultAppDataEncoderFactory, Encoder, OneTimePassStringToUint8ArrayEncoder, OneTimePassUuidToByteArrayEncoder, stringToBytesArray, uuidToByteArray } from "./utils";
import { PeerConnectionSampleEncoder } from "./PeerConnectionSampleEncoder";
import { ClientEventEncoder, DefaultClientEventEncoder } from "./ClientEventEncoder";
import { ClientMetaDataEncoder, DefaultClientMetaDataEncoder } from "./ClientMetaDataEncoder";
import { DefaultExtensionStatsEncoder, ExtensionStatsEncoder } from "./ExtensionStatsEncoder";


export class ClientSampleEncoder {
	public readonly settings: ClientSampleEncoderSettings;

	public readonly appDataEncoderFactory:AppDataEncoderFactory = new DefaultAppDataEncoderFactory();
	public clientEventEncoder: ClientEventEncoder = new DefaultClientEventEncoder();
	public clientMetaDataEncoder: ClientMetaDataEncoder = new DefaultClientMetaDataEncoder();	
	public extensionStatsEncoder: ExtensionStatsEncoder = new DefaultExtensionStatsEncoder();
	
	private _clientId: Uint8Array;
	private readonly _callIdEncoder: Encoder<string, Uint8Array>;
	private _appDataEncoder: AppDataEncoder;
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
		this._appDataEncoder = this.appDataEncoderFactory.createClientSampleAppDataEncoder();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encodeToBytes(clientSample: InputClientSample): Uint8Array {
		return this.encodeToProtobufSamples(clientSample).toBinary()
	}

	public encodeToBase64(clientSample: InputClientSample): string {
		const bytes = this.encodeToProtobufSamples(clientSample).toBinary();
		return convertUint8ToBase64(bytes);
	}

	public encodeToProtobufSamples(clientSample: InputClientSample): OutputClientSample {
		this._visited = true;
		const clientEvents: ClientSample_ClientEvent[] | undefined = clientSample
			.clientEvents
			?.map(this.clientEventEncoder.encode.bind(this.clientEventEncoder))
			?.filter((event) => event !== undefined);

		const clientMetaItems: ClientSample_ClientMetaData[] | undefined = clientSample
			.clientMetaItems
			?.map(this.clientMetaDataEncoder.encode.bind(this.clientMetaDataEncoder))
			?.filter((metaItem) => metaItem !== undefined);
		
		const extensionStats: ClientSample_ExtensionStat[] | undefined = clientSample
			.extensionStats
			?.map(this.extensionStatsEncoder.encode.bind(this.extensionStatsEncoder))
			?.filter((extensionStat) => extensionStat !== undefined);

		const result = new OutputClientSample({
			clientId: this._clientId,
			timestamp: BigInt(clientSample.timestamp),
			callId: this._callIdEncoder.encode(clientSample.callId),
			peerConnections: clientSample.peerConnections?.map(this._encodePeerConnectionSample.bind(this)),
			clientEvents,
			clientMetaItems,
			extensionStats,
			appData: this._appDataEncoder.encode(clientSample.appData),
		});

		this._checkVisitsAndClean();

		return result;
	}

	public reset() {
	  this._peerConnectionSampleEncoders.forEach((encoder) => encoder.reset());
		this._callIdEncoder.reset();
		this.clientEventEncoder.reset();
		this.clientMetaDataEncoder.reset();
		this.extensionStatsEncoder.reset();
		this._appDataEncoder = this.appDataEncoderFactory.createClientSampleAppDataEncoder();
	}
	  

	private _encodePeerConnectionSample(
		input: Required<InputClientSample>['peerConnections'][number], 
	): OutputClientSample['peerConnections'][number] {
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
