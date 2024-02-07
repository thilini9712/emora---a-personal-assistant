import React, {useState} from "react";
import "./FieUploader.css";
import axios from "axios";

const FileUploader = (props) => {
    const [file, setFile] = useState(null);
    const onInputChange = (e) => {
        setFile(e.target.files[0]);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let i = 0; i < file.length; i++) {
            data.append('file', file[i]);

        }
        axios.post('//localhost:8080/upload', data)
            .then((e) => {
                console.log('Success')
            })
            .catch((e) => {
                console.log('Error', e)
            })
    }
    return (
        <div>
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className="form-group files color">
                    <label>Upload Your File </label>
                    <input
                        type="file"
                        className="form-control"
                        multiple=""
                        onChange={onInputChange}
                    />
                </div>
                <button
                >
                    submit
                </button>
            </form>
        </div>
    );
};

export default FileUploader;
