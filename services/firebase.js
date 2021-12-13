const axios = require("axios");

// const createDataType = (dataType, obj, i, listName) => {
// 	insertData(dataType, obj, i, listName);
// };
const createDataType = (dataType, list) => {
	let response = axios
		.put(
			`https://scrape-deez-default-rtdb.firebaseio.com/lists/${dataType}.json?key=AIzaSyD_eLu1lqCUufqw3u8PRhqjkEyhajHoBDY`,
			list,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => {
			//console.log(res.data)
		})
		.catch((e) => {
			console.log(dataType, e);
		});
	return response;
};



module.exports = { createDataType };
