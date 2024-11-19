import '../../styles/auth.css';
export default function AuthLayout({ children }) {
    const wrapperClass = 'flex flex-col min-h-screen relative';
    return (
        <div className={wrapperClass}>
            <main>{children}</main>
        </div>
    );
}
