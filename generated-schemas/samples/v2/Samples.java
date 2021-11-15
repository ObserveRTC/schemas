package org.observertc.webrtc.observer.samples;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
/** 
* A compound message object from the observed client to the observer
holds various samples, control flags and attachments.
*/
@JsonIgnoreProperties(ignoreUnknown = true)
public  class Samples { 

	/**
	* Additional meta information about the carried payloads
	*/
	@JsonProperty("meta")
	public SamplesMeta meta;
	
	/**
	* array of client samples
	*/
	@JsonProperty("clientSamples")
	public ClientSample[] clientSamples;
	
	/**
	* array of sfu samples
	*/
	@JsonProperty("sfuSamples")
	public SfuSample[] sfuSamples;
	
	/**
	* Additional control flags indicate various operation has to be performed
	*/
	@JsonProperty("controlFlags")
	public ControlFlags controlFlags;
	
}