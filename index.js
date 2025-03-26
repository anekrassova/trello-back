import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import boardRoutes from './routes/BoardRoutes.js';
import columnRoutes from './routes/ColumnRoutes.js';
import cardRoutes from './routes/CardRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('api/columns', columnRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 3000;

const db = process.env.MONGO_URI.replace(
  '${DB_PASSWORD}',
  process.env.DB_PASSWORD
);

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
