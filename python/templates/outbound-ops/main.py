"""outbound-ops — daily outbound operations on the Instantly SDK.

Usage:
  python main.py brief     [--raw]
  python main.py incident  [--confirm]   (diagnose is read-only; --confirm applies containment)
"""
import sys


def main() -> None:
    args = sys.argv[1:]
    cmd = args[0] if args else "brief"
    rest = args[1:]
    if cmd == "brief":
        from app import brief
        brief.run(rest)
    elif cmd == "incident":
        from app import incident
        incident.run(rest)
    else:
        sys.exit(f"Unknown command: {cmd}. Use 'brief' or 'incident'.")


if __name__ == "__main__":
    main()
