/* ========================================
   Task 2 – Immersive Photo Gallery
   jQuery fadeIn/fadeOut, chaining, effects,
   category filter, thumbnails, lightbox
   & keyboard navigation
   M Ehtisham Amjad | BSSE-VI-B | 231996
   ======================================== */

$(document).ready(function () {

    // Helper: build reliable Unsplash URL
    const unsplash = (id, w, h, q) =>
        `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;

    // ── Image collection ─ 16 curated photos across 4 categories ──
    const allImages = [
        // ── Nature (4) ──
        { src: unsplash('1506744038136-46273834b3fb',1200,700,80), thumb: unsplash('1506744038136-46273834b3fb',300,200,70), title: 'Yosemite Valley',      caption: 'Breathtaking view of Yosemite Valley at golden hour',     cat: 'nature' },
        { src: unsplash('1470071459604-3b5ec3a7fe05',1200,700,80), thumb: unsplash('1470071459604-3b5ec3a7fe05',300,200,70), title: 'Foggy Forest',         caption: 'Misty morning light filtering through ancient trees',     cat: 'nature' },
        { src: unsplash('1542273917363-3b1817f69a2d',1200,700,80), thumb: unsplash('1542273917363-3b1817f69a2d',300,200,70), title: 'Starry Pines',         caption: 'Tall pines silhouetted against a star-filled sky',        cat: 'nature' },
        { src: unsplash('1501785888041-af3ef285b470',1200,700,80), thumb: unsplash('1501785888041-af3ef285b470',300,200,70), title: 'Mountain Reflection',  caption: 'Calm lake reflecting snow-capped peaks at dawn',          cat: 'nature' },
        // ── Architecture (4) ──
        { src: unsplash('1477959858617-67f85cf4f1df',1200,700,80), thumb: unsplash('1477959858617-67f85cf4f1df',300,200,70), title: 'City Skyline',         caption: 'Modern skyline lit up against twilight skies',            cat: 'architecture' },
        { src: unsplash('1486325212027-8081e485255e',1200,700,80), thumb: unsplash('1486325212027-8081e485255e',300,200,70), title: 'Glass Tower',          caption: 'Reflective glass skyscraper reaching into the clouds',    cat: 'architecture' },
        { src: unsplash('1494526585095-c41746248156',1200,700,80), thumb: unsplash('1494526585095-c41746248156',300,200,70), title: 'Modern Villa',         caption: 'Sleek contemporary villa with an infinity pool',          cat: 'architecture' },
        { src: unsplash('1449824913935-59a10b8d2000',1200,700,80), thumb: unsplash('1449824913935-59a10b8d2000',300,200,70), title: 'Golden Gate Bridge',   caption: 'Iconic bridge emerging through the San Francisco fog',    cat: 'architecture' },
        // ── Travel (4) ──
        { src: unsplash('1502920917128-1aa500764cbd',1200,700,80), thumb: unsplash('1502920917128-1aa500764cbd',300,200,70), title: 'Santorini Sunset',     caption: 'Iconic blue domes of Santorini overlooking the Aegean',   cat: 'travel' },
        { src: unsplash('1507525428034-b723cf961d3e',1200,700,80), thumb: unsplash('1507525428034-b723cf961d3e',300,200,70), title: 'Tropical Beach',       caption: 'Crystal-clear waves washing over golden sand',            cat: 'travel' },
        { src: unsplash('1469854523086-cc02fe5d8800',1200,700,80), thumb: unsplash('1469854523086-cc02fe5d8800',300,200,70), title: 'Mountain Journey',     caption: 'Winding road through dramatic mountain scenery',          cat: 'travel' },
        { src: unsplash('1476514525535-07fb3b4ae5f1',1200,700,80), thumb: unsplash('1476514525535-07fb3b4ae5f1',300,200,70), title: 'Alpine Waterfall',     caption: 'Thundering waterfall cascading down mossy cliffs',        cat: 'travel' },
        // ── Animals (4) ──
        { src: unsplash('1437622368342-7a3d73a34c8f',1200,700,80), thumb: unsplash('1437622368342-7a3d73a34c8f',300,200,70), title: 'Sea Turtle',           caption: 'Green sea turtle gliding through coral reefs',            cat: 'animals' },
        { src: unsplash('1518020382113-a7e8fc38eac9',1200,700,80), thumb: unsplash('1518020382113-a7e8fc38eac9',300,200,70), title: 'Pug Portrait',         caption: 'Adorable pug posing with a curious head tilt',            cat: 'animals' },
        { src: unsplash('1456926631375-92c8ce872def',1200,700,80), thumb: unsplash('1456926631375-92c8ce872def',300,200,70), title: 'Flamingos',            caption: 'Flock of flamingos wading in shallow pink waters',        cat: 'animals' },
        { src: unsplash('1543466835-00a7907e9de1',1200,700,80), thumb: unsplash('1543466835-00a7907e9de1',300,200,70), title: 'Golden Retriever',     caption: 'Happy golden retriever enjoying a sunny afternoon',       cat: 'animals' },
    ];

    let filtered   = [...allImages];
    let currentIdx  = 0;
    let isAnimating = false;

    // ── Build thumbnail strip ──
    const buildThumbs = () => {
        const $strip = $('#thumbStrip').empty();
        filtered.forEach((img, i) => {
            $('<img>')
                .attr('src', img.thumb)
                .attr('alt', img.title)
                .addClass('thumb' + (i === currentIdx ? ' active' : ''))
                .data('idx', i)
                .appendTo($strip);
        });
    };

    // ── Display image at index ──
    const showImage = (idx, dir) => {
        if (isAnimating || filtered.length === 0) return;
        isAnimating = true;
        currentIdx  = idx;

        const img = filtered[idx];

        // Main image: fade out → swap → fade in (chaining)
        $('#mainImage')
            .stop(true)
            .fadeOut(250, function () {
                $(this)
                    .attr('src', img.src)
                    .attr('alt', img.title)
                    .fadeIn(350, function () { isAnimating = false; });
            });

        // Caption + overlay update (chained separately)
        $('#caption').stop(true).fadeOut(150, function () {
            $(this).text(img.caption).fadeIn(200);
        });
        $('#imgTitle').text(img.title);
        $('#imgCounter').text(`${idx + 1} / ${filtered.length}`);

        // Highlight active thumbnail
        $('#thumbStrip .thumb').removeClass('active');
        $('#thumbStrip .thumb').eq(idx).addClass('active');

        // Scroll thumb into view
        const $activeThumb = $('#thumbStrip .thumb.active');
        if ($activeThumb.length) {
            const strip = document.getElementById('thumbStrip');
            const thumbLeft = $activeThumb[0].offsetLeft;
            const thumbW    = $activeThumb.outerWidth();
            const stripW    = strip.clientWidth;
            strip.scrollTo({ left: thumbLeft - stripW / 2 + thumbW / 2, behavior: 'smooth' });
        }
    };

    // ── Navigation ──
    const goNext = () => { showImage((currentIdx + 1) % filtered.length, 'next'); };
    const goPrev = () => { showImage((currentIdx - 1 + filtered.length) % filtered.length, 'prev'); };

    $('#nextBtn').on('click', goNext);
    $('#prevBtn').on('click', goPrev);

    // Thumbnail click
    $('#thumbStrip').on('click', '.thumb', function () {
        showImage($(this).data('idx'));
    });

    // ── Category filter ──
    $('.cat-btn').on('click', function () {
        $('.cat-btn').removeClass('active');
        $(this).addClass('active');

        const cat = $(this).data('cat');
        filtered = cat === 'all' ? [...allImages] : allImages.filter(i => i.cat === cat);
        currentIdx = 0;
        buildThumbs();
        isAnimating = false;          // reset in case mid-animation
        showImage(0);
    });

    // ── Lightbox ──
    const openLightbox = () => {
        const img = filtered[currentIdx];
        $('#lbImage').attr('src', img.src);
        $('#lbCaption').text(img.caption);
        $('#lightbox').fadeIn(250);
        $('body').css('overflow', 'hidden');
    };
    const closeLightbox = () => {
        $('#lightbox').fadeOut(200);
        $('body').css('overflow', '');
    };

    $('#fullscreenBtn').on('click', openLightbox);
    $('#mainImage').on('click', openLightbox);
    $('.lb-close, .lb-overlay').on('click', closeLightbox);
    $('.lb-next').on('click', function () { goNext(); $('#lbImage').attr('src', filtered[currentIdx].src); $('#lbCaption').text(filtered[currentIdx].caption); });
    $('.lb-prev').on('click', function () { goPrev(); $('#lbImage').attr('src', filtered[currentIdx].src); $('#lbCaption').text(filtered[currentIdx].caption); });

    // ── Keyboard navigation ──
    $(document).on('keydown', function (e) {
        if (e.key === 'ArrowRight') goNext();
        else if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'f' || e.key === 'F') openLightbox();

        // Update lightbox image if open
        if ($('#lightbox').is(':visible') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            $('#lbImage').attr('src', filtered[currentIdx].src);
            $('#lbCaption').text(filtered[currentIdx].caption);
        }
    });

    // ── Init ──
    buildThumbs();
    showImage(0);
});
