# address-lookup

A service to retrieve UK postcodes by the postcode.

The service consumes the OS Apis (https://apidocs.os.uk/), specifically the DPA dataset (https://apidocs.os.uk/docs/os-places-dpa-output).

## Installation

    npm i @planning-inspectorate/address-lookup

And add the API key in  .env of your project:

    OS_API_KEY = {insert key}

You can then use the service importing

    import {findAddressListByPostcode} from "@planning-inspectorate/address-lookup";
    
    const {errors, addressList} = await findAddressListByPostcode('EC2M7PD');


## Params
The function ``findAddressListByPostcode`` needs a ``string`` parameter: the postcode.

The postcode does not get validated inside the function: in case it's not valid the API will just return an empty list of addresses.

A previous validation of it could be useful to prevent useless requests.


## Return value:

### Success
If the API key is defined and the postcode is valid, the function will return an object containing a property named ``addressList``

    const {addressList} = await findAddressListByPostcode('EC2M7PD');

``addressList`` is an array of objects with this structure:

    {
	    apiReference: string, //unique reference
	    addressLine1: string, // street number and street name
	    addressLine2: string, //extra info like flat number or organisation name, most likely empty
	    displayAddress: string, // string to be displayed in the dropdown: extra info, number and street, town, postcode
	    postcode: string,
	    town: string
	}

- ⚠️ ``findAddressListByPostcode`` is an async function. Will return a Promise if used without the await
- ⚠️ ``addressList`` can be empty if the API can't find any match with the given postcode. Always check for `errors`

### Fail
If the function does not return an addressList then an error has occurred. In that case it will return:

    const {errors} = await findAddressListByPostcode('EC2M7PD');

``errors`` is an object and it's meant to be integrated with the GOVUK design system mechanism to show error messages (hence its structure with the `msg` property).  
This is its structure:

    {
        apiKey?: {msg: string}}
        postcode?: {msg: string}}
    }

 #### apiKey
The `apiKey` property will be defined when the function cannot find an API key.

The content of the message will be:

``An error occurred, please try again later``

Cannot be more specific because this is meant to be shown to users. However an error log will explaing what's happening.

When this error is returned, ``addressList`` is undefined.
#### postcode

The `postcode` property will be defined when the API cannot find any address or for any not-200 response of the OS API.


The content of the message will be:

``Enter a valid postcode``

 When the postcode error message is returned, ``addressList`` is also returned as an empty array


## Dev

To execute Jest tests for the function and its utilities, run 

`` npm run test``

To verify the actual response of the function run

`` npm run dev INSERT_API_KEY_HERE``

It will return some address for a specific postcode hardcoded in `src/dev.js`.
It can be changed without affecting anything else.