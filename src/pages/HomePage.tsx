import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no notes
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a note.
          </p>
          <Button className="mt-4">Add Note</Button>
        </div>
      </div>
    </>
  )
}

export default HomePage;
