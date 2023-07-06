export function ModuleLoader() {
  return (
    <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
      <span className="flex h-10 w-10 shrink-0 rounded-full items-center justify-center bg-zinc-700 animate-pulse"></span>
      <div className="flex flex-col gap-1 text-left flex-1">
        <strong className="w-full bg-zinc-700 rounded-md h-5 animate-pulse"></strong>
        <span className="w-full bg-zinc-700 rounded-md h-3 animate-pulse"></span>
      </div>
    </div>
  )
}
