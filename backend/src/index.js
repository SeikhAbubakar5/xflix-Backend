const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

const startServer =async()=>{
  try{
    await mongoose.connect(config.mongoose.url);
    console.log("Connected to MongoDB at", config.mongoose.url);

    app.listen(config.running_process, () => {
      console.log(`App is running on port ${config.running_process}`);
    });
  } catch (error){
    console.error("Error connecting to MongoDB:", error);
  }
};
startServer();
