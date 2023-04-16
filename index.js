const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const titulo = document.getElementById("titulo")

//click sobre el boton ingresar
formulario.onsubmit = (e) => {
  e.preventDefault()
  const infoUsuario = {
    nombre: inputNombre.value,
    apellido: inputApellido.value
  }
  localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario))

  titulo.innerText = `BIENVENIDO ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

const infoUsuario = JSON.parse(localStorage.getItem("infoUsuario"))
if (infoUsuario) {

  titulo.innerText = `BIENVENIDO ${infoUsuario.nombre} ${infoUsuario.apellido}`

}








//recuperar elementos del DOM
const divProducts = document.getElementById("productos")
const finishButton = document.getElementById("finalizar")

//funcion que ejecute el fetch de todos los productos 
const fetchProducts = async () => {
  const productsApi = await fetch('https://fakestoreapi.com/products')
  const productsJSON = await productsApi.json()
  //console.log(productsJSON);
  return productsJSON
}

//FUNCION QUE EJECUTE EL FETCH DE UN SOLO PRODUCTO
const fetchOneProduct = async (id) => {
  const productApi = await fetch(`https://fakestoreapi.com/products${id}`)
  const productJSON = await productApi.json()
  //console.log(productJSON)
  return productJSON
}
// FUNCION PRA RENDERIZAR LOS PRODUCTOS

const renderproducts = async () => {
  const products = await fetchProducts()
  products.forEach((prod) => {
    const { id, title, price, category, image } = prod
    divProducts.innerHTML += `
    <div class="card cardProducto">
  <img src="${image}" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${price} ${category}</p>
    <button id=${id} onclick="addProduct(${id})">AGREGAR</button>
  </div>
</div> `
  })
}
renderproducts()

//colocar producto en carrito
const cart = []

const addProduct = async (id)=>{
  const product = await fetchOneProduct(id)
  const searchProductCart = cart.find(prod=>prod.id === product.id)
  if (!searchProductCart) {
    cart.push({
      id: product.id,
      name:product.title,
      quantity:1,
      price: product.price
    })
  } else {
    searchProductCart.quantity++
  }
  console.log(cart)
}
