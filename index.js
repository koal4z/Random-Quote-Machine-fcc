const elements = {
  text: document.querySelector('#text'),
  author: document.querySelector('#author'),
  quoteBoxTop: document.querySelector('.quote-box-top'),
  button: document.querySelector('#new-quote'),
  tweetQuote: document.querySelector('#tweet-quote'),
  allLink: document.querySelectorAll('.quote-a a i'),
};
const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
];

const quoteEl = elements.quoteBoxTop;
const bodyEl = document.body;
const buttonEl = elements.button;
const allLinkEl = Array.from(elements.allLink);

const randomInt = (max) => Math.floor(Math.random() * max + 1);

const getRandomQuote = async () => {
  const res = await fetch('https://api.quotable.io/random');
  const data = await res.json();
  return {
    author: data.author,
    content: data.content,
  };
};

const addRandomQuote = async () => {
  const { author, content } = await getRandomQuote();
  elements.text.textContent = content;
  elements.author.textContent = author;
};

const hideEl = () => {
  let opacity = 100;

  const hide = () => {
    if (opacity === 0) {
      clearInterval(hideAnimate);
      return;
    } else {
      quoteEl.style.opacity = `${opacity}%`;
      opacity -= 2;
    }
  };
  const hideAnimate = setInterval(hide, 5);
};

const showEl = () => {
  let opacity = 0;

  const show = () => {
    if (opacity === 100) {
      clearInterval(showAnimate);
    } else {
      quoteEl.style.opacity = `${opacity}%`;
      opacity += 2;
    }
  };
  const showAnimate = setInterval(show, 5);
};

const changeColor = (colorIdx) => {
  bodyEl.style.backgroundColor = colorIdx;
  quoteEl.style.color = colorIdx;
  buttonEl.style.backgroundColor = colorIdx;
  allLinkEl.forEach((el) => (el.style.color = colorIdx));
};

document.onload = addRandomQuote();

elements.button.addEventListener('click', async (e) => {
  e.preventDefault();
  const colorIdx = colors[randomInt(colors.length) - 1];
  await hideEl();
  await addRandomQuote();
  await changeColor(colorIdx);
  await showEl();
});

elements.tweetQuote.addEventListener('click', () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${elements.text.textContent}`
  );
});
