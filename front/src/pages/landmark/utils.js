const registerValidation = (rating, content) => {
  const isRatingValid = !!rating;
  const isContentValid = !(content === "");

  return {
    isRatingValid,
    isContentValid,
  };
};

export default registerValidation;
