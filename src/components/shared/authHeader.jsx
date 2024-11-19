import Image from "next/image";
export const AuthHeader = ({logo}) => {
    return (
        <div className="py-20">
            <img className="auth-logo w-10" src={logo} alt="logo" />
        </div>
    );
};
