import { Encoder, NumberToBigIntEncoder } from "./utils";
import { IceCandidateStats as InputIceCandidateStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_IceCandidateStats } from "./OutputSamples";

export class IceCandidateEncoder implements Encoder<InputIceCandidateStats, ClientSample_PeerConnectionSample_IceCandidateStats> {
	private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _transportIdEncoder: StringToStringEncoder;
  private readonly _addressEncoder: StringToStringEncoder;
  private readonly _portEncoder: NumberToNumberEncoder;
  private readonly _protocolEncoder: StringToStringEncoder;
  private readonly _candidateTypeEncoder: StringToStringEncoder;
  private readonly _priorityEncoder: NumberToBigIntEncoder;
  private readonly _urlEncoder: StringToStringEncoder;
  private readonly _relayProtocolEncoder: StringToStringEncoder;
  private readonly _foundationEncoder: StringToStringEncoder;
  private readonly _relatedAddressEncoder: StringToStringEncoder;
  private readonly _relatedPortEncoder: NumberToNumberEncoder;
  private readonly _usernameFragmentEncoder: StringToStringEncoder;
  private readonly _tcpTypeEncoder: StringToStringEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._transportIdEncoder = new StringToStringEncoder();
    this._addressEncoder = new StringToStringEncoder();
    this._portEncoder = new NumberToNumberEncoder();
    this._protocolEncoder = new StringToStringEncoder();
    this._candidateTypeEncoder = new StringToStringEncoder();
    this._priorityEncoder = new NumberToBigIntEncoder();
    this._urlEncoder = new StringToStringEncoder();
    this._relayProtocolEncoder = new StringToStringEncoder();
    this._foundationEncoder = new StringToStringEncoder();
    this._relatedAddressEncoder = new StringToStringEncoder();
    this._relatedPortEncoder = new NumberToNumberEncoder();
    this._usernameFragmentEncoder = new StringToStringEncoder();
    this._tcpTypeEncoder = new StringToStringEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
  }

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

  public reset() {
    this._timestampEncoder.reset();
    this._idEncoder.reset();
    this._transportIdEncoder.reset();
    this._addressEncoder.reset();
    this._portEncoder.reset();
    this._protocolEncoder.reset();
    this._candidateTypeEncoder.reset();
    this._priorityEncoder.reset();
    this._urlEncoder.reset();
    this._relayProtocolEncoder.reset();
    this._foundationEncoder.reset();
    this._relatedAddressEncoder.reset();
    this._relatedPortEncoder.reset();
    this._usernameFragmentEncoder.reset();
    this._tcpTypeEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputIceCandidateStats): ClientSample_PeerConnectionSample_IceCandidateStats {
		this._visited = true;

    return new ClientSample_PeerConnectionSample_IceCandidateStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: this._idEncoder.encode(sample.id),
      transportId: this._transportIdEncoder.encode(sample.transportId),
      address: this._addressEncoder.encode(sample.address),
      port: this._portEncoder.encode(sample.port),
      protocol: this._protocolEncoder.encode(sample.protocol),
      candidateType: this._candidateTypeEncoder.encode(sample.candidateType),
      priority: this._priorityEncoder.encode(sample.priority),
      url: this._urlEncoder.encode(sample.url),
      relayProtocol: this._relayProtocolEncoder.encode(sample.relayProtocol),
      foundation: this._foundationEncoder.encode(sample.foundation),
      relatedAddress: this._relatedAddressEncoder.encode(sample.relatedAddress),
      relatedPort: this._relatedPortEncoder.encode(sample.relatedPort),
      usernameFragment: this._usernameFragmentEncoder.encode(sample.usernameFragment),
      tcpType: this._tcpTypeEncoder.encode(sample.tcpType),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
