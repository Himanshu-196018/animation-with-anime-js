const MultiBox = ({ cs }) => {
  return (
    <div className="wrap">
      <div className={`box-${cs}`}></div>
      <div className={`box-${cs}`}></div>
      <div className={`box-${cs}`}></div>
    </div>
  );
};

export default MultiBox;
