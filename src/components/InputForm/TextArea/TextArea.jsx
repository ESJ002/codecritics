export default function TextArea({ handleChange, formData }) {
    return (
        <textarea
            className="content-textarea"
            onChange={handleChange}
            value={formData}
        ></textarea>
    );
}
