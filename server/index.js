import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connection} from './connection.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

connection();
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})