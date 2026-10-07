require('dotenv').config();
require('./database');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Tente novamente em alguns minutos.' },
});

class App {
  constructor() {
    this.server = express();
    this.server.set('trust proxy', 1);
    this.middlewares();
    this.swaggerConfig();
    this.routes();
  }

  middlewares() {
    const allowedOrigins = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
      : process.env.NODE_ENV === 'production'
        ? []
        : ['http://localhost:5173'];

    this.server.use(helmet({ crossOriginResourcePolicy: false }));
    this.server.use(cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Origem não autorizada pelo CORS.'));
      },
    }));
    this.server.use(express.json({ limit: '50mb' }));
  }

  swaggerConfig() {
    const serverUrl = process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 3001}`;
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'API Geração Tech 3.0',
          version: '1.0.0',
          description: 'Documentação do projeto de E-commerce Final',
        },
        servers: [
          {
            url: serverUrl,
            description: process.env.NODE_ENV === 'production' ? 'Servidor de produção' : 'Servidor local',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      apis: ['./src/routes/*.js'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    this.server.get('/health', (_request, response) => {
      response.status(200).json({ status: 'ok' });
    });

    this.server.use('/v1', apiLimiter);
    this.server.use('/v1/usuario/token', loginLimiter);
    this.server.use('/v1/usuario', userRoutes);
    this.server.use('/v1/categoria', categoryRoutes);
    this.server.use('/v1/produto', productRoutes);
  }
}

module.exports = new App().server;