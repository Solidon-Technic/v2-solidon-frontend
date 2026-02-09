import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
    return (
        <div className="h-[75vh] w-full border-b border-ui-border-base relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/villa.png"
                    alt="Villa background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
                <span>
                    <Heading
                        level="h1"
                        className="text-3xl leading-10 text-white font-normal drop-shadow-lg"
                    >
                        Solidon termopane
                    </Heading>
                    <Heading
                        level="h2"
                        className="text-3xl leading-10 text-white/90 font-normal drop-shadow-lg"
                    >
                        Cele mai bune accessorii pentru casa ta.
                    </Heading>
                </span>
            </div>
        </div>
    )
}

export default Hero
