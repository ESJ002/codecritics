
import { Link } from "react-router-dom";

export default function Header({
    colour,
    onLogout,
    user
}) {
    return (
        <header className={`${colour} header-container`}>

            <Link to='/'><button className={` ${colour} ${colour}-button header`}>HOME</button></Link>
            <Link to={`/reviews/${user.id}`}><button className={` ${colour} ${colour}-button header`}>REVIEWS</button></Link>
            <button className={` ${colour} ${colour}-button header`} onClick={onLogout}>LOGOUT</button>
        </header>
    );
}
