const axios = require("axios");

const createDataType = (dataType, obj, i) => {
	insertData(dataType, obj, i)
};
const insertData = (dataType, ppl, i) => {
    const final = ppl
	let response = axios
		.post(
			`https://scrape-deez-default-rtdb.firebaseio.com/${dataType}.json?key=AIzaSyD_eLu1lqCUufqw3u8PRhqjkEyhajHoBDY`,
			 final,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => {
			console.log(res.data)
		})
		.catch((e) => {
			console.log(e)
		});
	return response;
};


module.exports = { createDataType };
