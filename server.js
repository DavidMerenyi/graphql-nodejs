var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql")
var { ruruHTML } = require("ruru/server")

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String
//     age: Int
//     weight: Float
//     isOver18: Boolean
//     hobbies: [String!]!

//     user: User
//   }

//   type User { 
//     id: Int
//     name: String

//     posts: [Post]
//     friends: [User]
//     invitedBy: User
//   }
// `)

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello World"
        }
      }
    }
  })
})

// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello({ name }) {
//     return "Hello " + name
//   },
//   age() {
//     return 30
//   },

//   weight: null,
//   isOver18: true,

//   hobbies() {
//     return ["swimming", "reading"]
//   },
//   user() {
//     return {
//       id: 1,
//       name: "John"
//     }
//   }
// }

const app = express()

app.all('/graphql', createHandler({ schema }))

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000)
console.log(`API running on http://localhost:4000
    Test: http://localhost:4000/graphql?query={hello,age}`)