import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import { SessionProvider } from "./context/SessionContext"

function App() {

  return (
    <>
      <div className="bg-slate-100 h-screen">
        <div className="flex  items-center justify-center h-screen">
          <SessionProvider>
            <RouterProvider router={routes} />
          </SessionProvider>
        </div>
      </div>

    </>
  )
}

export default App
