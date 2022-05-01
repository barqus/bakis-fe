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
        <div className="my-6 mx-12 py-6 px-12">
            {
                !loading &&
                <div className="my-6 mx-12 p-6 bg-gradient-to-r from-purple-800 to-green-500 shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg text-white"
                    style={{
                        background:
                            "linear-gradient(120deg,#722f818a 40%, rgba(3, 71, 57, 0.8) 100%)",
                    }}>
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