/* ========================================
   Task 6 – API Data Fetcher
   jQuery AJAX with error handling
   ======================================== */

$(document).ready(function () {

    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    const POSTS_PER_PAGE = 5;

    let allPosts = [];       // Stores all fetched posts
    let displayedCount = 0;  // How many posts currently shown

    // Fetch all posts from the API
    const fetchPosts = () => {
        // Show loading indicator
        $('#loader').fadeIn(200);
        $('#errorMessage').hide();
        $('#loadMoreBtn').hide();

        $.ajax({
            url: API_URL,
            method: 'GET',
            dataType: 'json',

            success: function (data) {
                allPosts = data;
                displayedCount = 0;

                // Hide loader and render initial posts
                $('#loader').fadeOut(200, function () {
                    renderPosts(POSTS_PER_PAGE);
                    updateLoadMoreVisibility();
                });
            },

            error: function (xhr, status, error) {
                // Hide loader and show error message
                $('#loader').fadeOut(200, function () {
                    $('#errorText').text(
                        `Failed to fetch posts. ${status === 'timeout' ? 'Request timed out.' : 'Please check your connection.'}`
                    );
                    $('#errorMessage').fadeIn(300);
                });

                console.error('AJAX Error:', status, error);
            },

            timeout: 10000  // 10 second timeout
        });
    };

    // Render a batch of posts into the container
    const renderPosts = (count) => {
        const start = displayedCount;
        const end = Math.min(start + count, allPosts.length);

        for (let i = start; i < end; i++) {
            const post = allPosts[i];

            // Build the card element
            const card = $('<div>')
                .addClass('post-card')
                .hide()
                .append($('<div>').addClass('post-id').text(`Post #${post.id}`))
                .append($('<h3>').text(post.title))
                .append($('<p>').text(post.body));

            $('#postsContainer').append(card);

            // Animate each card appearance with a slight delay
            card.delay(i - start).fadeIn(300);
        }

        displayedCount = end;
        updatePostCount();
    };

    // Update the Load More button visibility
    const updateLoadMoreVisibility = () => {
        if (displayedCount < allPosts.length) {
            $('#loadMoreBtn').fadeIn(200);
        } else {
            $('#loadMoreBtn').fadeOut(200);
        }
    };

    // Update the post count display
    const updatePostCount = () => {
        $('#postCount').text(`Showing ${displayedCount} of ${allPosts.length} posts`);
    };

    // Handle Load More button click
    $('#loadMoreBtn').on('click', function () {
        renderPosts(POSTS_PER_PAGE);
        updateLoadMoreVisibility();
    });

    // Handle Retry button click
    $('#retryBtn').on('click', function () {
        $('#postsContainer').empty();
        fetchPosts();
    });

    // Initial load
    fetchPosts();
});
