import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[350px] small:h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-space_indigo via-dusty_grape to-lilac_ash">
      {/* Decorative circles */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 bg-white/5 rounded-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full p-8 small:p-12 max-w-lg">
        <span className="inline-block bg-sales text-white text-xs font-bold px-3 py-1 rounded mb-4 w-fit">
          Oferte speciale
        </span>
        <h2 className="text-2xl small:text-3xl font-bold text-white mb-2 leading-tight">
          Cele mai bune prețuri
        </h2>
        <p className="text-white/80 text-sm small:text-base mb-6 leading-relaxed">
          Descoperă ofertele noastre exclusive pentru casa ta. Termopane premium la prețuri imbatabile.
        </p>
        <LocalizedClientLink
          href="/store"
          className="inline-flex items-center gap-2 bg-white text-space_indigo font-semibold px-6 py-3 rounded-md hover:bg-parchment transition-colors w-fit text-sm"
        >
          Descoperă ofertele
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </LocalizedClientLink>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="w-8 h-2 rounded-full bg-white" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
      </div>
    </div>
  )
}

export default Hero
