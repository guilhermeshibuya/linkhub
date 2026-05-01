import { useQuery } from '@tanstack/react-query'
import { useAuth } from './use-auth'
import { getProfile } from '@/features/profiles/data-access/get-profile'
import { getPageId } from '@/features/pages/data-access/get-page-id'

export function useUserData() {
  const { user } = useAuth()

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  })

  const pageQuery = useQuery({
    queryKey: ['page', user?.id],
    queryFn: () => getPageId(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  })

  return {
    user,
    profile: profileQuery.data ?? null,
    username: profileQuery.data?.username ?? null,
    pageId: pageQuery.data ?? null,
    loading: profileQuery.isLoading || pageQuery.isLoading,
    error: profileQuery.error || pageQuery.error,
  }
}
