import { AppRoutes } from './routes'
import { ThemeProvider } from './providers/theme/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
