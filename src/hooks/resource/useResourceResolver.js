import { useEffect, useState } from "react"

const useResourceResolver = () => {

    const [resource, setResource] = useState({})

    useEffect(() => {
       console.log('resolved resource', resource)
    }, [resource])

    const resolveResource = (property, param, getter) => {
        // Resource passed as prop
        if (property && "id" in property) {
            setResource(property)
        }
        else {
            // If being rendered indepedently
            if (param) {
                getter(param).then(retrievedResource => {
                    setResource(retrievedResource)
                })
            }
        }
    }

    return { resolveResource, resource }
}

export default useResourceResolver