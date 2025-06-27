const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');

require('./connection'); // DB connection
const projectModel = require('./models/projectData');     // Project model
const taskModel = require('./models/taskData');           // Task model
const teamMemberModel = require('./models/teamMember');   // Team member model

app.use(express.json());
app.use(cors());

/* ---------------------- PROJECT APIs ---------------------- */

// ✅ GET all projects
app.get('/projects', async (req, res) => {
  try {
    const data = await projectModel.find();
    res.send(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ POST new project
app.post('/projects', async (req, res) => {
  try {
    const newProject = new projectModel(req.body);
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ PUT update project
app.put('/projects/:id', async (req, res) => {
  try {
    await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send("Project updated successfully");
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE project
app.delete('/projects/:id', async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.params.id);
    res.send("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* ---------------------- TASK APIs ---------------------- */

// ✅ GET all tasks or filter by assignee
app.get('/tasks', async (req, res) => {
  try {
    const { assignee } = req.query;

    let tasks;
    if (assignee) {
      tasks = await taskModel.find({ assignee });
    } else {
      tasks = await taskModel.find();
    }

    res.send(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ POST new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ PUT update task
app.put('/tasks/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* ---------------------- TEAM MEMBER APIs ---------------------- */

// ✅ GET all team members
app.get('/teammembers', async (req, res) => {
  try {
    const members = await teamMemberModel.find();
    res.send(members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ POST new team member
app.post('/teammembers', async (req, res) => {
  try {
    const newMember = new teamMemberModel(req.body);
    await newMember.save();
    res.send("Team member added successfully");
  } catch (error) {
    console.error("Error adding team member:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ PUT update team member
app.put('/teammembers/:id', async (req, res) => {
  try {
    const updatedMember = await teamMemberModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE team member
app.delete('/teammembers/:id', async (req, res) => {
  try {
    await teamMemberModel.findByIdAndDelete(req.params.id);
    res.send("Team member deleted successfully");
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------------------- SERVER ---------------------- //
app.listen(PORT, () => {
    console.log("Server is listening");
});