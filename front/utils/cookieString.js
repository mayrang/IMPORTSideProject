export const cookieStringToObject = (cookieString) => {
    if (!cookieString) {
      return "";
    } else {
    
      cookieString = cookieString.split("; ");
      let result = {};
      
      for (var i = 0; i < cookieString.length; i++) {
        var cur = cookieString[i].split("=");
        result[cur[0]] = cur[1];
      }
      return result;
    }
};