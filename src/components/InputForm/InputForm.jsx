import TextArea from "./TextArea/TextArea";
import DropDownSelect from "./DropDown/DropDown";

export default function InputForm({
    handleSubmit,
    handleChange,
    changeVoice,
    formData
}) {
    return (
        <form onSubmit={handleSubmit} className="new-note-form">
            <TextArea handleChange={handleChange} formData={formData}/>
            <DropDownSelect changeVoice={changeVoice}/>
            <button>SUBMIT</button>
        </form>
    );
}
