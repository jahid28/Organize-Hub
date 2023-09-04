import { Schema, model, models } from 'mongoose';


const NoteSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  noteHead: {
    type: String,
    required: true
  },
  noteBody: {
    type: String,
    required: true
  }

});

// const User = models.User || model("User", UserSchema);

export default models.Note || model("Note", NoteSchema);