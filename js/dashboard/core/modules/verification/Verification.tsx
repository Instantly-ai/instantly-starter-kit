import { Panel } from "@/components/Panel"
import { VerifyTool } from "./VerifyTool"

export function Verification({ id }: { id: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Panel title="Verify an email" caption="createEmailVerification">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
            Verify-before-send: check an address is deliverable before adding it to a campaign. Verification is a
            confirm-gated write (it spends a credit) and runs async — the result may come back <strong style={{ color: "var(--ink)", fontWeight: 500 }}>pending</strong> and resolve shortly.
          </p>
          <VerifyTool clientId={id} />
        </div>
      </Panel>

      <Panel title="Why it matters" bodyPadding>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "var(--body)", lineHeight: 1.7 }}>
          <li>Sending to invalid addresses drives bounces, which hurt deliverability and warmup.</li>
          <li>Catch-all domains accept anything — treat them as risky, not verified.</li>
          <li>Verify leads after enrichment and before activating a campaign.</li>
        </ul>
      </Panel>
    </div>
  )
}
