import express from 'express';
import { BoardService } from '../services/BoardService.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();
const boardService = new BoardService();

// получение досок по userId
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const response = await boardService.getAllBoardsByUser(userId);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// создание доски
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;
  const userId = req.userId;

  try {
    const response = await boardService.createBoard(title, userId);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// удаление доски
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await boardService.deleteBoard(id);
    res.status(response.status).json({ message: response.message });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { newTitle } = req.body;

  try {
    const response = await boardService.editBoard(id, newTitle);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

export default router;
