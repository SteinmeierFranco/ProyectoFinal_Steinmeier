let carrito= JSON.parse(localStorage.getItem("carrito")) || [];

const jugadores= [
    {nombre: "Lionel Messi",precio:500, club:"Inter Miami",imagen:"https://http2.mlstatic.com/D_NQ_NP_924124-MLA69873290089_062023-O.webp"},
    {nombre: "Cristian Romero",precio:250, club:"Tottenham",imagen:"https://cdn11.bigcommerce.com/s-5e8c3uvulz/images/stencil/original/products/6936/19398/hero-kit-cristian-romero-mens-premier-league-tottenham-hotspur-home-shirt-202324__86749.1686202057.jpg?c=1" },
    {nombre: "Angel Di Maria",precio:350, club:"Benfica", imagen:"https://http2.mlstatic.com/D_NQ_NP_2X_810626-MLA71612072640_092023-F.webp" },
    {nombre: "Rodrigo de Paul",precio:200, club:"Atletico de Madrid",imagen:"https://images.footballfanatics.com/atletico-de-madrid/atl%C3%A9tico-de-madrid-nike-home-stadium-shirt-2023-24-kids-with-r-de-paul-5-printing_ss5_p-14403718+u-baglqm6wtk7b1ngyjuc5+v-iqgpfn8b95a91nd4jhsa.jpg?_hv=2&w=340"},
    {nombre:"Damian Martinez", precio:400, club: "Aston Villa", imagen:"https://http2.mlstatic.com/D_NQ_NP_747157-MLA48451777729_122021-O.webp"},
];

const agregar = (nombre) => {
    let jugadorencontrado=jugadores.find((jugador)=>jugador.nombre===nombre)
    carrito.push(jugadorencontrado)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    console.log(carrito)
}

// Al cargar la página, se verifica si hay elementos en el carrito en localStorage
window.addEventListener('DOMContentLoaded', () => {
  let carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      // Aca podrías mostrar los elementos del carrito en la página nuevamente
  }
});

jugadores.forEach((jugador)=>{
    let div= document.createElement("div")
    div.innerHTML= `
    <h2 class="blanco">nombre:${jugador.nombre}</h2>
    <p class="blanco"> precio: ${jugador.precio}</p>
     <b class="blanco"> ${jugador.club} </b>
     <img src=${jugador.imagen} width="400"
     height="400"/>
     <button id= "boton${jugador.nombre}">adquirir camiseta</button>
    `;
    document.body.append(div); 
    let botonadquirir = document.getElementById(`boton${jugador.nombre}`);
    botonadquirir.addEventListener("click", () => agregar(jugador.nombre));
    botonadquirir.addEventListener("click", ()=> Swal.fire({
        title: "Buen trabajo",
        text: "has adquirido una camiseta",
        icon: "success"
      }))
    console.log(jugador)
})

let botoncarrito= document.getElementById("boton");
let botonborrar= document.getElementById("boton1");

botoncarrito.addEventListener("click",()=>{
    carrito.forEach((jugador)=> {
        let div= document.createElement("div")
        div.innerHTML= `
        <h2 class="blanco">nombre:${jugador.nombre}</h2>
        <p class="blanco">precio: ${jugador.precio}</p>
         <c class="blanco">${jugador.club} </c>
         <img src=${jugador.imagen} width="400"
     height="400"/>
        `;
        document.body.append(div);  
    }); 
});

botonborrar.addEventListener("click",()=>{

 const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Estas seguro?",
  text: "No vas a poder revertirlo!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "si, vacialo!",
  cancelButtonText: "No, cancelalo!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    localStorage.clear();
    location.reload();
    swalWithBootstrapButtons.fire({
      title: "vaciado!",
      text: "Tu carrito ha sido vaciado.",
      icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelado",
      text: "tu carrito esta a salvo :)",
      icon: "error"
    });
  }
})});
  
fetch("./data.json")
  .then((response) => response.json())
  .then((response) => {
    response.forEach((publicacion) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <h2 class= "blanco">posicion: ${publicacion.posicion}</h2>
          <p class="blanco">edad: ${publicacion.edad}</p>
          <b class="blanco">apodo: ${publicacion.apodo}</b>
          <img src=${publicacion.imagen} width="400" height="400"/>
      `;
      document.body.append(li)
    });
  });