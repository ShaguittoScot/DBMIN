const mysql = require('mysql2');
class ConexionBD {
    constructor(configuracion) {
        this.configuracion = configuracion;
        this.conexion = null;
    }

    conectar() {
        this.conexion = mysql.createConnection(this.configuracion);
        this.conexion.connect((error) => {
            if (error) {
                console.error('Error al conectar a la base de datos:', error);
            } else {
                console.log('Conectado a la base de datos');
            }
        });
    }

    desconectar() {
        if (this.conexion) {
            this.conexion.end((error) => {
                if (error) {
                    console.error('Error al desconectar de la base de datos:', error);
                } else {
                    console.log('Desconectado de la base de datos');
                }
                const mysql = require('mysql2');

                class ConexionBD {
                    constructor(configuracion) {
                        this.configuracion = configuracion;
                        this.conexion = null;
                    }
                
                    conectar() {
                        this.conexion = mysql.createConnection(this.configuracion);
                        this.conexion.connect((error) => {
                            if (error) {
                                console.error('Error al conectar a la base de datos:', error);
                            } else {
                                console.log('Conectado a la base de datos');
                            }
                        });
                    }
                
                    desconectar() {
                        if (this.conexion) {
                            this.conexion.end((error) => {
                                if (error) {
                                    console.error('Error al desconectar de la base de datos:', error);
                                } else {
                                    console.log('Desconectado de la base de datos');
                                }
                            });
                        }
                    }
                }
                
                module.exports = ConexionBD;
                       });
        }
    }
}

module.exports = ConexionBD;
