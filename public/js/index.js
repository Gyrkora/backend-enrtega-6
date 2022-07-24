// cliente socket.io
const socket = io()
// import productos from '../productos.ejs'

// const productContainer = document.querySelector('#productContainer')
const titleProd = document.getElementsByClassName('titulo').value
const priceProd = document.getElementsByClassName('precio').value
const imgProd = document.getElementsByClassName('foto').value
const body = document.querySelector('body')

//formulario de ingreso de productos
const productForm = $('#formNewProduct')
//la tabla del output
const productContainer = $('#productContainer')

socket.emit('productRequest')

productForm.submit((event) => {
	event.preventDefault()

	const newProduct = {
		title: productForm[0][0].value,
		price: productForm[0][1].value,
		foto: productForm[0][2].value,
	}

	socket.emit('addProd', newProduct)
	productForm.trigger('reset')
})

function renderProd(data) {
	const html = data
		.map((elem) => {
			return `<div>
	    <strong>${elem.title}</strong>:
	    <em>${elem.price}</em> </div>`
		})
		.join(' ')

	productContainer.append(html)
}

socket.on('saveProd', (data) => {
	renderProd(data)
})

// function addProd(e) {
// 	const newProd = {
// 		// title: titleProd ? titleProd : 'No Title',
// 		// price: priceProd ? priceProd : 0,
// 		// thumbnail: imgProd ? imgProd : 'No image',

// 		title: document.getElementById('titulo').value,
// 		price: document.getElementById('precio').value,
// 		thumbnail: document.getElementById('foto').value,
// 	}

// 	socket.emit('new-Prod', newProd)
// 	console.log(newProd)
// 	return false //e.prevent.default
// }

// async function productListHandler(getAll) {
// 	const productLayout = await fetch('productos.handlerbars')
// 	const layoutText = await productLayout.text()
// 	const compiledHbsTemplate = Handlebars.compile(layoutText)
// 	const html = compiledHbsTemplate({ getAll })
// 	productContainer.empty().append(html)
// }

// socket.on('saveProd', productListHandler)

// const newProd = {
// 	title: titleProd,
// 	precio: priceProd,
// 	foto: ImgProd,
// }

// productContainer2.innerHTML = JSON.stringify(newProd)
// console.log(typeof newProd.title)

// function addProd() {
// 	// event.preventDefault()

// 	const newProd = {
// 		title: titleProd.value,
// 		precio: priceProd.value,
// 		foto: ImgProd.value,
// 	}

// 	productContainer2.innerHTML = newProd.title

// 	socket.emit('new-Prod', newProd)
// 	productForm.trigger('reset')
// 	return false
// }
