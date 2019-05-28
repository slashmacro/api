const mongoose = require('mongoose')

const User = mongoose.Schema({
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  email: String,
  photo: String,

  // OAuth ID
  googleId: {
    type: String,
    select: false
  },

  // slashmacro specific
  macros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Macro'
    }
  ],

  // action info
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
    default: null
  },

  // roles
  isAdmin: Boolean
})

module.exports = mongoose.model('User', User)
