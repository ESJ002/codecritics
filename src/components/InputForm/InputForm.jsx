import TextArea from "./TextArea/TextArea";
import DropDownSelect from "./DropDown/DropDown";

export default function InputForm({
    handleSubmit,
    handleChange,
    changeVoice,
    formData,
    character
}) {
    return (
        <form onSubmit={handleSubmit} className="new-note-form">
            <TextArea handleChange={handleChange} formData={formData} character={character}/>
            <DropDownSelect changeVoice={changeVoice} character={character}/>
            {formData !== '' ? <button className={character}>SUBMIT</button> : <></>}
        </form>
    );
}
