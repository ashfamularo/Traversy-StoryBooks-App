const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

// Logging
//! morgan logs what pages are being touched
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
//! add the word .engine after exphbs
//here we set default layout that wraps around all of the body of all of the pages
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// Session Middleware
//! Must come before Passport Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))