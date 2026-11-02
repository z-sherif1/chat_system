/**
 * ChatFlow Password Visibility Toggle
 * Automatically enhances Django {{ form.as_p }} password inputs.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const passwordInputs = document.querySelectorAll('input[type="password"]');

        passwordInputs.forEach(function (input) {
            if (input.parentElement.classList.contains('password-input-wrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'password-input-wrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle-btn';
            toggleBtn.setAttribute('aria-label', 'Show password');
            toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';

            toggleBtn.addEventListener('click', function () {
                const isPassword = input.getAttribute('type') === 'password';
                input.setAttribute('type', isPassword ? 'text' : 'password');
                toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
                toggleBtn.innerHTML = isPassword
                    ? '<i class="bi bi-eye-slash"></i>'
                    : '<i class="bi bi-eye"></i>';
            });

            wrapper.appendChild(toggleBtn);
        });
    });
})();