export const saveBase64 = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result;
      console.log(base64String);
    };
    reader.readAsDataURL(file);
  }
  return;
};
