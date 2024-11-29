$(document).ready(function () {
    // Cargar datos de participantes al cargar la página
    cargarParticipantes();

    // Función para cargar los participantes desde la API
    function cargarParticipantes() {
        $.ajax({
            url: '/api/participantes', // URL de la API para obtener participantes
            method: 'GET',
            success: function (participantes) {
                const tbody = $('#participantes-body');
                tbody.empty(); // Limpiar la tabla antes de rellenarla

                // Iterar sobre los participantes recibidos y añadirlos a la tabla
                participantes.forEach(participante => {
                    tbody.append(`
                        <tr>
                            <td><input type="checkbox" class="select-participant" data-id="${participante.id}"></td>
                            <td>${participante.rol}</td>
                            <td>${participante.nombre}</td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error('Error al cargar los participantes:', error);
                alert('Hubo un problema al cargar los participantes.');
            }
        });
    }

    // Seleccionar o deseleccionar todos los participantes
    $('#select-all').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.select-participant').prop('checked', isChecked);
    });

    // Manejar el botón de eliminar selección
    $('.delete-btn').click(function () {
        const seleccionados = [];
        $('.select-participant:checked').each(function () {
            seleccionados.push($(this).data('id')); // Obtener los IDs seleccionados
        });

        if (seleccionados.length === 0) {
            alert('Por favor, selecciona al menos un participante para eliminar.');
            return;
        }

        // Confirmar antes de eliminar
        if (!confirm('¿Estás seguro de que deseas eliminar los participantes seleccionados?')) {
            return;
        }

        // Realizar la solicitud AJAX para eliminar los participantes
        $.ajax({
            url: '/api/participantes',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ ids: seleccionados }),
            success: function (response) {
                alert('Participantes eliminados con éxito.');
                cargarParticipantes(); // Recargar la tabla
            },
            error: function (error) {
                console.error('Error al eliminar los participantes:', error);
                alert('Hubo un problema al eliminar los participantes.');
            }
        });
    });
});
