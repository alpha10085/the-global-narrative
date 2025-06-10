import Spinner from "@/componentss/Shared/Spinner/Spinner";

const Loader = ({ theme = {}, className }) => {
    return (
        <div
            className={`w-100 ${className} mb5 mt-5 pb15 gap20 flex-c `}
        >
            <Spinner theme={theme?.name} size={20} />
        </div>
    );
};

export default Loader;
