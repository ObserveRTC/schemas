import { Encoder, NumberToBigIntEncoder } from "./utils";
import { DataChannelStats as InputDataChannelStats } from "./InputSamples"; // Assuming this is the input sample type
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AppDataEncoder
} from "./utils"; // Assuming these are utility encoders for the various types
import { ClientSample_PeerConnectionSample_DataChannelStats } from "./OutputSamples"; // Assuming this is the output sample type

export class DataChannelEncoder implements Encoder<InputDataChannelStats, ClientSample_PeerConnectionSample_DataChannelStats> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _labelEncoder: StringToStringEncoder;
  private readonly _protocolEncoder: StringToStringEncoder;
  private readonly _dataChannelIdentifierEncoder: NumberToNumberEncoder;
  private readonly _stateEncoder: StringToStringEncoder;
  private readonly _messagesSentEncoder: NumberToNumberEncoder;
  private readonly _bytesSentEncoder: NumberToBigIntEncoder;
  private readonly _messagesReceivedEncoder: NumberToNumberEncoder;
  private readonly _bytesReceivedEncoder: NumberToBigIntEncoder;

  constructor(
		private readonly _appDataEncoder: AppDataEncoder
	) {
    // Initialize encoders for each field based on their type
    this._timestampEncoder = new NumberToNumberEncoder();
    this._labelEncoder = new StringToStringEncoder();
    this._protocolEncoder = new StringToStringEncoder();
    this._dataChannelIdentifierEncoder = new NumberToNumberEncoder();
    this._stateEncoder = new StringToStringEncoder();
    this._messagesSentEncoder = new NumberToNumberEncoder();
    this._bytesSentEncoder = new NumberToBigIntEncoder();
    this._messagesReceivedEncoder = new NumberToNumberEncoder();
    this._bytesReceivedEncoder = new NumberToBigIntEncoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    // Reset all encoders
    this._timestampEncoder.reset();
    this._labelEncoder.reset();
    this._protocolEncoder.reset();
    this._dataChannelIdentifierEncoder.reset();
    this._stateEncoder.reset();
    this._messagesSentEncoder.reset();
    this._bytesSentEncoder.reset();
    this._messagesReceivedEncoder.reset();
    this._bytesReceivedEncoder.reset();
  }

  public encode(sample: InputDataChannelStats): ClientSample_PeerConnectionSample_DataChannelStats {
    this._visited = true;
    
    return new ClientSample_PeerConnectionSample_DataChannelStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: sample.id,
      label: this._labelEncoder.encode(sample.label),
      protocol: this._protocolEncoder.encode(sample.protocol),
      dataChannelIdentifier: this._dataChannelIdentifierEncoder.encode(sample.dataChannelIdentifier),
      state: this._stateEncoder.encode(sample.state),
      messagesSent: this._messagesSentEncoder.encode(sample.messagesSent),
      bytesSent: this._bytesSentEncoder.encode(sample.bytesSent),
      messagesReceived: this._messagesReceivedEncoder.encode(sample.messagesReceived),
      bytesReceived: this._bytesReceivedEncoder.encode(sample.bytesReceived),
      appData: this._appDataEncoder.encode(sample.appData),
    });
  }
}
