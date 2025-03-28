import { Encoder } from "./utils";
import { ClientEvent as InputClientEvent } from "./InputSamples";
import {
  StringToStringEncoder,
  NumberToNumberEncoder,
} from "./utils";
import { ClientSample_ClientEvent as OutputClientEvent } from "./OutputSamples";

export interface ClientEventEncoder extends Encoder<InputClientEvent, OutputClientEvent> {
	// empty
}

export class DefaultClientEventEncoder implements ClientEventEncoder {
  private _visited = false;
  private readonly _typeEncoder: StringToStringEncoder;
  private readonly _payloadEncoder: StringToStringEncoder;
  private readonly _timestampEncoder: NumberToNumberEncoder;

  constructor() {
    this._typeEncoder = new StringToStringEncoder();
    this._payloadEncoder = new StringToStringEncoder();
    this._timestampEncoder = new NumberToNumberEncoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._typeEncoder.reset();
    this._payloadEncoder.reset();
    this._timestampEncoder.reset();
  }

  public encode(input: InputClientEvent): OutputClientEvent {
    this._visited = true;

    return new OutputClientEvent({
      type: this._typeEncoder.encode(input.type),
      payload: this._payloadEncoder.encode(input.payload),
      timestamp: this._timestampEncoder.encode(input.timestamp),
    });
  }
}
