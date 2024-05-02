import express from 'express'
import routes from './routes/routes.js'
import handelError from './middleware/error.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import {engine } from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.engine('handlebars', engine ());
// app.set('view engine', 'handlebars');

app.set('views', join(__dirname, 'templates', 'email'));

app.use(cors())
app.use(cookieParser())
app.use('/home', (req, res) => {
    res.send({ name: 'oggy' })
})

app.use(express.json())

app.use(routes)
app.use(handelError)


export default app