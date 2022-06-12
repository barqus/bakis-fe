import React, { useEffect, useState } from 'react'
import { GetRequest } from '../../utils/HandleRequest'
import Box from './Box'
import InfiniteScroll from "react-infinite-scroll-component";

const Content = () => {
    const [history, setHistory] = useState([])
    // const [loadedHistory, setLoadedHistory] = useState([])
    const [loading, setLoading] = useState(true)
    // const [currentCount, setCurrentCount] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const fetchStandings = async () => {
            
            var results = await GetRequest("/league/history?page="+currentPage)
            if (results.message != null) {
                setHistory([])
                setLoading(false)
            } else {
                setHistory(results.data.history)
                // setLoadedHistory(results.data.slice(0, currentCount))
                setLoading(false)
            }
            setCurrentPage(results.data.meta.nextPage)
        };
        fetchStandings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const fetchMoreData = async () => {
        console.log("TRIGG")
        console.log(currentPage)
        var results = await GetRequest("/league/history?page="+currentPage)
        if (results.message != null) {
            setHistory([])
        } else {
            setHistory(history => [...history,...results.data.history])
        }
        console.log(results, history)
        if (results.data.meta.nextPage == null) {
            setHasMore(false)
        } else {
            setCurrentPage(results.data.meta.nextPage)
        }


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
                        dataLength={history.length}
                        next={() => fetchMoreData()}
                        hasMore={hasMore}
                        loader={<h4>KRAUNAMA...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                              <b>DAUGIAU SUŽAISTŲ ŽAIDIMŲ NĖRA</b>
                            </p>
                          }
                    >
                        {history.map((item) => (
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