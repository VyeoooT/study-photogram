import { useUserAuth } from "@/context/userAuthContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { DocumentResponse } from "@/types"
import { Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { updateLikesOnPost } from "@/repository/post.service"

interface IPostCard {
    data: DocumentResponse,
}

function PostCard({ data }: IPostCard) {
    const { user } = useUserAuth()
    const [likesInfo, setLikesInfo] = useState<{
        likes: number,
        isLike: boolean
    }>({
        likes: data.likes!,
        isLike: data.userlikes?.includes(user!.uid) ? true : false
    })

    const updateLike = async (isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: !likesInfo.isLike,
        })

        if (isVal) {
            data.userlikes?.push(user!.uid)
        }
        else {
            data.userlikes?.splice(data.userlikes.indexOf(user!.uid), 1)
        }

        await updateLikesOnPost(
            data.id!,
            data.userlikes!,
            isVal ? likesInfo.likes + 1 : likesInfo.likes - 1
        )
    }

    
    return (
        <Card className="mb-6">
            {/* header */}
            <CardHeader className="flex flex-col p-3">
                <CardTitle className="flex justify-start items-center text-sm text-center">
                    <span className="mr-2">
                        <img
                            className="size-10 border-2 border-slate-800 rounded-full object-cover"
                            src={data.photoURL}
                        />
                    </span>

                    <span>{data.username}</span>
                </CardTitle>
            </CardHeader>
            
            {/* contents */}
            <CardContent className="p-0">
                <img src={data.photos ? data.photos[0].cdnUrl : ""} />
            </CardContent>

            {/* footer */}
            <CardFooter className="flex flex-col p-3 mx-1">
                <div className="w-full flex justify-between mb-3">
                    <Heart
                        className={cn("stroke-slate-600", "cursor-pointer", likesInfo.isLike ? "fill-red-500 stroke-transparent" : "fill-none")}
                        onClick={() => updateLike(!likesInfo.isLike)}
                    />
                    
                    <MessageCircle />
                </div>

                <div className="w-full text-sm font-medium">{likesInfo.likes} Likes</div>
                <div className="w-full text-sm">
                    {/* <span>Guest_user</span>: {data.caption} */}
                    {data.caption}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PostCard
