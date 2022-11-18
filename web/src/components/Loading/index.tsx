import { CircleNotch } from "phosphor-react";

interface LoadingProps {
  color?: string;
}

export function Loading({ color = "white" }: LoadingProps) {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <CircleNotch weight="bold" className={`text-[${color}] text-4xl animate-spin`} />
    </div>
  );
}
