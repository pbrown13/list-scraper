const axios = require("axios");
const cheerio = require("cheerio");

const fb = require("./firebase");

// a page that has a list on it

const scrapeDeez = async (req, res) => {
	var response = null
	const url =
		"https://www.nmhc.org/research-insight/the-nmhc-50/top-50-lists/2021-top-manager-list/";
	let result = await axios
		.get(url)
		.then((res) => {
			// saves the pages raw HTML
			const html = res.data;
			const $ = cheerio.load(html);

			const fields = [
				"rank",
				"previousRank",
				"company",
				"units",
				"prevUnits",
				"person",
				"city",
				"state",
			];

			const sectionId = "tr";

			const textId = "td";
			// gets the section that contains the data to scrape
			const section = $(sectionId)
			const list = [];
			// loop through each section
			section.each(function(i, el) {
				// get and store the row that the data is on
				const row = $(el).children(textId);

				const actual = row.children("h3") ? row.children("h3") : row;
				
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

				for (let i = 0; i < fields.length; i++) {
					if (fields[i]) person[fields[i]] = f(row[i]);
				}

				if (i > 0 && person.company !== "") {
					list.push(person);
				}
			});
			fb.createDataType("NMHC_Top_50", list, list.length, "NMHC_Top_50");
			response = list
			//console.log(list[1])
		})
		.catch((e) => {
			console.log(e);
			// res.send(e);
		});
		res.send(response);
		return result;
};

module.exports = {
	scrapeDeez,
};
