const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const database = client.db("TodoApp");
    const todos = database.collection("todos");

    const allTodos = await todos.find({}).toArray();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(allTodos.reverse())
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to fetch todos", error: error.message })
    };
  } finally {
    await client.close();
  }
};