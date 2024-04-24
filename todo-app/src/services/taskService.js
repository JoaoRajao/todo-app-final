
const pool = require('../database');
const Task = require('../models/taskModel');  

async function findAll() {
  const [results] = await pool.query('SELECT * FROM tasks');
  return results.map(task => new Task(task.id, task.title, task.completed));
}

async function create(task) {
  const [result] = await pool.query('INSERT INTO tasks (title, completed) VALUES (?, ?)', [task.title, task.completed]);
  return new Task(result.insertId, task.title, task.completed);  
}

async function update(id, task) {
  await pool.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [task.title, task.completed, id]);
  return new Task(id, task.title, task.completed); 
}

async function remove(id) {
  await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = { findAll, create, update, remove };
