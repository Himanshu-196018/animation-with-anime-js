const Button = ({ cs, text, handleControl }) => {
  return (
    <button className={cs} onClick={handleControl}>
      {text}
    </button>
  );
};

export default Button;
