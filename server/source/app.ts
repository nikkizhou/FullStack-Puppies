import express from "express";
import { Application } from 'express';
import { getPuppies, getPuppy, addOnePuppy, updateOnePuppy, deleteOnePuppy, addManyPuppies } from "./controllers/puppies";
import cors from 'cors'
import { connectToDatabase } from "./services/mongoDb"


const app: Application = express();

connectToDatabase()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get('/api/puppies', getPuppies);
    app.get('/api/puppies/:id', getPuppy);
    app.post('/api/puppies', addOnePuppy);
    app.put('/api/puppies/:id', updateOnePuppy);
    app.delete('/api/puppies/:id', deleteOnePuppy);
    app.post('/api/puppies/many', addManyPuppies);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });



export default app;
