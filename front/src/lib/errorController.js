export const errorController = () => {
  const { status } = error.response || 500;

  console.log("🚀 ~ request error : ", error);

  if (status < 500) {
    console.log("🚀 ~ response error ~ status: ", status, "~ errror: ", error);
  }
  if (status >= 500) {
    console.log("🚀 ~ response error ~ status: ", status, "~ errror: ", error);
  }
  return Promise.reject(error);
};
