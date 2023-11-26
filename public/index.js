//obtengo los elementos del html
const addComida = document.getElementById("addComida");
const nombreComida = document.getElementById("nombreComida");
const tipoComida = document.getElementById("tipoComida");
const comidasAgregadas = document.getElementById("comidasAgregadas")

const baseUrl = `${window.origin}/api`
let comidaEdit = null

//le doy funcionalidad a los botones


addComida.addEventListener("click", function(){
    const creating = !comidaEdit
    console.log("Agregar Comida")
    console.log({nombreComida})
    console.log({tipoComida})
    const path = creating ? "comidas" : `comidas/${comidaEdit._id}`
    const method = creating ? "POST" : "PUT"

    fetch(`${baseUrl}/${path}`,{
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombreComida.value, type: tipoComida.value }),
    })
    .then((res) => {
        getComidas()
        addComida.innerText = "Agregar Comida"
        console.log({ res })
        return res.json()
    })
    .then((resJSON) => {
        console.log({ resJSON })
    })
    .catch((error) => {
        console.log("Error al realizar la solicitud:", error);
    });
});

function getComidas(){
    comidasAgregadas.innerHTML = null
    nombreComida.value = ""
    fetch(`${baseUrl}/comidas`)
    .then((res) => {
        console.log({ res })
        return res.json()
    })
    .then((resJSON) => {
        console.log({ resJSON })
        const comidas = resJSON.data
        console.log(comidas)
        for (const comida of comidas) {
            const deleteComidaBtn = document.createElement('button')
            const comidaContainer = document.createElement('div');
            deleteComidaBtn.innerText = "Borrar"

            // Mostrar el nombre de la comida
            const nombreParagraph = document.createElement('p');
            nombreParagraph.innerText = `${comida.name}`;
            comidaContainer.appendChild(nombreParagraph);

            // Agregar estilos de Bs5
            comidaContainer.classList.add('card', 'mb-3', 'col-md-2', 'cardComida');
            deleteComidaBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'delete-button');

            //Agregar icono
            deleteComidaBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

            // Editar comida
            nombreParagraph.addEventListener("click", (e) =>{
                nombreComida.value = comida.name
                addComida.innerHTML = "Modificar Comida"
                comidaEdit = comida
                console.log ({ comidaEdit })

            })

            // Mostrar el tipo de la comida
            const tipoParagraph = document.createElement('p');
            tipoParagraph.innerText = `Tipo: ${comida.type}`;
            comidaContainer.appendChild(tipoParagraph);

            // Configurar el ID
            deleteComidaBtn.setAttribute('id', comida._id);

            // funcion delete
            deleteComidaBtn.addEventListener("click", function(e){
                comidaid = e.target.id
                deleteComidaBtn.innerText="..."
                fetch(`${baseUrl}/comidas/${comidaid}`, {
                    method: "DELETE",
                }).then(() => {
                const comidaDivDelete =  deleteComidaBtn.parentElement
                comidaDivDelete.remove()
                })
            })

            // Agregar el contenedor de comida al elemento contenedor en tu HTML
            comidasAgregadas.appendChild(comidaContainer);
            comidaContainer.appendChild(deleteComidaBtn);
        }
    });
}

getComidas()