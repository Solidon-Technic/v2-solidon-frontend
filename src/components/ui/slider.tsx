"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { clx } from "@medusajs/ui"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={clx(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-ui-bg-field">
      <SliderPrimitive.Range className="absolute h-full bg-ui-bg-interactive" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-ui-bg-interactive bg-ui-bg-base shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus-ring disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-ui-bg-interactive bg-ui-bg-base shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-focus-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
