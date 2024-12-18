function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
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


function startSessionAndRedirect(idMenu) {
   setCookie("idMenu", idMenu, 365);
   window.location.href = "/menu";
}

// Funzione per generare una stringa casuale
function generateRandomString() {
  var length = 10;
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let randomString = '';
  for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomString;
}

function checkAndCreateSessUserCookie() {
  // Verifica se il cookie "sessUser" esiste
  if (!getCookie("sessUser")) {
    // Se non esiste, lo creiamo 
    setCookie("sessUser", generateRandomString(), 1);
    console.log("Cookie 'sessUser' creato: "+getCookie("sessUser"));
  } else {
    console.log("Cookie 'sessUser' già esistente: "+getCookie("sessUser"));
  }
}

$(document).ready(function(){
  //gestione cookie sessUser
  checkAndCreateSessUserCookie();
});
