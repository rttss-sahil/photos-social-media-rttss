import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import "./ImageUpload.css";

function ImageUpload(props) {
  const filePickerRef = useRef(),
    [file, setFile] = useState(),
    [valid, setvalid] = useState(false),
    [preview, setPreview] = useState(),
    pickedHandler = (e) => {
      let pickedFile,
        validity = true;
      if (e.target.files || e.target.files.length === 1) {
        pickedFile = e.target.files[0];
        setFile(pickedFile);
        setvalid(validity);
        return props.onInput(props.id, pickedFile, validity);
      } else {
        setvalid(!validity);
      }
      props.onInput(props.id, pickedFile, !validity);
    },
    pickImage = () => {
      filePickerRef.current.click();
    };
  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => pickedHandler(e)}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        {preview ? (
          <div className="image-upload__preview">
            <img src={preview} alt="Preview" />
          </div>
        ) : (
          <p>Please pick an image</p>
        )}
        <Button type="button" onClick={pickImage}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
