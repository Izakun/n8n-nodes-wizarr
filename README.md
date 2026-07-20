<img src="nodes/Wizarr/wizarr.svg" width="90" align="right" alt="Wizarr" />

# n8n-nodes-wizarr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-wizarr.svg)](https://www.npmjs.com/package/n8n-nodes-wizarr)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-wizarr.svg)](https://www.npmjs.com/package/n8n-nodes-wizarr)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-wizarr.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Wizarr**. It lets you automate
Wizarr directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Wizarr**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-wizarr`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Get Invitations** | Get many invitations |
| **Get Libraries** | Get many libraries |
| **Get Servers** | Get many media servers |
| **Get Status** | Get the instance status |
| **Get Users** | Get many users |

## Authentication

This node uses the **Wizarr API** credential. In n8n, go to **Credentials → New**, pick
**Wizarr API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://wizarr:5690` (no trailing slash).
- **API Key** — your service API key.

Your credential is sent as the `X-API-Key` request header.

**Where to find it:** See the service documentation: https://docs.wizarr.dev/

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Wizarr** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Wizarr API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Wizarr](https://docs.wizarr.dev/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
