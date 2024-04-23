import express from 'express'
import routes from './routes/routes.js'
import handelError from './middleware/error.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors())
app.use(cookieParser())
app.use('/home', (req, res) => {
    res.send({ name: 'oggy' })
})

app.use(express.json())

app.use(routes)
app.use(handelError)


export default app