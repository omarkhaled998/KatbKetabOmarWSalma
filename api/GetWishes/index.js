const { CosmosClient } = require("@azure/cosmos");

const databaseId = "osweddingdb";
const containerId = "wishes";
const eventId = "omar-salma-katbketab-2026";

function getContainer() {
  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;

  if (!endpoint || !key) {
    const missing = [];
    if (!endpoint) missing.push("COSMOS_ENDPOINT");
    if (!key) missing.push("COSMOS_KEY");
    throw new Error(`Missing app settings: ${missing.join(", ")}`);
  }

  const client = new CosmosClient({ endpoint, key });
  return client.database(databaseId).container(containerId);
}

module.exports = async function (context, req) {
  try {
    const container = getContainer();

    const query = {
      query: "SELECT * FROM c WHERE c.eventId = @eventId AND c.approved = true ORDER BY c.createdAt DESC",
      parameters: [
        {
          name: "@eventId",
          value: eventId
        }
      ]
    };

    const { resources: wishes } = await container.items.query(query).fetchAll();

    return {
      status: 200,
      body: { wishes: wishes }
    };
  } catch (error) {
    context.log("GetWishes error:", error.message);
    return {
      status: 500,
      body: { error: "Failed to fetch wishes", details: error.message }
    };
  }
};
