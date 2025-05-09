import { Decoder, BigIntToNumberDecoder } from "./utils";
import { ClientSample_PeerConnectionSample_DataChannelStats as InputDataChannelStats } from "./InputSamples";
import { DataChannelStats as OutputDataChannelStats } from "./OutputSamples"; 
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";
import { logger } from "./Logger";

export class DataChannelDecoder implements Decoder<InputDataChannelStats, OutputDataChannelStats | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _labelDecoder: StringToStringDecoder;
  private readonly _protocolDecoder: StringToStringDecoder;
  private readonly _dataChannelIdentifierDecoder: NumberToNumberDecoder;
  private readonly _stateDecoder: StringToStringDecoder;
  private readonly _messagesSentDecoder: NumberToNumberDecoder;
  private readonly _bytesSentDecoder: BigIntToNumberDecoder;
  private readonly _messagesReceivedDecoder: NumberToNumberDecoder;
  private readonly _bytesReceivedDecoder: BigIntToNumberDecoder;

  private _actualValue: OutputDataChannelStats | undefined;

  constructor(
	public readonly id: string,
    private readonly _attachmentsDecoder: AttachmentDecoder
  ) {
    // Initialize decoders for each field based on their type
    this._timestampDecoder = new NumberToNumberDecoder();
    this._labelDecoder = new StringToStringDecoder();
    this._protocolDecoder = new StringToStringDecoder();
    this._dataChannelIdentifierDecoder = new NumberToNumberDecoder();
    this._stateDecoder = new StringToStringDecoder();
    this._messagesSentDecoder = new NumberToNumberDecoder();
    this._bytesSentDecoder = new BigIntToNumberDecoder();
    this._messagesReceivedDecoder = new NumberToNumberDecoder();
    this._bytesReceivedDecoder = new BigIntToNumberDecoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    // Reset all decoders
    this._timestampDecoder.reset();
    this._labelDecoder.reset();
    this._protocolDecoder.reset();
    this._dataChannelIdentifierDecoder.reset();
    this._stateDecoder.reset();
    this._messagesSentDecoder.reset();
    this._bytesSentDecoder.reset();
    this._messagesReceivedDecoder.reset();
    this._bytesReceivedDecoder.reset();
    this._attachmentsDecoder.reset();
  }

  public decode(input: InputDataChannelStats): OutputDataChannelStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);

    if (!timestamp) {
      logger.warn("Invalid data channel sample: missing timestamp or id");
      return undefined;
    }

    this._actualValue = {
      timestamp,
      id: this.id,
      label: this._labelDecoder.decode(input.label),
      protocol: this._protocolDecoder.decode(input.protocol),
      dataChannelIdentifier: this._dataChannelIdentifierDecoder.decode(input.dataChannelIdentifier),
      state: this._stateDecoder.decode(input.state),
      messagesSent: this._messagesSentDecoder.decode(input.messagesSent),
      bytesSent: this._bytesSentDecoder.decode(input.bytesSent),
      messagesReceived: this._messagesReceivedDecoder.decode(input.messagesReceived),
      bytesReceived: this._bytesReceivedDecoder.decode(input.bytesReceived),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };

    return this._actualValue;
  }

  public get actualValue(): OutputDataChannelStats | undefined {
    return this._actualValue;
  }
    
  public set actualValue(sample: OutputDataChannelStats | undefined) {
    if (!sample) return;
    
    this._visited = true;
    this._actualValue = sample;
  
    this._timestampDecoder.actualValue = sample.timestamp;
    this._labelDecoder.actualValue = sample.label;
    this._protocolDecoder.actualValue = sample.protocol;
    this._dataChannelIdentifierDecoder.actualValue = sample.dataChannelIdentifier;
    this._stateDecoder.actualValue = sample.state;
    this._messagesSentDecoder.actualValue = sample.messagesSent;
    this._bytesSentDecoder.actualValue = sample.bytesSent;
    this._messagesReceivedDecoder.actualValue = sample.messagesReceived;
    this._bytesReceivedDecoder.actualValue = sample.bytesReceived;
    this._attachmentsDecoder.actualValue = sample.attachments;
  }
}