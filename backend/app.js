import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyparser from 'body-parser';


const app = express();

const {schema, root} = require('./graphql/schema');

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', (req,res) => {
    return res.send('Hi');
});

const server = app.listen(4000, () => {
    console.log('express listening on port 4000');
});