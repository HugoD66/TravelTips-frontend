
interface LoadingProps {
  width: number;
  height: number;
}

const Loading: React.FC<LoadingProps> = ({width, height}) => {

  return (
    <div className="loading" style={{width: width, height: height}}>
      <div className="loading__spinner"></div>
    </div>
  );
}
export default Loading;
