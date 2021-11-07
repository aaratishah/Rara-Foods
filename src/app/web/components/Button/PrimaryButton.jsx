import React from "react";

function PrimaryButton({ handleClick, title, classname, disabled }) {
  return (
    <button
      className={classname}
      style={{
        cursor: "pointer",
        backgroundColor: "#000",
        border: "none",
        color: "#fff",
        // padding: "6px 13px",
        fontWeight: "500",
        borderRadius: "500px",
        fontFamily: "sans-serif",
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={handleClick}
      disabled = {disabled}
    >
      {title}
    </button>
  );
}

export default PrimaryButton;
