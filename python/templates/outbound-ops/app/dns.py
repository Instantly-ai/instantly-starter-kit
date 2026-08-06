"""Read-verify SPF + DMARC (the API can't write DNS, so we can only check).

Uses dnspython if it's installed; if not, reports "unknown" honestly rather than
adding a hard dependency to a zero-dep kit. DKIM needs your selector, so it can't
be auto-checked.
"""


def verify_dns(domains):
    try:
        import dns.resolver  # type: ignore
    except Exception:
        return [
            {"domain": d, "spf": "unknown", "dmarc": "unknown",
             "note": "pip install dnspython to enable SPF/DMARC checks"}
            for d in domains
        ]

    out = []
    for domain in domains:
        spf, dmarc = "missing", "missing"
        try:
            for r in dns.resolver.resolve(domain, "TXT"):
                if "v=spf1" in str(r).lower():
                    spf = "ok"
        except Exception:
            spf = "error"
        try:
            for r in dns.resolver.resolve(f"_dmarc.{domain}", "TXT"):
                if "v=dmarc1" in str(r).lower():
                    dmarc = "ok"
        except Exception:
            dmarc = "error"
        out.append({"domain": domain, "spf": spf, "dmarc": dmarc})
    return out
