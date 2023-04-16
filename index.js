const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const titulo = document.getElementById("titulo")

//click sobre el boton ingresar
formulario.onsubmit = (e)=>{
  e.preventDefault()
  const infoUsuario = {
      nombre:inputNombre.value,
      apellido: inputApellido.value
  }
  localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario))
  formulario.remove()
  titulo.innerText = `BIENVENIDO ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

const infoUsuario = JSON.parse (localStorage.getItem("infoUsuario"))
if(infoUsuario){
  formulario.remove()
  titulo.innerText = `BIENVENIDO ${infoUsuario.nombre} ${infoUsuario.apellido}`

}









//recuperar elementos del DOM
const divProductos =document.getElementById("productos")
const botonFinalizar = document.getElementById("finalizar")
//funcion que ejecute el fetch
const fetchProducts = async()=>{
  const productsApi =await fetch('https://fakestoreapi.com/products')
  const productsJSON =await productsApi.json()
  //console.log(productsJSON);
  return productsJSON
}


// FUNCION PRA RENDERIZAR LOS PRODUCTOS

 const renderproducts = async()=>{
  const products = await fetchProducts()
  products.forEach((prod)=>{
    const{id, title, price, category, image} = prod
    divProductos.innerHTML+=`
    <div class="card cardProducto">
  <img src="${image}" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${price} ${category}</p>
    <button id=${id}>AGREGAR</button>
  </div>
</div>
    `
  }
  )
 }
renderproducts()
   
