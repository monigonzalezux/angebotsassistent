import { Button } from './components/Button'

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900">Angebotsassistent</h1>
      <p className="text-gray-600">Vite + React + TypeScript + Tailwind + Storybook</p>
      <div className="flex gap-3">
        <Button label="Neues Angebot" />
        <Button label="Abbrechen" variant="secondary" />
      </div>
    </main>
  )
}

export default App
