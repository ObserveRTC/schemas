/**
* Additional meta information about the carried payloads
*/
export type SamplesMeta = 
{
	/**
	* Indicate the version of the schema for compatibility measures.
	*/
	schemaVersion?: string;

}

/**
* Additional control flags indicate various operation has to be performed
*/
export type ControlFlags = 
{
	/**
	* Indicate that the server should close the connection
	*/
	close?: boolean;

}

/**
* docs
*/
export type ClientSample = 
{
	/**
	* Unique generated id for the sfu samples are originated from
	*/
	sfuId: string;

	/**
	* The timestamp the sample is created in GMT
	*/
	timestamp: number;

	/**
	* The offset from GMT in hours
	*/
	timeZoneOffsetInHours?: number;

	/**
	* Special marker for the samples
	*/
	marker?: string;

}

/**
* docs
*/
export type SfuSample = 
{
	/**
	* Unique generated id for the sfu samples are originated from
	*/
	sfuId: string;

	/**
	* The timestamp the sample is created in GMT
	*/
	timestamp: number;

	/**
	* The offset from GMT in hours
	*/
	timeZoneOffsetInHours?: number;

	/**
	* Special marker for the samples
	*/
	marker?: string;

}

/**
* Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.
*/
export type Samples = 
{
	/**
	* Additional meta information about the carried payloads
	*/
	meta?: SamplesMeta;

	/**
	* Additional control flags indicate various operation has to be performed
	*/
	controlFlags?: ControlFlags;

	/**
	* Samples taken from the client
	*/
	clientSamples?: ClientSample[];

	/**
	* Samples taken from an Sfu
	*/
	sfuSamples?: SfuSample[];

}
