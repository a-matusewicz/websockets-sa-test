import Note from '../models/note';

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  return Note.findById(id)
    .then((note) => {
      return note.delete();
    });
};

export const createNote = (fields) => {
  const n = new Note();
  n.text = fields.text;
  n.title = fields.title;
  n.x = fields.x;
  n.y = fields.y;
  n.zIndex = fields.zIndex;
  return n.save();
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
