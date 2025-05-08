import css from "./Loader.module.css";
import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div>
      <BarLoader className={css.loader} />
    </div>
  );
}
