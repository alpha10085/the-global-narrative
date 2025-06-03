import Spinner from "@/Components/Shared/Spinner/Spinner";

const Loading = ({ theme = {},className }) => {
  return (
    <div
      className={`w-100 ${className}   mb5 pb15 gap20 flex-c `}
    >
      <Spinner theme={theme?.name} size={22} />
    </div>
  );
};

export default Loading;
