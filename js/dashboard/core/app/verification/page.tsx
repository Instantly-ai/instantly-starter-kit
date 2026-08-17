import { Verification } from "@/modules/verification/Verification"
import { switcherClients } from "@/lib/clients"

export const dynamic = "force-dynamic"

export default async function VerificationPage() {
  const clients = await switcherClients()
  // Verification is a workspace-level tool; run it against the first client (the
  // single workspace in single-key mode). Credits are shared org-wide.
  const workspaceId = clients[0]?.id ?? "current"

  return (
    <>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>Verification</h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>Verify an address is deliverable before you send</p>
      </div>
      <Verification id={workspaceId} />
    </>
  )
}
