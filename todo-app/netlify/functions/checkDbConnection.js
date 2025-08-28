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

  try {
    const client = await MongoClient.connect(MONGO_URI);
    await client.db("TodoApp").admin().ping();
    await client.close();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Successfully connected to the database" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to connect to the database",
        details: error.message,
      })
    };
  }
};