const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');

let users = [
  {
    "id":1,
    "name":"Matt",
    "favoriteMovies": ["Star Wars"]
  },
  {
    "id":2,
    "name":"Dena",
    "favoriteMovies": ["The Goonies"]
  }
];
let movies = [
  {
      "Title": "Star Wars: The Empire Strikes Back",
      "Genre": {
          "Name": "Sci-Fi"
      },
      "Director": "George Lucas"
  },
  {
    "Title": "Encanto",
    "Genre": {
        "Name": "Animated" 
    },
    "Director": "Byron Howard"
  }
];

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));

app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser);
    } else {
      res.status(400).send('Users need names');
    }
  
  });

  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      user.name = updatedUser.name;
      user.favoriteMovies = updatedUser.favoriteMovies;
      res.status(200).json(user);
    } else {
      res.status(400).send('No such user');
    }
  
  });

  app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
      res.status(400).send('No such movie');
    }
  
  });

  app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
      res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
      res.status(400).send('No such movie');
    }
  
  });

  app.delete('/users/:id', (req,res) => {
    const { id } = req.params;
  
    let user = users.find( user => user.id == id );
  
    if (user) {
      users = users.filter( user => user.id != id );
      res.status(200).send(`user ${id}'s data has been deleted`);
    } else {
      res.status(400).send('No such user');
    }
  
  });

  app.get('/', (req, res) => {
    res.send('<h1>Welcome to the myFlix</h1>');
  });
  
  app.get('/movies', (req, res) => {
    res.status(200).json(movies);
  });
  
  app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );
  
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('No such movie');
    }
  
  });
  
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  