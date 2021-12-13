const express = require("express");
const cors = require("cors");
const app = express();
const scrape = require("./api/app");
const cb = require("./services/clearbit")
//var host = "0.0.0.0";
 
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
	return { response: "lit" };
});

// RUN SERVER -- DEF GONNA BE WRITING THIS EVERYTIME TOO
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
})

// USE ACTIONS IMPORTED FROM APP.JS AS ENDOINTS
app.post("/scrape", scrape.scrapeDeez);
app.get("/rip", cb.enrichUrl)
//app.get("/email", cb.emailLookup)
