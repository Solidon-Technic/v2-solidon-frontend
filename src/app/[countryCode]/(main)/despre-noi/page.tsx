import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Despre noi - Solidon Tehnic",
  description:
    "Solidon Tehnic SRL – specialist în accesorii pentru termopane și ferestre. Calitate, profesionalism și servicii adaptate nevoilor clienților.",
}

export default function DespreNoiPage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-10">
          Despre Solidon Tehnic
        </h1>

        <div className="text-ui-fg-subtle space-y-10 text-base leading-7">
          <section>
            <p>
              <strong className="text-ui-fg-base">Solidon Tehnic SRL</strong> este o companie română specializată în distribuția de accesorii pentru termopane, ferestre și uși. Cu sediul în București, oferim produse de calitate și servicii profesionale pentru profesioniști din domeniul construcțiilor și pentru clienții finali care doresc să-și echipeze sau să-și înlocuiască accesoriile pentru ferestre și uși.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Ce oferim
            </h2>
            <p>
              Portofoliul nostru include accesorii pentru termopane – mânere, balamale, închizători, garnituri și alte componente esențiale pentru funcționarea și durabilitatea ferestrelor și ușilor. Lucrăm cu furnizori de încredere și ne asigurăm că produsele respectă standardele de calitate și securitate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Showroom și livrare
            </h2>
            <p>
              Vă așteptăm în showroom-ul nostru din București, Sector 5, unde puteți vedea produsele și primi sfaturi de la echipa noastră. Pentru clienții din întreaga țară, livrăm prin curier rapid – Fan Courier și Curiera – în 1-2 zile lucrătoare. Acceptăm plata ramburs, virament bancar și plata cu cardul.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              De ce Solidon Tehnic
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Experiență și profesionalism în domeniul accesoriilor pentru termopane</li>
              <li>Produse de calitate, selectate cu grijă</li>
              <li>Livrare rapidă în toată România</li>
              <li>Echipă dedicată pentru asistență și suport clienți</li>
              <li>Transparență în relațiile cu clienții – termeni clari, returnări în 14 zile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Contact
            </h2>
            <p>
              <strong className="text-ui-fg-base">Solidon Tehnic SRL</strong>
              <br />
              Strada Sadului, Nr. 35, Sector 5, București, România
            </p>
            <p className="mt-3">
              Email:{" "}
              <a href="mailto:comenzi@accesorii-termopane.ro" className="text-space_indigo hover:underline">
                comenzi@accesorii-termopane.ro
              </a>
              <br />
              Telefon:{" "}
              <a href="tel:0215557540" className="text-space_indigo hover:underline">0215 557 540</a>
              {" · "}
              <a href="tel:0769137137" className="text-space_indigo hover:underline">0769 137 137</a>
            </p>
            <p className="mt-3">
              <LocalizedClientLink href="/contact" className="text-space_indigo hover:underline font-medium">
                Pagina de contact →
              </LocalizedClientLink>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
