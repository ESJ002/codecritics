export default function Header({
    character
}) {
    return (
        <header className={character}>
            <button className={`${character} header`}>MEET THE BOTS</button>
            <button className={`${character} header`}>YOUR REVIEWS</button>
        </header>
    );
}
