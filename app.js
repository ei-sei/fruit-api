const cors = require("cors");
const express = require("express");

const app = express();
const fruits = require("./fruits.json");
const logger = require("./logger")

app.use(logger);
app.use(cors());
app.use(express.json());

//home route
app.get('/', (req, res) => {
    res.send('hello, fruity API');

});

//return all the fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits)
});

//return a single fruit route
//what if the fruit is not found?
//what if the user submits a fruit with no capital letters
app.get("/fruits/:name", (req, res, next) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name);

    if (fruit == undefined) {
        // res.status(404).send(); 
        next();
    } else {
        res.send(fruit);
    }
})

const ids = fruits.map((fruit) => fruit.id);
let maxID = Math.max(...ids);

app.post("/fruits", (req, res) => {
    //check that the fruit doesn't exist in the data
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === req.body.name.toLowerCase);

    if(fruit != undefined){
        res.status(409).send(); //if item exists; sends conflict response code
    }
    else{
        maxID += 1;
        req.body.id = maxID;
        
        fruits.push(req.body);  //adds the fruit to the list #note: this does not modify to json

        res.status(201).send(req.body);
    }
})




module.exports = app
