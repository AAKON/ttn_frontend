import {Footer, Header, TopBar} from "@/shared";

export default function MainLayout({ children }) {
    const wrapperClass = 'flex flex-col min-h-screen relative';
    return (
        <div className={wrapperClass} aria-hidden="true">
            <TopBar title={"We’ve just launched a new feature! Check out the new dashboard."}/>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
