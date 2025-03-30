import { Decoder, BigIntToNumberDecoder, BooleanToBooleanDecoder } from "./utils";
import { 
	
	IceCandidatePairStats as OutputIceCandidatePairStats 
} from "./OutputSamples";
import { 
	ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum as InputIceCandidatePairState,
	ClientSample_PeerConnectionSample_IceCandidatePairStats as InputIceCandidatePairStats 
} from "./InputSamples";
// import { 
//   IceCandidatePairStats as OutputIceCandidatePairStats,
//   ClientSample_PeerConnectionSample_IceCandidatePairStats as InputIceCandidatePairStats,
//   ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum as InputIceCandidatePairState
// } from "./InputOutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";

const logger = console;

export class IceCandidatePairDecoder implements Decoder<InputIceCandidatePairStats, OutputIceCandidatePairStats | undefined> {
	private _visited = false;

	private readonly _availableIncomingBitrateDecoder: NumberToNumberDecoder;
	private readonly _availableOutgoingBitrateDecoder: NumberToNumberDecoder;
	private readonly _bytesDiscardedOnSendDecoder: BigIntToNumberDecoder;
	private readonly _bytesReceivedDecoder: BigIntToNumberDecoder;
	private readonly _bytesSentDecoder: BigIntToNumberDecoder;
	private readonly _consentRequestsSentDecoder: NumberToNumberDecoder;
	private readonly _currentRoundTripTimeDecoder: NumberToNumberDecoder;
	private readonly _lastPacketReceivedTimestampDecoder: NumberToNumberDecoder;
	private readonly _lastPacketSentTimestampDecoder: NumberToNumberDecoder;
	private readonly _localCandidateIdDecoder: StringToStringDecoder;
	private readonly _nominatedDecoder: BooleanToBooleanDecoder;
	private readonly _packetsDiscardedOnSendDecoder: NumberToNumberDecoder;
	private readonly _packetsReceivedDecoder: NumberToNumberDecoder;
	private readonly _packetsSentDecoder: NumberToNumberDecoder;
	private readonly _remoteCandidateIdDecoder: StringToStringDecoder;
	private readonly _requestsReceivedDecoder: NumberToNumberDecoder;
	private readonly _requestsSentDecoder: NumberToNumberDecoder;
	private readonly _responsesReceivedDecoder: NumberToNumberDecoder;
	private readonly _responsesSentDecoder: NumberToNumberDecoder;
	private readonly _timestampDecoder: NumberToNumberDecoder;
	private readonly _totalRoundTripTimeDecoder: NumberToNumberDecoder;
	private readonly _transportIdDecoder: StringToStringDecoder;
	private readonly _stateDecoder: IceCandidatePairStatsEnumDecoder;

