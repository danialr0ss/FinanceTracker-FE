import { ImSpinner8 } from "react-icons/im";

export default function Spinner({ size, color }) {
  const width = "w-" + size;
  const height = "h-" + size;
  const textColor = color ? "text-" + color : "";
  return (
    <ImSpinner8 className={`${width} ${height} ${textColor} animate-spin`} />
  );
}
