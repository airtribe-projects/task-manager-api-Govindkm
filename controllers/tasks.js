let router = require('express').Router();

// In-memory tasks storage
let data =  require('../task.json');
console.log(data)
const tasks = data.tasks;
let nextId = 1;

// Get all tasks
const getTasks = (req, res) => {
    res.json(tasks);
};

// Get a single task by ID
const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};

const getTaskByPriority = (res, req) => {
    const priority = req.params.level;
    const filteredTasks = tasks.filter(task => task.priority === priority);
    if(!filteredTasks){
        return res.status(404).json({ error: 'Tasks not found' });
    }
    res.json(filteredTasks);
}

// Create a new task
const createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const task = { id: nextId++, title, description: description || '', completed: false };
    tasks.push(task);
    res.status(201).json(task);
};

// Update a task
const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, description, completed } = req.body;
    // Check if all properties are the same as current task
    const isSame =
        (title === undefined || title === task.title) &&
        (description === undefined || description === task.description) &&
        (completed === undefined || completed === task.completed);

    if (isSame) {
        return res.status(400).json({ error: 'No changes detected in update' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
};

// Delete a task
const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(200).send();
};

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.get("/priority/:level", getTaskByPriority);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;