import {
    ClientSample as InputClientSample,
    ClientSample_ClientEvent as InputClientEvent,
    ClientSample_ClientIssue as InputClientIssue,
    ClientSample_ClientMetaData as InputClientMetaData,
    ClientSample_ExtensionStat as InputExtensionStat,
    ClientSample_PeerConnectionSample as InputPeerConnectionSample,
} from "./InputSamples";
import {
    ClientSample as OutputClientSample,
    ClientEvent as OutputClientEvent,
    ClientIssue as OutputClientIssue,
    ClientMetaData as OutputClientMetaData,
    ExtensionStat as OutputExtensionStat,
    PeerConnectionSample as OutputPeerConnectionSample,
} from './OutputSamples';
import {
    AttachmentDecoder,
    AttachmentsDecoderFactory,
    bytesArrayToString,
    ClientSampleDecoderSettings,
    Decoder,
    DefaultAttachmentDecoderFactory,
    NumberToNumberDecoder,
	OneTimePassByteArrayToStringDecoder,
	OneTimePassUuidByteArrayToStringDecoder,
	uuidByteArrayToString,
} from "./utils";
import { PeerConnectionSampleDecoder } from "./PeerConnectionSampleDecoder";
import { ClientEventDecoder, DefaultClientEventDecoder } from "./ClientEventDecoder";
import { ClientMetaDataDecoder, DefaultClientMetaDataDecoder } from "./ClientMetaDataDecoder";
import { DefaultExtensionStatsDecoder, ExtensionStatsDecoder } from "./ExtensionStatsDecoder";
import { ClientIssueDecoder, DefaultClientIssueDecoder } from "./ClientIssueDecoder";

export class ClientSampleDecoder {
    public readonly settings: ClientSampleDecoderSettings;

    public attachmentDecoderFactory: AttachmentsDecoderFactory = new DefaultAttachmentDecoderFactory();
    public clientEventDecoder: ClientEventDecoder = new DefaultClientEventDecoder();
    public clientIssueDecoder: ClientIssueDecoder = new DefaultClientIssueDecoder();
    public clientMetaDataDecoder: ClientMetaDataDecoder = new DefaultClientMetaDataDecoder();
    public extensionStatsDecoder: ExtensionStatsDecoder = new DefaultExtensionStatsDecoder();

    private readonly _clientIdDecoder: Decoder<Uint8Array, string>;
    private readonly _callIdDecoder: Decoder<Uint8Array, string>;
    private readonly _timestampDecoder = new NumberToNumberDecoder();
    private _attachmentDecoder: AttachmentDecoder;
    private _scoreDecoder = new NumberToNumberDecoder();
    private _visited = false;

    private _peerConnectionSampleDecoders = new Map<string, PeerConnectionSampleDecoder>();

    public constructor(settings?: Partial<ClientSampleDecoderSettings>) {
        this.settings = {
            clientIdIsUuid: false,
            peerConnectionIdIsUuid: false,
            callIdIsUuid: false,
            trackIdIsUuid: false,
            ...(settings ?? {}),
        };

        this._clientIdDecoder = this.settings.clientIdIsUuid 
            ? new OneTimePassUuidByteArrayToStringDecoder()
            : new OneTimePassByteArrayToStringDecoder();

        this._callIdDecoder = this.settings.callIdIsUuid 
            ? new OneTimePassUuidByteArrayToStringDecoder()
            : new OneTimePassByteArrayToStringDecoder();

        this._attachmentDecoder = this.attachmentDecoderFactory.createClientSampleAttachmentDecoder();
    }

    public get visited(): boolean {
        const result = this._visited;
        this._visited = false;
        return result;
    }

    public decodeFromBytes(bytes: Uint8Array): OutputClientSample | undefined {
        try {
            const inputSample = InputClientSample.fromBinary(bytes);
            return this.decodeFromProtobuf(inputSample);
        } catch (error) {
            console.warn("Failed to decode ClientSample from bytes:", error);
            return undefined;
        }
    }

