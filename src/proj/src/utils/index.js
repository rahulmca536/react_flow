
export default {

    requestWithTimeOut: (axios, timeout = 7000) => {
      return Promise.race([
        axios,
        new Promise((_, reject) =>
          setTimeout(() => reject({ error: new Error('timeout'), response: { status: 408 } }), timeout)
        )
      ]);
    },
  
    checkIsEdge_IE() {
  
      // /MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||
  
      if (/Edge\/\d./i.test(navigator.userAgent))
        return true;
  
      return false;
    },
  };