
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div 
      className={cn(
        "border-current rounded-full animate-spin border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}
