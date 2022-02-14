/**
* A multiplexed Report object wraps an encoded report in bytes format
*/
export type Report = 
{
	/**
	* The type of the report
	*/
	type: string;

	/**
	* The payload of contans the actual report
	*/
	payload: string;

}
