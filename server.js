import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';
import dotenv from 'dotenv';

if (process.env.HEROKU_ENV) {
  console.log('Using Heroku Environment');
} else {
  console.log('Using Node Environment');
  dotenv.config();
}

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.hpqxgdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
  /*
  useNewUrlParser: true,
  useCreatedIndex: true,
  useUnifiedTypology: true,
  */
});

// API Endpoints
app.get('/', (req, res) => {
  res.status(200).send('Hello TheWebDev');
});

app.post('/dating/cards', async (req, res) => {
  try {
    const dbCard = req.body;
    const data = await Cards.create(dbCard);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.get('/dating/cards', async (req, res) => {
  try {
    let data = await Cards.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
