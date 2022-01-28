import React from 'react';
import './Auth.css';
import { FormInput } from '../reusable/FormInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  const onChange = (e) => {};
  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form>
          <h3>Sign In</h3>
          <div className='mb-3'>
            <FormInput
              type='text'
              name='username'
              label='username'
              className='form-control'
              placeholder='Enter Username'
              value=''
              error=''
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <FormInput
              type='password '
              name='password'
              label='password'
              className='form-control'
              placeholder='Enter password'
              value=''
              error=''
              onChange={onChange}
            />
          </div>
          <div className='mb3'>
            <Button
              type='submit'
              label='sign up'
              className='btn btn-primary w-100'
            />
            <p className='forgot-password text-right'>
              Not yet registered? <Link to='/sign-up'>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
