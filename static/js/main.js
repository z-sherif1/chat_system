/**
 * ChatFlow Global Initializer
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // Smooth scroll for in-page navigation links (e.g., #discover-users)
        document.querySelectorAll('[data-nav-scroll]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                const selector = link.getAttribute('data-nav-scroll');
                const target = selector ? document.querySelector(selector) : null;
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
})();