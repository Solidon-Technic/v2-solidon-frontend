"use client"

import { ChevronUpDown } from "@medusajs/icons"
import { useActionState, useState } from "react"
import { submitContactForm } from "@modules/contact/actions"
import { clx } from "@medusajs/ui"

const SUBJECT_OPTIONS = [
  { value: "", label: "Selectează o categorie" },
  { value: "general", label: "Întrebare generală" },
  { value: "comanda", label: "Despre comandă" },
  { value: "produs", label: "Despre produs" },
  { value: "retur", label: "Returnare / Ramburs" },
  { value: "tehnic", label: "Suport tehnic" },
  { value: "altceva", label: "Altele" },
]

const inputBase =
  "w-full h-11 px-4 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-colors"
const labelBase = "mb-2 block text-sm font-semibold text-neutral-700"

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <div className="bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-800 mb-2">
          Completează formularul și vom reveni cu un răspuns sau o soluționare în cel mai scurt timp.
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Formularul respectă prevederile privind protecția datelor cu caracter personal și este destinat solicitărilor legate de comenzi, produse sau asistență.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="subject" className={labelBase}>
            Solicitarea ta e legată de:
          </label>
          <div className="relative">
            <select
              id="subject"
              name="subject"
              required
              className={clx(
                inputBase,
                "appearance-none pr-10 cursor-pointer"
              )}
            >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
              <ChevronUpDown className="w-5 h-5" />
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Adresa de e-mail <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="exemplu@email.ro"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="order_code" className={labelBase}>
            Numărul comenzii (opțional):
          </label>
          <input
            id="order_code"
            name="order_code"
            type="text"
            placeholder="Numărul comenzii (opțional)"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelBase}>
            Da-ne câteva detalii: <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Scrieți mesajul dvs..."
            className={clx(
              inputBase,
              "h-auto min-h-[120px] py-3 resize-y"
            )}
          />
        </div>

        <div>
          <label className={labelBase}>
            Atașați fișierul:
          </label>
          <div className="flex border border-neutral-200 rounded-lg overflow-hidden bg-neutral-100">
            <label className="px-4 py-2.5 bg-neutral-200 border-r border-neutral-200 text-sm font-medium text-neutral-800 cursor-pointer hover:bg-neutral-300 transition-colors shrink-0">
              Alegeți fișier
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                className="hidden"
              />
            </label>
            <div className="flex-1 px-4 py-2.5 text-sm text-neutral-400 flex items-center">
              {fileName ?? "No file chosen"}
            </div>
          </div>
        </div>

        {state?.success && (
          <p className="text-sm text-green-600 font-medium">
            Mesajul a fost trimis cu succes. Vă vom răspunde în cel mai scurt timp.
          </p>
        )}
        {state?.error && (
          <p className="text-sm text-rose-500 font-medium">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          className="w-full small:w-auto px-6 py-3 bg-neutral-800 hover:bg-neutral-900 text-white font-medium rounded-lg transition-colors"
        >
          Trimite mesajul
        </button>
      </form>
    </div>
  )
}
