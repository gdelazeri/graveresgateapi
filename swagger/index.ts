import swaggerAutogen from 'swagger-autogen';
import { PORT } from '../src/config/environment';
import payloads from './payloads';
import packageJson from '../package.json';

const doc = {
  info: {
    version: packageJson.version,
    title: "GRAVE Resgate API",
    description: packageJson.description,
  },
  host: `localhost:${PORT}`,
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [{
    name: "User",
    description: "User endpoints"
  }],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Please enter into field the word ‘Bearer’ following by space and JWT"
    }
  },
  definitions: {
    ...payloads,
  }
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
