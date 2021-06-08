import type { MediaSource } from "./MediaSource";

interface Engine {

}

interface Platform {

}

interface ClientSample {

  /**
   * The unique generated 
   */
  clientId: string;

  /**
   * The sequence number a source assigns to the sample. 
   * Every time the source make a sample at a client 
   * this number is monothonically incremented.
   * 
   * Always presented
   */
  sampleSeq?: number;

  /**
   * The WebRTC app configured room id the client was at the call.
   * If it is configured, then every sample carries this information.
   * 
   * If it is configured, it is presented in every sample.
   */
  roomId?: string;

  /**
   * The WebRTC app configured user id of the client.
   * If it is configured, then every sample carries this information.
   * 
   * If it is configured, it is presented in every sample.
   */
  userId?: string;

  /**
   * The engine 
   */
  engine?: Engine;

  /**
   * The platform
   */
  platform?: Platform;

  /**
   * A list of media sources a client uses
   * @items.type MediaSource
   */
  mediaSources?: MediaSource[];
}