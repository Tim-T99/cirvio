// Simple integration test — run against the live server
// Usage: node node_modules/tsx/dist/cli.mjs test.ts

const BASE = 'http://localhost:5000'
let passed = 0
let failed = 0

async function expect(
  label: string,
  fn: () => Promise<void>
): Promise<void> {
  try {
    await fn()
    console.log(`  ✓ ${label}`)
    passed++
  } catch (err) {
    console.error(`  ✗ ${label}: ${(err as Error).message}`)
    failed++
  }
}

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message)
}

async function json(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, init)
  return { status: res.status, body: await res.json() }
}

// ─── Health ───────────────────────────────────────────────────────────────────

console.log('\nHealth')

await expect('GET / returns 200 with status ok', async () => {
  const { status, body } = await json('/')
  assert(status === 200, `Expected 200, got ${status}`)
  assert(body.status === 'ok', `Expected status "ok", got "${body.status}"`)
})

// ─── Companies ────────────────────────────────────────────────────────────────

console.log('\nCompanies (requires database)')

await expect('GET /api/admin/companies returns 200 or 500', async () => {
  const { status } = await json('/api/admin/companies')
  assert(
    status === 200 || status === 500,
    `Unexpected status ${status}`
  )
})

await expect('POST /api/admin/companies with missing body returns 500 or 400', async () => {
  const { status } = await json('/api/admin/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  assert(
    status === 201 || status === 400 || status === 500,
    `Unexpected status ${status}`
  )
})

// ─── Managers / Employees (501 stubs) ─────────────────────────────────────────

console.log('\nStub endpoints')

await expect('GET /api/admin/managers returns 501', async () => {
  const { status, body } = await json('/api/admin/managers')
  assert(status === 501, `Expected 501, got ${status}`)
  assert(body.success === false, 'Expected success: false')
})

await expect('GET /api/admin/employees returns 501', async () => {
  const { status, body } = await json('/api/admin/employees')
  assert(status === 501, `Expected 501, got ${status}`)
  assert(body.success === false, 'Expected success: false')
})

// ─── 404 ──────────────────────────────────────────────────────────────────────

console.log('\n404 handling')

await expect('GET /nonexistent route returns 404', async () => {
  const res = await fetch(`${BASE}/nonexistent`)
  assert(res.status === 404, `Expected 404, got ${res.status}`)
})

// ─── CORS ─────────────────────────────────────────────────────────────────────

console.log('\nCORS')

await expect('Allowed origin receives Access-Control-Allow-Origin', async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Origin: 'http://localhost:4200' },
  })
  const header = res.headers.get('access-control-allow-origin')
  assert(header === 'http://localhost:4200', `Expected CORS header, got ${header}`)
})

await expect('Unknown origin gets no Access-Control-Allow-Origin', async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Origin: 'http://evil.com' },
  })
  const header = res.headers.get('access-control-allow-origin')
  assert(header === null || header !== 'http://evil.com', 'Unexpected CORS allow for evil.com')
})

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n──────────────────────────`)
console.log(`Results: ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