  constructor(
		public readonly id: string,
		private readonly _attachmentsDecoder: AttachmentDecoder,
	) {
		this._availableIncomingBitrateDecoder = new NumberToNumberDecoder();
		this._availableOutgoingBitrateDecoder = new NumberToNumberDecoder();
		this._bytesDiscardedOnSendDecoder = new BigIntToNumberDecoder();
		this._bytesReceivedDecoder = new BigIntToNumberDecoder();
		this._bytesSentDecoder = new BigIntToNumberDecoder();
		this._consentRequestsSentDecoder = new NumberToNumberDecoder();
		this._currentRoundTripTimeDecoder = new NumberToNumberDecoder();
		this._lastPacketReceivedTimestampDecoder = new NumberToNumberDecoder();
		this._lastPacketSentTimestampDecoder = new NumberToNumberDecoder();
		this._localCandidateIdDecoder = new StringToStringDecoder();
		this._nominatedDecoder = new BooleanToBooleanDecoder();
		this._packetsDiscardedOnSendDecoder = new NumberToNumberDecoder();
		this._packetsReceivedDecoder = new NumberToNumberDecoder();
		this._packetsSentDecoder = new NumberToNumberDecoder();
		this._remoteCandidateIdDecoder = new StringToStringDecoder();
		this._requestsReceivedDecoder = new NumberToNumberDecoder();
		this._requestsSentDecoder = new NumberToNumberDecoder();
		this._responsesReceivedDecoder = new NumberToNumberDecoder();
		this._responsesSentDecoder = new NumberToNumberDecoder();
		this._timestampDecoder = new NumberToNumberDecoder();
		this._totalRoundTripTimeDecoder = new NumberToNumberDecoder();
		this._transportIdDecoder = new StringToStringDecoder();
		this._stateDecoder = new IceCandidatePairStatsEnumDecoder();
	}

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._availableIncomingBitrateDecoder.reset();
    this._availableOutgoingBitrateDecoder.reset();
    this._bytesDiscardedOnSendDecoder.reset();
    this._bytesReceivedDecoder.reset();
    this._bytesSentDecoder.reset();
    this._consentRequestsSentDecoder.reset();
    this._currentRoundTripTimeDecoder.reset();
    this._lastPacketReceivedTimestampDecoder.reset();
    this._lastPacketSentTimestampDecoder.reset();
    this._localCandidateIdDecoder.reset();
    this._nominatedDecoder.reset();
    this._packetsDiscardedOnSendDecoder.reset();
    this._packetsReceivedDecoder.reset();
    this._packetsSentDecoder.reset();
    this._remoteCandidateIdDecoder.reset();
    this._requestsReceivedDecoder.reset();
    this._requestsSentDecoder.reset();
    this._responsesReceivedDecoder.reset();
    this._responsesSentDecoder.reset();
    this._timestampDecoder.reset();
    this._totalRoundTripTimeDecoder.reset();
    this._transportIdDecoder.reset();
    this._attachmentsDecoder.reset();
    this._stateDecoder.reset();
  }

  public decode(input: InputIceCandidatePairStats): OutputIceCandidatePairStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);

    if (!timestamp) {
      logger.warn("Invalid ICE candidate pair sample: missing timestamp or id");
      return undefined;
    }

    return {
      id: this.id,
      availableIncomingBitrate: this._availableIncomingBitrateDecoder.decode(input.availableIncomingBitrate),
      availableOutgoingBitrate: this._availableOutgoingBitrateDecoder.decode(input.availableOutgoingBitrate),
      bytesDiscardedOnSend: this._bytesDiscardedOnSendDecoder.decode(input.bytesDiscardedOnSend),
      bytesReceived: this._bytesReceivedDecoder.decode(input.bytesReceived),
      bytesSent: this._bytesSentDecoder.decode(input.bytesSent),
      consentRequestsSent: this._consentRequestsSentDecoder.decode(input.consentRequestsSent),
      currentRoundTripTime: this._currentRoundTripTimeDecoder.decode(input.currentRoundTripTime),
      lastPacketReceivedTimestamp: this._lastPacketReceivedTimestampDecoder.decode(input.lastPacketReceivedTimestamp),
      lastPacketSentTimestamp: this._lastPacketSentTimestampDecoder.decode(input.lastPacketSentTimestamp),
      localCandidateId: this._localCandidateIdDecoder.decode(input.localCandidateId),
      nominated: this._nominatedDecoder.decode(input.nominated),
      packetsDiscardedOnSend: this._packetsDiscardedOnSendDecoder.decode(input.packetsDiscardedOnSend),
      packetsReceived: this._packetsReceivedDecoder.decode(input.packetsReceived),
      packetsSent: this._packetsSentDecoder.decode(input.packetsSent),
      remoteCandidateId: this._remoteCandidateIdDecoder.decode(input.remoteCandidateId),
      requestsReceived: this._requestsReceivedDecoder.decode(input.requestsReceived),
      requestsSent: this._requestsSentDecoder.decode(input.requestsSent),
      responsesReceived: this._responsesReceivedDecoder.decode(input.responsesReceived),
      responsesSent: this._responsesSentDecoder.decode(input.responsesSent),
      timestamp,
      totalRoundTripTime: this._totalRoundTripTimeDecoder.decode(input.totalRoundTripTime),
      transportId: this._transportIdDecoder.decode(input.transportId),
      attachments: this._attachmentsDecoder.decode(input.attachments),
      state: this._stateDecoder.decode(input.state),
    };
  }
}

export class IceCandidatePairStatsEnumDecoder implements Decoder<InputIceCandidatePairState, Required<OutputIceCandidatePairStats>['state']> {
  
  private _actualValue?: OutputIceCandidatePairStats['state'];

  public reset() {
    this._actualValue = undefined;
  }
  
  public decode(state?: InputIceCandidatePairState): Required<OutputIceCandidatePairStats>['state'] | undefined {
    if (state === undefined) return this._actualValue
    
    switch (state) {
      case InputIceCandidatePairState.NEW:
        this._actualValue = 'new';
		break;
      case InputIceCandidatePairState.INPROGRESS:
		this._actualValue = 'inProgress';
		break;
      case InputIceCandidatePairState.FAILED:
		this._actualValue = 'failed';
		break;
      case InputIceCandidatePairState.SUCCEEDED:
		this._actualValue = 'succeeded';
		break;
      default:
        logger.warn(`Unknown IceCandidatePairStats state: ${state}`);
        return undefined;
    }

	return this._actualValue;
  }
}