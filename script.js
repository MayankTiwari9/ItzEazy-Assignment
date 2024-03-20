$(document).ready(function(){
  var totalQuestions = $('.question').length;
  var totalInputs = $('.answer').length;
  var currentQuestion = 0;

  // Update progress bar function
  function updateProgressBar() {
    var filledInputs = $('.answer').filter(function() {
      if ($(this).is('select')) {
        return $(this).val().trim().length > 0;
      } else if ($(this).prop('type') === 'text') {
        return $(this).val().trim().length >= parseInt($(this).data('min-length'));
      } else if ($(this).prop('type') === 'radio') {
        return $(this).is(':checked');
      }
    }).length;
    var progress = (filledInputs / totalInputs) * 100;
    $('#progress-bar').width(progress + '%').text(progress.toFixed(2) + '%');
  }

  // Next screen logic
$('.answer').on('input change', function() {
  var $this = $(this);
  if ($this.is('select') || $this.prop('type') === 'text') {
    updateProgressBar();
  }
  var currentQuestionInputs = $this.closest('.question').find('.answer');
  if (currentQuestionInputs.filter(function() {
    if ($(this).is('select')) {
      return $(this).val().trim().length > 0;
    } else if ($(this).prop('type') === 'text') {
      return $(this).val().trim().length >= parseInt($(this).data('min-length'));
    } else if ($(this).prop('type') === 'radio') {
      return $(this).is(':checked');
    }
  }).length === currentQuestionInputs.length) {
    if (currentQuestion <= totalQuestions) {
      $this.closest('.question').removeClass('active');
      $this.closest('.question').next('.question').addClass('active');
      currentQuestion++;
      updateProgressBar();
    }
  }
});

// Radio button logic
$('input[type="radio"]').on('change', function() {
  updateProgressBar();
});

  // Trigger progress bar update initially
  updateProgressBar();
});