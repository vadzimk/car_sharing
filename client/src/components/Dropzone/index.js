import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import {makeStyles} from '@mui/styles';
import {GridItem} from '../ui/GridRenamed.js';
import {customAlphabet, urlAlphabet} from 'nanoid';
import {useDispatch} from 'react-redux';
import {setNotification} from '../../reducers/notificationReducer.js';

const useStyles = makeStyles((theme) => ({
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: theme.palette.primary.main,
    color: theme.text.primary,
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
  dropzoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '30em',
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
    display: 'flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: '0.5em',
    marginRight: '0.5em',
    width: `${(theme.custom.mainColumn.width.replace('em', '') - 1) / 3}em`,
    height: 'auto',
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative',
  },
  thumbInner: {
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
      color: 'red',
    },
  },
}));

// eslint-disable-next-line no-unused-vars
function Dropzone ({handleError, onChange}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  
  const nanoid = customAlphabet(urlAlphabet, 10);
  const createKey = (filename) => {
    const dotIndex = filename.lastIndexOf('.');
    return filename.slice(0, dotIndex) + '_' + nanoid() +
      filename.slice(dotIndex);
  };
  
  const areNotEqual = async (a, b) => {
    const textA = await fetch(a).then(r => r.blob()).then(b => b.text());
    const textB = await fetch(b).then(r => r.blob()).then(b => b.text());
    const result = textA.valueOf() !== textB.valueOf();
    return result;
  };
  
  const dispatch = useDispatch();
  /**
   * onDrop without duplicates
   * */
  const onDrop = useCallback(async (acceptedFiles) => {
    console.dir('acceptedFiles', acceptedFiles);
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      key: createKey(file.path),
      preview: URL.createObjectURL(file),
    }));
    let filteredNewFiles = [];
    let updatedFiles;
    if (!files.length) {
      filteredNewFiles.push(newFiles[0]);
      newFiles.splice(0, 1);
    }
    for (let f of newFiles) {
      for (let s of files) {
        if (await areNotEqual(s.preview, f.preview)) {
          filteredNewFiles.push(f);
        } else{
          dispatch(setNotification(`${f.path} was a duplicate `, 'info'));
        }
      }
      
    }
    updatedFiles = files.concat(filteredNewFiles);
    
    setFiles(updatedFiles);
    onChange(updatedFiles);
  }, [files, onChange]);
  
  
  /**
   * onDrop with duplicates
   * */
  // const onDrop = useCallback(acceptedFiles => {
  //   console.dir('acceptedFiles', acceptedFiles);
  //   const updatedFiles = files.concat(acceptedFiles.map(file => ({
  //       ...file,
  //       key: createKey(file.path),
  //       preview: URL.createObjectURL(file),
  //     }),
  //   ));
  //   console.dir('updatedFiles', updatedFiles);
  //   setFiles(updatedFiles);
  //   onChange(updatedFiles);
  // }, [files, onChange]);
  
  
  const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: 'image/*',
      onDrop: onDrop,
      onDropRejected:
        (fileRejections) => handleError(
          fileRejections.map(fileRejection => {
            const filename = fileRejection.file.name;
            const errors = fileRejection.errors.map(error => error.message).
              toString();
            return `${filename} - ${errors}`;
          }).toString(),
        ),
    })
  ;
  
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
    <GridItem className={classes.thumb} key={file.key}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          alt={file.path}
          className={classes.img}
        />
      </div>
      <ClearIcon
        onClick={() => handleClear(file)}
        classes={{root: classes.close}}
        size="small"
      />
    </GridItem>
  ));
  
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    setTimeout(() => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, 10000);
  }, [files]);
  
  return (
    <div className={classes.dropzoneContainer}>
      <div {...getRootProps({className: dropzoneClassName})}>
        <input {...getInputProps()} />
        <p>Drag&#39;n drop some image files here, or click to select</p>
      </div>
      <div className={classes.thumbsContainer}>
        {thumbs}
      </div>
    </div>
  );
}

export default Dropzone;