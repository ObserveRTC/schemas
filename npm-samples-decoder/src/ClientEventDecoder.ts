import { Decoder } from "./utils";
import { ClientEvent as OutputClientEvent } from "./OutputSamples";
import {
  StringToStringDecoder,
  NumberToNumberDecoder,
} from "./utils";
import { ClientSample_ClientEvent as InputClientEvent } from "./InputSamples";

export interface ClientEventDecoder extends Decoder<InputClientEvent, OutputClientEvent> {
  // empty
}

export class DefaultClientEventDecoder implements ClientEventDecoder {
  private _visited = false;
  private readonly _typeDecoder: StringToStringDecoder;
  private readonly _payloadDecoder: StringToStringDecoder;
  private readonly _timestampDecoder: NumberToNumberDecoder;

  constructor() {
    this._typeDecoder = new StringToStringDecoder();
    this._payloadDecoder = new StringToStringDecoder();
    this._timestampDecoder = new NumberToNumberDecoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._typeDecoder.reset();
    this._payloadDecoder.reset();
    this._timestampDecoder.reset();
  }

  public decode(output: InputClientEvent): OutputClientEvent {
    this._visited = true;

    return {
      type: this._typeDecoder.decode(output.type)!,
      payload: this._payloadDecoder.decode(output.payload),
      timestamp: this._timestampDecoder.decode(output.timestamp),
    };
  }
}