import React, { useEffect, useState } from 'react'
import { GetRequest } from '../../utils/HandleRequest'
import Box from './Box'

const Content = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStandings = async () => {
            var results = await GetRequest("/league/history")
            if (results.message != null) {
                setHistory([])
                setLoading(false)
            } else {
                setHistory(results.data)
                setLoading(false)
            }
        };
        fetchStandings()
    }, [])

    return (
        <div className="my-6 mx-12 py-6 px-12">
            {
                !loading &&
                <>
                    {history.map((item) => (
                        <>
                            <Box matchInformation={item} />
                        </>
                    ))}

                </>
            }
        </div>
    )
}

export default Content