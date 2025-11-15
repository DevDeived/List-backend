// backend/server.js
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importa seu app real
const app = await import('./src/index.js');

export default app.default;