const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://hydeparkwinterwonderland.com/faqs/").then(
	(response) => {
		if (response.status === 200) {
			const html = response.data;
			const $ = cheerio.load(html);

			const individualBlock = $("div.row");
			individualBlock.each(function(idx, el) {
				const question = $(el)
					.children("div")
					.children("button");

				console.log("Question => ", $(question).text());
				console.log("\n");

				const answerBlocks = $(el)
					.children("div.col-sm-12")
					.children("div.collapse")
					.children("div.pb-3")
					.children("p");

				answerBlocks.each((idx, elem) => {
					console.log("Answer: \n", $(elem).text());
				});
				console.log("\n");
				console.log("-----");
				console.log("\n");
			});
		}
	},
	(error) => console.log(err)
);
