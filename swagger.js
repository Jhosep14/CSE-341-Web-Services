import swaggerAutogen from 'swagger-autogen';

const generateSwagger = swaggerAutogen();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
  },
  definitions: {
    Contact: {
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'grace.hopper@example.com',
      favoriteColor: 'Blue',
      birthday: '1906-12-09',
    },
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

await generateSwagger(outputFile, endpointsFiles, doc);