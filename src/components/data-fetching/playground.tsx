import {useEffect, useRef, useState} from 'react';

/**
 * Abort controller: cancel request for asynchronous process
 *  - Avoiding Race Conditions and Memory Leaks in React useEffect
 *
 * 'Abort' -> event sent
 * signal.addEventListener('abort', () => {
 *   console.log(signal.aborted); // true
 * });
 *
 */

const urls = [
    'https://jsonplaceholder.typicode.com/todos',
    'https://jsonplaceholder.typicode.com/posts'
]

export function DataFetchingPlayground() {
    const [result, setResult] = useState<any>(null);
    const abortControllerRef = useRef<AbortController>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const controller = new AbortController();
                const signal = controller.signal;

                abortControllerRef.current = controller;

                const responses = await Promise.all(urls.map(async (url) => {
                    const response = await fetch(url, {
                        signal,
                    })

                    if (!response.ok) {
                        throw new Error('Failed to fetch data!')
                    }

                    const result = await response.json();
                    return result;
                }));

                setResult(responses);
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                }
            }
        }

        fetchData();

        return () => {
            // Close the request!
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    }, [])

    return (
        <div>
            {JSON.stringify(result)}
        </div>
    )
}