import Link from "next/link";

export default function ShortcutButton({ title, icon: Icon, href, onClick }) {
  return (
    <Link
      href={href}
      className="w-56 h-56 p-4 rounded-xl border-2 border-borderColor flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4 transition-colors duration-150 ease-in-out"
      onClick={onClick}
    >
      <div className="text-center text-lg font-bold">{title}</div>
      <Icon className="text-[80px]" />
    </Link>
  );
}
