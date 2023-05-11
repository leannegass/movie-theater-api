// imports
const app = require("./app.js");
const port = 3000;

// create a listener using express from app
// The app.listen() method binds itself with the specified host and port to bind and listen for any connections

app.listen(port, () => {
    console.log(`server listening in ${port}`);
});
