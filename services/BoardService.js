import { Board } from '../models/Board.js';
import { convertID } from './convertID.js';

export class BoardService {
  // метод для получения всех досок пользователя
  async getAllBoardsByUser(userId) {
    try {
      const boards = await Board.find({ user: userId });

      const modifiedBoards = boards.map((board) => convertID(board));

      return {
        status: 200,
        data: modifiedBoards,
      };
    } catch (err) {
      throw {
        status: 500,
        message: 'Internal server error.',
        error: err.message,
      };
    }
  }

  // метод для создания доски
  async createBoard(title, userId) {
    try {
      const board = new Board({ title, user: userId });
      await board.save();

      return {
        status: 200,
        data: convertID(board),
      };
    } catch (err) {
      throw {
        status: 500,
        message: 'Internal server error.',
        error: err.message,
      };
    }
  }

  // метод для удаления доски
  async deleteBoard(boardId) {
    try {
      const boardToDelete = await Board.findByIdAndDelete(boardId);

      if (!boardToDelete) {
        throw { status: 404, message: 'Board not found' };
      }

      return { status: 204, message: 'Successfully deleted.' };
    } catch (err) {
      throw {
        status: 500,
        message: 'Internal server error.',
        error: err.message,
      };
    }
  }

  // метод для обновления названия доски
  async editBoard(boardId, newTitle) {
    try {
      const updatedBoard = await Board.findByIdAndUpdate(
        boardId,
        { title: newTitle },
        { new: true }
      );

      if (!updatedBoard) {
        throw { status: 404, message: 'Board not found' };
      }

      return {
        status: 200,
        message: 'Board updated successfully',
        data: convertID(updatedBoard),
      };
    } catch (err) {
      throw {
        status: 500,
        message: 'Internal server error.',
        error: err.message,
      };
    }
  }
}
