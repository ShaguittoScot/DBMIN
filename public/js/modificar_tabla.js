document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addColumn').addEventListener('click', function() {
        const container = document.getElementById('columnasContainer');
        const index = container.children.length;

        const columnHTML = `
            <div class="columnModification">
                <label for="columnaNombre${index}">Nombre de la columna:</label>
                <input type="text" id="columnaNombre${index}" name="columnas[${index}][nombre]" required>

                <label for="columnaTipo${index}">Tipo:</label>
                <input type="text" id="columnaTipo${index}" name="columnas[${index}][tipo]" required>

                <label for="columnaOpciones${index}">Opciones (opcional):</label>
                <input type="text" id="columnaOpciones${index}" name="columnas[${index}][opciones]">
                
                <button type="button" class="removeColumn">Eliminar</button>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', columnHTML);


        container.lastElementChild.querySelector('.removeColumn').addEventListener('click', function() {
            container.removeChild(this.parentElement);
        });
    });
});
