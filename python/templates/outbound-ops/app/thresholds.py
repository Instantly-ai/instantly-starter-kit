"""Alert thresholds — editable data, not logic. The brief and incident read these.

Sources: cold-email operator norms (bounce >2% watch / >5% act; complaint ~0.1%).
"""

THRESHOLDS = {
    "bounce_warn": 0.02,   # 2% bounce rate -> watch
    "bounce_crit": 0.05,   # 5% bounce rate -> act (pause the domain)
    "complaint_warn": 0.0008,
    "complaint_crit": 0.001,
    "placement_miss_tests": 2,
    "reply_drop_days": 3,
}
