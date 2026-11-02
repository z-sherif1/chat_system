/**
 * ChatFlow Theme Controller
 * Persists Light/Dark appearance across sessions via localStorage.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'chatflow_theme';

    function updateThemeUI(theme) {
        const icons = document.querySelectorAll('[data-theme-icon]');
        const labels = document.querySelectorAll('[data-theme-label]');

        icons.forEach(function (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
        });

        labels.forEach(function (label) {
            label.textContent = theme === 'dark' ? 'Light Appearance' : 'Dark Appearance';
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {}
        updateThemeUI(theme);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateThemeUI(currentTheme);

        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                setTheme(active === 'dark' ? 'light' : 'dark');
            });
        });
    });
})();