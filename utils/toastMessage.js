import toast from "react-hot-toast";
const toastMessage = (message, type) => {
  toast(message, {
    hideProgressBar: true,
    type: type,
    position: "bottom-center",
    pauseOnHover: false,
  });
};

export default toastMessage;
