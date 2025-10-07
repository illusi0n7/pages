import { useMemo, useState } from 'react'
import './App.css'
import { combineAsJsonObjects, defaultSampleInput, type InputLists } from './utils/combinations'

function App() {
  const [rawJson, setRawJson] = useState<string>(JSON.stringify(defaultSampleInput, null, 2))
  const [error, setError] = useState<string | null>(null)

  const parsed: InputLists | null = useMemo(() => {
    try {
      const obj = JSON.parse(rawJson)
      if (obj && typeof obj === 'object') {
        return obj as InputLists
      }
      return null
    } catch (e) {
      return null
    }
  }, [rawJson])

  const output = useMemo(() => {
    if (!parsed) return []
    try {
      setError(null)
      return combineAsJsonObjects(parsed)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error')
      return []
    }
  }, [parsed])

  return (
    <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
      <header style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <h1 style={{ margin: 0 }}>Combinations Tester</h1>
        <span style={{ color: '#888' }}>{(() => {
          // small helper to show which branch the build artifact represents
          return 'dev branch'
        })()}</span>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="json-input" style={{ fontWeight: 600 }}>Input JSON</label>
          <textarea
            id="json-input"
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            style={{ width: '100%', height: 300, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 14, padding: 12, borderRadius: 8 }}
          />
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button onClick={() => setRawJson(JSON.stringify(defaultSampleInput, null, 2))}>Reset to default</button>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(output, null, 2))}>Copy output</button>
          </div>
          {error && <div style={{ color: 'crimson', marginTop: 8 }}>Error: {error}</div>}
        </div>
        <div>
          <label style={{ fontWeight: 600 }}>Output JSON (cartesian combinations)</label>
          <pre style={{ width: '100%', height: 300, overflow: 'auto', background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>
            {JSON.stringify(output, null, 2)}
          </pre>
          <div style={{ marginTop: 8, color: '#888' }}>Total combinations: {output.length}</div>
        </div>
      </section>
    </div>
  )
}

export default App
