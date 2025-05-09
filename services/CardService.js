import { Card } from '../models/Card.js';
import { convertID } from './convertID.js';

export class CardService {
  // получение карточек по колонке
  async getCardsByColumnId(columnId) {
    const cards = await Card.find({ column: columnId });

    const modifiedCards = cards.map((card) => {
      convertID(card);
    });

    return {
      status: 200,
      data: modifiedCards,
    };
  }

  // создание карточки
  async createCard({ title, column, description = '', position = 0 }) {
    const newCard = new Card({ title, column, description, position });
    await newCard.save();
    const newCardModified = convertID(newCard);

    return {
      status: 201,
      data: newCardModified,
    };
  }

  // изменение карточки
  async updateCard(cardId, updates) {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return {
        status: 404,
        message: 'Not Found',
      };
    }

    const updatedCardModified = convertID(updatedCard);
    return {
      status: 200,
      data: updatedCardModified,
    };
  }

  // удаление карточки
  async deleteCard(cardId) {
    const cardToDelete = await Card.findOneAndDelete(cardId, {});

    if (!cardToDelete) {
      return {
        status: 404,
        message: 'Not Found',
      };
    }

    return {
      status: 204,
      message: 'Successfully Deleted',
    };
  }
}
