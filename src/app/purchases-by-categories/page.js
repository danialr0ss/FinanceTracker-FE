"use client";
import Sidebar from "./components/Sidebar";
import Purchases from "./components/Purchases";
export default function Page() {
  return (
    <div
      className={
        "w-full h-full flex justify-center items-center bg-backgroundColor p-16 gap-x-4"
      }
    >
      <Sidebar />
      <Purchases />
    </div>
  );
}
