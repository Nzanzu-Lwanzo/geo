import express from 'express';

const app = express();
app.use(express.json());

app.listen(8888, () => console.log('Server is up and running'));
