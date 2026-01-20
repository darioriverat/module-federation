import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [n, setN] = useState(3)
  const [m, setM] = useState(4)
  const [result, setResult] = useState(12)

  function multiply(a, b) {
    setResult(+a * +b)
  }

  // Update result whenever n or m changes
  useEffect(() => {
    multiply(n, m)
  }, [n, m])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="number" id="n" value={n} onChange={(e) => setN(e.target.value)} />
        <span className="operator">×</span>
        <input type="number" id="m" value={m} onChange={(e) => setM(e.target.value)}/>
        <span className="operator">=</span>
        <input id="result" value={result} readOnly />
      </div>
    </>
  )
}

export default App
