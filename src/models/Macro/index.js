const mongoose = require('mongoose')

const Macro = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
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

module.exports = mongoose.model('Macro', Macro)
