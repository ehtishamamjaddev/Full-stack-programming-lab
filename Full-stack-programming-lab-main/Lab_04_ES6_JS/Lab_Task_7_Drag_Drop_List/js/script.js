/* ========================================
   Task 7 – Drag and Drop Sortable List
   jQuery UI Sortable with order tracking
   ======================================== */

$(document).ready(function () {

    // Update the order display panel
    const updateOrderDisplay = () => {
        const orderList = $('#orderDisplay');
        orderList.empty();

        // Iterate through sorted items and build order list
        $('#sortableList .sortable-item').each(function (index) {
            const label = $(this).find('.item-label').text();
            const listItem = $('<li>').text(label);
            orderList.append(listItem);
        });
    };

    // Initialize jQuery UI Sortable
    $('#sortableList').sortable({
        // Use the drag handle for grabbing
        handle: '.drag-handle',

        // Placeholder styling while dragging
        placeholder: 'sortable-placeholder',

        // Animation duration for reordering
        revert: 150,

        // Tolerance for cursor position
        tolerance: 'pointer',

        // Callback when sorting starts
        start: function (event, ui) {
            ui.item.addClass('dragging');
        },

        // Callback when sorting stops
        stop: function (event, ui) {
            ui.item.removeClass('dragging');
        },

        // Callback when order changes
        update: function (event, ui) {
            updateOrderDisplay();
        }
    });

    // Prevent text selection during drag
    $('#sortableList').disableSelection();

    // Initialize order display on page load
    updateOrderDisplay();
});
