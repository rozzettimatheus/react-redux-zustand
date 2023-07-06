import { PlayCircle, Video } from 'lucide-react'

type LessonProps = {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export function Lesson({
  onPlay,
  title,
  duration,
  isCurrent = false,
}: LessonProps) {
  return (
    <button
      className="flex items-center gap-3 text-sm text-zinc-400 group enabled:hover:text-zinc-100 cursor-pointer"
      data-active={isCurrent}
      disabled={isCurrent}
      onClick={onPlay}
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}

      <span className="group-data-[active=true]:text-emerald-400 group-data-[active=true]:font-bold">
        {title}
      </span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
