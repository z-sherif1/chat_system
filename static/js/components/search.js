/**
 * ChatFlow Live Search Filter for Conversations and Users
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('homeSearch');
        const clearBtn = document.getElementById('searchClearBtn');
        const shortcutHint = document.getElementById('searchShortcutHint');
        const emptyState = document.getElementById('searchEmptyState');
        const queryPreview = document.getElementById('searchQueryPreview');
        const searchableItems = document.querySelectorAll('.searchable-item');

        if (!searchInput) return;

        function filterItems() {
            const query = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            if (clearBtn) {
                clearBtn.classList.toggle('is-visible', query.length > 0);
            }
            if (shortcutHint) {
                shortcutHint.style.display = query.length > 0 ? 'none' : 'inline-flex';
            }

            searchableItems.forEach(function (item) {
                const text = (item.getAttribute('data-search-text') || item.textContent).toLowerCase();
                const matches = text.includes(query);
                item.style.display = matches ? '' : 'none';
                if (matches) visibleCount += 1;
            });

            if (emptyState && searchableItems.length > 0) {
                const showEmpty = query.length > 0 && visibleCount === 0;
                emptyState.classList.toggle('is-visible', showEmpty);
                if (queryPreview) queryPreview.textContent = searchInput.value.trim();
            }
        }

        searchInput.addEventListener('input', filterItems);

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                searchInput.value = '';
                filterItems();
                searchInput.focus();
            });
        }

        // Press "/" to focus search bar quickly
        document.addEventListener('keydown', function (e) {
            const tag = document.activeElement ? document.activeElement.tagName : '';
            if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    });
})();