    public decodeFromBase64(base64: string): OutputClientSample | undefined {
        try {
			const bytes = Buffer.from(base64, 'base64');
			
            return this.decodeFromBytes(bytes);
        } catch (error) {
            console.warn("Failed to decode ClientSample from base64:", error);
            return undefined;
        }
    }

    public decodeFromProtobuf(input: InputClientSample): OutputClientSample | undefined {
        this._visited = true;

        const clientId = this._clientIdDecoder.decode(input.clientId);
        const callId = this._callIdDecoder.decode(input.callId);
        const timestamp = this._timestampDecoder.decode(input.timestamp);

        if (!clientId || !callId || !timestamp) {
            console.warn("Invalid ClientSample: missing required fields (clientId, callId, or timestamp)");
            return undefined;
        }

        const clientEvents: OutputClientEvent[] | undefined = input.clientEvents
            ?.map(this.clientEventDecoder.decode.bind(this.clientEventDecoder))
            ?.filter((event): event is OutputClientEvent => event !== undefined);

        const clientMetaItems: OutputClientMetaData[] | undefined = input.clientMetaItems
            ?.map(this.clientMetaDataDecoder.decode.bind(this.clientMetaDataDecoder))
            ?.filter((metaItem): metaItem is OutputClientMetaData => metaItem !== undefined);

        const extensionStats: OutputExtensionStat[] | undefined = input.extensionStats
            ?.map(this.extensionStatsDecoder.decode.bind(this.extensionStatsDecoder))
            ?.filter((stat): stat is OutputExtensionStat => stat !== undefined);

        const peerConnections: OutputPeerConnectionSample[] | undefined = input.peerConnections
            ?.map(this._decodePeerConnectionSample.bind(this))
            ?.filter((pc): pc is OutputPeerConnectionSample => pc !== undefined);

        const clientIssues: OutputClientIssue[] | undefined = input.clientIssues
            ?.map(this.clientIssueDecoder.decode.bind(this.clientIssueDecoder))
            ?.filter((issue): issue is OutputClientIssue => issue !== undefined);

        const result: OutputClientSample = {
            timestamp,
            callId,
            clientId,
            attachments: this._attachmentDecoder.decode(input.attachments),
            score: this._scoreDecoder.decode(input.score),
            peerConnections,
            clientEvents,
            clientIssues,
            clientMetaItems,
            extensionStats,
        };

        this._checkVisitsAndClean();

        return result;
    }

    public reset() {
        this._timestampDecoder.reset();
        this._callIdDecoder.reset();
        this._attachmentDecoder.reset();
        this._scoreDecoder.reset();
        this._peerConnectionSampleDecoders.forEach(decoder => decoder.reset());
        this.clientEventDecoder.reset();
        this.clientIssueDecoder.reset();
        this.clientMetaDataDecoder.reset();
        this.extensionStatsDecoder.reset();
    }

    private _decodePeerConnectionSample(
        input: InputPeerConnectionSample,
    ): OutputPeerConnectionSample | undefined {
		if (input.peerConnectionId === undefined) return undefined;

        const peerConnectionId = this.settings.peerConnectionIdIsUuid
            ? uuidByteArrayToString(input.peerConnectionId)
            : bytesArrayToString(input.peerConnectionId);

		if (!peerConnectionId) {
			console.warn("Invalid PeerConnectionSample: missing peerConnectionId");
			return undefined;
		}

        let decoder = this._peerConnectionSampleDecoders.get(peerConnectionId);
        if (!decoder) {
            decoder = new PeerConnectionSampleDecoder(
				peerConnectionId,
				this
			);
            this._peerConnectionSampleDecoders.set(peerConnectionId, decoder);
        }
        return decoder.decode(input);
    }

    private _checkVisitsAndClean() {
        for (const [peerConnectionId, decoder] of Array.from(this._peerConnectionSampleDecoders.entries())) {
            const visited = decoder.visited;
            
            if (!visited) {
                this._peerConnectionSampleDecoders.delete(peerConnectionId);
            }
        }
    }
}