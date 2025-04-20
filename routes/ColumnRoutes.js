import express from 'express';
import { ColumnService } from '../services/ColumnService.js';

const router = express.Router();
const columnService = new ColumnService();

// получение колонок по boardId
router.get('/', async (req, res) => {
  const { boardId } = req.query;

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
  const { boardId, title } = req.body;

  if (!boardId || !title) {
    return res.status(400).json({ message: 'boardId and title are required' });
  }

  try {
    const response = await columnService.createColumn(boardId, title);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// перетаскивание колонки
router.put('/reorder', async (req, res) => {
  try {
    const { boardId, orderedColumnIds } = req.body;

    const response = await columnService.reorderColumns(
      boardId,
      orderedColumnIds
    );

    res
      .status(response.status)
      .json(response.data || { message: response.message });
  } catch (err) {
    console.error('Unexpected error during reorder:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// изменение
router.put('/:id', async (req, res) => {
  const columnId = req.params.id;
  const { newTitle } = req.body;

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
