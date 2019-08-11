import React from "react";
import firebase from "firebase/app";
import shortid from 'shortid'

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { storage } from '../../firebase/firebase';

import '../../stylesheets/settings.scss';

// register the filepond plugins for additional functionality
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
);

function LogoUploader({
  onRequestSave,
  onRequestClear,
  defaultFiles = [],
}) {
  // use a useState hook to maintain our files collection
  const [files, setFiles] = React.useState(defaultFiles);

  const server = {
    // this uploads the image using firebase
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      console.log('process !!');
      // create a unique id for the file
      const id = shortid.generate();

      // upload the image to firebase
      const task = storage.child('logos/' + id).put(file, {
        contentType: 'image/jpeg',
      });

      // monitor the task to provide updates to FilePond
      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snap => {
          // provide progress updates
          progress(true, snap.bytesTransferred, snap.totalBytes);
        },
        err => {
          // provide errors
          error(err.message);
        },
        () => {
          // the file has been uploaded
          load(id);
          onRequestSave(id);
        }
      )
    },

    // this loads an already uploaded image to firebase
    load: (source, load, error, progress, abort) => {
      console.log('load !!');
      // reset our progress
      progress(true, 0, 1024)

      // fetch the download URL from firebase
      storage
        .child('logos/' + source)
        .getDownloadURL()
        .then(url => {
          // fetch the actual image using the download URL
          // and provide the blob to FilePond using the load callback
          let xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = function (event) {
            let blob = xhr.response
            load(blob)
          }
          xhr.open('GET', url)
          xhr.send()
          load(url);
          console.log('image url : ', url);
        })
        .catch(err => {
          console.log('error getting file', err);
          error(err.message)
          abort()
        })
    },

    fetch: (prop1, prop2, prop3, prop4) => {
      console.log('fetch !!', prop1, prop2, prop3, prop4);
    },

    restore: (prop1, prop2, prop3, prop4) => {
      console.log('restore !!', prop1, prop2, prop3, prop4);
    },

    revert: (source, load, error) => {
      console.log('revert !!');

      storage
        .child('logos/' + source)
        .delete()
        .then(() => {
          load();
        })
        .catch((err) => {
          console.log('Error reverting file', err);
          error('Error reverting file');
        })
    },

    /* remove: (source, load, error) => {
      console.log('remove !!');

      storage
        .child('logos/' + source)
        .delete()
        .then(() => {
          load();
        })
        .catch((error) => {
          console.log('Error removing file', error);
          error('Error removing file');
        })
    },*/
  };

  return (
    <FilePond
      files={files}
      allowMultiple={false}
      server={server}
      onupdatefiles={fileItems => {
        if (fileItems.length === 0) {
          onRequestClear()
        }
        setFiles(fileItems.map(fileItem => fileItem.file));
      }}
      labelIdle={`Déposer votre image ici ou <span class="filepond--label-action">Parcourir</span>`}
      imagePreviewHeight={170}
      imageCropAspectRatio="1:1"
      imageResizeTargetWidth={200}
      imageResizeTargetHeight={200}
      stylePanelLayout="compact circle"
      styleLoadIndicatorPosition="center bottom"
      styleButtonRemoveItemPosition="center bottom"
      styleProgressIndicatorPosition="right bottom"
      // styleButtonRemoveItemPosition="left bottom"
      styleButtonProcessItemPosition="right bottom"
      acceptedFileTypes={['image/*']}
      // instantUpload={false}
      allowImageCrop
    />
  )
}

export default LogoUploader;
