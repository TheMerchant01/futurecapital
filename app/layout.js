import "./globals.css";
import "./camera.css";
import "./styles.css";
import "animate.css";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import GoogleTranslate from "../components/Translator/GoogleTranslator";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../contexts/themeContext";
const font = Poppins({ subsets: ["latin"], weight: ["300"] });

export const metadata = {
  title: "Future Capital Market | Best Digital Currency Platform ",
  description:
    "A Financial Institution with thousands of assets leading the way in the world of trading",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={font.className}>
          <Script src="/plugins/jquery.min.js" strategy="beforeInteractive" />
          <Script
            src="/plugins/jquery.easing.1.3.js"
            strategy="beforeInteractive"
          />

          <Script
            src="/plugins/jquery.mobile.customized.min.js"
            strategy="beforeInteractive"
          />

          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
