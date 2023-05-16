import Link from "next/link"

import ConnectWallet from "../ConnectWallet"

const Navbar = () => {

    const navItems = [
        { heading: "Events", slug: "/events" },
        { heading: "About", slug: "/about" },
    ]

    return (
        <div className="navbar">
            <Link href="/">
                <div>LOGO</div>
            </Link>
            <div className="navbar_link">
                {navItems.map(item => (
                    <Link key={item.heading} href={`${item.slug}`}>
                        <div className="navbar_link-items">
                            {item.heading}
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <ConnectWallet />
            </div>
        </div>
    )
}

export default Navbar