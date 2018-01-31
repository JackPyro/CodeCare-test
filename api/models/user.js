import mongoose from 'mongoose'
import schema from '../schemas/user'

const User = mongoose.model('User', schema)

export default User