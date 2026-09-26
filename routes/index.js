import express from 'express';
import contactsRoutes from './contacts.js';

const router = express.Router();

// Mount contacts routes
router.use('/contacts', contactsRoutes);

// Base route test
router.get('/', (req, res) => {
    res.send('Contacts API is running');
});

export default router;
