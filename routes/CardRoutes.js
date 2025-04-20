import express from 'express';
import { CardService } from '../services/CardService.js';

const router = express.Router();
const cardService = new CardService();

// Получение всех карточек по columnId
router.get('/:columnId', async (req, res) => {
  const { columnId } = req.params;

  try {
    const response = await cardService.getCardsByColumnId(columnId);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// Создание карточки
router.post('/', async (req, res) => {
  const { title, column, description, position } = req.body;

  try {
    const response = await cardService.createCard({
      title,
      column,
      description,
      position,
    });
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// Изменение карточки
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log('Получены данные для обновления:', updates);

  try {
    const response = await cardService.updateCard(id, updates);
    res.status(response.status).json({ data: response.data });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// Удаление карточки
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await cardService.deleteCard(id);
    res.status(response.status).json({ message: response.message });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

// перетаскивание карточки
router.put('/:id/move', async (req, res) => {
  const { id } = req.params;
  const { sourceColumnId, destColumnId, destIndex } = req.body;

  try {
    const response = await cardService.moveCard(
      id,
      sourceColumnId,
      destColumnId,
      destIndex
    );

    res
      .status(response.status)
      .json(
        response.data ? { data: response.data } : { message: response.message }
      );
  } catch (err) {
    console.error('Ошибка перемещения карточки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
