/**
 * ChatFlow Home Dashboard Tab Filtering
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const filterButtons = document.querySelectorAll('[data-filter-section]');
        const chatsPanel = document.querySelector('[data-section-panel="chats"]');
        const usersPanel = document.querySelector('[data-section-panel="users"]');

        if (!filterButtons.length || !chatsPanel || !usersPanel) return;

        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const target = btn.getAttribute('data-filter-section');

                filterButtons.forEach(function (b) {
                    b.classList.remove('is-active');
                });
                btn.classList.add('is-active');

                if (target === 'all') {
                    chatsPanel.classList.remove('d-none');
                    usersPanel.classList.remove('d-none');
                    chatsPanel.className = 'col-lg-6';
                    usersPanel.className = 'col-lg-6';
                } else if (target === 'chats') {
                    chatsPanel.classList.remove('d-none');
                    usersPanel.classList.add('d-none');
                    chatsPanel.className = 'col-lg-12';
                } else if (target === 'users') {
                    chatsPanel.classList.add('d-none');
                    usersPanel.classList.remove('d-none');
                    usersPanel.className = 'col-lg-12';
                }
            });
        });
    });
})();