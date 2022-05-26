import React, { useEffect, useState } from 'react'
import { GetRequest } from '../../utils/HandleRequest'
import Box from './Box'
import InfiniteScroll from "react-infinite-scroll-component";

const Content = () => {
    const [history, setHistory] = useState([])
    const [loadedHistory, setLoadedHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentCount, setCurrentCount] = useState(10)

    useEffect(() => {
        const fetchStandings = async () => {
            var results = await GetRequest("/league/history")
            if (results.message != null) {
                setHistory([])
                setLoading(false)
            } else {
                setHistory(results.data)
                setLoadedHistory(results.data.slice(0, currentCount))
                setLoading(false)
            }
        };
        fetchStandings()
    }, [])
    const fetchMoreData = () => {
        setCurrentCount(currentCount+10)
        setLoadedHistory(history.slice(0, currentCount+10))
    }
    return (
        <div className="mt-6 mx-12 pt-6 px-12 text-center text-white">
            <p className="text-white text-3xl font-bold font-sans">
            DALYVIŲ SUŽAISTŲ ŽAIDIMŲ ISTORIJA
            </p>
            {
                !loading &&
                <div className="mb-6 mx-12 p-6 shadow overflow-hidden "
                    >
                    <InfiniteScroll
                        dataLength={loadedHistory.length}
                        next={() => fetchMoreData()}
                        hasMore={true}
                        pullDownToRefresh={false}
                    >
                        {loadedHistory.map((item) => (
                            <div>
                                <Box matchInformation={item} />
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            }
        </div>
    )
}

export default Content