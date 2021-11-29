const axios = require("axios");

const createDataType = (dataType, obj) => {
	let response = axios
		.post(
			`https://scrape-deez-default-rtdb.firebaseio.com/${dataType}.json?key=AIzaSyD_eLu1lqCUufqw3u8PRhqjkEyhajHoBDY`,
			obj,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => console.log(e));
	return response;
};

module.exports = { createDataType };
