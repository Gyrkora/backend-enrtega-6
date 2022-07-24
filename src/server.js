import express from 'express'
import { router } from './routes.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { Contenedor, productsList } from './productos.js'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

//# varibles generales
const products = new Contenedor(productsList)

//# MWs
const PORT = 8080
const __dirname = process.cwd()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(cors())

app.use(express.static('../public'))
app.get('/', (req, res) => {
	res.sendFile('inicio', { root: __dirname })
})

//# Engine
app.set('view engine', 'ejs')

//# views
app.set('views', '../public')

io.on('connection', (socket) => {
	console.log('usuario connected !')

	socket.on('productRequest', () => {
		const getAll = products.getAll()
		socket.emit('saveProd', getAll) //manda data
	})

	socket.on('addProd', async (data) => {
		const saved = await products.save(data)
		const allProds = products.getAll()
		io.sockets.emit('saveProd', saved)
	})
})

//# levantando
httpServer.listen(PORT, () => console.log('SERVER UP'))
