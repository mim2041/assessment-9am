import { useEffect, useState } from "react"
import { getSubdomain } from "../utils/subdomain";


export const useSubDomain = () => {
    const [subdomain, setSubdomain] = useState(null);
    const [isSubdomain, setIsSubdomain] = useState(false);

    useEffect(() => {
        const currentSubdomain = getSubdomain();
        setSubdomain(currentSubdomain);
        setIsSubdomain(!!currentSubdomain);
    }, [])

    return { subdomain, isSubdomain };
};