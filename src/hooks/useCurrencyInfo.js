import  {useEffect, useState} from "react"

function useCurrencyInfo(currency) {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(url)
        .then((resp) => resp.json() )
        .then((data) => setData(data[currency]) )
        .catch((err) => console.log("Error while fetching Currency Info:", err) );
    }, [currency]);

    return data;
}

export default useCurrencyInfo;