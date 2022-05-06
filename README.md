# **Transversal**
Transversal is an open-source package that aids developers in utilizing GraphQL's dynamic querying language to auto-generate schemas, queries, and mutations on the frontend from the query template initially setup in the backend. Transversal leverages Redis' in-memory caching mechanism to quickly reference server-side caching.

[![License](https://img.shields.io/badge/license-MIT-orange)]()
[![Contributions](https://img.shields.io/badge/contributions-welcome-blue)]()

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Further Documentation](#documentation)
- [Contributions](#contributions)
- [Developer Team](#developers)
- [License](#license)

## <a name="description"></a> Description

Transversal employs methods for the backend engineer to simply call its library to auto-generate the database schema for use by the front end developer — allowing one half of the usual setup to be abstracted away — and offers a quick Redis caching option if the team so chooses! 🚀

## <a name="features"></a> Features

- GraphQL automation stemming from the backend
- Rapid frontend development
- Redis caching optional
- WebSocket for fast frontend notice from the backend

## <a name="installation"></a> Installation


To start using this dev tool, developers establish their existing mongoDB URI link and start simply by creating a query template on the backend. Let’s get started! Run ‘npm install transversal’ and ‘npm install transversal-client’ and let’s roll on to the backend!
```
npm install transversal

npm install transversal-client
```


## <a name="getting-started"></a> Getting Started


### Back-end

> _Extra Feature — As mentioned above, we’ve put some added tooling into this dev tool to make development faster, and this is a good time to mention the first — WebSocket for immediate up-to-date changes on the frontend if the backend changes._

This WebSocket option is available by establishing an event listener. While this WebSocket is established any changes to the backend template for auto-generation is immediately updated for our frontend team members. We encourage the use of a WebSocket, as our focus is quick production and iteration, but it’s not required.
```ts
const server = http.createServer(app);

const json = transversal.jsonStringify(transversal);

const socket = transversal.instantiateSocket(server, 'http://localhost:8080');

socket.openConnection(json);
```
Now we dive into the real productivity improvement. Simply start by creating a Transversal class (OOP approach) by calling the transversal() method that takes three arguments — the team’s GraphQL schema, Redis Client, and an origin.
```ts
const transversal = new Transversal(schema, redisClient, origin);
```
After we’ve instantiated the class, we can focus on bringing in our queries and mutations. Let’s get auto-generating and establish GraphQL’s types from the connected database, which we’ll call generateFieldSchema().
```ts
transversal.generateFieldSchema();
```
When setting up GraphQL queries or mutations, you can use Transversal’s generateQuery() and generateMutation() method. But first, we need to define the arguments for the resolver if any, and the resolver itself. Then we need to pass in the query/mutation name in which we want to register, and the field schema to reference the arguments for the resolver if any, if none then null, and the resolver.

**Queries**
```ts
const userArgs = {  
    age: { type: GraphQLInt },  
    height: { type: GraphQLInt },  
};

const userResolver = async (parent, args) => {  
    const users = await User.find({   
       age: args.age,   
       height: args.height   
    });  
    return users;  
};

transversal.generateQuery(queryName, fieldSchemaName, resolver, args);
```
**Mutations**
```ts
const addUserArgs = {  
    firstName: { type: GraphQLString },  
    lastName: { type: GraphQLString },  
    age: { type: GraphQLInt },  
    height: { type: GraphQLInt },  
};

const addUserResolver = async (parent, args) => {  
    const users = await User.create({  
        firstName: args.firstName,  
        lastName: args.lastName,  
        age: args.age,  
        height: args.height,  
    });  
    return users;  
};

transversal.generateMutation(queryName, fieldSchemaName, resolver, args);
```
It wouldn’t be such a great tool if it didn’t allow for the flexibility that GraphQL sets out to establish in its paradigm. The tool allows you to create your own custom field schema types on the fly by calling generateCustomFieldSchema() method by passing in the custom schema and the schema name you want to register.
```ts
const customSchema = {  
    firstName: 'String',  
    lastName: 'String',  
    age: 'Number',  
    height: 'Number',  
    school: {  
        name: 'String',  
        year: 'Number',  
        code: {  
            code: 'String',  
        },  
    },  
    messages: [{ message: 'String' }],  
};

transversal.generateCustomFieldSchema(customSchema, 'customQuery');
```
> _Final Feature — For our final integrated feature, caching. Modern applications, especially those with growing number of users and requests, should implement caching to help server data faster. That’s why we’ve decided to create an out-of-the-box Redis caching attachment available on request at your discretion._

[](https://redis.io/)

## Redis

The open source, in-memory data store used by millions of developers as a database, cache, streaming engine, and… read more redis.io

**Local**
```ts
const redisClient = redis.createClient({  
    host: '127.0.0.1',  
    port: <port>  
});
```
**Microservice**
```ts
const redisClient = redis.createClient({  
    url: process.env.REDIS_URI  
});
```
When initially creating the Transversal class, one of the arguments calls for a Redis client URI. If you prefer to use caching with your transversal package, it’s simple to get started. There are two general options, create a local Redis service running side by side with your back-end server (monolithic), or run Redis as a micro service. By flagging this feature on a client-side query, caching will be initiated for that request drastically increasing the latency. See the Redis  [documentation](https://redis.io/docs/), you won’t be disappointed.

# Front-end

Now for the payoff! On the frontend, import the TransversalClient and instantiate it with your preferred endpoint to set up the WebSocket connection.
```ts
import { TransversalClient } from 'transversal-client';

const transversal = new TransversalClient.default('http://localhost:3000');
```
Make a call to getTransversalInstance() method to get the gql object containing all the queries and mutations templates needed to make API calls and store it in state where it can easily be accessed.
```ts
transversal.getTransversalInstance().then((data) => {  
    console.log('gql data from server', data.gql);  
    setGql(data.gql);  
});
```
Making queries and mutations are done simply by calling transversalQuery() method and passing arguments. You would first need to specify the name of the query or mutation, arguments required (as we saw on the backend previously), specify if you want the call to come from the cache or server, and the last argument can be omitted if you want everything to be returned from the api call. If not, just pass in a custom shape(string) for your data to fill.
```ts
transversal.transversalQuery(  
    gql.getUsers,  
    {  
      age: 10,  
      height: 10,  
    },  
    false  
);
```
And that’s it! You’ve streamlined auto-generated schemas for GraphQL.  🚀

## <a name="documentation"></a> Further Documentation

https://transversal.dev

## <a name="contributions"></a> Contributions

Consider contributing, craft it to your needs and let us know your experience. Open issues, reach out to the team, we want to hear from you! Let us know!

<a name="developers"></a> 
## Development Team

- [Dan Forrester](https://github.com/daniel-forrester)
- [Han Kim](https://github.com/han900204)
- [Norman Liu](https://github.com/normsliu)
- [Kevin Mun](https://github.com/kmun94)

## <a name="license"></a> License

This product is licensed under the MIT License - see the LICENSE.md file for details.

Product developed under tech accelerator [OS Labs](https://opensourcelabs.io/). 
