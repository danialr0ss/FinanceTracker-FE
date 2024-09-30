import { Button } from "@/components/ui/button";
export default function ActiveButton({ isActive, children, ...props }) {
  return (
    <Button
      {...props}
      variant="outline"
      className={`h-16 w-[220px] font-bold border-borderColor text-lg ${
        isActive &&
        "bg-green-700 border-green-800 text-white hover:bg-green-700 hover:text-white "
      }`}
    >
      {children}
    </Button>
  );
}
