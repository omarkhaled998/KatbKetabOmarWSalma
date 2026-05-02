const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  try {
    // Read from environment variables
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = process.env.COSMOS_DATABASE_ID;
    const containerId = process.env.COSMOS_CONTAINER_ID;
    const eventId = process.env.EVENT_ID;

    // Validate credentials
    if (!endpoint || !key) {
      context.res = {
        status: 500,
        body: { success: false, error: "Missing Cosmos credentials in environment variables" }
      };
      return;
    }

    context.log(`Connecting to Cosmos DB at ${endpoint}`);

    // Initialize Cosmos client
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Query approved wishes for this event
    context.log(`Querying wishes for eventId: ${eventId}`);
    const { resources: wishes } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.eventId = @eventId AND c.approved = true ORDER BY c.createdAt DESC",
        parameters: [{ name: "@eventId", value: eventId }]
      })
      .fetchAll();

    context.log(`Found ${wishes.length} approved wishes`);

    context.res = {
      status: 200,
      body: { 
        success: true, 
        count: wishes.length, 
        wishes: wishes 
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
