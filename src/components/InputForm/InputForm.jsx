import TextArea from "./TextArea/TextArea";
import DropDownSelect from "./DropDown/DropDown";

export default function InputForm({
    handleSubmit,
    handleChange,
    changeVoice,
    formData,
    character,
    colour
}) {
    return (
        <form onSubmit={handleSubmit} className="input">
            <TextArea handleChange={handleChange} formData={formData} character={character} colour={colour}/>
            <DropDownSelect changeVoice={changeVoice} character={character} colour={colour}/>
            {formData !== '' ? <button className={colour}>SUBMIT</button> : <></>}
        </form>
    );
}
