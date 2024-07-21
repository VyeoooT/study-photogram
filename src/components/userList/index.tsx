import images from "@/assets/images"
import { useUserAuth } from "@/context/userAuthContext"
import { getAllUsers } from "@/repository/user.service"
import { ProfileResponse } from "@/types"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

interface IUserList {}

function UserList({}: IUserList) {
    const { user } = useUserAuth()
    const [suggestedUser, setSuggestedUser] = useState<ProfileResponse[]>([])
    const getSuggestedUsers = async (userId: string) => {
        const response = (await getAllUsers(userId)) || []
        setSuggestedUser(response)
    }

    useEffect(() => {
        if (user?.uid != null) {
            getSuggestedUsers(user.uid)
        }
    }, [])

    const renderUsers = () => {
        return suggestedUser.map((user) => {
            return (
                <div className="flex flex-row items-center justify-start border-gray-400 mb-4">
                    {/* avatar */}
                    <span className="mr-2">
                        <img
                            src={user.photoURL ? user.photoURL : images.avtDefault}
                            alt="avatar"
                            className="size-10 rounded-full border-2 border-yellow-200 object-cover"
                        />
                    </span>

                    {/* user name */}
                    <span className="text-xs">{user.displayName ? user.displayName : "Guest_User"}</span>

                    {/* button follow */}
                    <Button className="h-6 text-xs p-3 py-2 bg-slate-700 last-of-type:ml-auto">
                        Follow
                    </Button>
                </div>
            )
        })
    }

    return (
        <div className="text-white py-8 px-3">
            <Link to={"/profile"}>
                <div className="flex flex-row items-center border-b border-gray-400 pb-4 mb-4 cursor-pointer">
                    {/* avatar */}
                    <span className="mr-2">
                        <img
                            src={user?.photoURL ? user.photoURL : images.avtDefault}
                            alt="avatar"
                            className="size-10 rounded-full border-2 border-yellow-200 object-cover"
                        />
                    </span>

                    {/* user name */}
                    <span className="text-xs">
                        {user?.displayName ? user.displayName : "Guest_User"}
                    </span>
                </div>
            </Link>

            <h3 className="text-sm text-slate-300">Suggested Friends</h3>

            <div className="my-4">{suggestedUser.length > 0 ? renderUsers() : ""}</div>
        </div>
    )
}

export default UserList
