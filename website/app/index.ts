window.onload = () => {
  const cards = document.querySelectorAll('[data-card]');
  cards.forEach((card) => {
    card.addEventListener('click', () =>
      window.location.href = `/blogs/${card.id}.html`
    );
  });

};