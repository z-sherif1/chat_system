/**
 * ChatFlow Responsive Sidebar Drawer Controller
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        const closeBtn = document.getElementById('sidebarClose');
        const backdrop = document.getElementById('sidebarBackdrop');

        if (!sidebar) return;

        function openSidebar() {
            sidebar.classList.add('is-open');
            if (backdrop) backdrop.classList.add('is-active');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('is-open');
            if (backdrop) backdrop.classList.remove('is-active');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                if (sidebar.classList.contains('is-open')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (backdrop) backdrop.addEventListener('click', closeSidebar);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
                closeSidebar();
            }
        });
    });
})();