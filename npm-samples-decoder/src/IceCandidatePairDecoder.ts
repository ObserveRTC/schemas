import { IceCandidatePair } from './OutputSamples';
import { byteArrayToUuid } from './decodingTools';
import { Samples_ClientSample_IceCandidatePair } from './InputSamples';

export class IceCandidatePairDecoder {
	private _availableIncomingBitrate?: number;
	private _availableOutgoingBitrate?: number;
	private _bytesDiscardedOnSend?: number;
	private _bytesReceived?: number;
	private _bytesSent?: number;
	private _consentRequestsSent?: number;
	private _currentRoundTripTime?: number;
	private _label?: string;
	private _lastPacketReceivedTimestamp?: number;
	private _lastPacketSentTimestamp?: number;
	private _localCandidateId?: string;
	private _nominated?: boolean;
	private _packetsDiscardedOnSend?: number;
	private _packetsReceived?: number;
	private _packetsSent?: number;
	private _remoteCandidateId?: string;
	private _requestsReceived?: number;
	private _requestsSent?: number;
	private _responsesReceived?: number;
	private _responsesSent?: number;
	private _state?: string;
	private _totalRoundTripTime?: number;
	private _transportId?: string;

	private _visited = false;

	public constructor(
		public readonly candidatePairId: string,
		public readonly peerConnectionId: string,
	) {

	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_IceCandidatePair): IceCandidatePair {
		this._visited = true;
	
		const result: IceCandidatePair = {
			candidatePairId: this.candidatePairId,
			peerConnectionId: this.peerConnectionId,
			availableIncomingBitrate: this._decodeAvailableIncomingBitrate(sample.availableIncomingBitrate),
			availableOutgoingBitrate: this._decodeAvailableOutgoingBitrate(sample.availableOutgoingBitrate),
			bytesDiscardedOnSend: this._decodeBytesDiscardedOnSend(sample.bytesDiscardedOnSend),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			consentRequestsSent: this._decodeConsentRequestsSent(sample.consentRequestsSent),
			currentRoundTripTime: this._decodeCurrentRoundTripTime(sample.currentRoundTripTime),
			label: this._decodeLabel(sample.label),
			lastPacketReceivedTimestamp: this._decodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			lastPacketSentTimestamp: this._decodeLastPacketSentTimestamp(sample.lastPacketSentTimestamp),
			localCandidateId: this._decodeLocalCandidateId(sample.localCandidateId),
			nominated: this._decodeNominated(sample.nominated),
			packetsDiscardedOnSend: this._decodePacketsDiscardedOnSend(sample.packetsDiscardedOnSend),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			remoteCandidateId: this._decodeRemoteCandidateId(sample.remoteCandidateId),
			requestsReceived: this._decodeRequestsReceived(sample.requestsReceived),
			requestsSent: this._decodeRequestsSent(sample.requestsSent),
			responsesReceived: this._decodeResponsesReceived(sample.responsesReceived),
			responsesSent: this._decodeResponsesSent(sample.responsesSent),
			state: this._decodeState(sample.state),
			totalRoundTripTime: this._decodeTotalRoundTripTime(sample.totalRoundTripTime),
			transportId: this._decodeTransportId(sample.transportId),
		};
		return result;
	}

	private _decodeAvailableIncomingBitrate(availableIncomingBitrate?: number): number | undefined {
		if (availableIncomingBitrate === undefined) return this._availableIncomingBitrate;
		this._availableIncomingBitrate = availableIncomingBitrate;
		return this._availableIncomingBitrate;
	}
	
	private _decodeAvailableOutgoingBitrate(availableOutgoingBitrate?: number): number | undefined {
		if (availableOutgoingBitrate === undefined) return this._availableOutgoingBitrate;
		this._availableOutgoingBitrate = availableOutgoingBitrate;
		return this._availableOutgoingBitrate;
	}
	
