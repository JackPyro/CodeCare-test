import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

let schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
}, {
  retainKeyOrder: true
})

schema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(new Error(err.message))

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(new Error(err.message))
      user.password = hash
      next()
    })
  })
})

schema.methods.isValidPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

export default schema