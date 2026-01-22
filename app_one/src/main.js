import './style.css'
import javascriptLogo from '/javascript.svg'
import sum from './sum'

const htmlTemplate = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Vanilla!</h1>
    <div class="card">
      <label for="x"></label>
      <input type="number" id="x" value="2" />
      <span class="operator">+</span>
      <label for="y"></label>
      <input type="number" id="y" value="3" />
      <span class="operator">=</span>
      <input id="result_sum" readonly />
    </div>
  </div>
`

function setupSum() {
  const x = document.querySelector('#x')
  const y = document.querySelector('#y')
  const result = document.querySelector('#result_sum')

  const listener = () => {
    result.value = sum(Number(x.value), Number(y.value))
  }

  listener(); // first time calculation

  x.addEventListener('keyup', listener)
  y.addEventListener('keyup', listener)
}

export function mountComponent({ elementId }) {
  document.querySelector(elementId).innerHTML = htmlTemplate;

  window.onload = () => {
    setupSum()
  }
}