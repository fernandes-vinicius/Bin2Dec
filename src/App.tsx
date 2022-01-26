import { ChangeEvent, useState } from 'react';

import './App.css';
import gitHubLogo from './assets/images/github-logo.svg';
import logo from './assets/images/logo.svg';
import convertBinToDec from './utils/convertBinToDec';

const regexOnlyBinary = /^[0-1]{1,20}$/;

function App() {
  const [binaryText, setBinaryText] = useState('');
  const [decimalValue, setDecimalValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setBinaryText(inputText);

    // check input errors
    const hasError = inputText ? !regexOnlyBinary.test(inputText) : false;

    if (hasError) setErrorMessage('Please enter only binary digits (0 or 1).');
    else {
      setErrorMessage('');

      const result = convertBinToDec(inputText);
      setDecimalValue(result);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="content-header">
          <img src={logo} alt="Logo" />
          <a
            href="https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Bin2Dec-App.md"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitHubLogo} alt="GitHub" />
          </a>
        </div>

        <h1 className="content-title">Binary To Decimal Converter</h1>

        <div className="content-text">
          Bin2Dec allows the user to enter strings of up to 8 binary digits,
          0&apos;s and 1&apos;s, in any sequence and then displays its decimal
          equivalent.
        </div>

        <div className="content-output">
          <h1 title={String(decimalValue)}>{decimalValue}</h1>
          <small>(10)</small>
        </div>

        <div className="content-textfield">
          <input
            type="text"
            name="binary"
            autoComplete="off"
            value={binaryText}
            onChange={handleChange}
            placeholder="Enter binary digits"
            maxLength={20} // limit number of binary digits
          />
        </div>

        {errorMessage && (
          <small className="content-error">{errorMessage}</small>
        )}
      </div>
    </div>
  );
}

export default App;
