import { create } from 'zustand'
import { api } from '../lib/axios'

type Course = {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export type PlayerState = {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })
      const { data } = await api.get('/courses/1')
      set({ course: data, isLoading: false })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIdx, lessonIdx] = moduleAndLessonIndex

      set({ currentModuleIndex: moduleIdx, currentLessonIndex: lessonIdx })
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
        return
      }

      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = course?.modules[nextModuleIndex]

      if (nextModule) {
        set({ currentModuleIndex: nextModuleIndex, currentLessonIndex: 0 })
      }
    },
  }
})

export const useCurrentLesson = () =>
  useStore((state) => {
    const { currentModuleIndex, currentLessonIndex, course } = state

    const currentModule = course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentModule, currentLesson }
  })
