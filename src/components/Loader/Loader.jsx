import css from "./Loader.module.css";
import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <BarLoader
        color="#3498db"
        width={200}
        height={8}
        cssOverride={{ borderRadius: "4px" }}
      />
    </div>
  );
}
