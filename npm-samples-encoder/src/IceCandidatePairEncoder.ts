import { IceCandidatePair } from "./InputSamples";
import { stringToBytesArray, uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_IceCandidatePair } from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class IceCandidatePairEncoder {
	private _peerConnectionId?: string;
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
		private readonly _options: ClientSampleEncodingOptions,
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: IceCandidatePair): Samples_ClientSample_IceCandidatePair {
		this._visited = true;

		const result = new Samples_ClientSample_IceCandidatePair({
			candidatePairId: this.candidatePairId,
			peerConnectionId: this._encodePeerConnectionId(sample.peerConnectionId),
			availableIncomingBitrate: this._encodeAvailableIncomingBitrate(sample.availableIncomingBitrate),
			availableOutgoingBitrate: this._encodeAvailableOutgoingBitrate(sample.availableOutgoingBitrate),
			bytesDiscardedOnSend: this._encodeBytesDiscardedOnSend(sample.bytesDiscardedOnSend),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			consentRequestsSent: this._encodeConsentRequestsSent(sample.consentRequestsSent),
			currentRoundTripTime: this._encodeCurrentRoundTripTime(sample.currentRoundTripTime),
			label: this._encodeLabel(sample.label),
			lastPacketReceivedTimestamp: this._encodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			lastPacketSentTimestamp: this._encodeLastPacketSentTimestamp(sample.lastPacketSentTimestamp),
			localCandidateId: this._encodeLocalCandidateId(sample.localCandidateId),
			nominated: this._encodeNominated(sample.nominated),
			packetsDiscardedOnSend: this._encodePacketsDiscardedOnSend(sample.packetsDiscardedOnSend),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			remoteCandidateId: this._encodeRemoteCandidateId(sample.remoteCandidateId),
			requestsReceived: this._encodeRequestsReceived(sample.requestsReceived),
			requestsSent: this._encodeRequestsSent(sample.requestsSent),
			responsesReceived: this._encodeResponsesReceived(sample.responsesReceived),
			responsesSent: this._encodeResponsesSent(sample.responsesSent),
			state: this._encodeState(sample.state),
			totalRoundTripTime: this._encodeTotalRoundTripTime(sample.totalRoundTripTime),
			transportId: this._encodeTransportId(sample.transportId),
		});
		return result;
}

	private _encodePeerConnectionId(peerConnectionId?: string): Uint8Array | undefined {
		if (!peerConnectionId) return;
		if (peerConnectionId === this._peerConnectionId) return;
		this._peerConnectionId = peerConnectionId;
		return this._options.peerConnectionIdIsUuid 
			? uuidToByteArray(this._peerConnectionId)
			: stringToBytesArray(this._peerConnectionId)
		;
	}

	private _encodeAvailableIncomingBitrate(availableIncomingBitrate?: number): number | undefined {
		if (availableIncomingBitrate === undefined) return;
		if (availableIncomingBitrate === this._availableIncomingBitrate) return;
		this._availableIncomingBitrate = availableIncomingBitrate;
		return this._availableIncomingBitrate;
	}

	private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (!bytesReceived) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	}

	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (!bytesSent) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	}

	private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (!packetsReceived) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (!packetsSent) return;
		if (packetsSent === this._packetsSent) return;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}


	private _encodeRemoteCandidateId(remoteCandidateId?: string): string | undefined {
		if (!remoteCandidateId) return;
		if (remoteCandidateId === this._remoteCandidateId) return;
		this._remoteCandidateId = remoteCandidateId;
		return this._remoteCandidateId;
	}

	private _encodeRequestsReceived(requestsReceived?: number): number | undefined {
		if (!requestsReceived) return;
		if (requestsReceived === this._requestsReceived) return;
		this._requestsReceived = requestsReceived;
		return this._requestsReceived;
	}

	private _encodeRequestsSent(requestsSent?: number): number | undefined {
		if (!requestsSent) return;
		if (requestsSent === this._requestsSent) return;
		this._requestsSent = requestsSent;
		return this._requestsSent;
	}

	private _encodeResponsesReceived(responsesReceived?: number): number | undefined {
		if (!responsesReceived) return;
		if (responsesReceived === this._responsesReceived) return;
		this._responsesReceived = responsesReceived;
		return this._responsesReceived;
	}

	private _encodeResponsesSent(responsesSent?: number): number | undefined {
		if (!responsesSent) return;
		if (responsesSent === this._responsesSent) return;
		this._responsesSent = responsesSent;
		return this._responsesSent;
	}


	private _encodeState(state?: string): string | undefined {
		if (!state) return;
		if (state === this._state) return;
		this._state = state;
		return this._state;
	}

	private _encodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return;
		if (totalRoundTripTime === this._totalRoundTripTime) return;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}

	private _encodeTransportId(transportId?: string): string | undefined {
		if (!transportId) return;
		if (transportId === this._transportId) return;
		this._transportId = transportId;
		return this._transportId;
	}

	private _encodeAvailableOutgoingBitrate(availableOutgoingBitrate?: number): number | undefined {
		if (availableOutgoingBitrate === undefined) return;
		if (availableOutgoingBitrate === this._availableOutgoingBitrate) return;
		this._availableOutgoingBitrate = availableOutgoingBitrate;
		return this._availableOutgoingBitrate;
	}
	
	private _encodeBytesDiscardedOnSend(bytesDiscardedOnSend?: number): bigint | undefined {
		if (!bytesDiscardedOnSend) return;
		if (bytesDiscardedOnSend === this._bytesDiscardedOnSend) return;
		this._bytesDiscardedOnSend = bytesDiscardedOnSend;
		return BigInt(this._bytesDiscardedOnSend);
	}
	
	private _encodeConsentRequestsSent(consentRequestsSent?: number): number | undefined {
		if (!consentRequestsSent) return;
		if (consentRequestsSent === this._consentRequestsSent) return;
		this._consentRequestsSent = consentRequestsSent;
		return this._consentRequestsSent;
	}
	
	private _encodeCurrentRoundTripTime(currentRoundTripTime?: number): number | undefined {
		if (currentRoundTripTime === undefined) return;
		if (currentRoundTripTime === this._currentRoundTripTime) return;
		this._currentRoundTripTime = currentRoundTripTime;
		return this._currentRoundTripTime;
	}
	
	private _encodeLabel(label?: string): string | undefined {
		if (!label) return;
		if (label === this._label) return;
		this._label = label;
		return this._label;
	}
	
	private _encodeLastPacketReceivedTimestamp(lastPacketReceivedTimestamp?: number): bigint | undefined {
		if (lastPacketReceivedTimestamp === undefined) return;
		if (lastPacketReceivedTimestamp === this._lastPacketReceivedTimestamp) return;
		this._lastPacketReceivedTimestamp = lastPacketReceivedTimestamp;
		return BigInt(this._lastPacketReceivedTimestamp);
	}
	
	private _encodeLastPacketSentTimestamp(lastPacketSentTimestamp?: number): bigint | undefined {
		if (lastPacketSentTimestamp === undefined) return;
		if (lastPacketSentTimestamp === this._lastPacketSentTimestamp) return;
		this._lastPacketSentTimestamp = lastPacketSentTimestamp;
		return BigInt(this._lastPacketSentTimestamp);
	}
	
	private _encodeLocalCandidateId(localCandidateId?: string): string | undefined {
		if (!localCandidateId) return;
		if (localCandidateId === this._localCandidateId) return;
		this._localCandidateId = localCandidateId;
		return this._localCandidateId;
	}
	
	private _encodeNominated(nominated?: boolean): boolean | undefined {
		if (nominated === undefined) return;
		if (nominated === this._nominated) return;
		this._nominated = nominated;
		return this._nominated;
	}
	
	private _encodePacketsDiscardedOnSend(packetsDiscardedOnSend?: number): number | undefined {
		if (!packetsDiscardedOnSend) return;
		if (packetsDiscardedOnSend === this._packetsDiscardedOnSend) return;
		this._packetsDiscardedOnSend = packetsDiscardedOnSend;
		return this._packetsDiscardedOnSend;
	}
}
