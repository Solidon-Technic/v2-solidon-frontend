import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProduseMenu from "@modules/layout/components/produse-menu"

type Category = {
  id: string
  name: string
  handle: string
}

const NavTabs = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="nav-tabs bg-primary-500 border-t border-white/10">
      <div className="content-container">
        <div className="flex items-center gap-1 h-10 overflow-x-auto no-scrollbar">
          <ProduseMenu categories={categories} />

          <div className="w-px h-5 bg-white/20 mx-1" />

          <LocalizedClientLink
            href="/oferte"
            className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm whitespace-nowrap transition-colors"
          >
            Oferte
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/store?sort=created_at"
            className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm whitespace-nowrap transition-colors"
          >
            Noutăți
          </LocalizedClientLink>

          <div className="flex-1" />

          <LocalizedClientLink
            href="/blog"
            className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm whitespace-nowrap transition-colors"
          >
            Blog
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/contact"
            className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm whitespace-nowrap transition-colors"
          >
            Contact
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/store"
            className="px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded text-sm whitespace-nowrap transition-colors"
          >
            Magazin
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default NavTabs
