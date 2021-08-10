/*eslint-disable*/

import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import ClearIcon from '@material-ui/icons/Clear';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  baseStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
  
  activeStyle: {
    borderColor: '#2196f3',
  },
  
  acceptStyle: {
    borderColor: '#00e676',
  },
  
  rejectStyle: {
    borderColor: '#ff1744',
  },
  
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    '&:empty': {
      display: 'none',
      marginTop: 0,
    },
  },
  
  thumb: {
    display: 'inline-flex',
    // display: 'inline-block',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: '0.5em',
    marginRight: '0.5em',
    width: `${(theme.custom.mainColumn.width.replace('em', '') -1) / 3 }em`,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative'
  },
  
  thumbInner: {
    // display: 'flex',
    // position: 'relative',
    overflow: 'hidden',
    // display: 'inline-block',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  
  img: {
    width: '100%',
    height: 'auto',
  },
  
  close: {
    position: 'absolute',
    top: '-0.1em',
    right: '-0.1em',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      color: 'red'
    }
  },
}));

function Previews ({handleError, ...props}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      console.dir('acceptedFiles', acceptedFiles);
      setFiles(files.concat(acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file),
        }),
      )));
      
    },
    onDropRejected: (fileRejections) => handleError(
      fileRejections.map(fileRejection => {
        const filename = fileRejection.file.name;
        const errors = fileRejection.errors.map(error => error.message).
          toString();
        return `${filename} - ${errors}`;
      }).toString(),
    ),
  });
  
  const dropzoneClassName = useMemo(() => {
    return [
      classes.baseStyle,
      isDragActive ? classes.activeStyle:'',
      isDragAccept ? classes.acceptStyle:'',
      isDragReject ? classes.rejectStyle:'',
    ].join(' ');
  }, [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);
  
  const handleClear = (file) => {
    setFiles(files.filter(item => item.preview !== file.preview));
  };
  
  const thumbs = files.map(file => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          alt={file.name}
          className={classes.img}
        />
      </div>
      <ClearIcon
        onClick={() => handleClear(file)}
        classes={{root:classes.close}}
        size="small"
      />
    </div>
  ));
  
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
  
  return (
    <section>
      <div {...getRootProps({className: dropzoneClassName})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={classes.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default Previews;