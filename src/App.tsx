import { Button } from './components/Button'

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24 bg-gray-50 p-24">
      <h1 className="text-4xl font-bold text-gray-900">Angebotsassistent</h1>
      <p className="text-gray-600">Vite + React + TypeScript + Tailwind + Storybook</p>
      <div className="flex gap-12">
        <Button>Neues Angebot</Button>
        <Button variant="secondary">Abbrechen</Button>
      </div>
    </main>
  )
}

export default App
