export const typeDef = /* GraphQL */ `
    extend type Query {    
        user: User
    }

    type User {
        id: Int
        name: String
    }
`

export const resolvers = {
    Query: {
        user: () => ({ id: 1, name: 'David' }),
    },
    User: {
        name: (obj) => obj.name.toUpperCase()
    }
}