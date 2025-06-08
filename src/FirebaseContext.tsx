import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'

interface Props {
  children: React.ReactNode
}

interface FirebaseContextValues {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const FirebaseContext = createContext<FirebaseContextValues | null>(null)

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</FirebaseContext.Provider>
  )
}

export const useFirebase = (): FirebaseContextValues => {
  const firebaseContext = useContext(FirebaseContext)

  if (!firebaseContext) {
    throw new Error('Erro no context')
  }

  return firebaseContext
}
