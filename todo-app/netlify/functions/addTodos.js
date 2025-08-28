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

  if (event.httpMethod !== 'POST') {
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

    const { content, done, userId } = JSON.parse(event.body);
    
    if (!content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Content is required" })
      };
    }

    const newTodo = { 
      content, 
      done: done || false, 
      userId: userId || "demo-user",
      createdAt: new Date()
    };
    
    const result = await todos.insertOne(newTodo);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: "Todo added successfully", 
        id: result.insertedId 
      })
    };
  } catch (error) {
    console.error("Error adding todo:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to add todo", error: error.message })
    };
  } finally {
    await client.close();
  }
};