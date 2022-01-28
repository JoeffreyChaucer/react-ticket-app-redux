import React from 'react';

function Button(props) {
  const { label, type, className, handleClick } = props;
  return (
    <>
      <button className={className} type={type} onClick={handleClick}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </button>
    </>
  );
}

export default Button;
