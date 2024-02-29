export function abortTimeoutSignal(timeMs: number) {
    const abortController = new AbortController();
    void new Promise(resolve => setTimeout(resolve, timeMs)).then(
        () => {
            abortController.abort();
        }
    )

    return abortController.signal
}