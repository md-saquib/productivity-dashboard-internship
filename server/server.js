require('dotenv').config()
const connectDb = require('./src/config/db')
const config = require('./src/config/config')
const app = require('./src/app')

connectDb();

app.listen(config.PORT, () => {
    console.log('server is live on port 3000...')
})
  