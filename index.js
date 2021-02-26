require('dotenv').config();
const app = require('./app')
 app.listen(process.env.PORT, () => {
    console.log(`millionaire quiz app listening at port: ${process.env.PORT}`)
})
