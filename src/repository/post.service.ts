import { db } from "@/firebaseConfig"
import { DocumentResponse, Post, ProfileInfo } from "@/types"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"

const COLLECTION_NAME = "posts"

// create
export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
}

// get posts
export const getPosts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"))
        // return getDocs(q)
        const querySnapshot = await getDocs(q)
        const tempArr: DocumentResponse[] = []

        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Post
                const responseObj: DocumentResponse = {
                    id: doc.id,
                    ...data,
                }
                tempArr.push(responseObj)
            })
            return tempArr
        }
        else {
            console.log("No such document")
        }
    } catch (error) {
        console.log(error)
    }
}

// get post with id user
export const getPostByUserId = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id))
    return getDocs(q)
}

// get a post
export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return getDoc(docRef)
}

// delete a post
export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id))
}

// update likes on post
export const updateLikesOnPost = (
    id: string,
    userlikes: string[],
    likes: number,
) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
        likes: likes,
        userlikes: userlikes,
    })
}

// update info user on posts
export const updateUserInfoOnPosts = async (profileInfo: ProfileInfo) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", profileInfo.user?.uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
        querySnapshot.forEach((document) => {
            const docRef = doc(db, COLLECTION_NAME, document.id)
            updateDoc(docRef, {
                username: profileInfo.displayName,
                photoURL: profileInfo.photoURL,
            })
        })
    }
    else {
        console.log("The user doesn't have anu post")
    }
}
    