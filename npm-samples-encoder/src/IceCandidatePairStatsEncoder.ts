import { BooleanToBooleanEncoder, Encoder, NumberToBigIntEncoder } from "./utils";
import { IceCandidatePairStats, IceCandidatePairStats as InputIceCandidatePairStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_IceCandidatePairStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum } from "./OutputSamples";

export class IceCandidatePairEncoder implements Encoder<InputIceCandidatePairStats, ClientSample_PeerConnectionSample_IceCandidatePairStats> {
  private _visited = false;

  private readonly _availableIncomingBitrateEncoder: NumberToNumberEncoder;
  private readonly _availableOutgoingBitrateEncoder: NumberToNumberEncoder;
  private readonly _bytesDiscardedOnSendEncoder: NumberToBigIntEncoder;
  private readonly _bytesReceivedEncoder: NumberToBigIntEncoder;
  private readonly _bytesSentEncoder: NumberToBigIntEncoder;
  private readonly _consentRequestsSentEncoder: NumberToNumberEncoder;
  private readonly _currentRoundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _lastPacketReceivedTimestampEncoder: NumberToNumberEncoder;
  private readonly _lastPacketSentTimestampEncoder: NumberToNumberEncoder;
  private readonly _localCandidateIdEncoder: StringToStringEncoder;
  private readonly _nominatedEncoder: BooleanToBooleanEncoder;
  private readonly _packetsDiscardedOnSendEncoder: NumberToNumberEncoder;
  private readonly _packetsReceivedEncoder: NumberToNumberEncoder;
  private readonly _packetsSentEncoder: NumberToNumberEncoder;
  private readonly _remoteCandidateIdEncoder: StringToStringEncoder;
  private readonly _requestsReceivedEncoder: NumberToNumberEncoder;
  private readonly _requestsSentEncoder: NumberToNumberEncoder;
  private readonly _responsesReceivedEncoder: NumberToNumberEncoder;
  private readonly _responsesSentEncoder: NumberToNumberEncoder;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _totalRoundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _transportIdEncoder: StringToStringEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;
  private readonly _stateEncoder: IceCandidatePairStatsEnumEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._availableIncomingBitrateEncoder = new NumberToNumberEncoder();
    this._availableOutgoingBitrateEncoder = new NumberToNumberEncoder();
    this._bytesDiscardedOnSendEncoder = new NumberToBigIntEncoder();
    this._bytesReceivedEncoder = new NumberToBigIntEncoder();
    this._bytesSentEncoder = new NumberToBigIntEncoder();
    this._consentRequestsSentEncoder = new NumberToNumberEncoder();
    this._currentRoundTripTimeEncoder = new NumberToNumberEncoder();
    this._lastPacketReceivedTimestampEncoder = new NumberToNumberEncoder();
    this._lastPacketSentTimestampEncoder = new NumberToNumberEncoder();
    this._localCandidateIdEncoder = new StringToStringEncoder();
    this._nominatedEncoder = new BooleanToBooleanEncoder();
    this._packetsDiscardedOnSendEncoder = new NumberToNumberEncoder();
    this._packetsReceivedEncoder = new NumberToNumberEncoder();
    this._packetsSentEncoder = new NumberToNumberEncoder();
    this._remoteCandidateIdEncoder = new StringToStringEncoder();
    this._requestsReceivedEncoder = new NumberToNumberEncoder();
    this._requestsSentEncoder = new NumberToNumberEncoder();
    this._responsesReceivedEncoder = new NumberToNumberEncoder();
    this._responsesSentEncoder = new NumberToNumberEncoder();
    this._timestampEncoder = new NumberToNumberEncoder();
    this._totalRoundTripTimeEncoder = new NumberToNumberEncoder();
    this._transportIdEncoder = new StringToStringEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
    this._stateEncoder = new IceCandidatePairStatsEnumEncoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._availableIncomingBitrateEncoder.reset();
    this._availableOutgoingBitrateEncoder.reset();
    this._bytesDiscardedOnSendEncoder.reset();
    this._bytesReceivedEncoder.reset();
    this._bytesSentEncoder.reset();
    this._consentRequestsSentEncoder.reset();
    this._currentRoundTripTimeEncoder.reset();
    this._lastPacketReceivedTimestampEncoder.reset();
    this._lastPacketSentTimestampEncoder.reset();
    this._localCandidateIdEncoder.reset();
    this._nominatedEncoder.reset();
    this._packetsDiscardedOnSendEncoder.reset();
    this._packetsReceivedEncoder.reset();
    this._packetsSentEncoder.reset();
    this._remoteCandidateIdEncoder.reset();
    this._requestsReceivedEncoder.reset();
    this._requestsSentEncoder.reset();
    this._responsesReceivedEncoder.reset();
    this._responsesSentEncoder.reset();
    this._timestampEncoder.reset();
    this._totalRoundTripTimeEncoder.reset();
    this._transportIdEncoder.reset();
    this._attachmentsEncoder.reset();
    this._stateEncoder.reset();
  }

  public encode(sample: InputIceCandidatePairStats): ClientSample_PeerConnectionSample_IceCandidatePairStats {
    this._visited = true;

    return new ClientSample_PeerConnectionSample_IceCandidatePairStats({
      id: sample.id,
      availableIncomingBitrate: this._availableIncomingBitrateEncoder.encode(sample.availableIncomingBitrate),
      availableOutgoingBitrate: this._availableOutgoingBitrateEncoder.encode(sample.availableOutgoingBitrate),
      bytesDiscardedOnSend: this._bytesDiscardedOnSendEncoder.encode(sample.bytesDiscardedOnSend),
      bytesReceived: this._bytesReceivedEncoder.encode(sample.bytesReceived),
      bytesSent: this._bytesSentEncoder.encode(sample.bytesSent),
      consentRequestsSent: this._consentRequestsSentEncoder.encode(sample.consentRequestsSent),
      currentRoundTripTime: this._currentRoundTripTimeEncoder.encode(sample.currentRoundTripTime),
      lastPacketReceivedTimestamp: this._lastPacketReceivedTimestampEncoder.encode(sample.lastPacketReceivedTimestamp),
      lastPacketSentTimestamp: this._lastPacketSentTimestampEncoder.encode(sample.lastPacketSentTimestamp),
      localCandidateId: this._localCandidateIdEncoder.encode(sample.localCandidateId),
      nominated: this._nominatedEncoder.encode(sample.nominated),
      packetsDiscardedOnSend: this._packetsDiscardedOnSendEncoder.encode(sample.packetsDiscardedOnSend),
      packetsReceived: this._packetsReceivedEncoder.encode(sample.packetsReceived),
      packetsSent: this._packetsSentEncoder.encode(sample.packetsSent),
      remoteCandidateId: this._remoteCandidateIdEncoder.encode(sample.remoteCandidateId),
      requestsReceived: this._requestsReceivedEncoder.encode(sample.requestsReceived),
      requestsSent: this._requestsSentEncoder.encode(sample.requestsSent),
      responsesReceived: this._responsesReceivedEncoder.encode(sample.responsesReceived),
      responsesSent: this._responsesSentEncoder.encode(sample.responsesSent),
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      totalRoundTripTime: this._totalRoundTripTimeEncoder.encode(sample.totalRoundTripTime),
      transportId: this._transportIdEncoder.encode(sample.transportId),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
      state: this._stateEncoder.encode(sample.state),
    });
  }
}

export class IceCandidatePairStatsEnumEncoder implements Encoder<Required<IceCandidatePairStats>['state'], ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum> {
	
	private _actualValue?: Required<IceCandidatePairStats>['state'];

	public reset() {
		this._actualValue = undefined;
	}
	
	public encode(state: IceCandidatePairStats['state']): ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum | undefined {
		if (this._actualValue === state) return;
		this._actualValue = state;

		switch (state) {
			case 'new':
				return ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum.NEW;
      case 'in-progress':
				return ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum.INPROGRESS;
			case 'failed':
				return ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum.FAILED;
			case 'succeeded':
				return ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum.SUCCEEDED;
      case 'waiting':
        return ClientSample_PeerConnectionSample_IceCandidatePairStats_IceCandidatePairStatsEnum.WAITING;
			default:
				throw new Error(`Unknown IceCandidatePairStats state: ${state}`);
		}
	}
}