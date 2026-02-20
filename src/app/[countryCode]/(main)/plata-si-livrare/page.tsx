import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plată și livrare - Solidon",
  description:
    "Modalități de plată și opțiuni de livrare în România. Fan Courier și Curiera.",
}

export default function PlataSiLivrarePage() {
  return (
    <div className="content-container py-8 small:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl-semi text-ui-fg-base mb-10">
          Plată și livrare
        </h1>

        <div className="text-ui-fg-subtle space-y-10 text-base leading-7">
          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Modalități de plată
            </h2>
            <p>
              Acceptăm orice modalitate de plată în conformitate cu legislația în vigoare:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Plată ramburs</strong> – la primirea coletului</li>
              <li><strong>Virament bancar</strong></li>
              <li><strong>Plată cu cardul</strong> – 3D Secure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Livrare în România
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">Fan Courier</h3>
                <p>
                  Livrarea se face în 1-2 zile lucrătoare. Pentru localitățile în care nu există sedii ale curierului se percep costuri suplimentare de transport, în acord cu politica de prețuri Fan Courier, iar termenele de livrare pot fi prelungite.
                </p>
                <p className="mt-3">
                  <a
                    href="https://www.fancourier.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-space_indigo hover:underline"
                  >
                    Vezi aria de acoperire Fan Courier →
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">Curiera</h3>
                <p>
                  Livrarea se face în 1-2 zile lucrătoare. Nu se percep costuri pentru km suplimentari. Costul transportului este de 20 lei.
                </p>
                <p className="mt-3">
                  Pentru comenzi atipice (greutate foarte mare, gabarit mare) veți fi contactați pentru a vă comunica costul transportului.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ui-fg-base mb-4">
              Întrebări despre livrare
            </h2>
            <p>
              Pentru detalii suplimentare despre costuri sau termene de livrare, ne puteți contacta la{" "}
              <a href="mailto:comenzi@accesorii-termopane.ro" className="text-space_indigo hover:underline">
                comenzi@accesorii-termopane.ro
              </a>
              {" "}sau la{" "}
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
