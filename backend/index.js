const express = require('express');
const app = express();
const PORT = 5000;

require('./connection'); // DB connection
const cors=require('cors');
const projectModel = require('./models/projectData'); // Project model
const taskModel = require('./models/taskData');       // Task model
const teamMemberModel = require('./models/teamMember');   //Team member model

app.use(express.json());
app.use(cors());


// ---------------------- PROJECT APIs ---------------------- //

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

// ✅ POST add new project
app.post('/projects', async (req, res) => {
    try {
        const newProject = new projectModel(req.body);
        await newProject.save();
        res.send("Project added successfully");
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ PUT update a project by ID
app.put('/projects/:id', async (req, res) => {
    try {
        await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("Project updated successfully");
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ DELETE a project by ID
app.delete('/projects/:id', async (req, res) => {
    try {
        await projectModel.findByIdAndDelete(req.params.id);
        res.send("Project deleted successfully");
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ---------------------- TASK APIs ---------------------- //

// ✅ GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.send(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ POST add new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = new taskModel(req.body);
        await newTask.save();
        res.send("Task added successfully");
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ PUT update task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        await taskModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("Task updated successfully");
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ DELETE task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        await taskModel.findByIdAndDelete(req.params.id);
        res.send("Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ---------------------- TEAM MEMBER APIs ---------------------- //
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

// ✅ POST a new team member
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
//  ✅ PUT update a team member by ID  
app.put('/teammembers/:id', async (req, res) => {
  try {
    const updatedMember = await teamMemberModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE a team member by ID
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