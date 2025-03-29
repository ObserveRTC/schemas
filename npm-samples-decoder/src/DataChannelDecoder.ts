import { Decoder, BigIntToNumberDecoder } from "./utils";
import { ClientSample_PeerConnectionSample_DataChannelStats as InputDataChannelStats } from "./InputSamples";
import { DataChannelStats as OutputDataChannelStats } from "./OutputSamples"; 
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";

const logger = console;

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

  constructor(
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
    const id = input.id;

    if (!timestamp || id === undefined) {
      logger.warn("Invalid data channel sample: missing timestamp or id");
      return undefined;
    }

    return {
      timestamp,
      id,
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
  }
}