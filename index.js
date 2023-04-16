
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

fetchProducts()
// FUNCION PRA RENDERIZAR LOS PRODUCTOS

 const renderproducts = async()=>{
  const products = await fetchProducts()
  products.forEach((prod)=>{
    const{id, title, price, category, image} = prod
    divProductos.innerHTML+=`
    <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
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
   
