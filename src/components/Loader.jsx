import MoonLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <section className="overlay" id="overlay-content">
      <div id="overlay-content">
        <MoonLoader
          size={300}
          color="#f5ba13"
          display="block"
          margin="0 auto"
        />
      </div>
    </section>
  );
};
export default Loader;
