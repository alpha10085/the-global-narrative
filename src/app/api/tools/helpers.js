export const Asynchandler = (fn) => {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.log(error);
        
        return false; // You can also log the error if needed: console.error(error);
      }
    };
  };
  