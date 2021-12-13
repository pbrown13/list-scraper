const axios = require("axios");

function runData() {
	return axios
		.get(
			"https://iot-water-market-data-default-rtdb.firebaseio.com/conf.json",
			{},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => {
			const list = [];
			const data = res.data;
			for (let key in data) {
				const item = {
					fn: data[key].firstName,
					ln: data[key].lastName,
					name: data[key].firstName + " " + data[key].lastname,
					email: data[key].email,
					company: data[key].company,
					title: data[key].title,
					source: "REIT LIST",
				};
				sendIt(item);
				list.push(item);
			}
			return list;
		})
		.catch(e => {
			return e
		})
}
const sendIt = (item) => {
	axios
		.post(
			"https://admin.kairoswater.io/version-test/api/1.1/wf/new-contact?key=cb893c3207ff5ce2811619c5aa52592b",
			item,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => console.log(res))
		.catch((e) => console.log(e));
}

runData();
