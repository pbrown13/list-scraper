const axios = require("axios");
const cheerio = require("cheerio");

const fb = require("../services/firebase");

// a page that has a list on it

const scrapeDeez = async (req, res) => {
	var response = null;
	const url =
		req.body && req.body.target
			? req.body.target
			: "https://www.nmhc.org/research-insight/the-nmhc-50/top-50-lists/2021-top-manager-list/";
	let result = await axios
		.get(url.toString())
		.then((res) => {
			// saves the pages raw HTML
			const html = res.data;
			const $ = cheerio.load(html);

			const fields =
				req.body && req.body.fields
					? req.body.fields
					: [
							"rank",
							"previousRank",
							"company",
							"units",
							"prevUnits",
							"person",
							"city",
							"state",
					  ];

			const sectionId =
				req.body && req.body.sectionId ? req.body.sectionId : "tr";

			const rowId = req.body && req.body.rowId ? req.body.rowId : "td";
			const rowChildren =
				req.body && req.body.rowChildren ? req.body.rowChildren : "h3";
			// gets the section that contains the data to scrape
			const section = $(sectionId);
			const list = [];
			// loop through each section
			section.each(function(i, el) {
				// get and store the row that the data is on
				const row = $(el).children(rowId);

				const actual = rowChildren
					? row.children(rowChildren)
					: row;

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

				if (i > 0 && person.id && person[fields[fields.length - 1]]) {
					list.push(person);
				}
			});
			const type =
				req.body && req.body.dataType ? req.body.dataType : "TEST";
			fb.createDataType(type, list);
			response = list;
			//console.log(list[1])
		})
		.catch((e) => {
			console.log(e);
			// res.send(e);
		});
	res.send({ count: response ? response.length : 0, data: response });
	return result;
};

module.exports = {
	scrapeDeez,
};
