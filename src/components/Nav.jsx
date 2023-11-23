import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <>
            <nav>
                <Link to="/"><i>Home</i></Link>
                <Link to="/pokemon"><i>All Pokemon</i></Link>
            </nav>
        </>
    )
}