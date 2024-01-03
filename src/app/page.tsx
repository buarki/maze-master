import Grid from "@path-craft/components/grid.component";
import { GRID_COLUMNS, GRID_ROWS } from "@path-craft/configs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid rows={GRID_ROWS} cols={GRID_COLUMNS}/>
    </main>
  )
}
