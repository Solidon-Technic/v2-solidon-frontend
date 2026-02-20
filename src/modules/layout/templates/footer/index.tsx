import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { MapPin, Envelope, Phone } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import StoreLogo from "@modules/common/components/store-logo"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import BackToTop from "@modules/layout/components/back-to-top"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <BackToTop />
        <div className="flex flex-col gap-y-10 xsmall:flex-row xsmall:items-start xsmall:justify-between pt-10 pb-40">
          <div className="shrink-0">
            <LocalizedClientLink
              href="/"
              className="inline-flex items-center hover:opacity-90 transition-opacity"
            >
              <StoreLogo width={120} height={40} />
            </LocalizedClientLink>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-8 xsmall:gap-x-16 xsmall:flex-1 xsmall:justify-end text-small-regular">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2 shrink-0 min-w-[140px]">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categorii
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2 shrink-0 min-w-[140px]">
                <span className="txt-small-plus txt-ui-fg-base">
                  Colecții
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2 shrink-0 min-w-[140px]">
              <span className="txt-small-plus txt-ui-fg-base">Despre</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink
                    href="/despre-noi"
                    className="hover:text-ui-fg-base"
                  >
                    Despre noi
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-ui-fg-base"
                  >
                    Contactați-ne
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/termeni-si-conditii"
                    className="hover:text-ui-fg-base"
                  >
                    Termeni si condiții
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/plata-si-livrare"
                    className="hover:text-ui-fg-base"
                  >
                    Plată și livrare
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/politica-de-retur"
                    className="hover:text-ui-fg-base"
                  >
                    Politică de retur
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href="https://consumer-redress.ec.europa.eu/site-relocation_en?prefLang=ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    ODR
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/politica-de-cookies"
                    className="hover:text-ui-fg-base"
                  >
                    Politica de cookies
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/gdpr"
                    className="hover:text-ui-fg-base"
                  >
                    GDPR - protecția datelor
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2 shrink-0 min-w-[180px]">
              <span className="txt-small-plus txt-ui-fg-base">
                Informații despre magazin
              </span>
              <div className="space-y-3 text-ui-fg-subtle">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-ui-fg-muted" />
                  <span>SOLIDON TEHNIC SRL, Strada Sadului, Nr. 35, Sector 5, București, România</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5 text-ui-fg-muted" />
                  <div>
                    <span className="block txt-small-plus text-ui-fg-base mb-0.5">Sunați-ne acum:</span>
                    <a href="tel:0215557540" className="hover:text-ui-fg-base">0215 557 540</a>
                    {" · "}
                    <a href="tel:0769137137" className="hover:text-ui-fg-base">0769 137 137</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Envelope className="w-4 h-4 shrink-0 mt-0.5 text-ui-fg-muted" />
                  <div>
                    <span className="block txt-small-plus text-ui-fg-base mb-0.5">E-mail:</span>
                    <a href="mailto:comenzi@accesorii-termopane.ro" className="hover:text-ui-fg-base">
                      comenzi@accesorii-termopane.ro
                    </a>
                  </div>
                </div>
                <div>
                  <span className="block txt-small-plus text-ui-fg-base mb-0.5">Showroom:</span>
                  <p>Luni–Vineri: 08:00–18:00</p>
                  <p>Sâmbătă: 08:00–14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Solidon. Toate drepturile rezervate.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
