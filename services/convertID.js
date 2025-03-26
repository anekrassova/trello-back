// Функция для преобразования _id в id
export function convertID(object) {
  if (!object) return null;

  const objectObj = object.toObject
    ? object.toObject()
    : object.toJSON
      ? object.toJSON()
      : object;
  objectObj.id = objectObj._id;
  delete objectObj._id;

  return objectObj;
}
