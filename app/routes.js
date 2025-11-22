// app/routes.js
const express = require('express');
const router = express.Router();
const models = require('./models');


router.get('/health', async (req, res) => {
// Basic health — you can extend to check DB connectivity
res.json({ status: 'ok', time: new Date().toISOString() });
});


router.post('/notes', async (req, res) => {
const { title, body } = req.body;
if (!title) return res.status(400).json({ error: 'title required' });
const note = await models.createNote({ title, body });
res.status(201).json(note);
});


router.get('/notes', async (req, res) => {
const notes = await models.listNotes();
res.json(notes);
});


router.get('/notes/:id', async (req, res) => {
const note = await models.getNote(req.params.id);
if (!note) return res.status(404).json({ error: 'not found' });
res.json(note);
});


router.put('/notes/:id', async (req, res) => {
const updated = await models.updateNote(req.params.id, req.body);
if (!updated) return res.status(404).json({ error: 'not found' });
res.json(updated);
});


router.delete('/notes/:id', async (req, res) => {
const ok = await models.deleteNote(req.params.id);
if (!ok) return res.status(404).json({ error: 'not found' });
res.status(204).send();
});


module.exports = router;