	private _decodeBytesDiscardedOnSend(bytesDiscardedOnSend?: bigint): number | undefined {
		if (bytesDiscardedOnSend === undefined) return this._bytesDiscardedOnSend;
		this._bytesDiscardedOnSend = Number(bytesDiscardedOnSend);
		return this._bytesDiscardedOnSend;
	}
	
	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}
	
	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
	
	private _decodeConsentRequestsSent(consentRequestsSent?: number): number | undefined {
		if (consentRequestsSent === undefined) return this._consentRequestsSent;
		this._consentRequestsSent = consentRequestsSent;
		return this._consentRequestsSent;
	}
	
	private _decodeCurrentRoundTripTime(currentRoundTripTime?: number): number | undefined {
		if (currentRoundTripTime === undefined) return this._currentRoundTripTime;
		this._currentRoundTripTime = currentRoundTripTime;
		return this._currentRoundTripTime;
	}
	
	private _decodeLabel(label?: string): string | undefined {
		if (!label) return this._label;
		this._label = label;
		return this._label;
	}
	
	private _decodeLastPacketReceivedTimestamp(lastPacketReceivedTimestamp?: bigint): number | undefined {
		if (lastPacketReceivedTimestamp === undefined) return this._lastPacketReceivedTimestamp;
		this._lastPacketReceivedTimestamp = Number(lastPacketReceivedTimestamp);
		return this._lastPacketReceivedTimestamp;
	}
	
	private _decodeLastPacketSentTimestamp(lastPacketSentTimestamp?: bigint): number | undefined {
		if (lastPacketSentTimestamp === undefined) return this._lastPacketSentTimestamp;
		this._lastPacketSentTimestamp = Number(lastPacketSentTimestamp);
		return this._lastPacketSentTimestamp;
	}
	
	private _decodeLocalCandidateId(localCandidateId?: string): string | undefined {
		if (!localCandidateId) return this._localCandidateId;
		this._localCandidateId = localCandidateId;
		return this._localCandidateId;
	}
	
	private _decodeNominated(nominated?: boolean): boolean | undefined {
		if (nominated === undefined) return this._nominated;
		this._nominated = nominated;
		return this._nominated;
	}

	private _decodePacketsDiscardedOnSend(packetsDiscardedOnSend?: number): number | undefined {
		if (packetsDiscardedOnSend === undefined) return this._packetsDiscardedOnSend;
		this._packetsDiscardedOnSend = packetsDiscardedOnSend;
		return this._packetsDiscardedOnSend;
	}
	
	private _decodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return this._packetsReceived;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _decodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return this._packetsSent;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _decodeRemoteCandidateId(remoteCandidateId?: string): string | undefined {
		if (!remoteCandidateId) return this._remoteCandidateId;
		this._remoteCandidateId = remoteCandidateId;
		return this._remoteCandidateId;
	}
	
	private _decodeRequestsReceived(requestsReceived?: number): number | undefined {
		if (requestsReceived === undefined) return this._requestsReceived;
		this._requestsReceived = requestsReceived;
		return this._requestsReceived;
	}
	
	private _decodeRequestsSent(requestsSent?: number): number | undefined {
		if (requestsSent === undefined) return this._requestsSent;
		this._requestsSent = requestsSent;
		return this._requestsSent;
	}
	
	private _decodeResponsesReceived(responsesReceived?: number): number | undefined {
		if (responsesReceived === undefined) return this._responsesReceived;
		this._responsesReceived = responsesReceived;
		return this._responsesReceived;
	}
	
	private _decodeResponsesSent(responsesSent?: number): number | undefined {
		if (responsesSent === undefined) return this._responsesSent;
		this._responsesSent = responsesSent;
		return this._responsesSent;
	}
	
	private _decodeState(state?: string): string | undefined {
		if (!state) return this._state;
		this._state = state;
		return this._state;
	}
	
	private _decodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return this._totalRoundTripTime;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}
	
	private _decodeTransportId(transportId?: string): string | undefined {
		if (!transportId) return this._transportId;
		this._transportId = transportId;
		return this._transportId;
	}
}
