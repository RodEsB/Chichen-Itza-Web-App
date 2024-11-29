$(document).ready(function () {
    // Manejar el envío del formulario
    $('#form-participante').submit(function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Obtener los datos del formulario
        const nombre = $('#nombre').val();
        const rol = $('#avatar').val();

        // Validar los campos
        if (!nombre || !rol) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Realizar la solicitud AJAX para agregar el participante
        $.ajax({
            url: '/api/participantes', // Endpoint del servidor
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, rol }),
            success: function (response) {
                alert('Participante agregado con éxito.');
                window.location.href = '/HTML/Avatar.html'; // Redirigir a la página de participantes
            },
            error: function (error) {
                console.error('Error al agregar participante:', error);
                alert('Hubo un error al agregar el participante.');
            }
        });
    });

    // Botón cancelar
    $('.cancel-btn').click(function () {
        window.location.href = '/HTML/Avatar.html'; // Redirigir a la página de participantes
    });
});
