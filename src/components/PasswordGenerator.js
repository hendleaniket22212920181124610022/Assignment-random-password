import React, { useState, useEffect } from "react";
import "./PasswordGenerator.css";


function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8); // Default length
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [passwordHistory, setPasswordHistory] = useState([]);

  // Define character sets for generating passwords
  const numbers = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '!@#$%^&*()_-+={}[]|:;"<>,.?/';

  // Function to generate a random password based on user preferences
  const generatePassword = () => {
    let charset = '';
    if (includeNumbers) charset += numbers;
    if (includeLetters) charset += letters;
    if (includeSpecialChars) charset += specialChars;

    if (charset === '') {
      setPassword('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    addToPasswordHistory(newPassword);
  };

  // Function to copy the generated password to the clipboard
  const copyToClipboard = () => {
    const passwordField = document.createElement('textarea');
    passwordField.value = password;
    document.body.appendChild(passwordField);
    passwordField.select();
    document.execCommand('copy');
    document.body.removeChild(passwordField);
  };

  // Function to add a generated password to the history
  const addToPasswordHistory = (newPassword) => {
    const updatedHistory = [newPassword, ...passwordHistory.slice(0, 4)];
    setPasswordHistory(updatedHistory);
  };

  // When the component initializes, retrieve the password history from local storage
  useEffect(() => {
    const storedHistory = localStorage.getItem('passwordHistory');
    if (storedHistory) {
      setPasswordHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Whenever the password history changes, update local storage
  useEffect(() => {
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
  }, [passwordHistory]);

  // Render the component
  return (
    <div>
      <h1>Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div>
        <label>Include Numbers:</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </div>
      <div>
        <label>Include Letters:</label>
        <input
          type="checkbox"
          checked={includeLetters}
          onChange={() => setIncludeLetters(!includeLetters)}
        />
      </div>
      <div>
        <label>Include Special Characters:</label>
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
        />
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      <div>
        <strong>Password:</strong> {password}
      </div>
      <div>
        <h2>Password History</h2>
        <ul>
          {passwordHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PasswordGenerator;

