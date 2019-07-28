const mongoose = require('mongoose')

const Comment = mongoose.Schema({
  comment: String,
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
    default: null
  },
  deletedOn: {
    type: Date,
    default: null
  },
  edits: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Comment', Comment)
