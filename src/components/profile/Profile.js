import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Owner } from "./Owner"
import { User } from "./User"


export const Profile = () => {
    const { getCurrentUser } = useSimpleAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = getCurrentUser()
        setUser(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    },[])
    
    return (
        
        user.owner
        ? <Owner userId={user.id} />
        : <User userId={user.id} />
        
    )
    
}