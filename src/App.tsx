import { AppRoutes } from './routes'
import { ThemeProvider } from './providers/theme/theme-provider'
import { AuthProvider } from './providers/auth/auth-provider'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
