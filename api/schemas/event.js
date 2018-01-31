import mongoose from 'mongoose'

const Schema = mongoose.Schema

let schema = new Schema({
  title: {type: String, required: true},
  start: {type: Number, required: true},
  duration: {type: Number, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User', index: true, required: true}
}, {
  retainKeyOrder: true
})

export default schema