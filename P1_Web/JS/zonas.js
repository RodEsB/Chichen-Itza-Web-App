$(document).ready(function () {
    // Cargar datos de zonas al cargar la página
    cargarZonas();

    // Función para cargar las zonas desde la API
    function cargarZonas() {
        $.ajax({
            url: '/api/zonas', // URL de la API para obtener zonas
            method: 'GET',
            success: function (zonas) {
                const tbody = $('#zonas-body');
                tbody.empty(); // Limpiar la tabla antes de rellenarla

                // Iterar sobre las zonas recibidas y añadirlas a la tabla
                zonas.forEach(zona => {
                    tbody.append(`
                        <tr>
                            <td><input type="checkbox" class="select-zone" data-id="${zona.id}"></td>
                            <td>${zona.nivel}</td>
                            <td>${zona.nombre}</td>
                            <td>${zona.descripcion}</td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error('Error al cargar las zonas:', error);
                alert('Hubo un problema al cargar las zonas.');
            }
        });
    }

    // Seleccionar o deseleccionar todas las zonas
    $('#select-all').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.select-zone').prop('checked', isChecked);
    });

    // Manejar el botón de eliminar selección
    $('.delete-btn').click(function () {
        const seleccionadas = [];
        $('.select-zone:checked').each(function () {
            seleccionadas.push($(this).data('id')); // Obtener los IDs seleccionados
        });

        if (seleccionadas.length === 0) {
            alert('Por favor, selecciona al menos una zona para eliminar.');
            return;
        }

        // Confirmar antes de eliminar
        if (!confirm('¿Estás seguro de que deseas eliminar las zonas seleccionadas?')) {
            return;
        }

        // Realizar la solicitud AJAX para eliminar las zonas
        $.ajax({
            url: '/api/zonas',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ ids: seleccionadas }),
            success: function (response) {
                alert('Zonas eliminadas con éxito.');
                cargarZonas(); // Recargar la tabla
            },
            error: function (error) {
                console.error('Error al eliminar las zonas:', error);
                alert('Hubo un problema al eliminar las zonas.');
            }
        });
    });
});
