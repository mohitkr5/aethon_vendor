import { Dropzone, FileItem } from "@dropzone-ui/react";
import { useState } from "react";

export default function FileDropzone({
  images,
  setImages,
  dropzoneLabel,
  limit,
}) {
  const updateFiles = (incommingFiles) => {
    setImages(incommingFiles);
  };

  const handleDelete = (id) => {
    setImages(images.filter((x) => x.id !== id));
  };

  return (
    <Dropzone
      onChange={updateFiles}
      value={images}
      onClean
      accept={"image/jpeg,.png"}
      maxFileSize={2000000}
      maxFiles={limit}
      label={dropzoneLabel}
      minHeight={"195px"}
      maxHeight={"500px"}
      localization={"EN-en"}
      behaviour={"add"}
      disableScroll
    >
      {images.length > 0 &&
        images.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={handleDelete}
            alwaysActive
            localization={"EN-en"}
            preview
            info
            resultOnTooltip
          />
        ))}
    </Dropzone>
  );
}
