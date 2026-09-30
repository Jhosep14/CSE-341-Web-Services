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

// CREATE a new contact
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Verify all required fields
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
            });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const db = getDb();
        const response = await db.collection('contacts').insertOne(newContact);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create contact' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a contact by ID
export const updateContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid or missing contact ID' });
        }

        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
            });
        }

        const contactId = new ObjectId(id);
        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const db = getDb();
        const response = await db.collection('contacts').replaceOne({ _id: contactId }, updatedContact);

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a contact by ID
export const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid or missing contact ID' });
        }

        const contactId = new ObjectId(id);
        const db = getDb();
        const response = await db.collection('contacts').deleteOne({ _id: contactId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
