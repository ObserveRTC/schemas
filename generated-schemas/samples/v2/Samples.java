package org.observertc.webrtc.observer.samples;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
/** 
* A compound object hold samples and control flags
*/
@JsonIgnoreProperties(ignoreUnknown = true)
public  class Samples { 

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
	
}