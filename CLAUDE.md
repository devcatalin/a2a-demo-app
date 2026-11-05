# demo-shop

A tiny shop API (Express): cart totals with sales and coupons. Prices are in cents.

## Testing

Tests run in **Testkube**, our test platform, not on this machine: there is no local test setup, so don't try
`npm test` here. To check a change, push the branch, then ask the Testkube AI Agent **Shop QA** over A2A with the
`a2a-cli` skill:

- The agent URL is in `$TK_AGENT_URL` and its token in `$TK_TOKEN` (already in the environment; never print them).
- The tests are the Test Workflow `shop-api-tests`; it takes a `revision` config (the branch name).
- Start the request without waiting, so the user can follow along in Testkube right away:
  `a2a send --async -o json -a "$TK_AGENT_URL" --auth "Bearer $TK_TOKEN" "<request>"`
  Show the user the dashboard link from the task's `metadata["testkube.io/chatUrl"]`.
- Then wait for the answer: `a2a task subscribe -o jsonl --timeout 5m -a "$TK_AGENT_URL" --auth "Bearer $TK_TOKEN" <task id>`
  (or poll `a2a task get` until the task is completed).
- For a follow-up in the same Testkube chat, pass the same `--context-id`.
- When Testkube reports failures: fix the code, commit, push the branch, and ask Shop QA to run the tests again in
  the same chat (same `--context-id`), until they pass. Then summarise for the user what was wrong and what you changed.
