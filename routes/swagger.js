import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'node:fs';

const router = express.Router();

const swaggerDocument = JSON.parse(
  readFileSync(new URL('../swagger.json', import.meta.url), 'utf8')
);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;