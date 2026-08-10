export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1675148560210565";

type FbqFunction = (action: string, eventName: string, options?: Record<string, unknown>) => void;

function getFbq(): FbqFunction | null {
  if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: FbqFunction }).fbq === "function") {
    return (window as unknown as { fbq: FbqFunction }).fbq;
  }
  return null;
}

export const pageview = () => {
  const fbq = getFbq();
  if (fbq) {
    fbq("track", "PageView");
  }
};

export const event = (name: string, options: Record<string, unknown> = {}) => {
  const fbq = getFbq();
  if (fbq) {
    fbq("track", name, options);
  }
};
