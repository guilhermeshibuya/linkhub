import { AppRoutes } from './routes'
import { ThemeProvider } from './providers/theme/theme-provider'
import { AuthProvider } from './providers/auth/auth-provider'
import { Toaster } from './components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
