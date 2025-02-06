import "./loader.css"
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return (
        <div className="loader">
            <ClipLoader
                color="blue"
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Loader;