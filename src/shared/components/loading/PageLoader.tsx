import { Loader2 } from 'lucide-react'

export function PageLoader() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="mt-3 text-sm">Loading page...</p>
    </div>
  )
}
