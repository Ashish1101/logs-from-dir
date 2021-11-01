const fs = require('fs')
const path = require("path");
const splitAndStore = (fileName , endLine) => {
     let splitNewLine = fs.readFileSync(fileName).toString().split("\n");
     let totalLines = splitNewLine.length;
     let data = []
     return new Promise((resolve , reject) => {
         if(totalLines <= 0) reject("No data found")
         if(endLine > totalLines) reject(`total logs found ${totalLines} and desired ${endLine}`)
         for(let i = totalLines - endLine; i < totalLines - 1; i++) {
             data.push(splitNewLine[i]);
         }
         resolve(data)
     })
}

const readDir = (dirName) => {
    // const directoryPath = path.join(__dirname, dirName);
    return new Promise((resolve , reject) => {
        fs.readdir(dirName , (err , files) => {
            if(err) {
                reject(`Unable to read directory ${err}`)
            } else {
                resolve(files)
            }
        })
    })
}




module.exports = {
   readDir,
   splitAndStore
}

