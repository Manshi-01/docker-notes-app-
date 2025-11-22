// app/model.js
const { MongoClient, ObjectId } = require('mongodb');

let client;
let collection;

async function connect(uri, dbName = 'notesdb') {
    if (client) return;
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection('notes');
    await collection.createIndex({ createdAt: 1});
    
}

async function createNote(note) {
    note.createdAt = new Date();
    const res = await collection.insertOne(note);
    return { id: res.insertedId.toString(), ...note };
}

async function listNotes(limit = 100) {
const docs = await collection.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
return docs.map(d => ({ id: d._id.toString(), title: d.title, body: d.body, createdAt: d.createdAt }));
}


async function getNote(id) {
const doc = await collection.findOne({ _id: new ObjectId(id) });
if (!doc) return null;
return { id: doc._id.toString(), title: doc.title, body: doc.body, createdAt: doc.createdAt };
}


async function updateNote(id, patch) {
const { value } = await collection.findOneAndUpdate(
{ _id: new ObjectId(id) },
{ $set: { ...patch, updatedAt: new Date() } },
{ returnDocument: 'after' }
);
if (!value) return null;
return { id: value._id.toString(), title: value.title, body: value.body };
}


async function deleteNote(id) {
const res = await collection.deleteOne({ _id: new ObjectId(id) });
return res.deletedCount === 1;
}


module.exports = { connect, createNote, listNotes, getNote, updateNote, deleteNote };