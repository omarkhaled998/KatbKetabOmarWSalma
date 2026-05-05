# Azure Functions Setup for Omar & Salma Guestbook

## ✅ Created Files

- `api/GetWishes/index.js` - HTTP triggered function that queries approved wishes from Cosmos DB
- `api/GetWishes/function.json` - Azure Function binding configuration
- `api/package.json` - Node dependencies (including @azure/cosmos)
- `api/local.settings.json` - Local configuration template
- `api/host.json` - Azure Functions host configuration

## 🔧 Next Steps

### 1. Update local.settings.json with your Cosmos credentials

Open `api/local.settings.json` and replace:
- `COSMOS_ENDPOINT` - Your Cosmos DB endpoint URL
- `COSMOS_KEY` - Your Cosmos DB primary key
- Keep other values as-is

You can find these in Azure Portal → Cosmos DB Account → Keys

### 2. Wait for npm install to complete

The `npm install` is currently running in the background. Once complete, you'll have @azure/cosmos installed.

### 3. Test the function locally

```powershell
cd d:\SalmaOmarWedding\api
npm start
```

This will start the local Azure Functions runtime. You should see:
```
GetWishes: [GET] http://localhost:7071/api/wishes
```

### 4. Test via browser or Postman

Open `http://localhost:7071/api/wishes?code=<function_key>` in your browser

The function key will be shown in the console output.

### 5. Deploy to Azure

Once testing works locally:
```powershell
func azure functionapp publish oswedding-api-prod
```

## 📝 What the GetWishes function does

1. Reads Cosmos DB credentials from environment variables
2. Connects to your Cosmos DB account
3. Queries the `wishes` container for approved wishes with eventId = `omar-salma-katbketab-2026`
4. Returns JSON response with all approved wishes

## ✨ Expected Response

```json
{
  "success": true,
  "count": 2,
  "wishes": [
    {
      "id": "wish-1",
      "eventId": "omar-salma-katbketab-2026",
      "name": "Ahmed & Nour",
      "message": "May your marriage be filled with love and happiness!",
      "createdAt": "2026-05-02T10:30:00Z",
      "approved": true
    }
  ]
}
```

## 🐛 Troubleshooting

If you get errors:
- **Missing environment variables** → Update local.settings.json
- **Cosmos connection error** → Verify endpoint/key are correct
- **npm not found** → Make sure Node.js is installed (`node -v`)
