import { Router } from 'express'
import fs from 'fs'
import { Contenedor } from './productos.js'

export const router = Router()
let db = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'))
const prods = new Contenedor(db)

//# Creando rutas
router.route('/').get((req, res) => {
	const getAll = prods.getAll()
	res.render('inicio', { getAll })
})

router.route('/productos').get((req, res) => {
	const getAll = prods.getAll()
	res.render('productos', { getAll })
})

// .post((req, res) => {
// 	const { title, price, thumbnail } = req.body
// 	const saveProd = prods.save({ title, price, thumbnail })

// 	res.redirect('/')
// })

router
	.route('/productos/:id')
	.get((req, res) => {
		try {
			const idProd = req.params.id
			const getById = prods.getById(Number(idProd))
			res.send(getById)
		} catch (err) {
			throw new Error('el error es:' + err.message)
		}
	})
	.delete((req, res) => {
		try {
			const idRemoved = req.params.id
			const deleteById = prods.deleteById(Number(idRemoved))
			res.send('el id eliminado es:' + idRemoved)
		} catch (err) {
			throw new Error('el error es:' + err.message)
		}
	})
	.put(async (req, res) => {
		try {
			let idPr = +req.params.id
			let index = db.findIndex((pr) => pr.id === idPr)
			let body = req.body
			let updatedProd = { ...db[index], ...body, id: idPr }
			db[index] = updatedProd
			await prods.updateProduct(db[index])
			res.send(db)
		} catch (err) {
			throw new Error('el error es:' + err.message)
		}
	})
