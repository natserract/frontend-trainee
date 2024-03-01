import {
  useRef,
  forwardRef,
  useCallback,
  useState,
  CSSProperties,
} from "react";

type LoadMoreBtnProps = {
  // Initialize the button ref on mount. Pass the visibility as a style prop.
  style: CSSProperties;
};

// Toggle Load More button with intersection observer
const LoadMoreBtn = forwardRef<HTMLButtonElement, LoadMoreBtnProps>(
  ({ style }, ref) => {
    return (
      <button style={style} ref={ref} type="button">
        Load More...
      </button>
    );
  }
);

function Observer() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observerTargetRef = useRef<HTMLButtonElement>(null);

  const [isLoadMoreVisible, setLoadMoreVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Element[]>([]);
  console.debug(visibleElements);

  // Debug: Intersection handler from callback
  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!observerTargetRef.current) return;

      // Debug: Check isEntersecting
      console.debug(
        "Element is intersecting:",
        entry.isIntersecting,
        entry.target
      );

      // Debug: Access element
      const elements = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);
      setVisibleElements(elements);
    });
  }, []);

  // Best practice: IntersectionObserver is created lazily once
  const getObserver = useCallback(() => {
    // Debug: IntersectionObserver options
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0, // Trigger when the sentinel is fully visible
    };

    if (observerRef.current === null) {
      observerRef.current = new IntersectionObserver(onIntersect, options);
    }
    return observerRef.current;
  }, [onIntersect]);

  const handleToggle = useCallback(() => {
    setLoadMoreVisible(!isLoadMoreVisible);

    const observer = getObserver();
    if (observer && observerTargetRef.current) {
      if (isLoadMoreVisible) {
        // Debug: Start observing element  observer.observe()
        // Intersecting `LoadMoreBtn` from ref
        observer.observe(observerTargetRef.current);
      } else {
        observer.unobserve(observerTargetRef.current);
      }
    }

    return () => {
      if (observer) {
        // Debug: Cleanup, stop observing all elements
        observer.disconnect();
      }
    };
  }, [getObserver, isLoadMoreVisible]);

  return (
    <div>
      <button onClick={handleToggle}>Toggle Load More Button</button>
      <LoadMoreBtn
        style={{
          // Impl: Use observer pattern not `state`
          // Real case: Infinite pagination, show load more button...
          display: isLoadMoreVisible ? "block" : "none",
        }}
        ref={observerTargetRef}
      />
    </div>
  );
}

export default Observer;
