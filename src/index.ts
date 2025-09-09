
import server from './server'  //Llamamos al servidor
import colors from 'colors'   //Llamamos a la libreia para darle colores a la consola del servidor

const port = process.env.PORT || 4000  //Definimos el puerto, si no esta entonces es 4000

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`)) 
})