const displayText = document.getElementById('display-text');
const preview = document.getElementById('preview');

function appendNumber(number) {
  animateButton(number);
  if (display.innerText === '0') {
    display.innerText = number;
  } else {
    display.innerText += number;
  }
  updatePreview();
}

function appendOperator(operator) {
  animateButton(operator);
  const lastChar = display.innerText.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1) + operator;
  } else {
    display.innerText += operator;
  }
  updatePreview();
}

function clearDisplay() {
  animateButton('C');
  display.innerText = '0';
  preview.innerText = '';
}

function deleteLast() {
  animateButton('⌫');
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = '0';
  }
  updatePreview();
}

function calculate() {
  animateButton('=');
  try {
    const result = eval(display.innerText);
    display.innerText = result;
    preview.innerText = '';
  } catch {
    display.innerText = 'Error';
    preview.innerText = '';
  }
}

function updatePreview() {
  try {
    const expr = display.innerText;
    if (/[0-9)]$/.test(expr)) {
      const result = eval(expr);
      if (!isNaN(result)) {
        preview.innerText = "= " + result;
      } else {
        preview.innerText = '';
      }
    } else {
      preview.innerText = '';
    }
  } catch {
    preview.innerText = '';
  }
}

function animateButton(value) {
  const allButtons = document.querySelectorAll('.btn');
  allButtons.forEach((btn) => {
    const btnVal = btn.innerText.replace('×', '*').replace('÷', '/');
    if (btnVal === value) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 200);
    }
  });
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    e.preventDefault();
    if (display.innerText === '0') {
      display.innerText = key;
    } else {
      display.innerText += key;
    }
    animateButton(key);
    updatePreview();
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    e.preventDefault();
    deleteLast();
  } else if (key === 'Escape') {
    e.preventDefault();
    clearDisplay();
  }
});

