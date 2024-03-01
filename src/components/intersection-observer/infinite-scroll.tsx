import {
  useRef,
  forwardRef,
  useCallback,
  useState,
  useEffect,
  CSSProperties,
} from "react";

type LoadMoreProps = {
  // Initialize the ref on mount. Pass the visibility as a style prop.
  style: CSSProperties;
  scrollPosition: number;
};

const LoadMore = forwardRef<HTMLDivElement, LoadMoreProps>(
  ({ style, scrollPosition }, ref) => {
    return (
      <div ref={ref} style={style}>
        Load more...
        {scrollPosition}
      </div>
    );
  }
);

function InfiniteScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Best practice: IntersectionObserver is created lazily once
  const getObserver = useCallback(
    (
      onIntersect: (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => void
    ) => {
      // IntersectionObserver options
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0, // Trigger when the sentinel is fully visible
      };

      if (observerRef.current === null) {
        observerRef.current = new IntersectionObserver(onIntersect, options);
      }
      return observerRef.current;
    },
    []
  );

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // Check isEntersecting
      console.debug(
        "Element is intersecting:",
        entry.isIntersecting,
        entry.target
      );

      // Observer happens here!
      if (entry.isIntersecting) {
        setIsLoading(true);
        setScrollPosition(entry.boundingClientRect.y);
      }
    });
  }, []);

  const startObserver = useCallback(() => {
    const observer = getObserver(handleObserver);

    if (observer && observerTargetRef.current) {
      // Start observing element  observer.observe()
      // Intersecting `LoadMoreBtn` from ref
      observer.observe(observerTargetRef.current);
    }
  }, [getObserver, handleObserver]);

  useEffect(() => {
    // Simulating API call to fetch more data
    setTimeout(() => {
      if (isLoading) {
        const observer = getObserver(handleObserver);
        if (observer && observerTargetRef.current) {
          // Scroll position state will not updated after 2s;
          observer.unobserve(observerTargetRef.current);
        }
      }
    }, 2000);
  }, [isLoading, getObserver, handleObserver]);

  // Cleanup, stop observing all elements
  useEffect(() => {
    return () => {
      const observer = getObserver(handleObserver);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [getObserver, handleObserver]);

  return (
    <div>
      <button onClick={startObserver}>Start Observer</button>
      <LoadMore
        ref={observerTargetRef}
        style={{
          // Impl: Use observer pattern not `state`
          // Real case: Infinite pagination, show load more button...
          visibility: !isLoading ? "hidden" : "visible",
        }}
        scrollPosition={scrollPosition}
      />
    </div>
  );
}

export default InfiniteScroll;
