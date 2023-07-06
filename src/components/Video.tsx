import ReactPlayer from 'react-player'
import { Loader } from 'lucide-react'

import { useStore, useCurrentLesson } from '../zustand-store'

// const dispatch = useAppDispatch()
// const { currentLesson } = useCurrentLesson()
// const isCourseLoading = useAppSelector((state) => state.player.isLoading)

export function Video() {
  const { isLoading, next } = useStore((store) => ({
    isLoading: store.isLoading,
    next: store.next,
  }))
  const { currentLesson } = useCurrentLesson()

  function handlePlayNext() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="h-6 w-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  )
}
