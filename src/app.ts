import express from 'express';

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World from TypeScript API' });
});

export default app;