/* ========================================
   Task 1 – Smart Task Board
   Advanced jQuery DOM manipulation, events,
   delegated handlers, chaining & CSS manipulation
   M Ehtisham Amjad | BSSE-VI-B | 231996
   ======================================== */

$(document).ready(function () {

    let taskId = 0;

    // ── Priority colours for the left border tag ──
    const priorityMeta = {
        urgent: { label: 'Urgent',  color: '#dc2626' },
        high:   { label: 'High',    color: '#ea580c' },
        medium: { label: 'Medium',  color: '#0f766e' },
        low:    { label: 'Low',     color: '#6366f1' }
    };

    // ── Refresh all visible counters & progress ──
    const refreshStats = () => {
        const total     = $('#taskList li').length;
        const completed = $('#taskList li.completed').length;
        const active    = total - completed;
        const pct       = total ? Math.round((completed / total) * 100) : 0;

        $('#totalCount').text(total);
        $('#activeCount').text(active);
        $('#doneCount').text(completed);
        $('#progressPercent').text(pct + '%');
        $('#progressFill').css('width', pct + '%');

        // Show / hide "Clear Completed" button
        completed > 0 ? $('#clearDoneBtn').slideDown(150) : $('#clearDoneBtn').slideUp(150);

        // Toggle empty state
        if (total === 0) {
            $('#emptyState').fadeIn(200);
        } else {
            $('#emptyState').fadeOut(200);
        }

        applyFilters();
    };

    // ── Build a single task <li> ──
    const buildTask = (text, priority, category) => {
        taskId++;
        const meta = priorityMeta[priority];
        const now  = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const $li = $('<li>')
            .attr('data-id', taskId)
            .attr('data-priority', priority)
            .attr('data-category', category)
            .css('border-left-color', meta.color)
            .hide();

        // Checkbox
        $li.append($('<button>').addClass('check-btn').html('&#9744;').attr('title', 'Toggle complete'));

        // Content wrapper
        const $content = $('<div>').addClass('task-content');
        $content.append($('<span>').addClass('task-text').text(text));
        $content.append(
            $('<span>').addClass('task-meta')
                .html(`<span class="priority-tag" style="color:${meta.color}">${meta.label}</span> · ${category} · ${time}`)
        );
        $li.append($content);

        // Actions
        const $actions = $('<div>').addClass('task-actions');
        $actions.append($('<button>').addClass('edit-btn').html('&#9998;').attr('title', 'Edit'));
        $actions.append($('<button>').addClass('delete-btn').html('&#10005;').attr('title', 'Delete'));
        $li.append($actions);

        return $li;
    };

    // ── Add task handler ──
    const addTask = () => {
        const text = $.trim($('#taskInput').val());
        if (!text) { $('#taskInput').addClass('shake'); setTimeout(() => $('#taskInput').removeClass('shake'), 400); return; }

        const priority = $('#prioritySelect').val();
        const category = $('#categorySelect').val();

        const $task = buildTask(text, priority, category);
        $('#taskList').prepend($task);
        $task.slideDown(280);

        // Reset inputs
        $('#taskInput').val('').focus();
        $('#charCount').text('0');
        refreshStats();
    };

    // ── Button & keyboard events ──
    $('#addBtn').on('click', addTask);
    $('#taskInput').on('keypress', function (e) { if (e.which === 13) addTask(); });

    // Character counter
    $('#taskInput').on('input', function () {
        $('#charCount').text($(this).val().length);
    });

    // ── Toggle completion ──
    $('#taskList').on('click', '.check-btn', function () {
        const $li = $(this).closest('li');

        $li.toggleClass('completed');
        $(this).html($li.hasClass('completed') ? '&#9745;' : '&#9744;');

        // Animate a brief highlight
        $li.css('transition', 'background 0.3s')
           .css('background', $li.hasClass('completed') ? '#ecfdf5' : '#fff');
        setTimeout(() => $li.css('background', ''), 500);

        refreshStats();
    });

    // ── Delete task ──
    $('#taskList').on('click', '.delete-btn', function () {
        $(this).closest('li').slideUp(250, function () { $(this).remove(); refreshStats(); });
    });

    // ── Inline edit (double-click on text or pencil icon) ──
    const startEdit = ($li) => {
        if ($li.hasClass('editing')) return;
        $li.addClass('editing');

        const $span = $li.find('.task-text');
        const oldText = $span.text();

        const $input = $('<input>').addClass('edit-input').val(oldText);
        $span.replaceWith($input);
        $input.focus().select();

        const finishEdit = () => {
            const newText = $.trim($input.val()) || oldText;
            $input.replaceWith($('<span>').addClass('task-text').text(newText));
            $li.removeClass('editing');
        };

        $input.on('blur', finishEdit);
        $input.on('keypress', function (e) { if (e.which === 13) $(this).blur(); });
        $input.on('keydown',  function (e) { if (e.which === 27) { $(this).val(oldText); $(this).blur(); } });
    };

    $('#taskList').on('click', '.edit-btn', function () { startEdit($(this).closest('li')); });
    $('#taskList').on('dblclick', '.task-text', function () { startEdit($(this).closest('li')); });

    // ── Search ──
    $('#searchInput').on('input', function () { applyFilters(); });

    // ── Status filter buttons ──
    $('.filter-btn:not(.pri-filter)').on('click', function () {
        $('.filter-btn:not(.pri-filter)').removeClass('active');
        $(this).addClass('active');
        applyFilters();
    });

    // ── Priority filter buttons ──
    $('.pri-filter').on('click', function () {
        $('.pri-filter').removeClass('active');
        $(this).addClass('active');
        applyFilters();
    });

    // ── Combined filter logic ──
    const applyFilters = () => {
        const search   = $.trim($('#searchInput').val()).toLowerCase();
        const status   = $('.filter-btn:not(.pri-filter).active').data('filter');
        const priority = $('.pri-filter.active').data('priority');

        let visible = 0;
        $('#taskList li').each(function () {
            const $li   = $(this);
            const text  = ($li.find('.task-text').text() || $li.find('.edit-input').val() || '').toLowerCase();
            const isDone = $li.hasClass('completed');
            const pri   = $li.data('priority');

            let show = true;
            if (search && text.indexOf(search) === -1) show = false;
            if (status === 'active'    && isDone)  show = false;
            if (status === 'completed' && !isDone) show = false;
            if (priority !== 'all' && pri !== priority) show = false;

            show ? $li.fadeIn(180) : $li.fadeOut(180);
            if (show) visible++;
        });

        // "No results" message
        const total = $('#taskList li').length;
        if (total > 0 && visible === 0) {
            $('#noResults').fadeIn(150);
        } else {
            $('#noResults').fadeOut(150);
        }
    };

    // ── Clear completed ──
    $('#clearDoneBtn').on('click', function () {
        $('#taskList li.completed').slideUp(200, function () { $(this).remove(); refreshStats(); });
    });

    // ── Init ──
    refreshStats();
});
