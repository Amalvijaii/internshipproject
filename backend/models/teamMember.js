const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    default: 'Team Member'
  }
});

module.exports = mongoose.model('teammembers', teamMemberSchema);