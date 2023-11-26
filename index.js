require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const path = require('path');


mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("conexion exitosa a la BBDD")
})
.catch((error) => console.log("hubo un error al conectarse a la BBDD", { error}))

const comidaSkema = new Schema({
  name: String,
  type: String,
  done: Boolean
})

const Comida = mongoose.model("anime", comidaSkema, "dbComidas")


app.use(bodyParser.json());

//Servir archivos estaticos
app.use(express.static('public'))
// Sirve archivos estáticos de FontAwesome desde node_modules
app.use('/static/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));



//Configurar Rutas//

app.get('/api/comidas', (req, res) => {
 Comida.find()
 .then((comidas) => {
  res.status(200).json({ok:true, data: comidas})
 })
 .catch((error) => {
  res
      .status(400)
      .json({ok: false, message: "Hubo un problema al obtener las comidas"})
 })
})

app.post('/api/comidas', (req, res) => {
  const body = req.body
  console.log({ body })
  Comida.create({
    name: body.name,
    type: body.type,
    done: false,
  }).then((createdComida)=>{
    res
    .status(201)
    .json ({ ok:true, message: "Comida agregada con exito", data: createdComida})
  }).catch((error) => {
    res.status(400).json({ok:false, message:"Error al agregar la comida"})
  })
})

app.put('/api/comidas/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  console.log({ body })
  Comida.findByIdAndUpdate(id,{
    name: body.name,
    type: body.type,
  }).then((updatedComida)=>{
    res
    .status(200)
    .json ({ ok:true, message: "Comida actualizada con exito", data: updatedComida})
  }).catch((error) => {
    res.status(400).json({ok:false, message:"Error al actualizar la comida"})
  })
})

app.delete('/api/comidas/:id', (req, res) => {
  const id = req.params.id
  Comida.findByIdAndDelete(id).then((deletedComida) => {
    res.status(200).json({ok:true, data: deletedComida })
  }).catch(() =>{
    res.status(400).json({ok:false, message: "Hubo un error al eliminar la tarea"})
  })
})



//Configurar Puerto//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})