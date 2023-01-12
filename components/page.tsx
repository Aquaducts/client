import classNames from "classnames";
import Navbar from "./navbar";

const Page = ({ children, handleNavbar }: { children: any, handleNavbar: boolean }) => {
    const styles = classNames("w-full h-full text-white flex flex-col justify-center items-center");

    return (
        <div className={styles}>
            {handleNavbar == true ?
                <Navbar />
                :
                null
            }
            {/* When the time comes for a new color scheme, make sure to add a background back onto this. */}
            <div className="max-w-5xl w-full h-full">
                {children}
            </div>
        </div>
    )
}

export default Page;