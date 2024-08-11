// gestorBD.js
class GestorBD {
    constructor(conexion) {
        this.conexion = conexion;
    }

    crearBaseDeDatos(nombreBaseDeDatos) {
        const consulta = `CREATE DATABASE ${nombreBaseDeDatos}`;
        this.conexion.query(consulta, (error, resultado) => {
            if (error) {
                console.error(`Error al crear la base de datos ${nombreBaseDeDatos}:`, error);
                return;
            }
            console.log(`Base de datos ${nombreBaseDeDatos} creada`);
        });
    }

    eliminarBaseDeDatos(nombreBaseDeDatos) {
        const consulta = `DROP DATABASE ${nombreBaseDeDatos}`;
        this.conexion.query(consulta, (error, resultado) => {
            if (error) {
                console.error(`Error al eliminar la base de datos ${nombreBaseDeDatos}:`, error);
                return;
            }
            console.log(`Base de datos ${nombreBaseDeDatos} eliminada`);
        });
    }

    crearTabla(nombreBaseDeDatos, nombreTabla, columnas) {
        let columnasConsulta = columnas.map(columna => {
            if (columna.tipo === 'VARCHAR') {
                return `${columna.nombre} ${columna.tipo}(${columna.tamano}) ${columna.opciones || ''}`;
            }
            return `${columna.nombre} ${columna.tipo} ${columna.opciones || ''}`;
        }).join(', ');

        const consulta = `CREATE TABLE ${nombreBaseDeDatos}.${nombreTabla} (${columnasConsulta})`;
        this.conexion.query(consulta, (error, resultado) => {
            if (error) throw error;
            console.log(`Tabla ${nombreTabla} creada en la base de datos ${nombreBaseDeDatos}`);
        });
    }

    eliminarTabla(nombreBaseDeDatos, nombreTabla) {
        const consulta = `DROP TABLE ${nombreBaseDeDatos}.${nombreTabla}`;
        this.conexion.query(consulta, (error, resultado) => {
            if (error) {
                console.error(`Error al eliminar la tabla ${nombreTabla}:`, error);
                return;
            }
            console.log(`Tabla ${nombreTabla} eliminada`);
        });
    }

    modificarTabla(nombreTabla, modificaciones, callback) {
        let modificacionesConsulta = modificaciones.join(', ');
        const consulta = `ALTER TABLE ${nombreTabla} ${modificacionesConsulta}`;
        this.conexion.query(consulta, (error, resultado) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, resultado);
        });
    }
   

    obtenerBasesDeDatos(callback) {
        const consulta = 'SHOW DATABASES';
        this.conexion.query(consulta, (error, resultados) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, resultados);
        }); 
    }

    mostrarTablas(nombreBaseDeDatos, callback) {
        const consulta = `SHOW TABLES FROM ${nombreBaseDeDatos}`;
        this.conexion.query(consulta, (error, resultados) => {
            if (error) {
                callback(error, null);
                return;
            }
            const tablas = resultados.map(row => Object.values(row)[0]);
            callback(null, tablas);
        });
    }

    mostrarDatosTabla(nombreBaseDeDatos, nombreTabla, callback) {
        // Usa la base de datos y tabla proporcionadas
        const consulta = `SELECT * FROM ${nombreBaseDeDatos}.${nombreTabla}`;
        this.conexion.query(consulta, (error, resultados) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, resultados);
        });
    }
  


    obtenerDatoPorId(nombreBaseDeDatos, nombreTabla, id, callback) {
        const consulta = `SELECT * FROM ${nombreBaseDeDatos}.${nombreTabla} WHERE id = ?`;
        this.conexion.query(consulta, [id], (error, resultados) => {
            if (error) {
                callback(error, null);
                return;
            }
            callback(null, resultados[0]);
        });
    }

    
    
}


module.exports = GestorBD;
