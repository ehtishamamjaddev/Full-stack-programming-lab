/* ========================================
   Task 5 – Chained Style Editor
   jQuery chaining for multiple style changes
   ======================================== */

$(document).ready(function () {

    // Track current toggle states
    let isBold = false;
    let isItalic = false;

    // Font size buttons – use jQuery chaining to apply size
    $('#sizeSmall').on('click', function () {
        $('#previewText').css('fontSize', '13px').css('lineHeight', '1.7');
        updateActiveSizeBtn(this);
    });

    $('#sizeMedium').on('click', function () {
        $('#previewText').css('fontSize', '16px').css('lineHeight', '1.7');
        updateActiveSizeBtn(this);
    });

    $('#sizeLarge').on('click', function () {
        $('#previewText').css('fontSize', '20px').css('lineHeight', '1.6');
        updateActiveSizeBtn(this);
    });

    $('#sizeXLarge').on('click', function () {
        $('#previewText').css('fontSize', '26px').css('lineHeight', '1.5');
        updateActiveSizeBtn(this);
    });

    // Helper to update active state on size buttons
    const updateActiveSizeBtn = (activeBtn) => {
        $('#sizeSmall, #sizeMedium, #sizeLarge, #sizeXLarge').removeClass('active');
        $(activeBtn).addClass('active');
    };

    // Text color – chain css and highlight active swatch
    $('.color-swatch').on('click', function () {
        const color = $(this).data('color');

        // Apply color using chaining
        $('#previewText')
            .css('color', color)
            .css('transition', 'color 0.3s ease');

        // Highlight active swatch
        $('.color-swatch').removeClass('active');
        $(this).addClass('active');
    });

    // Background color – chain css on the preview card
    $('.bg-swatch').on('click', function () {
        const bgColor = $(this).data('bg');

        // Apply background using chaining
        $('.preview-card')
            .css('backgroundColor', bgColor)
            .css('transition', 'background-color 0.3s ease');

        // Highlight active swatch
        $('.bg-swatch').removeClass('active');
        $(this).addClass('active');
    });

    // Bold toggle
    $('#boldToggle').on('click', function () {
        isBold = !isBold;

        // Use chaining to toggle font weight
        $('#previewText')
            .css('fontWeight', isBold ? '700' : '400');

        $(this).toggleClass('toggled');
    });

    // Italic toggle
    $('#italicToggle').on('click', function () {
        isItalic = !isItalic;

        // Use chaining to toggle font style
        $('#previewText')
            .css('fontStyle', isItalic ? 'italic' : 'normal');

        $(this).toggleClass('toggled');
    });

    // Reset all styles using chaining
    $('#resetBtn').on('click', function () {
        // Chain multiple css calls to reset all properties at once
        $('#previewText')
            .css('fontSize', '16px')
            .css('lineHeight', '1.7')
            .css('color', '#1d1d1f')
            .css('fontWeight', '400')
            .css('fontStyle', 'normal');

        $('.preview-card')
            .css('backgroundColor', '#fff');

        // Reset toggle states
        isBold = false;
        isItalic = false;

        // Reset button states
        $('.ctrl-btn').removeClass('active toggled');
        $('#sizeMedium').addClass('active');
    });

});
