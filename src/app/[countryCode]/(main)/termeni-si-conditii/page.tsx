import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termeni și condiții - Solidon",
  description:
    "Termenii și condițiile de utilizare a serviciului Solidon. Returnări, transport.",
}

export default function TermeniSiConditiiPage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-10">
          Termeni și condiții
        </h1>

        <div className="text-ui-fg-subtle space-y-10 text-base leading-7">
          <section>
            <p>
              În utilizarea serviciului, dumneavoastră sunteți de acord să furnizați informații adevărate, corecte, actuale și complete despre dumneavoastră, așa cum sunt acestea specificate în documente, și sunteți de acord să furnizați aceste informații corect și complet. În situația în care considerăm că această obligație nu este respectată de către dumneavoastră, ne rezervăm dreptul să vă blocăm accesul la utilizarea serviciului, pe perioada determinată sau nedeterminată, fără nicio notificare prealabilă. Ne rezervăm și dreptul de a selecta prin acceptare sau refuzare clienții înregistrați sau comenzile înregistrate dacă datele sau acțiunile lor sunt îndoielnice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Returnare produse
            </h2>
            <p>
              Pentru persoane fizice produsele pot fi returnate în 14 zile calendaristice fără a preciza motivul returului. Produsul (produsele) se vor returna în ambalajul original prin serviciul de curierat rapid. Plata către client se va face în aceeași zi sau în ziua următoare după ce se primește coletul.
            </p>
            <p className="mt-5">
              Produsele care beneficiază de garanție vor fi însoțite de certificat de garanție. Returnarea produsului (produselor) se va face în condițiile de mai sus.
            </p>
            <p className="mt-5 font-semibold text-ui-fg-base">
              Păstrați ambalajele originale!
            </p>
            <p className="mt-5">
              Nu se returnează produsele personalizate sau cele care se livrează la dimensiunile cerute de către client!
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Transport
            </h2>
            <p>
              Dacă nu vă aflați în zona de acoperire Fan Courier se percepe un cost suplimentar pentru transport.
            </p>
            <p className="mt-5">
              <a
                href="https://www.fancourier.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-space_indigo hover:underline"
              >
                Vezi aria de acoperire Fan Courier →
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
