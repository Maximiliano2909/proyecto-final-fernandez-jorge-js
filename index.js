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
document.addEventListener("DOMContentLoaded",()=> {
  cart =JSON.parse(localStorage.getItem("cart"))
})

//funcion que ejecute el fetch de todos los productos 
const fetchProducts = async () => {
  const productsApi = await fetch('https://fakestoreapi.com/products')
  const productsJSON = await productsApi.json()
  //console.log(productsJSON);
  return productsJSON
}

//FUNCION QUE EJECUTE EL FETCH DE UN SOLO PRODUCTO
const fetchOneProduct = async (id) => {
  const productApi = await fetch(`https://fakestoreapi.com/products/${id}`)
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
    <button id=${id} onclick="removeProduct(${id})">QUITAR</button>
  </div>
</div> `
  })
}
renderproducts()

//colocar producto en carrito
let cart = []

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
  messageAddProduct()
  guardarStorage()
  console.log(cart)
}

const removeProduct = (id)=>{
  const searchProductCart = cart.find((prod)=>prod.id === id)
  if (!searchProductCart) {
    messageNoProduct()
  } else {
    if (searchProductCart.quantity === 1){
cart = cart.filter((prod)=> prod.id !==id)
    } else{
      searchProductCart.quantity--
    }
     messageRemoveProduct() 
  }
  console.log(cart)
}

const messageAddProduct = ()=>{
  Swal.fire({
    text:"product added",
    timer:1000
  })
}
const messageRemoveProduct = ()=>{
  Swal.fire({
    text:"product removed",
    timer:1000
  })
}

const messageNoProduct = ()=>{
  Swal.fire({
    text:"you dont have this product inyour cart",
    timer:1000
  })
}

function guardarStorage(){
  localStorage.setItem("cart", JSON.stringify(cart))
}












const botonFinalizar = document.querySelector("#finalizar")
const thead = document.querySelector("#thead")
const tbody = document.querySelector("#tbody")
const parrafoTotal = document.querySelector("#total")
botonFinalizar.onclick = ()=>{
    divProducts.remove()
    botonFinalizar.remove()
    thead.innerHTML = `<tr>
    <th scope="col">PRODUCTO</th>
    <th scope="col">CANTIDAD</th>
    <th scope="col">TOTAL</th>
  </tr>`
let totalCompra = 0




cart.forEach(products=>{
  
  totalCompra+= products.cantidad*products.precio
  tbody.innerHTML+=`<tr>
  <th scope="row">${products.nombre}</th>
    <td>${products.cantidad}</td>
    <td>${cantidad*precio}</td>
  
</tr>
`
  })
parrafoTotal.innerHTML = `El total de tu compra es ${totalCompra}`
}


