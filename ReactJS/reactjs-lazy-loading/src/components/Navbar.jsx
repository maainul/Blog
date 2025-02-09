import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <div >
                <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none" }}>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar