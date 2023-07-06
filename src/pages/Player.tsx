import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

import { useCurrentLesson, useStore } from '../zustand-store'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { ModuleLoader } from '../components/ModuleLoader'

// const dispatch = useAppDispatch()
// const modules = useAppSelector((state) => state.player.course?.modules)
// const isCourseLoading = useAppSelector((state) => state.player.isLoading)

// useEffect(() => {
//   dispatch(loadCourse())
// }, [])

export function Player() {
  const { course, isLoading, load } = useStore((store) => ({
    course: store.course,
    isLoading: store.isLoading,
    load: store.load,
  }))
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    if (!currentLesson) return
    document.title = `Assistindo: ${currentLesson.title}`
  }, [currentLesson])

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="font-display h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 p-4">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-auto scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {isLoading ? (
              <>
                <ModuleLoader />
                <ModuleLoader />
              </>
            ) : (
              course?.modules?.map((module, index) => (
                <Module
                  key={module.id}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                  moduleIndex={index}
                />
              ))
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
