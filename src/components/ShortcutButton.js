export default function ({ title, icon: Icon, href }) {
  return (
    <a
      href={href}
      className="w-56 h-56 p-4 rounded-xl border-2 border-borderColor flex flex-col justify-evenly items-center hover:bg-gray-500 hover:text-white gap-4"
    >
      <div className="text-center text-lg">{title}</div>
      <Icon className="text-[80px]" />
    </a>
  );
}
