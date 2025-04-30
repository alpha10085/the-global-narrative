import Spinner from "../Spinner/Spinner";

const LoadingLayout = ({ color = "black", className='', style = {} }) => {
  return (
    <div
      style={{
        height: "calc(100% - 100px)",
        ...style,
      }}
      className={` flex-c  showSmooth ${className}`}
    >
      <Spinner size={40} color={color} />
    </div>
  );
};

export default LoadingLayout;
