# demo-shop

A tiny shop API (Express): cart totals with sales and coupons. Prices are in cents.

## Testing

Tests run in **Testkube**, our test platform, not on this machine: there is no local test setup, so don't try
`npm test` here. To check a change, push the branch, then ask the Testkube AI Agent **Shop QA** over A2A with the
`a2a-cli` skill:

- The agent URL is in `$TK_AGENT_URL` and its token in `$TK_TOKEN` (already in the environment; never print them).
- The tests are the Test Workflow `shop-api-tests`; it takes a `revision` config (the branch name).
- Start the request without waiting, so the user can follow along in Testkube right away. Use exactly this command,
  which prints only the ids you need:
  `a2a send --async -o json -a "$TK_AGENT_URL" --auth "Bearer $TK_TOKEN" "<request>" | jq '{task: .task.id, context: .task.contextId}'`
  Then tell the user Shop QA is on it and the Testkube chat is open in their dashboard. Don't paste dashboard URLs.
- Wait for the answer with exactly this command, which prints only Shop QA's answer:
  `a2a task subscribe -o jsonl --timeout 5m -a "$TK_AGENT_URL" --auth "Bearer $TK_TOKEN" <task> | jq -r 'select(.artifactUpdate) | .artifactUpdate.artifact.parts[].text'`
- For a follow-up in the same Testkube chat, add `--context-id <context>` to the send command.
- When Testkube reports failures: fix the code, commit, push the branch, and ask Shop QA to run the tests again in
  the same chat, until they pass. Then summarise for the user what was wrong and what you changed. Keep URLs out of
  your messages.
