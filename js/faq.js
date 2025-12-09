document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const isActive = question.classList.contains('active');

    document.querySelectorAll('.faq-question').forEach(q => {
      q.classList.remove('active');
      const answer = q.nextElementSibling;
      if (answer) {
        answer.style.maxHeight = null;
      }
    });

    if (!isActive) {
      question.classList.add('active');
      const answer = question.nextElementSibling;
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }
  });
});
