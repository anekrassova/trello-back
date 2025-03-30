import { Column } from '../models/Column.js';
import { Board } from '../models/board.js';
import { convertID } from './convertID.js';
import { Card } from '../models/card.js';

export class ColumnService {
  // получение колонок по boardId
  async getColumns(boardId) {
    const columns = await Column.find({ board: boardId });

    const modifiedColumns = columns.map((column) => {
      return convertID(column);
    });

    return {
      status: 200,
      data: modifiedColumns,
    };
  }

  // создание колонки в доске
  async createColumn(boardId, columnTitle) {
    const newColumn = new Column({ title: columnTitle, board: boardId });
    await newColumn.save();

    const columnObj = convertID(newColumn);

    return {
      status: 200,
      data: columnObj,
    };
  }

  // удаление колонки
  async deleteColumn(columnId) {
    await Card.deleteMany({ column: columnId });
    const columnToDelete = await Column.findOneAndDelete({ _id: columnId });

    if (!columnToDelete) {
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

  // изменение названия колонки
  async editColumnTitle(columnId, newColumnTitle) {
    const updatedColumn = await Column.findByIdAndUpdate(
      columnId,
      { title: newColumnTitle },
      { new: true }
    );

    if (!updatedColumn) {
      return {
        status: 404,
        message: 'Not Found',
      };
    }

    const updatedColumnObj = convertID(updatedColumn);

    return {
      status: 200,
      data: updatedColumnObj,
    };
  }
}
