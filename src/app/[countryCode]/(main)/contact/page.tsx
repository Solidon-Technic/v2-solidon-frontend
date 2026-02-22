import { Metadata } from "next"
import ContactForm from "@modules/contact/components/contact-form"

export const metadata: Metadata = {
  title: "Contact - Solidon",
  description:
    "Contactați-ne. Showroom București, email, telefon. SOLIDON TEHNIC SRL.",
}

const MAP_ADDRESS = "Strada Sadului 35, Sector 5, București, Romania"
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_ADDRESS)}`
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&output=embed`

export default function ContactPage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-2">
          Asistență pentru clienți
        </h1>
        <p className="text-lg font-semibold text-ui-fg-subtle mb-10">
          Contactați-ne
        </p>

        <div className="grid small:grid-cols-2 gap-10">
          <div className="text-ui-fg-subtle space-y-6 text-base leading-7">
            <section>
              <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
                SOLIDON TEHNIC SRL
              </h2>
              <p>
                <strong className="text-ui-fg-base">Showroom:</strong>
                <br />
                Strada Sadului, Nr. 35, Sector 5, București, România
              </p>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-space_indigo hover:underline font-medium"
              >
                Vezi pe Google Maps →
              </a>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
                Contact
              </h2>
              <p>
                <strong className="text-ui-fg-base">Email:</strong>{" "}
                <a href="mailto:comenzi@accesorii-termopane.ro" className="text-space_indigo hover:underline">
                  comenzi@accesorii-termopane.ro
                </a>
              </p>
              <p className="mt-2">
                <strong className="text-ui-fg-base">Telefon:</strong>{" "}
                <a href="tel:0215557540" className="text-space_indigo hover:underline">0215 557 540</a>
                {" · "}
                <a href="tel:0769137137" className="text-space_indigo hover:underline">0769 137 137</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
                Date firma
              </h2>
              <p>C.U.I.: RO32867737</p>
              <p>Reg. com.: J40/2542/2014</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
                Conturi bancare
              </h2>
              <p>
                <strong className="text-ui-fg-base">Trezoreria Statului</strong>
                <br />
                IBAN: RO95TREZ7045069XXX011787
              </p>
              <p className="mt-3">
                <strong className="text-ui-fg-base">BRD - Groupe Société Générale</strong>
                <br />
                IBAN: RO49BRDE441SV96683414410
              </p>
            </section>
          </div>

          <div className="min-h-[300px] small:min-h-[400px] rounded-lg overflow-hidden border border-ui-border-base">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație Solidon - Strada Sadului 35, București"
              className="w-full h-full min-h-[300px] small:min-h-[400px]"
            />
          </div>
        </div>

        <section className="mt-16 pt-10 border-t border-neutral-200">
          <div className="max-w-xl w-full mx-auto">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  )
}
