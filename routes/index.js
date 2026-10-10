import express from 'express';
import contactsRoutes from './contacts.js';
import swaggerRoutes from './swagger.js';

const router = express.Router();

// Mount contacts routes
router.use('/contacts', contactsRoutes);
router.use('/', swaggerRoutes);

// Base route test
router.get('/', (req, res) => {
    res.send('Contacts API is running');
});

export default router;
