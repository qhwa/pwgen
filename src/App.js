import React, {useState} from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState(null);
  const [len, setLength] = useState(4);
  const [sw, updateSwitches] = useState({
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: true
  });

  const lenPercent = (len - 4) / (32 - 4) * 100;

  return (
    <div id="pwgen">
      <h2>Generate Password</h2>

      <div className="result" onClick={() => copy(password)}>
        {password || 'CLICK GENERATE'}
      </div>

      <form onSubmit={handleSubmit}>
        <h5>Length: <b>{len}</b></h5>
        <div className="control-group">
          4

          <input id="len-input" type="range" min="4" max="32" value={len}
            style={{background: `linear-gradient(90deg, rgb(11, 30, 223) ${lenPercent}%, rgba(255, 255, 255, 0.216) ${lenPercent}%)`}}
            onChange={e => setLength(e.target.value)} />

          32
        </div>

        <h5>Settings:</h5>
        {
          [
            ['uppercase', 'Include Uppercase'],
            ['lowercase', 'Include Lowercase'],
            ['numbers', 'Include Numbers'],
            ['symbols', 'Include Symbols']
          ].map(([key, label]) => (
            <div key={key} className="control-group">
              <label>{label}</label>
              <input
                className="flipswitch"
                type="checkbox"
                checked={sw[key]}
                onChange={e => updateSwitches({
                  ...sw,
                  [key]: e.target.checked
                })}
              />
            </div>
          ))
        }

        <input type="submit" value="GENERATE" />
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid(sw)) {
      setPassword(generate(sw, '', len))
    }
  }
}

function copy(text) {
  navigator.clipboard.writeText(text);
}

function isValid({ uppercase, lowercase, numbers, symbols }) {
  return uppercase || lowercase || numbers || symbols;
}

function generate(sw, str, length) {
  if (str.length >= length) {
    return str.substr(0, length)
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  str = str +
    (sw.uppercase ? randomUppercase() : '') +
    (sw.lowercase ? randomLowercase() : '') +
    (sw.numbers ? randomNumber() : '') +
    (sw.symbols ? randomSymbol() : '');

  return generate(sw, str, length);
}

function randomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(Math.random() * symbols.length)]
}

export default App;
