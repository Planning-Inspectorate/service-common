export interface OSApiAddress {
	DPA: {
		UPRN: string,
		UDPRN: string,
		DEPARTMENT_NAME: string,
		SUB_BUILDING_NAME: string,
		BUILDING_NAME: string,
		ADDRESS: string,
		POSTCODE:string,
		ORGANISATION_NAME: string,
		POST_TOWN: string,
		THOROUGHFARE_NAME: string,
		BUILDING_NUMBER: string
	}
}

interface findAddressListByPostcode {
	(postcode: string) : {addressList: OSApiAddress[]} | {errors: {postcode: {msg: string}}}
}

declare const addressLookup: {findAddressListByPostcode};

export default addressLookup;
