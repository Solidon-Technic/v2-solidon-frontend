"use server"

export async function submitContactForm(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
) {
  const subject = formData.get("subject") as string
  const email = formData.get("email") as string
  const orderCode = formData.get("order_code") as string
  const message = formData.get("message") as string
  const attachment = formData.get("attachment") as File | null

  if (!subject || subject === "") {
    return { error: "Vă rugăm să selectați o categorie." }
  }

  if (!email?.trim()) {
    return { error: "Vă rugăm să introduceți adresa de e-mail." }
  }

  if (!message?.trim()) {
    return { error: "Vă rugăm să introduceți mesajul." }
  }

  try {
    // TODO: Integrare cu serviciu de email (Resend, SendGrid, etc.)
    // sau trimitere către API-ul Medusa pentru notificări
    // Pentru moment, datele sunt validate și formularul returnează succes
    console.log("Contact form submission:", {
      subject,
      email,
      orderCode: orderCode || "(lipsă)",
      message,
      hasAttachment: !!attachment?.size,
    })

    return { success: true }
  } catch {
    return { error: "A apărut o eroare. Vă rugăm încercați din nou." }
  }
}
