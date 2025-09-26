const AddressModel = require("../AddressDb");

// Define the migration logic
const runMigration = async () => {
  try {
    // Define the addresses you want to add
    const defaultAddresses = {
      Bitcoin: "bitcon",
      Ethereum: "eth",
      Tether: "usdt",
      Tron: "tx",
      Dogecoin: "doge",
      Binance: "bnb",
    };

    // Use the create method to add the addresses to the collection
    const insertResult = await AddressModel.create(defaultAddresses);

    console.log("Migration completed successfully", insertResult);
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

runMigration();
