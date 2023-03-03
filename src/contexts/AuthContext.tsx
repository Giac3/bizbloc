import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { doc, getDoc, setDoc } from 'firebase/firestore'

const avatarOptions = ["https://api.dicebear.com/5.x/fun-emoji/svg?seed=Bubba", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Boots", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Jack", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Cuddles", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Lola", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Kitty", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Annie", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Felix", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Chester", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Callie", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Daisy", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Luna", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Cali", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Bear", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Lucky", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Leo", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Boo", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Max", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Gizmo", "https://api.dicebear.com/5.x/fun-emoji/svg?seed=Gracie"]

let randomItem:string = avatarOptions[Math.floor(Math.random()*avatarOptions.length)];

const AuthContext =  React.createContext<any>(null)

const provider = new GoogleAuthProvider()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children}:any) {
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    function signIn() {
        return signInWithPopup(auth, provider).then(function(result) {
            return updateProfile(result.user, {photoURL: randomItem})
        })
    }

    async function signInGuest(username:string) {
        return signInAnonymously(auth).then(function(result) {
            return updateProfile(result.user, {displayName: username, photoURL: randomItem})
        })
    } 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value:object = {
        currentUser,
        signIn,
        signInGuest
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export async function update(object:any, currentUser:any, setLoading:any, image:any) {
    setLoading(true)
    const fileRef = ref(storage , 'profileImages/' + currentUser.uid + '.png');
    let imageURL : string = currentUser.photoURL
    if (image!) {
        const snapshot = await uploadBytes(fileRef, image)
        const photo = await getDownloadURL(fileRef);
        imageURL = photo
        updateProfile(currentUser, {photoURL:photo})
    }

    const docRef = doc(db, "bizcards", `${currentUser.uid}`)
    
    await setDoc(doc(db, "/bizcards", `${currentUser.uid}`), {
        photo: imageURL,
        name: object.name,
        position: object.position,
        company: object.company,
        email: object.email,
        linkedin: object.linkedin,
        github: object.github,
        twitter: object.twitter,
        website: object.website,
        youtube: object.youtube,
        instagram: object.instagram,
        facebook: object.facebook,
        bio: object.bio,
        skills: object.skills,
        background: object.background
    })
    setLoading(false)
}

