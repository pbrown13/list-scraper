const axios = require("axios");
const cheerio = require("cheerio");

const fb = require("./firebase");

// a page that has a list on it
const url =
	"https://public.tdhca.state.tx.us/pub/t_hf_clearinghouse.list_buyers";

axios
	.get(url)
	.then((res) => {
		// saves the pages raw HTML
		const html = res.data;
		const $ = cheerio.load(html);
		// gets the section that contains the data to scrape
		const section = $("tr");
		const list = [];
		// loop through each section
		section.each(function(i, el) {
			// get and store the row that the data is on
			const row = $(el).children("td");
			// define fields
			const f = (string) => {
				return $(string)
					.text()
					.trim();
			};
			const [name, industry, location, phone, date] = [
				f(row[0]),
				f(row[1]),
				f(row[2]),
				f(row[3]),
				f(row[4]),
			];
			// create object and cleanup the data
			const person = {
                id: i,
				name,
				industry,
				phone,
				location,
				date,
			};
			list.push(person);
			fb.createDataType("person", person);
		});
		console.log(list);
	})
	.catch((e) => console.log(e));
