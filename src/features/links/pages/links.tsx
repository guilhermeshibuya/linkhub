import { useAuth } from '@/hooks/use-auth'

export function LinksPage() {
  const { user } = useAuth()
  return <div>Bem vindo {user?.user_metadata.full_name}</div>
}
