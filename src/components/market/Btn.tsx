import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-lime text-ink hover:bg-lime-hover",
        dark: "bg-graphite text-ivory hover:bg-graphite/90",
        secondary: "bg-surface-2 text-ink hover:bg-ink/10",
        outline: "border border-line-strong text-ink hover:bg-ink/5",
        ghost: "text-ink hover:bg-ink/5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        lg: "h-14 rounded-2xl px-6 text-[16px]",
        md: "h-11 rounded-xl px-4 text-[15px]",
        sm: "h-10 rounded-xl px-3.5 text-[14px]",
        icon: "h-11 w-11 rounded-xl",
      },
      block: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof btn> & { loading?: boolean };

export const Btn = forwardRef<HTMLButtonElement, Props>(({ className, variant, size, block, loading, children, disabled, ...rest }, ref) => (
  <button ref={ref} className={cn(btn({ variant, size, block }), className)} disabled={disabled || loading} {...rest}>
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </button>
));
Btn.displayName = "Btn";
