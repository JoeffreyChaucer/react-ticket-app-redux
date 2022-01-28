import React from 'react';
import './Auth.css';
import { FormInput } from '../reusable/FormInput';

const Register = () => {
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form>
          <h3>Sign Up</h3>
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
        </form>
      </div>
    </div>
  );
};

export default Register;
