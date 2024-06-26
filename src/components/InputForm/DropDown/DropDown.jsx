export default function DropDownSelect({ changeVoice }) {
    return (
        <select name="" id="" onChange={(e) => changeVoice(e.target.value)}>
        <option value={"gladbot"}>GladBot</option>
        <option value={"madbot"}>MadBot</option>
        <option value={"sadbot"}>SadBot</option>
        <option value={"badbot"}>BadBot</option>
        <option value={"ladbot"}>LadBot</option>
    </select>
    );
}