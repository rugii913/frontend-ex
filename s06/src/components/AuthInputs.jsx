import { useState } from 'react';
import { styled } from "styled-components";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

/*
(cf) template literals
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
*/

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <p>
          <label className={`label ${emailNotValid ? "invalid" : ""}`}>Email</label>
          <input
            type="email"
            // style={{
            //   backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db"
            // }}
            className={emailNotValid ? 'invalid' : undefined} // cf. className={emailNotValid && "invalid"} 이 방식은 사용하지 말 것, false일 경우 앞을 반환함
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <label className={`label ${passwordNotValid ? "invalid" : ""}`}>Password</label>
          <input
            type="password"
            className={passwordNotValid ? 'invalid' : undefined}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className='button' onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}
