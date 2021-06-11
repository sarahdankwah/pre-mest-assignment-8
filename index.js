const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const passport = require('passport')
const routes = require('./routes')
const User = require('./usermodel')



const connectDB = require('./db')

const server = express()
const port = 5000
server.use(express.json())
server.use(cors())

// Parse cookies
server.use(cookieParser())
// Sessions
server.use(
  session({
    secret: "xxxxxxx",
    resave: true,
    saveUninitialized: false
  })
)
connectDB()

passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
server.use(passport.initialize())
server.use(passport.session())



server.use('/api/v1',routes)



server.listen(port, ()=> console.log("Server is running on port 5000"))