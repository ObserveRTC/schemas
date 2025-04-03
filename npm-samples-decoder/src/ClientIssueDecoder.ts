import { Decoder } from "./utils";
import { ClientIssue as OutputClientIssue } from "./OutputSamples";
import {
  StringToStringDecoder,
  NumberToNumberDecoder,
} from "./utils";
import { ClientSample_ClientIssue as InputClientIssue } from "./InputSamples";

const logger = console;

export interface ClientIssueDecoder extends Decoder<InputClientIssue, OutputClientIssue | undefined> {
  // empty
}

export class DefaultClientIssueDecoder implements ClientIssueDecoder {
  private _visited = false;
  private readonly _typeDecoder: StringToStringDecoder;
  private readonly _payloadDecoder: StringToStringDecoder;
  private readonly _timestampDecoder: NumberToNumberDecoder;

  private _actualValue?: OutputClientIssue;

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

  public decode(input: InputClientIssue): OutputClientIssue | undefined {
    this._visited = true;

    const type = this._typeDecoder.decode(input.type);
    
    if (!type) {
      logger.warn("Invalid client issue sample: missing type");
      return undefined;
    }

    this._actualValue = {
      type,
      payload: this._payloadDecoder.decode(input.payload),
      timestamp: this._timestampDecoder.decode(input.timestamp),
    };

    return this._actualValue;
  }

  public get actualValue(): OutputClientIssue | undefined {
    return this._actualValue;
  }
  
  public set actualValue(value: OutputClientIssue | undefined) {
    if (!value) return;
    
    this._visited = true;
    this._actualValue = value;

    this._typeDecoder.reset();
    this._timestampDecoder.reset();
    this._payloadDecoder.reset();
  }
}