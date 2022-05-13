const { json } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const json2csv = require("json2csv").parse;
// const axios = require("axios");
// let converter = require("json2csv");
const app = express();
const port = 3002;
// function fetchData() {
// 	let resJson;
// axios.get(baseUrl: "http://localhost:3001/generate/json/2")
// fetch("http://localhost:3001/generate/json/2")
// 	.then((res) => res.text())
// 	.then((text) => (resJson = text));
// 	return resJson;
// }

function setElement(propertie, element, newElement) {
	if (propertie === "type") newElement.type = element.type;
	else if (propertie === "name") newElement.name = element.name;
	else if (propertie === "id") newElement.id = element.id;
	else if (propertie === "latitude") newElement.latitude = element.latitude;
	else if (propertie === "longitude") newElement.longitude = element.longitude;
}
app.get("/getCSV", async (req, res) => {
	let json = [];
	let stringArray = [];
	const resp = await fetch("http://localhost:3001/generate/json/2");
	json = await resp.json();
	// json = JSON.parse(json);
	// console.log(resp);
	stringArray = json2csv(json);

	res.send(stringArray);
});

app.get("/getOwnCSV/:structure", async (req, res) => {
	let string = req.params.structure;
	let queryArray = string.split(",");
	const resp = await fetch("http://localhost:3001/generate/json/2");
	let json = await resp.json();
	newJson = [];
	for (let index = 0; index < json.length; index++) {
		newJson.push({});
		queryArray.forEach((el) => {
			setElement(el, json[index], newJson[index]);
		});
	}
	let stringArray = json2csv(newJson);
	res.send(stringArray);
});
app.listen(port, () => console.log(`Service 2 listening on port ${port}!`));
