import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getMyLinks } from '../data-access/get-my-links'
import { addLink } from '../data-access/add-link'
import { toast } from 'sonner'
import type { Link } from '../types/link'
import type { CreateLinkSchema } from '../schemas/create-link-schema'
import { updateLinkPositions } from '../data-access/update-link-positions'
import { updateLink } from '../data-access/update-link'
import { deleteLink } from '../data-access/delete-link'

export function useLinks(pageId: string | null) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['links', pageId],
    queryFn: async () => getMyLinks(pageId!),
    enabled: !!pageId,
  })

  const addMutation = useMutation({
    mutationFn: (createLink: CreateLinkSchema) => addLink(createLink),

    onMutate: async (newLink) => {
      await queryClient.cancelQueries({ queryKey: ['links', pageId] })

      const previousLinks = queryClient.getQueryData<Link[]>(['links', pageId])

      const optimisticLink: Link = {
        id: crypto.randomUUID(),
        title: newLink.title,
        url: newLink.url,
        clicks: 0,
        isVisible: newLink.isVisible,
        position: newLink.position,
      }

      queryClient.setQueryData<Link[]>(['links', pageId], (oldLinks = []) => [
        ...oldLinks,
        optimisticLink,
      ])

      return { previousLinks }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
      toast.success(t('dashboard.links.addLinkSuccess'))
    },

    onError: (_err, _newLink, context) => {
      queryClient.setQueryData<Link[]>(
        ['links', pageId],
        context?.previousLinks,
      )
      toast.error(t('dashboard.links.addLinkError'))
    },
  })

  const reorderMutation = useMutation({
    mutationFn: updateLinkPositions,

    onMutate: async (newPositions) => {
      await queryClient.cancelQueries({ queryKey: ['links', pageId] })

      const previousLinks = queryClient.getQueryData<Link[]>(['links', pageId])

      queryClient.setQueryData<Link[]>(['links', pageId], (old = []) =>
        old
          .map((link) => {
            const updated = newPositions.find((l) => l.id === link.id)
            return updated ? { ...link, position: updated.position } : link
          })
          .sort((a, b) => a.position - b.position),
      )

      return { previousLinks }
    },

    onError: (_err, _newLinks, context) => {
      queryClient.setQueryData(['links', pageId], context?.previousLinks)
      toast.error(t('dashboard.links.updateLinkError'))
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, isVisible }: { id: string; isVisible: boolean }) =>
      updateLink(id, { isVisible }),

    onMutate: async ({ id, isVisible }) => {
      await queryClient.cancelQueries({ queryKey: ['links', pageId] })

      const previousLinks = queryClient.getQueryData<Link[]>(['links', pageId])

      queryClient.setQueryData<Link[]>(['links', pageId], (old = []) =>
        old.map((link) =>
          link.id === id ? { ...link, isVisible: isVisible } : link,
        ),
      )

      return { previousLinks }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['links', pageId], context?.previousLinks)
      toast.error(t('dashboard.links.updateLinkError'))
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLink,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['links', pageId] })

      const previousLinks = queryClient.getQueryData<Link[]>(['links', pageId])

      queryClient.setQueryData<Link[]>(['links', pageId], (old = []) =>
        old.filter((link) => link.id !== id),
      )
      return { previousLinks }
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(['links', pageId], context?.previousLinks)
      toast.error(t('dashboard.links.deleteLinkError'))
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Link> }) =>
      updateLink(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['links', pageId] })

      const previousLinks = queryClient.getQueryData<Link[]>(['links', pageId])

      queryClient.setQueryData<Link[]>(['links', pageId], (old = []) =>
        old.map((link) => (link.id === id ? { ...link, ...data } : link)),
      )

      return { previousLinks }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['links', pageId], context?.previousLinks)
      toast.error(t('dashboard.links.updateLinkError'))
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })

  return {
    links: query.data ?? [],
    isLoading: query.isLoading,
    addLink: addMutation.mutate,
    reorderLinks: reorderMutation.mutate,
    toggleLinkVisibility: toggleMutation.mutate,
    deleteLink: deleteMutation.mutate,
    editLink: editMutation.mutate,
  }
}
