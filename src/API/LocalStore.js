function saveUserToken(token, remember) {
    // if (remember) {
    document.cookie = "user_token=" + token + "; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
    //     sessionStorage.removeItem('user_token');
    // } else {
    //     document.cookie = "user_token=" + token + "; path=/";
    // }
}

function getUserToken() {
    var token = getCookie("user_token");
    // var token = localStorage.getItem('user_token');
    if (token !== null && token !== '') {
        return token;
    } else {
        var token = getCookie("user_token");
        // token = sessionStorage.getItem('user_token');
        if (token !== null && token !== '') {
            return token;
        }
    }
}

function LogoutUser() {
    document.cookie = 'user_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // localStorage.removeItem('user_token');
    // sessionStorage.removeItem('user_token');
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getFlag = (country) => {
    if (country === "KSA")
        country = "sa";
    else if (country === "UAE")
        country = "ae";
     else if (country === "Kuwait")
        country = "kw";
    else if (country === "Bahrain")
        country = "bh";
    else if (country === "Qatar")
      country = "qa";
      else if (country === "Oman")
      country = "om";
      
      return   'https://countryflagsapi.com/png/'+country +'';
  //  return   'https://flagcdn.com/16x12/'+country +'.png';
     
}


const setSearch = (key = '', companysearch = '') => {
    window.sessionStorage.setItem(key, companysearch);
}

const getSearch = (key = '') => {
    return window.sessionStorage.getItem(key);
}

const setDocumentUrl = (url = "") => {
    window.localStorage.setItem('document_url', url);
}


const getDocumentUrl = () => {
    return window.localStorage.getItem('document_url');
}

const setDocumentOpenName = (name = "") => {
    window.localStorage.setItem('document_open_url', name);
}

const getDocumentOpenName = () => {
    return window.localStorage.getItem('document_open_url');
}

const setDocumentCompanySymbol = (name = "") => {
    window.localStorage.setItem('document_company_symbol', name);
}

const getDocumentCompanySymbol = () => {
    return window.localStorage.getItem('document_company_symbol');
}



export { saveUserToken, getUserToken, LogoutUser, getFlag, setSearch, getSearch, setDocumentUrl, getDocumentUrl, setDocumentOpenName, getDocumentOpenName, setDocumentCompanySymbol, getDocumentCompanySymbol }