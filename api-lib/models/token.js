import { Schema, model, models } from 'mongoose';

const tokenSchema = new Schema({
  creatorId: String,
  type: String,
  expireAt: Number,
});

tokenSchema.index({ expireAt: -1 }, { expireAfterSeconds: 0 });
const Token = models.Token || model('Token', tokenSchema);

export default Token;
