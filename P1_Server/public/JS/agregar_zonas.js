$(document).ready(function () {
    // Manejar el envío del formulario
    $('#form-zona').submit(function (event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Obtener los datos del formulario
        const nombre = $('#nombre').val();
        const descripcion = $('#descripcion').val();
        const nivel = $('#nivel').val();

        // Validar los campos
        if (!nombre || !descripcion || !nivel) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Realizar la solicitud AJAX para agregar la zona
        $.ajax({
            url: '/api/zonas', // Endpoint del servidor
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, descripcion, nivel }),
            success: function (response) {
                alert('Zona agregada con éxito.');
                window.location.href = '/HTML/Zonas.html'; // Redirigir a la página de zonas
            },
            error: function (error) {
                console.error('Error al agregar la zona:', error);
                alert('Hubo un error al agregar la zona.');
            }
        });
    });

    // Botón cancelar
    $('.cancel-btn').click(function () {
        window.location.href = '/HTML/Zonas.html'; // Redirigir a la página de zonas
    });
});
