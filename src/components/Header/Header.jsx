export default function Header({
    colour,
    onLogout,
    setCurrentPage
}) {
    return (
        <header className={colour}>
             <button className={`${colour} header`} onClick={setCurrentPage('home')}>HOME</button>
            <button className={`${colour} header`} onClick={setCurrentPage('reviews')}>YOUR REVIEWS</button>
            <button className={`${colour} header`} onClick={onLogout}>LOGOUT</button>
        </header>
    );
}
