import icons from "@/assets/icons"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { buttonVariants } from "../ui/button"
import { useUserAuth } from "@/context/userAuthContext"

interface ISidebarProps {}

const navItems = [
    {
        name: "Home",
        link: "/",
        icon: icons.home,
    },
    {
        name: "Add Photos",
        link: "/create-post",
        icon: icons.add,
    },
    {
        name: "My Photos",
        link: "/my-photos",
        icon: icons.myphoto,
    },
    {
        name: "Profile",
        link: "/profile",
        icon: icons.profile,
    },
    {
        name: "Notifications",
        link: "#",
        icon: icons.notification,
    },
    {
        name: "Direct",
        link: "#",
        icon: icons.direct,
    },
    {
        name: "Settings",
        link: "#",
        icon: icons.settings,
    },
]

function Sidebar({}: ISidebarProps) {
    const { pathname } = useLocation()
    const { logOut } = useUserAuth()

    return (
        <nav className="max-w-sm w-full h-screen flex flex-col space-x-7 relative">
            <div className="flex justify-center m-5">
                <div className="text-lg text-white">PhotoGram</div>
            </div>

            {/* map navItem */}
            {navItems.map((item) => (
                <Link key={item.name} to={item.link} className={cn(buttonVariants({ variant: "default" }), pathname === item.link ? "bg-white text-white-800 rounded-l-full hover:bg-white" : "bg-transparent rounded-l-full hover:bg-slate-950 duration-300 hover:text-white", "justify-start mb-2")}>
                    <div className="flex">
                        <span>
                            <img src={item.icon} className="w-5 h-5 mr-2" style={{ filter: `${pathname === item.link ? "invert(0)" : "invert(1)"}` }} />
                        </span>
                        <span>{item.name}</span>
                    </div>
                </Link>
            ))}

            {/* login - logout */}
            <Link to={"/login"} onClick={logOut} className={cn(buttonVariants({ variant: "default" }), pathname === "/login" ? "bg-white text-white-800 rounded-l-full hover:bg-white" : "bg-transparent rounded-l-full hover:bg-slate-950 duration-300 hover:text-white", "justify-start")}>
                <div className="flex">
                    <span>
                        <img src={icons.logout} className="w-5 h-5 mr-2" style={{ filter: `${pathname === "/login" ? "invert(0)" : "invert(1)"}` }} />
                    </span>
                    <span>Logout</span>
                </div>
            </Link>
        </nav>
    )
}

export default Sidebar
