/**
 * ChatFlow Alert Auto-Dismissal & UI Feedback
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const dismissibleAlerts = document.querySelectorAll('[data-auto-dismiss]');
        dismissibleAlerts.forEach(function (alertEl) {
            const delay = parseInt(alertEl.getAttribute('data-auto-dismiss'), 10) || 5000;
            setTimeout(function () {
                alertEl.style.opacity = '0';
                setTimeout(function () {
                    alertEl.remove();
                }, 250);
            }, delay);
        });
    });
})();