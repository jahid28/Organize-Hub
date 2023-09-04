import { Schema, model, models } from 'mongoose';


const TodaySchema = new Schema({
  email: {
    type: String,
    required: true
  },
  todayTask: {
    type: String,
    required: true
  },
  taskDate: {
    type: String,
    required: true
  }
  

});

// const User = models.User || model("User", UserSchema);

export default models.Today || model("Today", TodaySchema);