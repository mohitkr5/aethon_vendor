const getImageLink = (file) => {
  const extension = file.name?.split(".").at(-1);
  const type = file.type.split("/")[0];
  const src = URL.createObjectURL(file);
  return { src, type };
};

export default getImageLink;
