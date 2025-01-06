import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import SessionProvider from "@/providers/SessionProvider";
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({
    weight: ['300','400', '500', '600', '700', '800'],
    subsets: ['latin']
})

export const metadata = {
    title: "Textile Network",
    description: "The all-in-one platform connecting apparel & textile companies with global buyers for endless opportunities",
};

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <html lang="en">
            <head>
                <meta
                    name="google-site-verification"
                    content="G_bd98DIZsZFjyI8E-YLG_E2IyW0PZUZqV0DVvlA69k"
                />
            </head>
            <body
                className={`${inter.className} antialiased`}
            >
            {children}
            <Toaster/>
            </body>
            <GoogleAnalytics gaId="G-2ND42Y6FQJ" />
            </html>
        </SessionProvider>
    );
}
