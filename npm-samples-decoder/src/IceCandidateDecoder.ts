import { Decoder, BigIntToNumberDecoder } from "./utils";
import { IceCandidateStats as OutputIceCandidateStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_IceCandidateStats as InputIceCandidateStats } from "./InputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";
import { logger } from "./Logger";

export class IceCandidateDecoder implements Decoder<InputIceCandidateStats, OutputIceCandidateStats | undefined> {
  private _visited = false;

  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _transportIdDecoder: StringToStringDecoder;
  private readonly _addressDecoder: StringToStringDecoder;
  private readonly _portDecoder: NumberToNumberDecoder;
  private readonly _protocolDecoder: StringToStringDecoder;
  private readonly _candidateTypeDecoder: StringToStringDecoder;
  private readonly _priorityDecoder: BigIntToNumberDecoder;
  private readonly _urlDecoder: StringToStringDecoder;
  private readonly _relayProtocolDecoder: StringToStringDecoder;
  private readonly _foundationDecoder: StringToStringDecoder;
  private readonly _relatedAddressDecoder: StringToStringDecoder;
  private readonly _relatedPortDecoder: NumberToNumberDecoder;
  private readonly _usernameFragmentDecoder: StringToStringDecoder;
  private readonly _tcpTypeDecoder: StringToStringDecoder;

  private _actualValue: OutputIceCandidateStats | undefined = undefined;

  constructor(
	public readonly id: string,
	private readonly _attachmentsDecoder: AttachmentDecoder,
  ) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._idDecoder = new StringToStringDecoder();
    this._transportIdDecoder = new StringToStringDecoder();
    this._addressDecoder = new StringToStringDecoder();
    this._portDecoder = new NumberToNumberDecoder();
    this._protocolDecoder = new StringToStringDecoder();
    this._candidateTypeDecoder = new StringToStringDecoder();
    this._priorityDecoder = new BigIntToNumberDecoder();
    this._urlDecoder = new StringToStringDecoder();
    this._relayProtocolDecoder = new StringToStringDecoder();
    this._foundationDecoder = new StringToStringDecoder();
    this._relatedAddressDecoder = new StringToStringDecoder();
    this._relatedPortDecoder = new NumberToNumberDecoder();
    this._usernameFragmentDecoder = new StringToStringDecoder();
    this._tcpTypeDecoder = new StringToStringDecoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampDecoder.reset();
    this._idDecoder.reset();
    this._transportIdDecoder.reset();
    this._addressDecoder.reset();
    this._portDecoder.reset();
    this._protocolDecoder.reset();
    this._candidateTypeDecoder.reset();
    this._priorityDecoder.reset();
    this._urlDecoder.reset();
    this._relayProtocolDecoder.reset();
    this._foundationDecoder.reset();
    this._relatedAddressDecoder.reset();
    this._relatedPortDecoder.reset();
    this._usernameFragmentDecoder.reset();
    this._tcpTypeDecoder.reset();
    this._attachmentsDecoder.reset();
  }

  public decode(input: InputIceCandidateStats): OutputIceCandidateStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);

    if (!timestamp) {
      logger.warn("Invalid ICE candidate sample: missing timestamp or id");
      return undefined;
    }

    this._actualValue = {
      timestamp,
      id: this.id,
      transportId: this._transportIdDecoder.decode(input.transportId),
      address: this._addressDecoder.decode(input.address),
      port: this._portDecoder.decode(input.port),
      protocol: this._protocolDecoder.decode(input.protocol),
      candidateType: this._candidateTypeDecoder.decode(input.candidateType),
      priority: this._priorityDecoder.decode(input.priority),
      url: this._urlDecoder.decode(input.url),
      relayProtocol: this._relayProtocolDecoder.decode(input.relayProtocol),
      foundation: this._foundationDecoder.decode(input.foundation),
      relatedAddress: this._relatedAddressDecoder.decode(input.relatedAddress),
      relatedPort: this._relatedPortDecoder.decode(input.relatedPort),
      usernameFragment: this._usernameFragmentDecoder.decode(input.usernameFragment),
      tcpType: this._tcpTypeDecoder.decode(input.tcpType),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };

    return this._actualValue;
  }


  public get actualValue(): OutputIceCandidateStats | undefined {
    return this._actualValue;
  }
    
  public set actualValue(sample: OutputIceCandidateStats | undefined) {
    if (!sample) return;
    
    this._visited = true;
    this._actualValue = sample;
  
    this._timestampDecoder.actualValue = sample.timestamp;
    this._transportIdDecoder.actualValue = sample.transportId;
    this._addressDecoder.actualValue = sample.address;
    this._portDecoder.actualValue = sample.port;
    this._protocolDecoder.actualValue = sample.protocol;
    this._candidateTypeDecoder.actualValue = sample.candidateType;
    this._priorityDecoder.actualValue = sample.priority;
    this._urlDecoder.actualValue = sample.url;
    this._relayProtocolDecoder.actualValue = sample.relayProtocol;
    this._foundationDecoder.actualValue = sample.foundation;
    this._relatedAddressDecoder.actualValue = sample.relatedAddress;
    this._relatedPortDecoder.actualValue = sample.relatedPort;
    this._usernameFragmentDecoder.actualValue = sample.usernameFragment;
    this._tcpTypeDecoder.actualValue = sample.tcpType;
    this._attachmentsDecoder.actualValue = sample.attachments;
  }

}