"use client"

import { useState } from "react"
import { Envelope, User } from "@medusajs/icons"
import StoreLogo from "@modules/common/components/store-logo"

export default function NewsletterCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Connect to backend newsletter subscription service
    console.log("Newsletter subscription:", formData)
    setIsSubmitted(true)
    setFormData({ name: "", email: "" })
    // Reset message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-7 md:py-9 bg-primary-800 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="max-w-[1440px] w-full mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
          {/* Left Side - Visual */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <div className="relative w-48 h-36 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center overflow-hidden">
              <StoreLogo width={180} height={60} className="opacity-95" />
            </div>
          </div>

          {/* Right Side - Content & Form */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="block">Abonează-te la newsletter</span>
                <span className="block">Și află cu prioritate despre reducerile și ofertele exclusive Solidon</span>
              </h2>
              <p className="text-sm md:text-base text-primary-100">
                Vei primi un email în care te rugăm să confirmi abonarea.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
              <div className="relative w-full md:w-[20rem]">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nume și prenume"
                  className="w-full h-12 px-5 pl-12 bg-white text-neutral-900 placeholder-neutral-500 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-0 transition-all duration-200 text-sm"
                  required
                />
              </div>

              <div className="relative w-full md:w-[20rem]">
                <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full h-12 px-5 pl-12 bg-white text-neutral-900 placeholder-neutral-500 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-0 transition-all duration-200 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto md:min-w-[12rem] h-12 px-8 bg-accent-500 text-white font-semibold rounded-full hover:bg-accent-600 active:bg-accent-700 transition-colors duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Mă abonez!
              </button>
            </form>

            {isSubmitted && (
              <div className="text-sm font-medium text-emerald-300 flex items-center gap-1.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                Te-ai abonat cu succes!
              </div>
            )}

            <p className="text-xs text-primary-200 leading-relaxed">
              Prin completarea datelor de mai sus, confirmi că ai citit politica de confidențialitate și că ești de acord să primești comunicări comerciale.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
