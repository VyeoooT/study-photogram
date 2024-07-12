import { db } from "@/firebaseConfig"
import { Post } from "@/types"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"

const COLLECTION_NAME = "post"

// create
export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
}

// get posts
export const getPosts = () => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"))
    return getDocs(q)
}

// get post with id user
export const getPostsByUserId = (id: string) => {
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
