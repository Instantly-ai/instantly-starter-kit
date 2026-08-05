import { promises as dns } from "node:dns"

export interface DnsResult {
  domain: string
  spf: "ok" | "missing" | "error"
  dmarc: "ok" | "missing" | "error"
}

/**
 * Read-verify SPF + DMARC via public DNS (closes the read gap — the API can't write DNS).
 * DKIM needs your selector, so it can't be auto-checked; the incident report says so.
 */
export async function verifyDns(domains: string[]): Promise<DnsResult[]> {
  const out: DnsResult[] = []
  for (const domain of domains) {
    let spf: DnsResult["spf"] = "missing"
    let dmarc: DnsResult["dmarc"] = "missing"
    try {
      const txt = await dns.resolveTxt(domain)
      if (txt.flat().some((r) => r.toLowerCase().includes("v=spf1"))) spf = "ok"
    } catch {
      spf = "error"
    }
    try {
      const txt = await dns.resolveTxt(`_dmarc.${domain}`)
      if (txt.flat().some((r) => r.toLowerCase().includes("v=dmarc1"))) dmarc = "ok"
    } catch {
      dmarc = "error"
    }
    out.push({ domain, spf, dmarc })
  }
  return out
}
