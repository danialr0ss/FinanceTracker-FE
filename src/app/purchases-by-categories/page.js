"use client";
import Sidebar from "./components/Sidebar";
import Purchases from "./components/Purchases";

export default function Page() {
  return (
    <div
      className={
        "h-screen w-screen min-w-[1400px] min-h-[920px] flex justify-center items-center bg-backgroundColor p-16 gap-x-4"
      }
    >
      <Sidebar />
      <Purchases />
    </div>
  );
}
