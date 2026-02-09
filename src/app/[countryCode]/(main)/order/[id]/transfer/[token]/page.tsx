import { Heading, Text } from "@medusajs/ui"
import TransferActions from "@modules/order/components/transfer-actions"
import TransferImage from "@modules/order/components/transfer-image"

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Solicitare de transfer pentru comanda {id}
        </Heading>
        <Text className="text-zinc-600">
          Ai primit o solicitare de transfer al proprietății comenzii tale ({id}).
          Dacă ești de acord cu această solicitare, poți aproba transferul apăsând
          butonul de mai jos.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <Text className="text-zinc-600">
          Dacă accepți, noul proprietar va prelua toate responsabilitățile și
          permisiunile asociate acestei comenzi.
        </Text>
        <Text className="text-zinc-600">
          Dacă nu recunoști această solicitare sau dorești să păstrezi proprietatea,
          nu este necesară nicio acțiune suplimentară.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
