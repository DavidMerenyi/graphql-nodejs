import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://davidm:O0DzLp0lqwbAqM13@nodejs.ksfxz.mongodb.net/?retryWrites=true&w=majority&appName=nodejs";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function setupDatabase() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const db = client.db("sample_mflix")

        return {
            client,
            db,
            users: db.collection("users"),
            movies: db.collection("movies"),
        }
    } catch (err) {
        console.log("Error connecting to the database")

        return {}
    }
}
