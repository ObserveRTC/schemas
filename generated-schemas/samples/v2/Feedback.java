package org.observertc.webrtc.observer.samples;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
/** 
* A compound message object from the observer to the observed client
holds control flags and attachments.
*/
@JsonIgnoreProperties(ignoreUnknown = true)
public  class Feedback { 

	/**
	* Indicate the client to flush all messages currently it holds and then close the connection
	*/
	@JsonProperty("flushAndClose")
	public boolean flushAndClose;
	
}