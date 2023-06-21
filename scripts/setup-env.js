import fs from 'fs';
import dotenv from 'dotenv';
const envContent = Object.entries(process.env)
  .filter(([key]) => key.startsWith('NETLIFY_ENV_'))
  .map(([key, value]) => `${key.replace('NETLIFY_ENV_', '')}=${value}`)
  .join('\n');
fs.writeFileSync('.env', envContent);
dotenv.config();