const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: String, // or mongoose.Schema.Types.ObjectId if referencing Project model
  taskName: String,
  assignedTo: String,
  status: String, // example: 'To do', 'In Progress', 'Completed'
  dueDate: Date
});

module.exports = mongoose.model('tasks', taskSchema); // collection name is 'tasks'