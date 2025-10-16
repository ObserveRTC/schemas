import { Encoder } from "./utils";
import { ClientIssue as InputClientIssue } from "./InputSamples";
import {
  StringToStringEncoder,
  NumberToNumberEncoder,
} from "./utils";
import { ClientSample_ClientIssueSchema } from "./OutputSamples";
import { MessageInitShape } from "@bufbuild/protobuf";

export interface ClientIssueEncoder extends Encoder<InputClientIssue, MessageInitShape<typeof ClientSample_ClientIssueSchema>> {
    // empty
}

export class DefaultClientIssueEncoder implements ClientIssueEncoder {
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

  public encode(input: InputClientIssue): MessageInitShape<typeof ClientSample_ClientIssueSchema> {
    this._visited = true;

    return {
      type: this._typeEncoder.encode(input.type),
      payload: this._payloadEncoder.encode(input.payload),
      timestamp: this._timestampEncoder.encode(input.timestamp),
    };
  }
}