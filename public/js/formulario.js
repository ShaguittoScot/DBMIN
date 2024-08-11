document.addEventListener('DOMContentLoaded', function() {
    let contador = 1;
    
    
    document.getElementById('agregarColumna').addEventListener('click', function() {
        contador++;
        const columnasDiv = document.getElementById('columnas');
        const nuevaColumna = document.createElement('div');
        nuevaColumna.className = 'columna';
        nuevaColumna.innerHTML = `
            <label for="nombreColumna${contador}">Nombre de la columna:</label>
            <input type="text" id="nombreColumna${contador}" name="nombreColumna[]" required>
            
            <label for="tipoColumna${contador}">Tipo de la columna:</label>
            <input type="text" id="tipoColumna${contador}" name="tipoColumna[]" required>
            
            <label for="opcionesColumna${contador}">Opciones de la columna:</label>
            <input type="text" id="opcionesColumna${contador}" name="opcionesColumna[]">
            
            <button type="button" class="btn btn-danger eliminarColumna">Eliminar</button>
        `;
        columnasDiv.appendChild(nuevaColumna);

       
        nuevaColumna.querySelector('.eliminarColumna').addEventListener('click', function() {
            columnasDiv.removeChild(nuevaColumna);
        });
    });
});
