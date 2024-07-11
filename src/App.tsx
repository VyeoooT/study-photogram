import { RouterProvider } from "react-router-dom"
import { routerFile } from "./routes"
import { UserAuthProvider } from "./context/userAuthContext"

function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={routerFile} />
    </UserAuthProvider>
  )
}

export default App
