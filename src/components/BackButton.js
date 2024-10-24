import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BackButton({ setIsLoadingNavigation }) {
  return (
    <Link
      className="w-fit flex justify-start items-center rounded-xl  hover:opacity-50"
      href="/dashboard"
      onClick={() => setIsLoadingNavigation(true)}
    >
      <IoMdArrowRoundBack className="text-3xl mr-4" />
      <div className={"text-xl font-bold"}>Back</div>
    </Link>
  );
}
