
export const schemaVersion = "2.2.0";

/**
* A Report created for Extended provided arbitrary data.
*/
export type SfuExtensionReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event
	*/
	extensionType: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the SFU
	*/
	sfuId?: string;

	/**
	* the human readable message of the event
	*/
	payload?: string;

}
