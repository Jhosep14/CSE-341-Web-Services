import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect.js';

// GET all contacts
export const getAllContacts = async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single contact by ID (supports :id parameter or query param ?id=)
export const getSingleContact = async (req, res) => {
    try {
        const id = req.params.id || req.query.id;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid or missing contact ID' });
        }

        const contactId = new ObjectId(id);
        const db = getDb();
        const contact = await db.collection('contacts').findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
