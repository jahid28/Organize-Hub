import { Schema, model, models } from 'mongoose';

// interface tasks {
//     task: string;
//     date: Date;
//     completed:boolean
// }
// const taskSchema = new Schema({
//     task: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     completed: {
//       type: Boolean,
//       required: true,
//     },
//   });

const TodoSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  date:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    required:true
  }

});

// const User = models.User || model("User", UserSchema);

export default models.Todo || model("Todo", TodoSchema);