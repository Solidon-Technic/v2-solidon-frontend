import Image from "next/image"

type StoreLogoProps = {
  className?: string
  width?: number
  height?: number
}

export default function StoreLogo({
  className = "",
  width = 120,
  height = 40,
}: StoreLogoProps) {
  return (
    <Image
      src="/solidon_logo.png"
      alt="Solidon"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  )
}
