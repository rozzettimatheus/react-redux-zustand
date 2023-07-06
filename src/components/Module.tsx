import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { useAppDispatch, useAppSelector } from '../store'
import { play } from '../store/slices/player'
import { Lesson } from './Lesson'
import { useStore } from '../zustand-store'

type ModuleProps = {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

// const dispatch = useAppDispatch()

// const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
//   const { currentModuleIndex, currentLessonIndex } = state.player

//   return { currentModuleIndex, currentLessonIndex }
// })
// const lessons = useAppSelector(
//   (state) => state.player.course?.modules[moduleIndex].lessons
// )

export function Module({ moduleIndex, amountOfLessons, title }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(
    (store) => ({
      currentLessonIndex: store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      lessons: store.course?.modules[moduleIndex].lessons,
      play: store.play,
    })
  )

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <span className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </span>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content className="CollapsibleContent">
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent =
              currentLessonIndex === lessonIndex &&
              currentModuleIndex === moduleIndex

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={isCurrent}
                onPlay={() => play([moduleIndex, lessonIndex])}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
