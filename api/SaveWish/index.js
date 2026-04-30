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
    if (!req.body || !req.body.name || !req.body.message) {
      return {
        status: 400,
        body: { error: "Missing name or message" }
      };
    }

    const container = getContainer();

    const wish = {
      id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      eventId: eventId,
      name: req.body.name,
      message: req.body.message,
      language: req.body.language || "en",
      createdAt: new Date().toISOString(),
      approved: true
    };

    const { resource: createdWish } = await container.items.create(wish);

    return {
      status: 201,
      body: { success: true, wish: createdWish }
    };
  } catch (error) {
    context.log("SaveWish error:", error.message);
    return {
      status: 500,
      body: { error: "Failed to save wish", details: error.message }
    };
  }
};
