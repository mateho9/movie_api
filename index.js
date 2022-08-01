const express = require ('express'),
    morgan = require('morgan');

const app = express();

let topMovies = [
{
    title: 'Star Wars: The Empire Strikes Back',
    director: 'George Lucas'
},

{
    title: 'Encanto',
    director: 'Byron Howard'
},

{
    title: 'Old School',
    director: 'Todd Phillips',
}
];

app.use(morgan('common'));

app.use('/documentation,html', express.static('public'));

app.get('/', (req, res) => {
    res.send('Are you looking for movies?');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('It broke');
});

app.listen(8080, () => {
    console.log('Im here on 8080');
});

