import { useQuery } from '@tanstack/react-query'
import { getPageInfo } from '../data-access/get-page-info'

export function usePageInfo(pageId: string) {
  return useQuery({
    queryFn: () => getPageInfo(pageId),
    queryKey: ['page-info', pageId],
    enabled: !!pageId,
    staleTime: 1000 * 60 * 5,
  })
}
