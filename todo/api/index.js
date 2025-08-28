const { app } = require("@azure/functions");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

const MONGO_URI = process.env.AZURE_MONGO_DB;

app.http("checkDbConnection", {
	methods: ["GET"],
	authLevel: "anonymous",
	route: "checkDbConnection",
	handler: async (request, context) => {
	  try {
		const client = await MongoClient.connect(MONGO_URI);
  
		await client.close();
		return {
		  jsonBody: { message: "Successfully connected to the database" },
		  status: 200,
		};
	  } catch (error) {
		return {
		  jsonBody: {
			error: "Failed to connect to the database",
			details: error.message,
		  },
		  status: 500,
		};
	  }
	},
  });

app.http("getTodos", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "getTodos",
    handler: async (request, context) => {
        let responseMessage;
        let responseStatus = 200;

        const client = new MongoClient(MONGO_URI);

        try {
            await client.connect();
            const database = client.db("TodoApp");
            const todos = database.collection("todos");

            const userTodos = await todos.find({ }).toArray();

            return {
                jsonBody: userTodos.reverse(),
                status: 200,
            };
        } catch (error) {
            console.error("Error fetching todos:", error);
            responseMessage = "Failed to fetch todos";
            responseStatus = 500;
        } finally {
            await client.close();
        }
		
        return {
            jsonBody: { message: responseMessage },
            status: responseStatus,
        };
    },
});


app.http("addTodos", {
	methods: ["POST"],
	authLevel: "anonymous",
	route: "addTodos",
	handler: async (request, context) => {
	  let responseMessage;
	  let responseStatus = 200;
  
	  const client = new MongoClient(MONGO_URI);
  
	  try {
		await client.connect();
		const database = client.db("TodoApp");
		const todos = database.collection("todos");
  
		const { content, done, userId } = await request.json();
		const newTodo = { content, done, userId };
		const result = await todos.insertOne(newTodo);
  
		responseMessage = "Todo added successfully";
	  } catch (error) {
		console.error("Error adding todo:", error);
		responseMessage = "Failed to add todo";
		responseStatus = 500;
	  } finally {
		await client.close();
	  }
  
	  return {
		jsonBody: { message: responseMessage },
		status: responseStatus,
	  };
	},
  });

app.http("updateTodo", {
	methods: ["PUT"],
	authLevel: "anonymous",
	route: "updateTodo",
	handler: async (request, context) => {
		const client = new MongoClient(MONGO_URI);
		try {
			await client.connect();
			const { _id, content, done } = await request.json();
			const updateFields = {};
			if (content !== undefined) {
				updateFields.content = content;
			}
			if (done !== undefined) {
				updateFields.done = done;
			}

			const result = await client.db("TodoApp").collection("todos").updateOne({ _id: _id }, { $set: updateFields });

			return {
				jsonBody: { message: "Todo successfully updated" },
				status: result.modifiedCount === 1 ? 200 : 404,
			};
		} catch (error) {
			console.error("Error updating todo:", error);
			return {
				jsonBody: { message: "Failed to update todo" },
				status: 500,
			};
		} finally {
			await client.close();
		}
	},
});
