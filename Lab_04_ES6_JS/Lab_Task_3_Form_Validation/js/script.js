/* ========================================
   Task 3 – Multi-Step Registration Wizard
   jQuery blur / input validation, step transitions,
   password rules, show/hide toggle, inline errors
   M Ehtisham Amjad | BSSE-VI-B | 231996
   ======================================== */

$(document).ready(function () {

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_RE = /^\+?\d[\d\s\-]{7,15}$/;

    let currentStep = 1;

    // ── Helper: set field state ──
    const setValid   = ($el, iconId) => { $el.removeClass('invalid').addClass('valid'); $(iconId).html('&#10003;').removeClass('icon-err').addClass('icon-ok'); };
    const setInvalid = ($el, iconId, msg, errId) => { $el.removeClass('valid').addClass('invalid'); $(iconId).html('&#10007;').removeClass('icon-ok').addClass('icon-err'); $(errId).text(msg); };
    const clearState = ($el, iconId, errId) => { $el.removeClass('valid invalid'); $(iconId).html(''); $(errId).text(''); };

    // ────────── STEP 1 VALIDATORS ──────────
    const validateName = () => {
        const v = $.trim($('#nameInput').val());
        if (!v) { setInvalid($('#nameInput'), '#nameIcon', 'Full name is required.', '#nameError'); return false; }
        if (v.length < 2) { setInvalid($('#nameInput'), '#nameIcon', 'At least 2 characters.', '#nameError'); return false; }
        setValid($('#nameInput'), '#nameIcon'); $('#nameError').text(''); return true;
    };

    const validateEmail = () => {
        const v = $.trim($('#emailInput').val());
        if (!v) { setInvalid($('#emailInput'), '#emailIcon', 'Email is required.', '#emailError'); return false; }
        if (!EMAIL_RE.test(v)) { setInvalid($('#emailInput'), '#emailIcon', 'Enter a valid email.', '#emailError'); return false; }
        setValid($('#emailInput'), '#emailIcon'); $('#emailError').text(''); return true;
    };

    const validatePhone = () => {
        const v = $.trim($('#phoneInput').val());
        if (!v) { setInvalid($('#phoneInput'), '#phoneIcon', 'Phone number is required.', '#phoneError'); return false; }
        if (!PHONE_RE.test(v)) { setInvalid($('#phoneInput'), '#phoneIcon', 'Enter a valid phone number.', '#phoneError'); return false; }
        setValid($('#phoneInput'), '#phoneIcon'); $('#phoneError').text(''); return true;
    };

    // ────────── STEP 2 VALIDATORS ──────────
    const updatePwRules = (pw) => {
        const rules = [
            { id: '#ruleLen',     pass: pw.length >= 8 },
            { id: '#ruleUpper',   pass: /[A-Z]/.test(pw) },
            { id: '#ruleNum',     pass: /[0-9]/.test(pw) },
            { id: '#ruleSpecial', pass: /[^A-Za-z0-9]/.test(pw) }
        ];
        let score = 0;
        rules.forEach(r => {
            if (r.pass) { $(r.id).addClass('met'); score++; }
            else        { $(r.id).removeClass('met'); }
        });
        return score;
    };

    const strengthMeta = [
        { w: '0%',   c: '#d8dee4', l: '' },
        { w: '25%',  c: '#dc2626', l: 'Weak' },
        { w: '50%',  c: '#ea580c', l: 'Fair' },
        { w: '75%',  c: '#eab308', l: 'Good' },
        { w: '100%', c: '#16a34a', l: 'Strong' }
    ];

    const validatePassword = () => {
        const pw = $('#passwordInput').val();
        if (!pw) { $('#passwordError').text('Password is required.'); $('#passwordInput').addClass('invalid').removeClass('valid'); updatePwRules(''); $('#strengthFill').css({ width: '0%' }); $('#strengthLabel').text(''); return false; }
        if (pw.length < 8) { $('#passwordError').text('Minimum 8 characters.'); $('#passwordInput').addClass('invalid').removeClass('valid'); }
        else { $('#passwordError').text(''); $('#passwordInput').removeClass('invalid').addClass('valid'); }

        const score = updatePwRules(pw);
        const m = strengthMeta[score];
        $('#strengthFill').css({ width: m.w, background: m.c });
        $('#strengthLabel').text(m.l).css('color', m.c);

        return pw.length >= 8 && score >= 2;
    };

    const validateConfirm = () => {
        const pw = $('#passwordInput').val();
        const cf = $('#confirmInput').val();
        if (!cf) { setInvalid($('#confirmInput'), '#confirmIcon', 'Please confirm your password.', '#confirmError'); return false; }
        if (cf !== pw) { setInvalid($('#confirmInput'), '#confirmIcon', 'Passwords do not match.', '#confirmError'); return false; }
        setValid($('#confirmInput'), '#confirmIcon'); $('#confirmError').text(''); return true;
    };

    // ────────── STEP 3 VALIDATOR ──────────
    const validateStep3 = () => {
        let ok = true;
        if (!$('#termsCheck').is(':checked')) { $('#termsError').text('You must agree to the terms.'); ok = false; }
        else { $('#termsError').text(''); }
        return ok;
    };

    // ────────── SHOW / HIDE PASSWORD ──────────
    $('#togglePw').on('click', function () {
        const $pw = $('#passwordInput');
        const isPw = $pw.attr('type') === 'password';
        $pw.attr('type', isPw ? 'text' : 'password');
        $(this).html(isPw ? '&#128064;' : '&#128065;');
    });

    // ────────── BIO CHARACTER COUNTER ──────────
    $('#bioInput').on('input', function () {
        $('#bioCount').text($(this).val().length);
    });

    // ────────── BLUR EVENTS ──────────
    $('#nameInput').on('blur', validateName);
    $('#emailInput').on('blur', validateEmail);
    $('#phoneInput').on('blur', validatePhone);
    $('#passwordInput').on('blur input', validatePassword);
    $('#confirmInput').on('blur input', validateConfirm);

    // ────────── STEP NAVIGATION ──────────
    const goToStep = (step) => {
        $(`.step-panel[data-step="${currentStep}"]`).fadeOut(200, function () {
            $(`.step-panel[data-step="${step}"]`).fadeIn(300);
        });

        // Update step dots
        $('.step-dot').each(function () {
            const s = $(this).data('step');
            $(this).toggleClass('active', s <= step).toggleClass('done', s < step);
        });
        // Lines
        $('.step-line').each(function (i) {
            $(this).toggleClass('active', i + 1 < step);
        });
        currentStep = step;
    };

    // Next buttons (validate current step)
    $('.next-step-btn').on('click', function () {
        const nextStep = $(this).data('next');

        if (currentStep === 1) {
            const a = validateName(), b = validateEmail(), c = validatePhone();
            if (!(a && b && c)) return;
        }
        if (currentStep === 2) {
            const a = validatePassword(), b = validateConfirm();
            if (!(a && b)) return;
        }

        goToStep(nextStep);
    });

    // Back buttons
    $('.prev-step-btn').on('click', function () { goToStep($(this).data('prev')); });

    // ────────── FORM SUBMISSION ──────────
    $('#wizardForm').on('submit', function (e) {
        e.preventDefault();
        if (!validateStep3()) return;

        const name = $.trim($('#nameInput').val());
        $('#successName').text(name.split(' ')[0]);

        $('#wizardForm').fadeOut(300, function () {
            $('#successMessage').fadeIn(400);
            // Also hide step indicators
            $('.step-indicators').fadeOut(200);
        });
    });

    // ────────── RESET ──────────
    $('#resetBtn').on('click', function () {
        $('#successMessage').fadeOut(200, function () {
            $('#wizardForm')[0].reset();
            // Clear all states
            $('input').removeClass('valid invalid');
            $('.field-icon').html('').removeClass('icon-ok icon-err');
            $('.error-msg').text('');
            $('#strengthFill').css({ width: '0%' });
            $('#strengthLabel').text('');
            $('#bioCount').text('0');
            $('.pw-rules li').removeClass('met');

            // Reset steps
            currentStep = 1;
            $('.step-panel').hide();
            $('.step-panel[data-step="1"]').show();
            $('.step-dot').removeClass('active done');
            $('.step-dot[data-step="1"]').addClass('active');
            $('.step-line').removeClass('active');
            $('.step-indicators').fadeIn(200);
            $('#wizardForm').fadeIn(300);
        });
    });
});
