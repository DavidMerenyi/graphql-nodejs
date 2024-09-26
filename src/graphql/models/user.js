import { update } from 'lodash'
import { ObjectId } from 'mongodb'

export const typeDef = /* GraphQL */ `
    type Query {  
        users: [User!]!
        user: User
    }

    type Mutation {
        createUser(user: NewUserInput!): User
        deleteUser(id: ID!): Bolean
        updateUser(id: ID!, user: UpdateUserInput!): User
    }

    input NewUserInput {
        name: String!
        email: String!
    }


    input UpdateUserInput {    
        email: String!
    }
    type User {
        id: ID!
        name: String
        age: Int
    }
`

export const resolvers = {
    Query: {
        users: (obj, args, { mongo }) => {
            return mongo.users.find().limit(20).toArray()
        },
        user: (obj, { id }, { mongo }) => {
            return mongo.users.findOne({ _id: new ObjectId(String(id)) })
        }
    },

    Mutation: {
        createUser: async (_, { user }, { mongo }) => {
            const response = await mongo.users.insertOne(user)

            return {
                id: response.insertedId,
                ...user
            }
        },
        deleteUser: async (_, { id }, { mongo }) => {
            const response = await mongo.users.deleteOne({ _id: new ObjectId(String(id)) })

            return response.deletedCount === 1
        },
        updateUser: async (_, { id, user }, { mongo }) => {
            const response = await mongo.users.findOneAndUpdate(
                { _id: new ObjectId(String(id)) },
                { $set: { "email": user.email } },
                { returnOriginal: false }
            )

            return response.value
        },

        User: {
            id: ({ _id, id }) => _id || id,
            name: (obj) => obj.name.trim().toUpperCase()
        }
    }