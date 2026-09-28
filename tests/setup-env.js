const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env.test');
if (!fs.existsSync(envPath)) {
  throw new Error('Crie .env.test a partir de .env.test.example e configure um banco PostgreSQL local exclusivo para testes.');
}

const config = dotenv.parse(fs.readFileSync(envPath));
for (const key of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET', 'JWT_EXPIRES_IN']) {
  if (!config[key]) throw new Error(`Configure ${key} no arquivo .env.test.`);
}

if (!['localhost', '127.0.0.1', '::1'].includes(config.DB_HOST) || !config.DB_NAME.endsWith('_test')) {
  throw new Error('Os testes exigem um banco local com nome terminado em _test. O banco configurado não foi acessado.');
}

Object.assign(process.env, config, { NODE_ENV: 'test', DB_DIALECT: 'postgres', DB_PORT: config.DB_PORT || '5432' });
