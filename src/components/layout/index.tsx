import React from "react"
import Sidebar from "../sidebar"
import UserList from "../userList"
import LinkGithub from "../linkGit"

interface ILayoutProps {
    children: React.ReactNode
}

function Layout({ children }: ILayoutProps) {
    return (
        <div className="flex bg-white">
            <aside className="flex gap-x-4 bg-slate-800 fixed top-0 left-0 lg:w-60 h-screen z-40">
                <Sidebar />
            </aside>

            <div className="flex-1 lg:ml-60 ml-36 lg:mr-60 p-8">
                {children}
            </div>

            <aside className="lg:w-60 h-screen lg:block hidden bg-slate-800 fixed top-0 right-0 z-40">
                <UserList />
            </aside>

            <div>
                <LinkGithub />
            </div>
        </div>
    )
}

export default Layout
