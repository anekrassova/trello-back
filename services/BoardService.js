import {Board} from '../models/Board.js';

export class BoardService {
  // метод для получения всех досок пользователя
  async getAllBoardsByUser(userId){
    try{
      const boards = await Board.find({ user: userId });

      const modifiedBoards = boards.map(board => {
        const boardObj = board.toObject();
        boardObj.id = boardObj._id;
        delete boardObj._id;
        return boardObj;
      });

      return {
        status: 200,
        data: modifiedBoards,
      };
    } catch(err){
      throw {
        status: 500,
        message: "Internal server error.",
        error: err.message,
      };
    }
  }

  // метод для создания доски
  async createBoard(title, userId){
    try{
      const board = new Board({title, user: userId});
      await board.save();

      const boardObj = board.toObject();
      boardObj.id = boardObj._id;
      delete boardObj._id;

      return {
        status: 200,
        data: boardObj,
      }
    } catch(err){
      throw {
        status: 500,
        message: "Internal server error.",
        error: err.message,
      };
    }
  }

  // метод для удаления доски
  async deleteBoard(boardId){
    const boardToDelete = await Board.findOneAndDelete({_id: boardId})

    if(!boardToDelete){
      throw { status: 404, message: "Task not found" };
    }

    return { status: 204, message: "Successfully deleted." };
  }
}
