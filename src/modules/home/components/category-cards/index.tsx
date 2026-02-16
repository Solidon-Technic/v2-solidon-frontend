import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SwiperCarousel from "@modules/home/components/product-carousel/swiper-carousel"

type CategoryCardsProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const gradients = [
  "from-space_indigo to-dusty_grape",
  "from-dusty_grape to-lilac_ash",
  "from-lilac_ash to-almond_silk",
  "from-space_indigo-600 to-space_indigo",
  "from-dusty_grape-600 to-dusty_grape",
  "from-lilac_ash-600 to-lilac_ash",
]

/** Unsplash images - produse relevante pentru fiecare categorie (format: w=512&h=256&fit=crop) */
const CATEGORY_IMAGES: { keywords: string[]; url: string }[] = [
  { keywords: ["suruburi", "dibluri", "prindere", "șuruburi"], url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=512&h=256&fit=crop" }, // screws, bolts
  { keywords: ["broaste", "yale", "lacate"], url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=512&h=256&fit=crop" }, // padlock
  { keywords: ["chei", "truse"], url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=512&h=256&fit=crop" }, // keys
  { keywords: ["cilindri", "usa", "ușă"], url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=512&h=256&fit=crop" }, // lock
  { keywords: ["balamale"], url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=512&h=256&fit=crop" }, // door hinges
  { keywords: ["gaurit", "insurubat", "găurit", "înșurubat"], url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=512&h=256&fit=crop" }, // drill
  { keywords: ["scule", "mana", "mână"], url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=512&h=256&fit=crop" }, // tools
  { keywords: ["transport", "ridicat"], url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=512&h=256&fit=crop" }, // hand truck
  { keywords: ["adezivi", "benzi"], url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=512&h=256&fit=crop" }, // adhesive
  { keywords: ["silicon", "spume"], url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=512&h=256&fit=crop" }, // sealant
  { keywords: ["hidroizolat", "termoizolat"], url: "https://images.unsplash.com/photo-1504309092620-4d0ec72658f1?w=512&h=256&fit=crop" }, // construction
  { keywords: ["robineti", "robineți"], url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=512&h=256&fit=crop" }, // faucet - use generic
  { keywords: ["manere", "mânere"], url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=512&h=256&fit=crop" }, // door handle
  { keywords: ["ferestre", "geam"], url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=512&h=256&fit=crop" }, // windows
  { keywords: ["climatizare", "aer"], url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=512&h=256&fit=crop" }, // AC
  { keywords: ["vopsire", "tencuire", "vopsit"], url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=512&h=256&fit=crop" }, // paint
  { keywords: ["polizare", "slefuire", "șlefuire"], url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=512&h=256&fit=crop" }, // polishing
]

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504309092620-4d0ec72658f1?w=512&h=256&fit=crop" // construction

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics (ș->s, ă->a, etc.)
}

function getCategoryImageUrl(category: HttpTypes.StoreProductCategory): string {
  if (typeof category.metadata?.thumbnail === "string") {
    return category.metadata.thumbnail
  }
  const searchText = normalizeForMatch(`${category.handle || ""} ${category.name || ""}`)

  for (const { keywords, url } of CATEGORY_IMAGES) {
    if (keywords.some((kw) => searchText.includes(normalizeForMatch(kw)))) {
      return url
    }
  }
  return FALLBACK_IMAGE
}

const CategoryCards = ({ categories }: CategoryCardsProps) => {
  const topLevel = categories.filter((cat) => !cat.parent_category)

  if (topLevel.length === 0) {
    return null
  }

  return (
    <SwiperCarousel
      breakpoints={{ mobile: 2, tablet: 3, desktop: 6 }}
      gap={12}
      showDots={topLevel.length > 1}
      infiniteScroll={topLevel.length > 1}
    >
      {topLevel.map((category, index) => (
        <LocalizedClientLink
          key={category.id}
          href={`/categories/${category.handle}`}
          className="category-shop-card group block h-full"
        >
          <div
            className={`relative h-32 rounded-lg overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-200 group-hover:scale-[1.02]`}
          >
            <img
              src={getCategoryImageUrl(category)}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-end p-3">
              <span className="text-white text-sm font-semibold drop-shadow-lg">
                {category.name}
              </span>
            </div>
          </div>
        </LocalizedClientLink>
      ))}
    </SwiperCarousel>
  )
}

export default CategoryCards
