import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  }
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation {
    updateUser(id: Int!, name: String, age: String): Person
  }
`);

const users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    shark: 'Great White Shark'
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    shark: 'Whale Shark'
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    shark: 'Hammerhead Shark'
  }
];

//Returns a single user
const getUser = ({ id }) => users.filter(user => user.id === id)[0];

//Returns a list of users
const retrieveUsers = ({ shark }) => shark ? users.filter(user => user.shark === shark) : users;

const updateUser = ({ id, name, age }) => {
  users.map(user => {
    if (user.id === id) {
      user.name = name;
      user.age = age;
      return user;
    }
  });
  return users.filter(user => user.id === id)[0];
};

//Construct a resolver function
const resolver = {
  user: getUser,
  users: retrieveUsers,
  updateUser: updateUser
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));