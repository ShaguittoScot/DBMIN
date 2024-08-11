
const express = require('express');
const router = express.Router();
require('dotenv').config();
const ConexionBD = require('../db/ConexionBD');
const GestorBD = require('../db/GestorBD');


const configBD = {
    host: process.env.HOSTMYSQL,
    user: process.env.USERMYSQL,
    password: process.env.PASSWORDMYSQL
};

const conexionBD = new ConexionBD(configBD);
conexionBD.conectar();
const gestorBD = new GestorBD(conexionBD.conexion);


router.get('/', (req, res) => {
    res.render('index');
});


router.get('/basesDatos', (req, res) => {
    gestorBD.obtenerBasesDeDatos((error, resultados) => {
        if (error) {
            console.error('Error al obtener bases de datos:', error);
            res.status(500).send('Error al obtener bases de datos');
            return;
        }
        res.render('basesDeDatos', { bases: resultados });
    });
});



router.post('/crear-base-datos', (req, res) => {
    const { nombreBaseDatos } = req.body;
    gestorBD.crearBaseDeDatos(nombreBaseDatos);
    res.redirect('/');
});


router.post('/eliminar-base-datos', (req, res) => {
    const { nombreBaseDatos } = req.body;
    gestorBD.eliminarBaseDeDatos(nombreBaseDatos);
    res.redirect('/');
});



router.post('/crear-tabla', (req, res) => {
    const { nombreBaseDatos, nombreTabla, nombreColumna, tipoColumna, opcionesColumna } = req.body;

    // Combina los datos de columnas en un solo array
    const columnas = nombreColumna.map((nombre, index) => ({
        nombre: nombre,
        tipo: tipoColumna[index],
        tamano: tamanoColumna[index] || '255',
        opciones: opcionesColumna[index] || ''
    }));

    try {
        gestorBD.crearTabla(nombreBaseDatos, nombreTabla, columnas);
        res.redirect('/');
    } catch (error) {
        console.error('Error al procesar datos de columnas:', error);
        res.status(400).send('Error al procesar datos de columnas');
    }
});



router.post('/eliminar-tabla', (req, res) => {
    const { nombreBaseDatos, nombreTabla } = req.body;
    gestorBD.eliminarTabla(nombreBaseDatos, nombreTabla);
    res.redirect('/');
});


router.post('/modificar-tabla', (req, res) => {
    const nombreTabla = req.body.nombreTabla;
    const columnas = req.body.columnas;

    if (!nombreTabla || !columnas) {
        res.status(400).send('Nombre de la tabla y columnas son requeridos');
        return;
    }

    const modificaciones = columnas.map(columna => {
        return `ADD COLUMN ${columna.nombre} ${columna.tipo} ${columna.opciones || ''}`;
    });

    gestorBD.modificarTabla(nombreTabla, modificaciones, (error, resultado) => {
        if (error) {
            console.error('Error al modificar tabla:', error);
            res.status(500).send('Error al modificar tabla');
            return;
        }

        res.send('Tabla modificada exitosamente');
    });
});




router.get('/basesDatos', (req, res) => {
    conexionBD.conexion.query('SHOW DATABASES', (error, resultados) => {
        if (error) {
            console.error('Error al obtener bases de datos:', error);
            res.status(500).send('Error al obtener bases de datos');
            return;
        }
        
        res.render('basesDeDatos', { bases: resultados });
    });
});


router.post('/tablas', (req, res) => {
    const { nombreBaseDatos } = req.body;
    gestorBD.mostrarTablas(nombreBaseDatos, (error, resultados) => {
        if (error) {
            console.error('Error al obtener tablas:', error);
            res.status(500).send('Error al obtener tablas');
            return;
        }
        
        res.render('tablas', { tablas: resultados, nombreBaseDatos });
    });
});

router.post('/tablas', (req, res) => {
    const nombreBaseDeDatos = req.body.nombreBaseDatos;
    
    gestorBD.obtenerTablas(nombreBaseDeDatos, (error, tablas) => {
        if (error) {
            console.error('Error al obtener tablas:', error);
            res.status(500).send('Error al obtener tablas');
            return;
        }
        
        res.render('tablas', { tablas });
    });
});

router.get('/mostrar-datos', (req, res) => {
    const nombreBaseDeDatos = req.query.nombreBaseDeDatos;
    const nombreTabla = req.query.nombreTabla;

    gestorBD.mostrarDatosTabla(nombreBaseDeDatos, nombreTabla, (error, datos) => {
        if (error) {
            console.error('Error al obtener los datos de la tabla:', error);
            res.status(500).send('Error al obtener los datos de la tabla');
            return;
        }

        res.render('mostrarDatos', { datos, nombreBaseDeDatos, nombreTabla });
    });
});


router.get('/editar-dato', (req, res) => {
    const id = req.query.id;
    const nombreBaseDeDatos = req.query.nombreBaseDeDatos;
    const nombreTabla = req.query.nombreTabla;

    gestorBD.obtenerDatoPorId(nombreBaseDeDatos, nombreTabla, id, (error, dato) => {
        if (error) {
            console.error('Error al obtener el dato:', error);
            res.status(500).send('Error al obtener el dato');
            return;
        }

        res.render('editarDato', { dato, nombreBaseDeDatos, nombreTabla });
    });
});


router.post('/actualizar-dato', (req, res) => {
    const nombreBaseDeDatos = req.body.nombreBaseDeDatos;
    const nombreTabla = req.body.nombreTabla;
    const id = req.body.id;
    const actualizaciones = req.body;

    const campos = Object.keys(actualizaciones).filter(key => key !== 'id');
    const valores = campos.map(campo => `${campo} = ?`);
    const consulta = `UPDATE ${nombreBaseDeDatos}.${nombreTabla} SET ${valores.join(', ')} WHERE id = ?`;

    const parametros = campos.map(campo => actualizaciones[campo]);
    parametros.push(id);

    gestorBD.conexion.query(consulta, parametros, (error, resultados) => {
        if (error) {
            console.error('Error al actualizar los datos:', error);
            res.status(500).send('Error al actualizar los datos');
            return;
        }

        res.redirect(`/mostrar-datos?nombreBaseDeDatos=${nombreBaseDeDatos}&nombreTabla=${nombreTabla}`);
    });
});


module.exports = router;
