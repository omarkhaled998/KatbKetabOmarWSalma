const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
  try {
    // Validate request body
    const { name, message } = req.body;
    if (!name || !message) {
      context.res = {
        status: 400,
        body: { success: false, error: "Missing required fields: name, message" }
      };
      return;
    }

    // Validate field lengths
    if (name.length > 60) {
      context.res = {
        status: 400,
        body: { success: false, error: "Name must be 60 characters or less" }
      };
      return;
    }

    if (message.length > 300) {
      context.res = {
        status: 400,
        body: { success: false, error: "Message must be 300 characters or less" }
      };
      return;
    }

    // Read from environment variables
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = process.env.COSMOS_DATABASE_ID;
    const containerId = process.env.COSMOS_CONTAINER_ID;
    const eventId = process.env.EVENT_ID;

    if (!endpoint || !key) {
      context.res = {
        status: 500,
        body: { success: false, error: "Missing Cosmos credentials" }
      };
      return;
    }

    // Initialize Cosmos client
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Create wish document
    const wish = {
      id: uuidv4(),
      eventId: eventId,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      approved: false // Requires manual approval
    };

    context.log(`Inserting wish from ${name}`);

    // Insert into Cosmos DB
    const { resource: createdWish } = await container.items.create(wish);

    context.res = {
      status: 201,
      body: {
        success: true,
        message: "Wish submitted successfully and is pending approval",
        wishId: createdWish.id
      }
    };
  } catch (error) {
    context.log(`Error: ${error.message}`);
    context.res = {
      status: 500,
      body: { success: false, error: error.message }
    };
  }
};
