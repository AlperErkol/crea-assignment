import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

export function LoaderButton({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & { isLoading: boolean }) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      {...props}
      className={cn("flex gap-2 justify-center px-3", className)}
    >
      {isLoading && <Loader2Icon className="animate-spin w-4 h-4" />}
      {children}
    </Button>
  );
}
