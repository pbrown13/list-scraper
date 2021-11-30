const axios = require("axios");
const cheerio = require("cheerio");

const fb = require("./firebase");

// a page that has a list on it

const fields = ["name", "company", "title", "location"];
	const url =
		"https://www.nmhc.org/meetings/calendar/shc/2021-nmhc-student-housing-conference/attendees/";
	const sectionId = "tr";
	
	const textId = "td";

	return axios
		.get(url)
		.then((res) => {
			// saves the pages raw HTML
			const html = res.data;
			const $ = cheerio.load(html);
			
			// gets the section that contains the data to scrape
			const section = $(sectionId);
			const list = [];
			console.log(html);
			// loop through each section
			section.each(function(i, el) {
				// get and store the row that the data is on
				const row = $(el).children(textId);
				console.log(row)
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

				list.push(person);
			});
			fb.createDataType("dev", list, list.length);
			console.log(list)
		})
		.catch((e) => console.log(e));
