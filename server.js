try {
    process.loadEnvFile();
} catch (error) {
    // In production (e.g. Render), variables are provided directly by the environment
}

import express from 'express';
import cors from 'cors';
import { initDb } from './db/connect.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect all routes with a single line of code
app.use('/', routes);

const PORT = process.env.PORT || 8080;

// Connect to MongoDB first, then start server
initDb((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});
