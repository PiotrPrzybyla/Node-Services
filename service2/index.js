const { json } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const json2csv = require("json2csv").parse;
const app = express();
const port = 3002;

function setElement(propertie, element, newElement) {
	if (propertie === "type") newElement.type = element.type;
	else if (propertie === "name") newElement.name = element.name;
	else if (propertie === "id") newElement.id = element.id;
	else if (propertie === "latitude") newElement.latitude = element.latitude;
	else if (propertie === "longitude") newElement.longitude = element.longitude;
}
app.get("/getCSV", async (req, res) => {
	let json = [];
	let csv = [];
	const resp = await fetch("http://localhost:3001/generate/json/2");
	json = await resp.json();
	csv = json2csv(json);
	res.send(csv);
});

app.get("/getOwnCSV/:structure", async (req, res) => {
	let properties = req.params.structure;
	let propertyArray = properties.split(",");
	const resp = await fetch("http://localhost:3001/generate/json/2");
	let json = await resp.json();
	newJson = [];
	for (let index = 0; index < json.length; index++) {
		newJson.push({});
		propertyArray.forEach((el) => {
			setElement(el, json[index], newJson[index]);
		});
	}
	let csv = json2csv(newJson);
	res.send(csv);
});
app.listen(port, () => console.log(`Service 2 listening on port ${port}!`));
