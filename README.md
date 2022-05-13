# Node-Services

This app is recruitment task to 'Sofixit'

## Installation

To run this app you should start both services

```bash
cd service1
node index.js
```

```bash
cd service2
node index.js
```

## Usage

Service1 has 1 endpoint /generate/json/:size - it generates json array with given size <br />
Service2 has 2 endpoints /getCSV- it get json from 1 service, convert and return in CSV format, /getOwnCSV/:structure - it get json from 1 service, convert and return in CSV format only given properties
