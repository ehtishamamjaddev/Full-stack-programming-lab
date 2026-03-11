/* ========================================
   Task 4 – Interactive Dashboard Tabs
   Sliding indicator, animated counters,
   progress bars, hash routing, keyboard nav
   M Ehtisham Amjad | BSSE-VI-B | 231996
   ======================================== */

$(document).ready(function () {

    // ── Sliding indicator position ──
    const moveIndicator = ($btn) => {
        const $nav = $('#tabNav');
        const navLeft = $nav.offset().left;
        const btnLeft = $btn.offset().left;
        const shift = btnLeft - navLeft;

        $('#tabIndicator').css({
            width: $btn.outerWidth() + 'px',
            transform: `translateX(${shift}px)`
        });
    };

    // Initial indicator position
    moveIndicator($('.tab-btn.active'));
    $(window).on('resize', () => moveIndicator($('.tab-btn.active')));

    // ── Animated number counter ──
    const animateNumbers = ($panel) => {
        $panel.find('.stat-number').each(function () {
            const $el = $(this);
            const target = parseInt($el.data('target'), 10);
            const prefix = $el.data('prefix') || '';
            $({ count: 0 }).animate({ count: target }, {
                duration: 1200,
                easing: 'swing',
                step: function () { $el.text(prefix + Math.floor(this.count).toLocaleString()); },
                complete: function () { $el.text(prefix + target.toLocaleString()); }
            });
        });

        // Animated progress values (percentages)
        $panel.find('.prog-val').each(function () {
            const $el = $(this);
            const target = parseInt($el.data('target'), 10);
            $({ v: 0 }).animate({ v: target }, {
                duration: 1000,
                easing: 'swing',
                step: function () { $el.text(Math.floor(this.v) + '%'); },
                complete: function () { $el.text(target + '%'); }
            });
        });

        // Animated progress fills
        $panel.find('.prog-fill, .team-fill').each(function () {
            const w = $(this).data('width');
            $(this).css('width', '0%').animate({ width: w + '%' }, 1000);
        });

        // Animate mini bars
        $panel.find('.bar').each(function (i) {
            const $bar = $(this);
            $bar.css('height', '0%');
            setTimeout(() => $bar.css('height', $bar.css('--h') || '50%'), 120 * i);
        });
    };

    // ── Switch tab ──
    const switchTab = (tabName) => {
        const $btn = $(`.tab-btn[data-tab="${tabName}"]`);
        if (!$btn.length || $btn.hasClass('active')) return;

        // Update buttons
        $('.tab-btn').removeClass('active');
        $btn.addClass('active');
        moveIndicator($btn);

        // Swap panels with animation
        const $target = $(`#panel-${tabName}`);
        $('.tab-panel.active').fadeOut(180, function () {
            $(this).removeClass('active');
            $target.css('opacity', 0).addClass('active').animate({ opacity: 1 }, 280);
            animateNumbers($target);
        });

        // Update hash
        history.replaceState(null, '', '#' + tabName);

        // Smooth scroll
        $('html, body').animate({ scrollTop: $('#contentArea').offset().top - 20 }, 350);
    };

    // ── Tab click ──
    $('.tab-btn').on('click', function () {
        switchTab($(this).data('tab'));
    });

    // ── Keyboard navigation ──
    $(document).on('keydown', function (e) {
        if ($('input,textarea,select').is(':focus')) return;

        const tabs = $('.tab-btn');
        const idx  = tabs.index($('.tab-btn.active'));

        if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
            switchTab($(tabs[idx + 1]).data('tab'));
        } else if (e.key === 'ArrowLeft' && idx > 0) {
            switchTab($(tabs[idx - 1]).data('tab'));
        }
    });

    // ── Hash-based routing ──
    const hash = window.location.hash.replace('#', '');
    if (hash && $(`.tab-btn[data-tab="${hash}"]`).length) {
        switchTab(hash);
    } else {
        // Trigger initial animations for default tab
        animateNumbers($('#panel-overview'));
    }

    // ── Load more activity (demo) ──
    const extraItems = [
        { name: 'Ehtisham', action: 'merged branch feature/auth', time: '8 hrs ago' },
        { name: 'Izah', action: 'uploaded new icon set', time: '12 hrs ago' },
        { name: 'Usman', action: 'optimised database queries', time: '1 day ago' },
    ];
    let extraLoaded = false;

    $('#loadMoreActivity').on('click', function () {
        if (extraLoaded) return;
        extraLoaded = true;
        $(this).text('Loading...').prop('disabled', true);

        setTimeout(() => {
            extraItems.forEach(item => {
                const $li = $('<li>').addClass('feed-item').hide()
                    .html(`<div class="feed-dot"></div><div class="feed-body"><strong>${item.name}</strong> ${item.action} <span class="feed-time">${item.time}</span></div>`);
                $('#activityFeed').append($li);
                $li.slideDown(250);
            });
            $(this).text('All caught up!').addClass('disabled');
        }, 600);
    });

    // ── Mini bar animation workaround (CSS custom props) ──
    $('.bar').each(function () {
        const h = this.style.getPropertyValue('--h');
        $(this).data('height', h);
    });
});
