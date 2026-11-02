/**
 * ChatFlow Chat Details Controller
 * Handles smooth auto-scroll to latest message and input focus while keeping native Django POST.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const messagesContainer = document.getElementById('chatMessages');
        const scrollBottomBtn = document.getElementById('scrollBottomBtn');
        const scrollMenuBtn = document.getElementById('scrollToBottomMenuBtn');
        const messageInput = document.getElementById('chatMessageInput');
        const messageForm = document.getElementById('chatMessageForm');

        function scrollToBottom(smooth) {
            if (!messagesContainer) return;
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }

        // Scroll to latest message immediately on page load
        scrollToBottom(false);

        if (messageInput) {
            messageInput.focus();
        }

        if (messagesContainer && scrollBottomBtn) {
            messagesContainer.addEventListener('scroll', function () {
                const distanceFromBottom =
                    messagesContainer.scrollHeight -
                    messagesContainer.scrollTop -
                    messagesContainer.clientHeight;

                scrollBottomBtn.classList.toggle('is-visible', distanceFromBottom > 140);
            });

            scrollBottomBtn.addEventListener('click', function () {
                scrollToBottom(true);
            });
        }

        if (scrollMenuBtn) {
            scrollMenuBtn.addEventListener('click', function () {
                scrollToBottom(true);
            });
        }

        // Prevent empty whitespace-only submissions before native POST
        if (messageForm && messageInput) {
            messageForm.addEventListener('submit', function (e) {
                if (!messageInput.value.trim()) {
                    e.preventDefault();
                    messageInput.focus();
                }
            });
        }
    });
})();