
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server  on port ${port}`);
})
