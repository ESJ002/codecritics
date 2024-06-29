export default function TextArea({ handleChange, formData, character, colour}) {
    return (
        <textarea
            className={`content-textarea ${colour}`}
            onChange={handleChange}
            value={formData}
        ></textarea>
    );
}
