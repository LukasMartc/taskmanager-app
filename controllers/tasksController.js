import db from "../db.js";

const getAllTasks = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM task');
        res.json(rows);
    } catch (error) {
        console.log(error.message);
    };
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    const existsTask = await db.query('SELECT * FROM task WHERE title = $1', [title]);

    if([title, description].includes('')) {
        const error = new Error('Todos los campos son requeridos');
        return res.status(400).json({ msg: error.message });
    };

    if(existsTask.rowCount > 0) {
        const error = new Error('Ya existe una tarea con el mismo título');
        return res.status(400).json({ msg: error.message });
    };

    try {
        const { rows } = await db.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        return res.json(rows[0]);
    } catch (error) {
        console.log(error.message);
    };
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const deleteTask = await db.query('DELETE FROM task WHERE id = $1', [id]);

    if(deleteTask.rowCount === 0) {
        const error = new Error('La tarea no existe');
        return res.status(404).json({ msg: error.message });
    };

    try {
        return res.json({ msg: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.log(error.message);
    };
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if([title, description].includes('')) {
        const error = new Error('Todos los campos son requeridos');
        return res.status(400).json({ msg: error.message });
    };
    
    if(isNaN(id) || id <= 0) {
        const error = new Error('El id de la tarea es inválido');
        return res.status(400).json({ msg: error.message });
    };

    const existsTask = await db.query('SELECT id FROM task WHERE id = $1', [id]);
    if(existsTask.rowCount === 0) {
        const error = new Error('La tarea no existe');
        return res.status(404).json({ msg: error.message });
    }

    const checkTitleTask = await db.query('SELECT id FROM task WHERE title = $1 AND id != $2', [title, id]);
    if(checkTitleTask.rowCount > 0) {
        const error = new Error('Ya existe una tarea con el mismo título');
        return res.status(400).json({ msg: error.message });
    };
    
    try {
        const task = await db.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
        return res.json(task.rows[0]);
    } catch (error) {
        console.log(error.message);
    };
};

const getTask = async (req, res) => {
    const { id } = req.params;
    const task = await db.query('SELECT * FROM task WHERE id = $1', [id]);

    if(task.rowCount === 0) {
        const error = new Error('La tarea no existe');
        return res.status(404).json({ msg: error.message });
    };

    try {
        return res.json(task.rows[0])
    } catch (error) {
        console.log(error.message)
    };
};

export {
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    getTask
};