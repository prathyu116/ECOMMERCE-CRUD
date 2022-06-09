const app = require("./index");
const connect = require("./configs/db");

app.listen(5000, async () => {
  try {
    await connect();
    console.log(" connected successfully...");
  } catch (err) {
    console.log("error:", err);
  }
});
