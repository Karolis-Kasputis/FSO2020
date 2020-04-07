require('dotenv').config()
let mongoUrl = process.env.mongoUrl
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.TEST_MONGODB_URL
}

module.exports = {
    mongoUrl,
    PORT
}