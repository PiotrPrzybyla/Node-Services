const express = require("express");
const app = express();
const port = 3001;
function createJson(size) {
	const jsonArray = [];
	const typeToDraw = ["Position1", "Position2", "Position3"];
	const nameToDraw = ["Name1", "Name2", "Name3"];
	const idRange = 10000;
	const latitudeRange = 180;
	const longitudeRange = 180;

	while (jsonArray.length < size) {
		let jsonObject = {};
		jsonObject.type = typeToDraw[Math.floor(Math.random() * typeToDraw.length)];
		jsonObject.name = nameToDraw[Math.floor(Math.random() * nameToDraw.length)];
		jsonObject.id = Math.floor(Math.random() * idRange);
		jsonObject.latitude = Math.random() * latitudeRange;
		jsonObject.longitude = Math.random() * longitudeRange;

		jsonArray.push(jsonObject);
		// console.log(jsonObject);
	}
	return jsonArray;
}
app.get("/generate/json/:size", (req, res) => {
	let size = req.params.size;
	res.send(JSON.stringify(createJson(size)));
});
app.listen(port, () => console.log(`Service 1 listening on port ${port}!`));
