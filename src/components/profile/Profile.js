import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Owner } from "./Owner"
import { User } from "./User"


export const Profile = () => {
    const { getCurrentUser } = useSimpleAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = getCurrentUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setUser(user)
        
    },[])
    
    return (
        
        user.owner
        ? <Owner userId={getCurrentUser().id} />
        : <User userId={getCurrentUser().id} />
        
    )
    
}