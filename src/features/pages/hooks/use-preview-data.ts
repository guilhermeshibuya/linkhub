import { useUserData } from '@/hooks/use-user-data'
import { useDesignStore } from '../store/design-store'
import { useQuery } from '@tanstack/react-query'
import { getPublicPageByUsername } from '../data-access/get-public-page'

export function usePreviewData() {
  const { username } = useUserData()
  const { themeDraft, headerDraft } = useDesignStore()

  const { data: publicPage } = useQuery({
    queryKey: ['public-page', username],
    queryFn: () => getPublicPageByUsername(username!),
    enabled: !!username,
  })

  const resolvedThemeName = themeDraft ?? publicPage?.themeName ?? 'deep_slate'
  const resolvedTitle = headerDraft.title ?? publicPage?.title
  const resolvedDescription = headerDraft.description ?? publicPage?.description

  return {
    ...publicPage,
    themeName: resolvedThemeName,
    title: resolvedTitle,
    description: resolvedDescription,
  }
}
