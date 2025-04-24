import { useEffect, useRef } from "react";

interface GoogleAdProps {
  width?: number | string;
  height?: number | string;
  slot: string;
}

export const GoogleAd = ({ width, height, slot }: GoogleAdProps) => {
  const adRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 只有在广告进入视口时才加载广告
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      },
      {
        rootMargin: "100px",
      },
    );
    if (adRef.current) {
      observer.observe(adRef.current);
    }
    return () => {
      if (adRef.current) observer.unobserve(adRef.current);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      data-ad-client="ca-pub-8812972567833913"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
