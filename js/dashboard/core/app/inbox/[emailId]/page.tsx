import { ReplyThread } from "@/modules/replies/ReplyThread"
import { switcherClients } from "@/lib/clients"

export const dynamic = "force-dynamic"

// Reply-thread drill-down as a top-level page (under /inbox, not the client shell).
// `?client=<id>` names the workspace the email belongs to (agency mode).
export default async function ThreadPage({ params, searchParams }: { params: { emailId: string }; searchParams: { client?: string } }) {
  const clients = await switcherClients()
  const clientId = searchParams.client || clients[0]?.id || ""

  return <ReplyThread clientId={clientId} emailId={decodeURIComponent(params.emailId)} backHref="/inbox" />
}
