import Link from "next/link";
import Button from "@/components/shared/button";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Button TagName={Link} prefetch={false} href={"/"} type="button" icon>
                Go Back Home
            </Button>
        </div>
    );
}
