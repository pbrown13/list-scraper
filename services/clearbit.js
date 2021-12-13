const axios = require("axios");

const header = {
	headers: {
		Authorization: "Bearer sk_df9fa5a100d80e8b71206fe4e28076a2",
		"Content-Type": "application/json",
	},
};

let enrichUrl = async (request, response) => {
    const url = await request.params.url
	let result = await axios
		.get(`https://company.clearbit.com/v2/companies/find?domain=${url}`, header)
		.then((res) => {
			console.log(res);
			const data = res.data.site.emailAddresses;
			console.log(data);
			const people = [];
			for (let i in data) {
				const item = emailLookup(data[i]);
				people.push(item);
			}
			console.log("p", people);
            res.send(people)
			return people;
		})
		.catch((e) => console.log(e));
        response.send(result)
        return result;
};

let emailLookup = (email) => {
    //const email = 
	let response = axios.get(
		`https://person-stream.clearbit.com/v2/combined/find?email=${email}`,
		header
	);
	console.log("r", response);
	return response;
};

module.exports = {
	enrichUrl,
	emailLookup,
};
