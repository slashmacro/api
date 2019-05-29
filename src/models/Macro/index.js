const mongoose = require('mongoose')

// models
const User = require('../User')

const Macro = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  updatedOn: {
    type: Date,
    default: new Date()
  },
  deletedOn: {
    type: Date,
    default: new Date()
  },
  macro: String,
  title: String,
  tags: {
    type: Array,
    default: []
  }
})

Macro.post('remove', async (doc, next) => {
  const user = await User.findById(doc.createdBy).catch(next)
  if (!user) return next()

  user.macros.remove(doc._id)
  return user.save()
})

Macro.post('save', async (doc, next) => {
  const user = await User.findById(doc.createdBy).catch(next)
  if (!user) return next()

  user.updatedOn = new Date()
  return user.save()
})

module.exports = mongoose.model('Macro', Macro)
