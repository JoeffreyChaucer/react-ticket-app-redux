import React, { useState } from 'react';
import './Auth.css';
import { FormInput } from '../reusable/FormInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';
import { RadioInput } from '../reusable/RadioInput';
import { validateInput } from '../../helpers/helpers';

const Register = () => {
  const [user, setUser] = useState({
    data: { username: '', password: '', role: '' },
  });
  //eslint-disable-next-line
  const [error, setError] = useState({
    usernameError: '',
    passwordError: '',
    roleError: '',
  });
  //eslint-disable-next-line
  const { username, password, role } = user.data;
  const { usernameError, passwordError, roleError } = error;

  const onSubmitRegister = (e) => {
    e.preventDefault();

    const isValid = validateInput(user.data, setError);

    if (isValid) {
      console.log(user.data);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { data } = user;

    setUser({
      data: {
        ...data,
        [name]: value,
      },
    });
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form onSubmit={onSubmitRegister}>
          <h3>Sign Up</h3>
          <div className='mb-3'>
            <FormInput
              type='text'
              name='username'
              label='username'
              className='form-control'
              placeholder='Enter Username'
              value={username}
              error={usernameError}
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <FormInput
              type='password'
              name='password'
              label='password'
              className='form-control'
              placeholder='Enter password'
              value={password}
              error={passwordError}
              onChange={onChange}
            />
          </div>
          <div className='mb-2'>
            <label className='form-label d-block'>Role</label>
            <div className='form-check form-check-inline'>
              <RadioInput
                id='inlineRadio1'
                name='role'
                labelClassName='form-check-label'
                className='form-check-input'
                value='User'
                error={roleError}
                onChange={onChange}
              />
            </div>
            <div className='form-check form-check-inline'>
              <RadioInput
                id='inlineRadio2'
                name='role'
                labelClassName='form-check-label'
                className='form-check-input'
                value='Admin'
                error={roleError}
                onChange={onChange}
              />
            </div>
          </div>
          <Button
            type='submit'
            label='sign up'
            className='btn btn-primary w-100'
          />
          <p className='forgot-password text-right'>
            Already registered? <Link to='/sign-in'>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
