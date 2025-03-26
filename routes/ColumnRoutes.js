import express from 'express';
import { ColumnService } from '../services/ColumnService.js';

const router = express.Router();
const columnService = new ColumnService();

// получение колонок по boardId
router.get('/', async (req, res) => {
  const boardId = req.boardId;

  try {
    const response = await columnService.getColumns(boardId);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// создание колонки
router.post('/', async (req, res) => {
  const boardId = req.boardId;
  const columnTitle = req.title;

  try {
    const response = await columnService.createColumn(boardId, columnTitle);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// изменение
router.put('/:id', async (req, res) => {
  const columnId = req.params.id;
  const newTitle = req.title;

  try {
    const response = await columnService.editColumnTitle(columnId, newTitle);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// удаление
router.delete('/:id', async (req, res) => {
  const columnId = req.params.id;

  try {
    const response = await columnService.deleteColumn(columnId);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

export default router;
