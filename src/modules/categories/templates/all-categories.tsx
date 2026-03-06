import { HttpTypes } from "@medusajs/types"

type AllCategoriesTemplateProps = {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}

export default function AllCategoriesTemplate({
  categories,
  countryCode,
}: AllCategoriesTemplateProps) {
  return (
    <div className="content-container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Categorii
          </h1>
          <p className="text-gray-600">
            Pagina cu toate categoriile va fi implementată în curând.
          </p>
        </div>

        {/* Placeholder for future category grid */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center text-gray-500">
            <p className="mb-2">
              {categories.length} {categories.length === 1 ? 'categorie' : 'categorii'} disponibile
            </p>
            <p className="text-sm">
              Grid-ul de categorii va fi adăugat aici.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
