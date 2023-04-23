import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: String,
  bio: String,
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = models.User || model('User', userSchema);

export default User;
