import images from "@/assets/images"
import FileUploader from "@/components/fileUploader"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserAuth } from "@/context/userAuthContext"
import { updateUserInfoOnPosts } from "@/repository/post.service"
import { createUserProfile, updateUserProfile } from "@/repository/user.service"
import { FileEntry, ProfileInfo, UserProfile } from "@/types"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function EditProfile() {
    const { user, updateProfileInfo } = useUserAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const { id, userId, userBio, displayName, photoURL } = location.state
    console.log("Location: ", location.state)

    const [data, setData] = useState<UserProfile>({
        userId,
        userBio,
        displayName,
        photoURL,
    })
    const [fileEntry, setFileEntry] = useState<FileEntry>({ files: [] })

    const updateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (id) {
                const response = await updateUserProfile(id, data)
                console.log("The UPDATE user profile is: ", id)
                console.log("The UPDATE user profile is: ", response)
            }
            else {
                const response = await createUserProfile(data)
                console.log("The create user profile is: ", response)
            }

            const profileInfo: ProfileInfo = {
                user: user!,
                displayName: data.displayName,
                photoURL: data.photoURL,
            }
            updateProfileInfo(profileInfo)

            updateUserInfoOnPosts(profileInfo)

            navigate("/profile")

        } catch (error) {
            console.log(error)
        }
    }

    console.log("upload avt: ", fileEntry)
    useEffect(() => {
        if (fileEntry.files.length > 0) {
            setData({
                ...data,
                photoURL: fileEntry.files[0].cdnUrl || ""
            })
        }
    }, [fileEntry])

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="border max-w-3xl w-full">
                    <h3 className="bg-slate-800 text-white text-center text-lg p-2">Edit Profile</h3>

                    <div className="p-8">
                        <form onSubmit={updateProfile}>
                            {/* avatar */}
                            <div className="flex flex-col gap-4 mb-6">
                                <Label htmlFor="avatar">Avatar Picture</Label>

                                <div>
                                    {fileEntry.files.length > 0 ?
                                        (<img
                                            src={fileEntry.files[0].cdnUrl!}
                                            alt="avatar"
                                            className="size-28 rounded-full border-2 border-slate-800 object-cover"
                                        />)

                                        :

                                        (<img
                                            src={data.photoURL ? data.photoURL : images.avtDefault}
                                            alt="avatar"
                                            className="size-28 rounded-full border-2 border-slate-800 object-cover"
                                        />)
                                    }
                                    
                                </div>

                                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false}/>
                            </div>

                            {/* input */}
                            <div className="space-y-5">
                                {/* display name */}
                                <div className="flex flex-col space-y-3">
                                    <Label htmlFor="displayName">Display Name</Label>

                                    <Input
                                        id="displayName"
                                        placeholder="Enter your username"
                                        value={data.displayName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, displayName: e.target.value })}
                                    />
                                </div>

                                {/* user bio */}
                                <div className="flex flex-col space-y-3">
                                    <Label htmlFor="userBio">User bio</Label>

                                    <Input
                                        id="userBio"
                                        placeholder="Enter your user bio"
                                        value={data.userBio}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, userBio: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            {/* button */}
                            <div className="space-x-2">
                                <Button className="mt-8 px-7" type="submit">Update Profile</Button>
                                <Button className="mt-8 px-7" variant={"destructive"} onClick={() => navigate("/profile")}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile
