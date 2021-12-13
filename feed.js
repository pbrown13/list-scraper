const axios = require("axios");
const cheerio = require("cheerio");

const fb = require("./services/firebase");

// a page that has a list on it

const runScrape = async () => {
	var response = null;
	const url = "https://strataequity.com/portfolio/";
	let result = await axios
		.get(url.toString())
		.then((res) => {
			// saves the pages raw HTML
			const html = res.data;
			const $ = cheerio.load(html);

			const fields = [
							"assetType",
							"State",
							"City",
							"Property",
							"Units",
							"Arcres",
							"sqFt",
					  ];

			const sectionId = "tr";

			const rowId = "td";
			const rowChildren = "h3";
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

				// create object and cleanup the data
				let person = {
					id: i,
				};

				if (fields) {
					for (let i = 0; i < fields.length; i++) {
						if (fields[i]) person[fields[i]] = f(row[i]);
					}
				}

				if (i > 0 && person.id) {
					list.push(person);
				}
			});
			const type = "REIT";
			fb.createDataType(type, list);
			response = list;
			console.log(list);
			return response
		})
		.catch((e) => {
			console.log(e);
			// res.send(e);
		});
	return result;
};
runScrape();
