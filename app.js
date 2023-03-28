const express = require('express');
const cors = require('cors');
const app = express();
const os = require('os');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4000;
app.use(cors());

//import json file
const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let player = JSON.parse(rawdata);

app.get('/player', (req, res) => {
    res.send(player)
})

app.post('/player', (req, res) => {
    const { playerId, name, position, nation, age, highesValue, lastUpdate, marketValue } = req.body
    player.push({ playerId, name, position, nation, age, highesValue, lastUpdate, marketValue })
    const jsonContent = JSON.stringify(player)
    fs.writeFile("data.json", jsonContent, 'utf8', function (err) {
        if (err) {
            res.send("An error occured while writing JSON Object to File.")
        }
        else {
            res.send("JSON file has been saved.")
        }

    });
})

app.delete('/player/:playerId', (req, res) => {

    const playerId = req.params.playerId
    const objWithIdIndex = player.findIndex(x => x.playerId === parseInt(playerId))
    if (objWithIdIndex > -1) {
        player.splice(objWithIdIndex, 1);
        const jsonContent = JSON.stringify(player)
        fs.writeFile("data.json", jsonContent, 'utf8', function (err) {
            if (err) {
                res.send("An error occured while writing JSON Object to File.")
            }
            else {
                res.send("success")
            }

        });
    }
    else {
        res.send('this player id not found')
    }

})
app.get('/player/:playerId', (req, res) => {
    const playerId = req.params.playerId
    console.log(playerId)
    const objWithIdIndex = player.findIndex(x => x.playerId === parseInt(playerId))
    console.log(objWithIdIndex)
    if (objWithIdIndex > -1) {
        res.send(player[objWithIdIndex])
    }
    else {
        res.send('this player id not found')
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});