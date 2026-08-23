# Security Policy

This repo is the marketing site and product preview — it holds no
private keys and, outside of `/signin` and `/signup`, talks to no
backend at all. Every on-chain action in the wider StellarExpress
product is non-custodial: the backend only ever proposes a
transaction, and it's signed and sent by the user's own Stellar
wallet. See [StellarExpress/backend](https://github.com/StellarExpress/backend)
and [StellarExpress/contracts](https://github.com/StellarExpress/contracts)
for the escrow and signing flow itself.

If you find a case where that isn't true, a way to bypass the sign-in
form's validation to reach data that shouldn't be reachable, or any
other vulnerability, please report it privately through the
StellarExpress GitHub organization rather than opening a public issue.

## Supported versions

| Version | Supported |
|---|---|
| 0.1.x | :white_check_mark: |

## Scope

In scope: this repository (the Next.js frontend). Vulnerabilities in
the backend API or the on-chain escrow contracts should be reported
against those repositories instead.
