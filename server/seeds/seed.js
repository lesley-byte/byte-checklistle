const db = require("../config/connection");
// require all models
const { Checklist } = require("../models");

const checklistData = require("./checklistData.json");

db.once("open", async () => {
  // delete all existing data
  await Checklist.deleteMany({});

  // create new data
  const checklists = await Checklist.insertMany(checklistData);

  console.log("all done!");
  process.exit(0);
});
