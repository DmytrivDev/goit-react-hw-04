import { ThreeCircles } from "react-loader-spinner";

import css from "./Loader.module.scss";

function Loader() {
  return (
    <div className={css.loadercont}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="blue"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
