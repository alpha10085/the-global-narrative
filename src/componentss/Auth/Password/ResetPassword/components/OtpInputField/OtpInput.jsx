// components/resetPassword/OtpInput.js
import ErrorMessage from '@/componentss/Shared/ErrorMessage/ErrorMessage';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const OtpInputField = ({ register, errors, setValue }) => {
  const [otp, setOtp] = useState('');

  const handleChange = (value) => {
    setOtp(value);
    setValue('OTP', +value);
  };

  return (
    <div className="flex column">
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        inputType="tel"
        renderSeparator={<span style={{ fontSize: '10px', marginLeft: '10px', marginRight: '10px' }}> </span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: '50px',
          marginBottom: '25px',
          height: '40px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          padding: '10px',
          fontSize: '20px',
          color: '#000',
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
      />
      <ErrorMessage message={errors?.message} />
    </div>
  );
};

export default OtpInputField;
