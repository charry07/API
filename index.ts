import { getControllersRoutes } from './src/routes';
import fs = require('fs');
const cors = require('@fastify/cors');
require('dotenv').config();

const fastify = require('fastify')({
  // logger: true,
});

// Enable CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
});

fastify.get('/', async (request, reply) => {
  return { hello: 'Welcome To My API for all my Apps!' };
});

// mapeo las rutas y despues con el fastify.route las lanzo
getControllersRoutes.map((route) => {
  fastify.route(route);
});

// Run the server!
const start = async () => {
  try {
    fastify.listen({ host: '0.0.0.0', port: process.env.PORT });
    console.log(` ------> Server listening on port => [${process.env.PORT}]`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
