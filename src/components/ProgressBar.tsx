const ProgressBar = ({ value, max }: any) => {
  return (
    <div className="progress-container" style={{ width: '100%', backgroundColor: '#ddd' }}>
      <div
        className="progress-bar"
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: 'green',
          height: '20px'
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;