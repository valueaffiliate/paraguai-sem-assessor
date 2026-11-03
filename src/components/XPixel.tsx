import Script from "next/script";
import { tracking } from "@/config/site";

/** Código base do X Pixel. Só é carregado quando tracking.xPixelId está definido. */
export function XPixel() {
  if (!tracking.xPixelId) return null;
  const id = JSON.stringify(tracking.xPixelId);
  return (
    <Script id="x-pixel" strategy="afterInteractive">
      {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config',${id});`}
    </Script>
  );
}
