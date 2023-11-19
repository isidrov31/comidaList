require('dotenv').config()

const PORT = process.env.PORT

server.listen(PORT, function(){
    console.log("Servidor corriendo en puerto: "+ PORT)
})