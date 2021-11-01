# logs-from-dir

#### A javascript module to help read the last n logs from a directory

##### Usage

```javascript
const { readDir, splitAndStore } = require("./ReadLog");

app.get("/readLogs", (req, res) => {
	let desiredFile;
	readDir("logs")
	.then((files) => {
		files.forEach((file) => {
				//Do whatever you want to do with the file

				//here i am finding the file with date and then reading logs
		let firstSplit = file.split("@")[1];
		let secondSplit = firstSplit?.split(".")[0];
		console.log("second split", secondSplit);
		if (secondSplit == req.body.date) {
			desiredFile = file;
		}
	   });
		console.log("desired file", desiredFile);
		splitAndStore(`./logs/${desiredFile}`, req.body.lastLog)
			.then((lines) => {
				console.log("line", lines);
				res.status(200).json({ logs: lines });
			})
			.catch((err) => console.log("err in split", err));
		})
		.catch((err) => console.log("err", err));
});
```

##### Async await

```javascript
app.get("/readLogs",  async (req, res) => {
    let desiredFile;
    const files = await readDir('./logs');
    await files.map(file => {
         const firstSplit = file?.split('@')[1];
         const secondSplit = firstSplit?.split('.')[0];
         if(secondSplit === req.body.date) {
             desiredFile = file
         }
    })
    const printLogs = await splitAndStore(`./logs/${desiredFile}` , req.body.lastLog);
    console.log('logs' , printLogs)
});

```
