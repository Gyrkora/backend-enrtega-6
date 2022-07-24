import fs from 'fs'

//# El archivo para leer
export let productsList = JSON.parse(fs.readFileSync('./productos.json'))

export class Contenedor {
	constructor(nombreArchivo) {
		this.nombreArchivo = nombreArchivo
	}

	//recibe un objeto, lo guarda en el archivo y devuelve el id asignado
	async save(obj) {
		try {
			let readJson = await fs.promises.readFile('./productos.json', 'utf-8') //lo lee como string

			let jsonParsed = await JSON.parse(readJson)
			jsonParsed.push(obj)
			readJson = await fs.promises.writeFile(
				'./productos.json',
				JSON.stringify(jsonParsed, null, 2),
				'utf-8'
			)

			let id = 0

			jsonParsed.map((producto) => {
				if (producto.id > id) id = producto.id
			})

			obj.id = id + 1
			await fs.promises.writeFile(
				'./productos.json',
				JSON.stringify(jsonParsed, null, 2)
			)
		} catch (err) {
			throw new Error(`esto es un error: ${err.message}`)
		}
	}

	//recibe un id y devuelve el objeto con ese id o null si no está
	getById(id) {
		let idReturned

		if (this.nombreArchivo) {
			idReturned = this.nombreArchivo.find((prod) => prod.id === id)
			return idReturned || null
		}
	}

	//devuelve un array con los objetos presentes en el archivo
	getAll() {
		if (this.nombreArchivo) {
			const allProducts = [...this.nombreArchivo]
			return allProducts
		} else {
			console.log('aún hay productos en el archivo')
		}
	}

	//Elimina del archivo el objeto con el id buscado
	async deleteById(removeId) {
		try {
			const newData = this.nombreArchivo.findIndex((prod) =>
				prod.id === removeId ? true : false
			)

			let removed = this.nombreArchivo.splice(newData, 1)

			await fs.promises.writeFile(
				'./productos.json',
				JSON.stringify(this.nombreArchivo, null, 2),
				'utf-8'
			)

			console.log(removed)
		} catch (err) {
			throw new Error(`esto es un error: ${err.message}`)
		}
	}

	//Elimina todos los objetos presentes en el archivo
	async deleteAll() {
		try {
			await fs.promises.writeFile('./productos.json', '[]', 'utf-8')
		} catch (err) {
			throw new Error(`esto es un error: ${err.message}`)
		}
	}

	//producto random
	async getRandomProduct() {
		try {
			let randomNum = Math.floor(Math.random() * this.nombreArchivo.length)
			const getRandom = this.nombreArchivo[randomNum]
			return getRandom
		} catch (err) {
			console.log(`hubo un error ${err.message}`)
		}
	}

	async updateProduct(updatedObj) {
		try {
			let allProds = this.getAll()
			allProds = allProds.map((item) =>
				item.id !== updatedObj.id ? item : updatedObj
			)

			await fs.promises.writeFile(
				'./productos.json',
				JSON.stringify(allProds, null, 2)
			)

			return allProds
		} catch (err) {
			console.log(err)
		}
	}
}

export const productos = new Contenedor(productsList)

//# Escritura de productos.txt

// fs.writeFile(
// 	'./productos.txt',
// 	JSON.stringify(productsList, null, 2),
// 	(err) => {
// 		if (err) throw new Error(`No se puede leer el archivo> ${err.message}`)
// 	}
// )

// productos.save(product1)
// productos.save(product2)
// productos.save(product3)
// productos.getById(2)
// productos.getAll()
// productos.deleteById(1)
// productos.deleteAll()
