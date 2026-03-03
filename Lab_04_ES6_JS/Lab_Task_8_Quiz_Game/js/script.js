/* ========================================
   Task 8 – Quiz Game
   jQuery-based quiz with score tracking
   ======================================== */

$(document).ready(function () {

    // Quiz questions data
    const questions = [
        {
            question: 'What does jQuery use as its primary selector syntax?',
            options: ['XPath', 'CSS selectors', 'Regular expressions', 'JSON paths'],
            correct: 1
        },
        {
            question: 'Which symbol is used as a shortcut for jQuery?',
            options: ['#', '@', '$', '&'],
            correct: 2
        },
        {
            question: 'What does the $(document).ready() function do?',
            options: [
                'Loads external scripts',
                'Runs code after the DOM is fully loaded',
                'Validates the HTML document',
                'Creates a new document'
            ],
            correct: 1
        },
        {
            question: 'Which jQuery method is used to hide an element?',
            options: ['.remove()', '.hide()', '.delete()', '.invisible()'],
            correct: 1
        },
        {
            question: 'What does AJAX stand for?',
            options: [
                'Asynchronous JavaScript and XML',
                'Advanced JavaScript and XHTML',
                'Automated JavaScript and XML',
                'Asynchronous JSON and XML'
            ],
            correct: 0
        },
        {
            question: 'Which method is used to perform an AJAX request in jQuery?',
            options: ['$.fetch()', '$.request()', '$.ajax()', '$.http()'],
            correct: 2
        },
        {
            question: 'What does the .css() method do in jQuery?',
            options: [
                'Links a CSS file',
                'Gets or sets CSS properties',
                'Validates CSS syntax',
                'Removes all styles'
            ],
            correct: 1
        },
        {
            question: 'Which jQuery effect method slides an element down?',
            options: ['.slideDown()', '.dropDown()', '.expandDown()', '.moveDown()'],
            correct: 0
        },
        {
            question: 'What does event delegation mean in jQuery?',
            options: [
                'Passing events to another page',
                'Handling events on parent for dynamic children',
                'Cancelling default events',
                'Creating custom events'
            ],
            correct: 1
        },
        {
            question: 'Which jQuery method is used to chain multiple animations?',
            options: ['.link()', '.chain()', '.queue()', '.connect()'],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    // Load and display a question
    const loadQuestion = () => {
        const q = questions[currentQuestion];
        answered = false;

        // Update question info
        $('#questionNumber').text(`Question ${currentQuestion + 1} of ${questions.length}`);
        $('#scoreDisplay').text(`Score: ${score}`);

        // Update progress bar
        const progress = ((currentQuestion) / questions.length) * 100;
        $('#progressFill').css('width', `${progress}%`);

        // Set question text
        $('#questionText').text(q.question);

        // Build option buttons
        const optionsContainer = $('#optionsContainer');
        optionsContainer.empty();

        q.options.forEach((option, index) => {
            const btn = $('<button>')
                .addClass('option-btn')
                .text(option)
                .data('index', index);

            optionsContainer.append(btn);
        });

        // Hide feedback and next button
        $('#feedback').hide();
        $('#nextBtn').hide();
    };

    // Handle option selection (delegated event)
    $('#optionsContainer').on('click', '.option-btn', function () {
        if (answered) return;
        answered = true;

        const selectedIndex = $(this).data('index');
        const correctIndex = questions[currentQuestion].correct;

        // Mark all options as disabled
        $('.option-btn').addClass('disabled');

        // Highlight selected option
        $(this).addClass('selected');

        if (selectedIndex === correctIndex) {
            // Correct answer
            score++;
            $(this).removeClass('selected').addClass('correct');
            $('#feedback')
                .removeClass('wrong')
                .addClass('correct')
                .text('Correct! Well done.')
                .fadeIn(200);
        } else {
            // Wrong answer – highlight correct one too
            $(this).removeClass('selected').addClass('wrong');
            $(`.option-btn`).eq(correctIndex).addClass('correct');
            $('#feedback')
                .removeClass('correct')
                .addClass('wrong')
                .text(`Incorrect. The correct answer was: ${questions[currentQuestion].options[correctIndex]}`)
                .fadeIn(200);
        }

        // Update score display
        $('#scoreDisplay').text(`Score: ${score}`);

        // Show next button
        if (currentQuestion < questions.length - 1) {
            $('#nextBtn').text('Next Question').fadeIn(200);
        } else {
            $('#nextBtn').text('See Results').fadeIn(200);
        }
    });

    // Handle Next button click
    $('#nextBtn').on('click', function () {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    // Show final results with animation
    const showResults = () => {
        // Update progress to 100%
        $('#progressFill').css('width', '100%');

        const percentage = Math.round((score / questions.length) * 100);

        // Determine result tier
        let iconClass, iconChar, title, message;

        if (percentage >= 80) {
            iconClass = 'great';
            iconChar = '★';
            title = 'Excellent!';
            message = 'You have a strong understanding of jQuery.';
        } else if (percentage >= 50) {
            iconClass = 'good';
            iconChar = '✓';
            title = 'Good Effort!';
            message = 'You are on the right track. Keep practicing.';
        } else {
            iconClass = 'poor';
            iconChar = '✗';
            title = 'Keep Learning!';
            message = 'Review the material and try again.';
        }

        // Set result card content
        $('#resultIcon')
            .removeClass('great good poor')
            .addClass(iconClass)
            .text(iconChar);

        $('#resultTitle').text(title);
        $('#resultText').text(message);
        $('#resultScore').html(`${score}<span> / ${questions.length}</span>`);

        // Animate transition from quiz to result
        $('#quizCard').fadeOut(300, function () {
            $('#resultCard')
                .css('opacity', 0)
                .fadeIn(300)
                .animate({ opacity: 1 }, 400);
        });
    };

    // Handle Restart button
    $('#restartBtn').on('click', function () {
        currentQuestion = 0;
        score = 0;
        answered = false;

        $('#resultCard').fadeOut(300, function () {
            $('#quizCard').fadeIn(300);
            loadQuestion();
        });
    });

    // Start the quiz
    loadQuestion();
});
