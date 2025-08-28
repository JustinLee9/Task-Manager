const { MongoClient, ObjectId } = require("mongodb");

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

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const { _id, content, done } = JSON.parse(event.body);
    
    if (!_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Todo ID is required" })
      };
    }

    const updateFields = { updatedAt: new Date() };
    if (content !== undefined) {
      updateFields.content = content;
    }
    if (done !== undefined) {
      updateFields.done = done;
    }

    const result = await client.db("TodoApp").collection("todos")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateFields });

    return {
      statusCode: result.matchedCount === 0 ? 404 : 200,
      headers,
      body: JSON.stringify({ 
        message: result.matchedCount === 0 ? "Todo not found" : "Todo successfully updated",
        modified: result.modifiedCount
      })
    };
  } catch (error) {
    console.error("Error updating todo:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to update todo", error: error.message })
    };
  } finally {
    await client.close();
  }
};