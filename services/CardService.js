import { Card } from '../models/Card.js';
import { convertID } from './convertID.js';

export class CardService {
  // получение карточек по колонке
  async getCardsByColumnId(columnId) {
    const cards = await Card.find({ column: columnId });

    const modifiedCards = cards.map((card) => {
      return convertID(card);
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
    const cardToDelete = await Card.findOneAndDelete({ _id: cardId });

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

  // изменение положения карточки
  async moveCard(cardId, sourceColumnId, destColumnId, destIndex) {
    const card = await Card.findById(cardId);
    if (!card) {
      return {
        status: 404,
        message: 'Card not found',
      };
    }

    const isSameColumn = sourceColumnId === destColumnId;

    if (!isSameColumn) {
      card.column = destColumnId;
    }

    let cardsInDest = await Card.find({ column: destColumnId }).sort(
      'position'
    );

    cardsInDest = cardsInDest.filter((c) => c.id !== cardId);

    cardsInDest.splice(destIndex, 0, card);

    for (let i = 0; i < cardsInDest.length; i++) {
      cardsInDest[i].position = i;
      await cardsInDest[i].save();
    }

    return {
      status: 200,
      message: 'Card moved successfully',
    };
  }
}
