import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
                            children,
                            loadMore,
                            hasMore,
                            loader,
                            endMessage,
                            threshold = "200px"
                        }) => {
    const observerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!hasMore) return;

        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                loadMore(); // Call the loadMore function when trigger is visible
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null, // Observe relative to the viewport
            rootMargin: threshold, // Trigger before it comes into view
            threshold: 0, // Trigger as soon as the element is in view
        });

        if (triggerRef.current) {
            observerRef.current.observe(triggerRef.current);
        }

        return () => {
            if (observerRef.current && triggerRef.current) {
                observerRef.current.unobserve(triggerRef.current);
            }
        };
    }, [hasMore, loadMore, threshold]);

    return (
        <div>
            {children}
            {hasMore && (
                <div ref={triggerRef} style={{ height: "1px", marginBottom: "10px" }}></div>
            )}
            {hasMore ? loader : endMessage}
        </div>
    );
};

export default InfiniteScroll;
