import React from "react";

const Input = ({ label, type, value, name, onChange }) => {
  return (
    <label className="custom-field one">
      <input
        type={type}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="placeholder">{label}</span>
    </label>
  );
};

export default Input;
