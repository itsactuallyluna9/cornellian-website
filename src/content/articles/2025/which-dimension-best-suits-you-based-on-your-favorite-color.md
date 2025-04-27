---
title: Which Dimension Best Suits You Based on Your Favorite Color?
author: Luna-Terra
pubDate: Apr 1, 2025
---

<style>
  .color-swatch {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border: 1px solid #ccc;
    vertical-align: middle;
    border-radius: 4px;
  }
  
  label {
    display: flex;
    align-items: center;
    margin: 8px 0;
    cursor: pointer;
  }
</style>

<script>
const choices = [
  ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'],
  ['Pink', 'Teal', 'Brown', 'Black', 'White', 'Gray'],
  ['Gold', 'Silver', 'Bronze', 'Cyan', 'Magenta', 'Lime'],
  ['Lavender', 'Maroon', 'Navy', 'Olive', 'Peach', 'Turquoise'],
  ['Crimson', 'Indigo', 'Mint', 'Amber', 'Coral', 'Charcoal'],
  ['Aquamarine', 'Beige', 'Fuchsia', 'Ivory', 'Plum', 'Saffron'],
  ['Emerald', 'Ruby', 'Sapphire', 'Topaz', 'Quartz', 'Onyx'],
  ['Chartreuse', 'Copper', 'Jade', 'Lilac', 'Periwinkle', 'Vermilion']
];

let currentQuestion = 0;

function nextQuestion() {
  const formElem = document.getElementById('quiz').getElementsByTagName('form')[0];
  const choiceIdx = Array.from(formElem.elements).findIndex((opt) => opt.checked);

  if (choiceIdx === -1) {
    alert('Please select an option!');
    return;
  }

  setTimeout(() => {
    formElem.elements[choiceIdx].checked = false;
  }, 4);

  currentQuestion += 1;
  if (currentQuestion >= choices.length) {
    document.getElementById('quiz').hidden = true;
    setTimeout(() => {
      document.getElementById('results').hidden = false;
    }, 500);
    return;
  }

  updateQuestion();
}

function updateQuestion() {
  const formElem = document.getElementById('quiz').getElementsByTagName('form')[0];
  formElem.innerHTML = '';

  choices[currentQuestion].forEach((color, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'quiz';
    input.value = index + 1;
    input.id = `choice-${index}`;

    const label = document.createElement('label');
    label.htmlFor = `choice-${index}`;
    
    // Create color swatch
    const swatch = document.createElement('span');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color.toLowerCase();
    
    // Add swatch and color name to label
    label.appendChild(swatch);
    label.appendChild(document.createTextNode(color));

    formElem.appendChild(input);
    formElem.appendChild(label);
    formElem.appendChild(document.createElement('br'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateQuestion();
});
</script>

<!-- <Advertisement /> -->

<p id="initalSpiel">
  Ever felt like your current dimension wasn't your own? Did you ever gaze into the sunset, or frolick through a field of flowers, or ponder some coral under the waves, thinking about which dimension you could call home? If so, this quiz is for you.
</p>

<div id="quiz">
  <p>Choose your favorite color:</p>
  <form></form>
  <button onclick="nextQuestion()" class="bg-purple-500 hover:bg-purple-700 transition-colors text-white font-bold py-2 px-4 rounded-lg">
    Next Question
  </button>
</div>

<div id="results" hidden>
  <p>Your result:</p>
  <p class="text-2xl font-black">2D</p>
  <p>Some spiel about how you love 2D dimensions and their simplicity.</p>
</div>
