const validations = {
  email: (value) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{1,5}$/;
    if (!regex.test(value)) {
      return 'Please enter a valid E-Mail address';
    }
  },
  zip: (value) => {
    //us and israel zip codes only
    const regex = /^(?:\d{5}(?:-\d{4})?|\d{7})$/;
    if (!regex.test(value)) {
      return 'Please enter a valid zip code';
    }
  },
  phone: (value) => {
    //israeli phone numbers only (good enough for the time being - easy to test)
    const regex = /^(?:(?:\+|00)972[-.\s]?|0)(?:[23489]|5\d)\d{7}$/;
    if (!regex.test(value)) {
      return 'Please enter a valid phone number';
    }
  },
  password: (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(value)) {
      return 'Please enter a pasword with at least 8 characters, one uppercase letter, one lowercase letter and one number';
    }
  },
  url: (value) => {
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol (optional)
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+' + // subdomain (optional)
        '([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.([a-z]{2,})' + // domain name and extension
        '(\\/[-a-z\\d%_.~+]*)*' + // path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i' // fragment locator
    );

    if (!regex.test(value)) {
      return 'Please provide a valid URL';
    }
  },
};

export default validations;
