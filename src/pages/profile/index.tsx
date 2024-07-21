import images from "@/assets/images"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { useUserAuth } from "@/context/userAuthContext"
import { getPostByUserId } from "@/repository/post.service"
import { getUserProfile } from "@/repository/user.service"
import { DocumentResponse, Post, ProfileResponse } from "@/types"
import { Edit2Icon, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Profile() {
    const { user } = useUserAuth()
    const navigate = useNavigate()
    const initialUserInfo: ProfileResponse = {
        id: "",
        userId: user?.uid,
        userBio: "Pls update your bio...",
        photoURL: user?.photoURL ? user.photoURL : "",
        displayName: user?.displayName ? user.displayName : "Guest_User"
    }
    const [userInfo, setUserInfo] = useState<ProfileResponse>(initialUserInfo)
    const [data, setData] = useState<DocumentResponse[]>([])

    const getAllPost = async (id: string) => {
        try {
            const querySnapshot = await getPostByUserId(id)
            const tempArr: DocumentResponse[] = []

            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    const docData = doc.data() as Post
                    const responseObj: DocumentResponse = {
                        id: doc.id,
                        ...docData,
                    }
                    // console.log("The response object is: ", responseObj)
                    tempArr.push(responseObj)
                })
                setData(tempArr)
            }
            else {
                console.log("No such document")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <div key={item.photos[0].uuid} className="w-fit relative">
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 group transition-all duration-200">
                        <div className="size-full flex flex-col justify-center items-center gap-1">
                            <Heart className="hidden group-hover:block fill-white" />

                            <div className="hidden group-hover:block text-white">
                                {item.likes} likes
                            </div>
                        </div>
                    </div>

                    <img src={`${item.photos[0].cdnUrl}-/progressive/yes/-/scale_crop/300x300/center/`} />
                </div>
            )
        })
    }

    useEffect(() => {
        console.log("User:", user)

        if (user != null) {
            getAllPost(user.uid)
            getUserProfileInfo(user.uid)
        }
    }, [])

    const getUserProfileInfo = async(userId: string) => {
        const data: ProfileResponse = await getUserProfile(userId) || {}

        if (data.displayName) {
            setUserInfo(data)
        }
    }

    const editProfile = () => {
        navigate("/edit-profile", { state: userInfo })
    }

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-full max-w-3xl border">
                    <h3 className="text-white text-center text-lg bg-slate-800 p-2">Profile</h3>

                    <div className="p-8 pb-4 border-b">
                        <div className="flex flex-row items-center pb-2 mb-2">
                            {/* avt */}
                            <div className="mr-2">
                                <img
                                    className="size-28 rounded-full border-2 border-slate-800 object-cover"
                                    src={userInfo.photoURL ? userInfo.photoURL : images.avtDefault}
                                    alt="avatar"
                                />
                            </div>
                            
                            <div>
                                {/* display name */}
                                <div className="text-xl ml-3">{userInfo.displayName ? userInfo.displayName : "Guest_User"}</div>

                                {/* user mail */}
                                <div className="text-xl ml-3">{user?.email ? user?.email : ""}</div>
                            </div>
                        </div>
                        
                        {/* user bio */}
                        <div className="mb-4">{userInfo.userBio}</div>

                        {/* button update info */}
                        <div>
                            <Button onClick={editProfile}>
                                <Edit2Icon className="size-4 mr-2" /> Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="p-8">
                        <h2 className="mb-5">My Posts</h2>
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                            {data ? renderPosts() : <div>...loading</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
