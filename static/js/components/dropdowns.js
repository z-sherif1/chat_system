/**
 * ChatFlow Custom Dropdown Controller
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const dropdowns = document.querySelectorAll('[data-dropdown]');

        function closeAllDropdowns(except) {
            dropdowns.forEach(function (dd) {
                if (dd !== except) dd.classList.remove('is-open');
            });
        }

        dropdowns.forEach(function (dropdown) {
            const toggle = dropdown.querySelector('[data-dropdown-toggle]');
            if (!toggle) return;

            toggle.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains('is-open');
                closeAllDropdowns(dropdown);
                dropdown.classList.toggle('is-open', !isOpen);
            });
        });

        document.addEventListener('click', function () {
            closeAllDropdowns(null);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllDropdowns(null);
        });
    });
})();