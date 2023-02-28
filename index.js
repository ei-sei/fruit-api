require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fruits = require('./fruits.json');
const port = process.env.port;

app.use(cors());
app.use(express.json());

//home route
app.get('/', (req, res) => {
    res.send('hello, fruity API');

})

//return all the fruits route
app.get('/fruits', (req, res) => {
    res.status(200).send(fruits)
})

//return a single fruit route
//what if the fruit is not found?
//what if the user submits a fruit with no capital letters

app.get(`/fruits/:fruitName`, (req, res) => {
    const fruitName = req.params.fruitName.toLowerCase();

    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == fruitName);
    
    if (fruit == undefined) {
        res.status(404).send();
    } else {
        res.send(fruit);
    }
})


app.post("/fruits", (req, res) => {

    //check that the fruit doesn't exist in the data
    const fruit = fruits.find((fruit) => fruit.name === req.body.name);

    if(fruit != undefined){
        res.status(409).send();
    }
    else{
        fruits.push(req.body);

        res.status(201).send(req.body);
    }
})




app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
