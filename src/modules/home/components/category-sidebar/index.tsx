import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategorySidebarProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const MAX_SIDEBAR_CATEGORIES = 10

const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  const topLevel = categories
    .filter((cat) => !cat.parent_category)
    .slice(0, MAX_SIDEBAR_CATEGORIES)

  return (
    <div className="category-sidebar bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-space_indigo">
          Categorii
        </h3>
      </div>
      <ul className="py-1">
        {topLevel.map((category) => (
          <li key={category.id}>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-parchment hover:text-space_indigo transition-colors"
            >
              <span className="w-2 h-2 rounded-sm bg-dusty_grape-600 flex-shrink-0" />
              {category.name}
            </LocalizedClientLink>
          </li>
        ))}
        <li>
          <LocalizedClientLink
            href="/store"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-space_indigo hover:bg-parchment transition-colors"
          >
            <span className="w-2 h-2 rounded-sm bg-space_indigo flex-shrink-0" />
            Vezi toate produsele
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

export default CategorySidebar
