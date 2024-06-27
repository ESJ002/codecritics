export default function TextArea({ handleChange, formData, character }) {
    return (
        <textarea
            className={`content-textarea ${character}`}
            onChange={handleChange}
            value={formData}
        ></textarea>
    );
}
