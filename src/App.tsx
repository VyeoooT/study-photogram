import { RouterProvider } from "react-router-dom"
import { routerFile } from "./routes"
import { UserAuthProvider } from "./context/userAuthContext"
import LinkGithub from "./components/linkGit"

function App() {
  return (
    <UserAuthProvider>
      <LinkGithub />
      <RouterProvider router={routerFile} />
    </UserAuthProvider>
  )
}

export default App
