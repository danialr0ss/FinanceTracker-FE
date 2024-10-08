import { Skeleton } from "./ui/skeleton";

export default function SkeletonLoading({ width, height }) {
  const formattedWidth = "w-[" + 500 + "px]";
  const formattedHeight = "h-[" + 500 + "px]";
  return <Skeleton className={`h-full w-full rounded-xl`} />;
}
