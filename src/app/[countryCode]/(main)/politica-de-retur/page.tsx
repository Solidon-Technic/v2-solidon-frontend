import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de retur - Solidon",
  description:
    "Condiții de returnare a produselor. Dreptul de retur în 14 zile pentru persoane fizice.",
}

export default function PoliticaDeReturPage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-10">
          Politica de retur
        </h1>

        <div className="text-ui-fg-subtle space-y-10 text-base leading-7">
          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Returnare produse
            </h2>
            <p>
              Pentru persoane fizice produsele pot fi returnate în 14 zile calendaristice fără a preciza motivul returului. Produsul (produsele) se vor returna în ambalajul original prin serviciul de curierat rapid.
            </p>
            <p className="mt-5">
              Produsele care beneficiază de garanție vor fi însoțite de certificat de garanție.
            </p>
            <p className="mt-5 font-semibold text-ui-fg-base">
              Păstrați ambalajele originale!
            </p>
            <p className="mt-5">
              Nu se returnează produsele personalizate sau cele care se livrează la dimensiunile cerute de către client!
            </p>
            <p className="mt-5">
              Returnarea produsului (produselor) se va face în condițiile de mai sus.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Rambursarea sumelor
            </h2>
            <p>
              Indiferent de modalitatea de plată – la livrare, virament sau cu cardul – clienții vor primi sumele de bani plătite după ce produsele returnate au intrat în posesia noastră, în condițiile de mai sus. Pentru aceste produse SOLIDON SRL va face plata în termen de 1-2 zile lucrătoare.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Contact pentru returnări
            </h2>
            <p>
              Pentru inițierea unei returnări sau orice întrebări legate de politica de retur, ne puteți contacta la{" "}
              <a href="mailto:comenzi@accesorii-termopane.ro" className="text-space_indigo hover:underline">
                comenzi@accesorii-termopane.ro
              </a>
              {" "}sau la telefon{" "}
              <a href="tel:0728137137" className="text-space_indigo hover:underline">
                0728 137 137
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
