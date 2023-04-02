import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImages = async (images, title) => {
  try {
    const storage = getStorage();
    const files = Array.from(images);
    console.log(images, files);
    const promises = files.map(async (image) => {
      const path = `products/${title}/${image.file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, image.file);
      return await getDownloadURL(storageRef);
    });

    const downloadLinks = await Promise.all(promises);
    console.log(downloadLinks);
    return downloadLinks;
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};
