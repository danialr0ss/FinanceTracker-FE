import { IoMdArrowRoundBack } from "react-icons/io";

export default function BackButton() {
  return (
    <a
      className="w-fit flex justify-start items-center rounded-xl  hover:opacity-50"
      href="/"
    >
      <IoMdArrowRoundBack className="text-3xl mr-4" />
      <div className={"text-xl font-bold"}>Back</div>
    </a>
  );
}
