# n8n-nodes-wizarr

[![npm version](https://img.shields.io/npm/v/n8n-nodes-wizarr.svg)](https://www.npmjs.com/package/n8n-nodes-wizarr)

n8n community node for [Wizarr](https://wizarr.dev/) — media server invitation manager — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-wizarr`.

## Operations
- Get Invitations, Get Users

## Credentials
Configure the base URL and authentication in the **Wizarr API** credential.

## Usage example

List invitations:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Invitations**.
4. Execute the node — example output:

```json
{ "id": 5, "code": "AB12CD", "used": false, "expires": "2026-08-01T00:00:00Z" }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
