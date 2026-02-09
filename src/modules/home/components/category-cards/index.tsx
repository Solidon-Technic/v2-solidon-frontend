import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

const CategoryCards = ({ categories }: CategoryCardsProps) => {
  const topLevel = categories
    .filter((cat) => !cat.parent_category)
    .slice(0, 6)

  return (
    <div className="grid grid-cols-2 xsmall:grid-cols-3 small:grid-cols-6 gap-3">
      {topLevel.map((category, index) => (
        <LocalizedClientLink
          key={category.id}
          href={`/categories/${category.handle}`}
          className="category-shop-card group"
        >
          <div
            className={`relative h-32 rounded-lg overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-200 group-hover:scale-[1.02]`}
          >
            {typeof category.metadata?.thumbnail === "string" ? (
              <img
                src={category.metadata.thumbnail}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            ) : null}
            <div className="absolute inset-0 flex items-end p-3">
              <span className="text-white text-sm font-semibold drop-shadow-md">
                {category.name}
              </span>
            </div>
          </div>
        </LocalizedClientLink>
      ))}
    </div>
  )
}

export default CategoryCards
