import mongoose from 'mongoose'
import schema from '../schemas/event'

const Event = mongoose.model('Event', schema)


export default Event