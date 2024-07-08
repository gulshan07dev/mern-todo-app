import app from "./app";
import connectToDb from "./config/db.confg";
const PORT = process.env.PORT || 600;

connectToDb()
  .then(() => {
    app
      .listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
      })
      .on("error", (err) => {
        console.log(`Server Error: ${err}`);
      });
  })
  .catch((err) => {
    console.log(`MONGODB CONNECTION Failed: ${err.message}`);
  });
