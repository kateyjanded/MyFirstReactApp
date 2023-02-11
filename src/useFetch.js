import { useEffect, useState } from "react";

const useFetch= (url) => {
    const [data, setData] = useState(null)
    const [isPending, setPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{
        const abortConst = new AbortController();
        setTimeout(()=>{
            fetch(url, {signal: abortConst.signal})
            .then(res=>{
                if(!res.ok){
                    throw Error("Could not access the resource");
                }
                return res.json()})
            .then(data=>{
                setData(data);
                setPending(false);
                setErrorMessage(null);
            })
            .catch((err)=> {
                if(err.name !== "AbortError"){
                    setErrorMessage(err.message); 
                    setPending(false);
                }
            })
        }, 1000)
        return () => abortConst.abort();
    }, []);
    return {data, isPending, errorMessage}
}

export default useFetch;