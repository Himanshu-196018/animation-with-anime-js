const Box = ({ cs, bg }) => {
  return (
    <div className="wrap">
      <div className={`box box-${cs} ${bg}`}></div>
    </div>
  );
};

export default Box;
