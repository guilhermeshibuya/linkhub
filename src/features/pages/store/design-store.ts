import type { PageInfo } from '../types/public-page'
import type { Theme } from '../types/theme'
import { create } from 'zustand'

interface DesignState {
  pageInfo: PageInfo | null
  selectedTheme: Theme | null
  headerData: { title: string; description?: string } | null

  setPageInfo: (data: PageInfo) => void
  setSelectedTheme: (theme: Theme) => void
  setHeaderData: (data: { title: string; description?: string }) => void
  setProfilePictureUrl: (url: string) => void
}

export const useDesignStore = create<DesignState>((set) => ({
  pageInfo: null,
  selectedTheme: null,
  headerData: null,
  profilePictureUrl: null,

  setPageInfo: (data) => set({ pageInfo: data }),
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  setHeaderData: (data) => set({ headerData: data }),
  setProfilePictureUrl: (url) =>
    set((state) => ({
      pageInfo: state.pageInfo
        ? { ...state.pageInfo, profilePictureUrl: url }
        : null,
    })),
}))
