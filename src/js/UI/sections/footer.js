export const footer = (function () {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const feedback = document.createElement('div');
  feedback.classList.add('feedback');
  footer.appendChild(feedback);

  const clearFeedback = function () {
    feedback.textContent = '';
  };

  const createFeedbackMsg = function (msg) {
    clearFeedback();
    const feedbackMsg = document.createElement('p');
    feedbackMsg.classList.add('msg');
    feedbackMsg.textContent = msg;
    feedback.appendChild(feedbackMsg);
  };

  return {
    createFeedbackMsg,
    clearFeedback,
    HTML: footer,
  };
})();
