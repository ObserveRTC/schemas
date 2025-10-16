import { Encoder } from "./utils";
import { ClientEvent as InputClientEvent } from "./InputSamples";
import {
  StringToStringEncoder,
  NumberToNumberEncoder,
} from "./utils";
import { ClientSample_ClientEventSchema } from "./OutputSamples";
import { MessageInitShape } from "@bufbuild/protobuf";

export interface ClientEventEncoder extends Encoder<InputClientEvent, MessageInitShape<typeof ClientSample_ClientEventSchema>> {
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

  public encode(input: InputClientEvent): MessageInitShape<typeof ClientSample_ClientEventSchema> {
    this._visited = true;

    return {
      type: this._typeEncoder.encode(input.type),
      payload: this._payloadEncoder.encode(input.payload),
      timestamp: this._timestampEncoder.encode(input.timestamp),
    };
  }
}
