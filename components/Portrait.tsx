"use client";
import { useEffect, useRef, useState } from "react";

export default function Portrait({ name }: { name: string }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);
  return (
    <div className="portrait">
      <div className="frame">
        {missing ? "AK" : (
          // eslint-disable-next-line @next/next/no-img-element
          <img ref={img} src="/profile.jpg" alt={`Portrait of ${name}`} onError={() => setMissing(true)} />
        )}
      </div>
    </div>
  );
}
