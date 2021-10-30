/*eslint-disable*/
import React, {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const CreateFileUpload = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({onDrop, accept: '.png, .jpeg'});
  
  const files = acceptedFiles.map((file, i) => (
    <li key={file.path} className="selected-file-item">
      {file.path} <i className="fa fa-trash text-red"
                     onClick={() => remove(i)}></i>
    </li>
  ));
  const remove = file => {
    const newFiles = [...files];     // make a var for the new array
    acceptedFiles.splice(file, 1);        // remove the file from the array
  };
  return (
    <div>
      <div {...getRootProps()} className="dropzone-main">
        <div
          className="ntc-start-files-dropzone"
          aria-disabled="false"
        >
        </div>
        <button className="add-button" type="button">
          <i className="fa fa-plus"></i>
        </button>
        <h3 className="upload-title">
          <span></span>
        </h3>
        <input
          type="file"
          multiple=""
          autocomplete="off"
          className="inp-file"
          // onChange={uploadFile}
          multiple
          {...getInputProps()}
        />
        {isDragActive ?
          <div></div>
          :
          <div>
            <p> Upload files </p>
          </div>
        }
      </div>
      <aside>
        {files.length > 0 ? <h5>Selected Files</h5>:<h5></h5>}
        <ul>{files}</ul>
      </aside>
    </div>
  );
};
export default CreateFileUpload;
