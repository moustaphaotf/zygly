const Joi = require ('joi');
const express = require('express');
const { number } = require('joi');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name:"Comedy"},
    {id:2, name:"Fictional"},
    {id:3, name:"Drama"},
    {id:4, name:"Romance"},
    {id:5, name:"Adventure"},
    {id:6, name:"Horror"},
    {id:7, name:"Fantasy"}
];

app.get('/', (req, res) => {
    res.send(`<h1>Hello World !!!</h1><p>Welcome to our zygly app !</p>`);
});


// list genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID does not exist !");

    res.send(genre);
});

// post a new genre
app.post('/api/genres', (req, res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required()
    });
    
    const result = schema.validate(req.body);

    if(result.error) return res.send(result.error.details[0].message);
    
    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

// modify a genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("The genre with the given ID does not exist !!!");

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);

    if(result.error) return res.send(result.error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre); 
});

// delete a genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.send("The genre with the given ID does not exist !!!");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening in port ${port}...`));
