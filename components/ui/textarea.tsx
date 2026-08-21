import * as React from "react"
import { cn } from "@/lib/utils"
export const Textarea = React.forwardRef<HTMLTextAreaElement, any>(({ className,...props }, ref) => {
  return <textarea className={cn("flex min-h-[60px] w-full rounded-md border px-3 py-2 text-sm", className)} ref={ref} {...props} />
})
Textarea.displayName = "Textarea”
