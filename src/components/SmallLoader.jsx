import MoonLoader from "react-spinners/ClipLoader";

const SmallLoader = () => {
  return (
    <div className="small-loader">
      <MoonLoader size={100} color="#f5ba13" display="block" margin="0 auto" />
    </div>
  );
};
export default SmallLoader;
