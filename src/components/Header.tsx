import { useStore, useCurrentLesson } from '../zustand-store'

export function Header() {
  const isLoading = useStore((store) => store.isLoading)
  const { currentLesson, currentModule } = useCurrentLesson()
  // const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">
        {isLoading ? 'Carregando...' : currentLesson?.title}
      </h1>
      <span className="block text-sm leading-3 text-zinc-400">
        {isLoading ? '' : `Módulo ${currentModule?.title}`}
      </span>
    </header>
  )
}
