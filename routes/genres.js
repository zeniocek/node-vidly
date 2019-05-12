const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'comedy' },
    { id: 2, name: 'action' },
    { id: 3, name: 'drama' },
    { id: 4, name: 'horror' },
];

function validateGenre(input) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(input, schema);
}

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre couldn\'t be found');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre couldn\'t be found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    genres.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('genre couldn\'t be found');

    const i = genres.indexOf(genre);
    res.send(genres.splice(i, 1));
});

module.exports = router;