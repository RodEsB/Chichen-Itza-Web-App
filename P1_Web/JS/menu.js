// menu.js
function toggleMenu() {
    const menu = document.getElementById('fullscreen-menu');
    menu.classList.toggle('active');
}

// Detectar tecla "Esc" para cerrar el menú
document.addEventListener('keydown', function(event) {
    const menu = document.getElementById('fullscreen-menu');
    if (event.key === 'Escape' && menu.classList.contains('active')) {
        toggleMenu();
    }
});
