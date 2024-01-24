const useValidatePhone = () => {
    const validatePhoneNumber = (value) => {
      const phoneNumberRegex = /^[0-9]+$/;
      if (!value) {
        return "Phone Number is Required";
      } else if (!phoneNumberRegex.test(value)) {
        return "Must be only digits";
      } else if (value.length < 10) {
        return "Must be Enter 11 digits";
      }
    };
    return {validatePhoneNumber};
  };
  
  export default useValidatePhone;
  