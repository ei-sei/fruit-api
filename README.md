//import express into our app
const express = require('express');

//create a server that lets us see request and respond to them
const app = express();
const port = 3000;

//create our routing
app.get('/', (req, res) => {
    res.send('hello world!');

})

app.get('/chickens', (req, res) =>{
    try{
        res.status(200).send('Hellow, Chicekn')
    }catch(e){
        res.send(404);
    }
})


app.get('/chickens/:id', (req, res) =>{

    const {id} = req.params;

    res.send(req.params.id);
})


//start the server listening
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
