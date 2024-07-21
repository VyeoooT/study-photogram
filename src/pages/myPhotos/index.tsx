import Layout from "@/components/layout"
import { useUserAuth } from "@/context/userAuthContext"
import { getPostByUserId } from "@/repository/post.service"
import { DocumentResponse, Post } from "@/types"
import { useEffect, useState } from "react"
import { Heart } from 'lucide-react'

// interface MyPhotosProps {}

function MyPhotos() {
    const { user } = useUserAuth()
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

    useEffect(() => {
        console.log("User:", user)

        if (user != null) {
            getAllPost(user.uid)
        }
    }, [])
    
    const renderPost = () => {
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

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-full max-w-3xl border">
                    <h3 className="text-lg text-center text-white bg-slate-800 p-2">My Photos</h3>

                    <div className="p-8">
                        <div className="grid md:col-cols-3 grid-cols-2 gap-4">
                            {data.length > 0 ? renderPost() : (<div>...Loading</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyPhotos
