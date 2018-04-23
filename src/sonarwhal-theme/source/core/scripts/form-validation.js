/* eslint-env browser */
/* eslint-disable no-var, prefer-template, strict, prefer-arrow-callback, object-shorthand */
/**
 * This script adds the attribute aria-invalid="true" to any input that has the required attribute
 * on submission instead of the default browser behavior using :invalid.
 * It will also remove that attribute once the user writes something valid on that input and changes focus.
 */
(function () {
    'use strict';

    var cleanUp = function (e) {
        var input = e.target;

        if (input.validity.valid) {
            input.removeAttribute('aria-invalid');
            input.removeEventListener('blur', cleanUp);
        }
    };

    var onSubmit = function (e) {
        var form = e.target.form;
        var inputs = form.querySelectorAll('input[required], textarea[required]');

        for (var i = 0, l = inputs.length; i < l; i++) {
            var input = inputs[i];

            if (!input.validity.valid) {
                input.setAttribute('aria-invalid', 'true');
                input.addEventListener('blur', cleanUp);
            }
        }
    };

    var checkUrl = function (field) {
        var original = field.value;

        if (!original.match(/^https?:\/\//)) {
            field.value = 'http://' + original;
        }

        return field;
    };

    var onUrlFieldBlur = function (e) {
        checkUrl(e.target);
    };

    var onUrlFieldKeyDown = function (e) {
        if (e.keyCode === 13) {
            checkUrl(e.target);
        }
    };

    var forms = document.querySelectorAll('form');
    var urlInputs = document.querySelectorAll('input[type="url"]');

    for (var i = 0, l = forms.length; i < l; i++) {
        var form = forms[i];

        form.addEventListener('invalid', onSubmit, true);
    }

    for (var j = 0, m = urlInputs.length; j < m; j++) {
        var field = urlInputs[j];

        field.addEventListener('blur', onUrlFieldBlur, true);
        field.addEventListener('keydown', onUrlFieldKeyDown, true);
    }
}());
