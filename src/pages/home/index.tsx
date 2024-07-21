import Layout from "@/components/layout"
import PostCard from "@/components/postCard"
import Stories from "@/components/stories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserAuth } from "@/context/userAuthContext"
import { getPosts } from "@/repository/post.service"
import { DocumentResponse } from "@/types"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface HomeProps {}

function Home({}: HomeProps) {
    const { user } = useUserAuth()
    const [data, setData] = useState<DocumentResponse[]>([])
    const getAllPost = async() => {
        const response: DocumentResponse[] = (await getPosts()) || []
        console.log("Array response: ", response)

        setData(response)
    }

    useEffect(() => {
        if (user != null) {
            getAllPost()
        }
    }, [])

    const renderPosts = () => {
        return data.map((item) => {
            return (
                <PostCard key={item.id} data={item} />
            )
        })
    }

    return (
        <Layout>
            <div className="flex flex-col">
                <div className="w-full relative mb-6 text-2xl text-gray-600">
                    <Input
                        className="h-10 border-2 border-gray-300 bg-white px-5 pr-16 rounded-sm text-base focus:outline"
                        placeholder="search"
                        type="search"
                        name="search"
                    />
                    <Button type="submit" className="absolute right-1 top-0 bg-transparent">
                        <Search className="size-5 text-gray-400" />
                    </Button>
                </div>

                <div className="mb-5 overflow-y-auto">
                    <h2 className="mb-5">Stories</h2>
                    <Stories />
                </div>

                <div className="mb-5">
                    <h2 className="mb-5">Feed</h2>

                    <div className="w-full flex justify-center">
                        <div className="max-w-sm flex flex-col rounded-sm overflow-hidden">
                            {data ? renderPosts() : <div>...loading</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home
