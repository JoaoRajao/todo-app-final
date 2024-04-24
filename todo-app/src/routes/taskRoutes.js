
const express = require('express');
const app = express();
const router = express.Router();
const taskService = require('../services/taskService');
const cors = require('cors');
/*

const corsOptions = {
  origin: 'http://localhost:4000', 
  optionsSuccessStatus: 200, 
  allowedHeaders: ['Content-Type'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE']  
};
app.options('*', cors(corsOptions)); 
app.use(cors(corsOptions));
*/

app.use(cors({origin: '*'}))

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await taskService.update(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await taskService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
