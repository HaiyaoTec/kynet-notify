import "@/styles/globals.css";
import {Metadata, Viewport} from "next";
import {fontSans} from "@/config/fonts";
import {Providers} from "./providers";
import clsx from "clsx";
import Sidebar from "@/components/sidebar";
import Login from "@/components/popUps/login";

const APP_NAME = "skynet-notify";
const APP_DEFAULT_TITLE = "skynet-notify";
const APP_TITLE_TEMPLATE = "skynet-notify - PWA App";
const APP_DESCRIPTION = "skynet-notify!";
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};


export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head/>
    <body
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <Providers themeProps={{attribute: "class", enableSystem: true, defaultTheme: 'light'}}>
      <Login/>
      <div className="relative flex  h-screen">
        <Sidebar>
          <main className="container max-w-full mx-auto w-full flex-1 flex-grow relative">
            {children}
          </main>
        </Sidebar>
      </div>
    </Providers>
    </body>
    </html>
  );
}
