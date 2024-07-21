import { db } from "@/firebaseConfig"
import { ProfileResponse, UserProfile } from "@/types"
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"

const COLLECTION_NAME = "users"

// create user
export const createUserProfile = (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user)
    } catch (error) {
        console.log(error)
    }
}

// get info user
export const getUserProfile = async (userId: string) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId))
        const querySnapshot = await getDocs(q)
        let tempData: ProfileResponse = {}

        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile
                tempData = {
                    id: doc.id,
                    ...userData,
                }
            })
            return tempData
        }
        else {
            console.log("No such document")
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

// update info user
export const updateUserProfile = async (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
        ...user,
    })
}

// get all list users
export const getAllUsers = async (userId: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        const tempArr: ProfileResponse[] = []

        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile
                const responseObj: ProfileResponse = {
                    id: doc.id,
                    ...userData,
                }
                tempArr.push(responseObj)
            })
            return tempArr.filter((item) => item.userId != userId)
        }
        else {
            console.log("No such documents")
        }
    } catch (error) {
        console.log(error)
    }
}
