import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

//Construct a resolver function
const resolver = {
  hello: () => 'Hello world!',
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));