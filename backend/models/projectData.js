// model/projectData.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String
});

module.exports = mongoose.model('projects', projectSchema); // collection name is 'projects'