var config = {
    apiKey: "AIzaSyANWwoYoIZO_r0eCGDk6cuIlRkV_ocgV-U",
    authDomain: "survivelead.firebaseapp.com",
    databaseURL: "https://survivelead.firebaseio.com",
    projectId: "survivelead",
    storageBucket: "survivelead.appspot.com",
    messagingSenderId: "994009398512"
  };
  firebase.initializeApp(config);

function dataAtual(){

    var hoje = new Date();
    var data = hoje.getFullYear()+'-0'+(hoje.getMonth()+1)+'-'+hoje.getDate();
    var hora = hoje.getHours() +':'+ hoje.getMinutes() +':'+hoje.getSeconds();
    return data+' '+hora;
}

function Meu_IP(){
    if(window.XMLHttpRequest) pegar_ip=new window.XMLHttpRequest
    else pegar_ip=new ActiveXObject('Microsoft.XMLHttp');
   
    pegar_ip.open("GET","http://api.hostip.info/get_html.php",false);
    pegar_ip.send();
    leandroip = pegar_ip.responseText.split("\n");
    for (i=0; leandroip.length >= i; i++) { 
         ip = leandroip[i].split(":"); 
         if ( ip[0] == "IP" ) return ip[1]; 
     } 
      return false; 
     } 


function getDetails() {

    var contactDetails = {               

        name: $("#nombre").val(),
        email: $("#email").val(),
        tipo: $("#empresa").val(),
        data: dataAtual(),
        ip:Meu_IP()
    };

    return contactDetails;
}

function writeDetails() {

    console.log("procesando formulario");


    var detalles = getDetails();
    console.log("Details", detalles);

    var detailsId = firebase.database().ref().child('details').push().key; // crear id para el detalle que vamos a guardar
    console.log("key", detailsId);

    firebase.database().ref('details/' + detailsId).set(detalles); // guardar los detalles con el id generado

    console.log("Guardado");
    window.open("./downloads/CronogramaCarnaval.pdf", "minhaJanela");


} 


/*
firebase.database().ref('details').on('value', function(snapshot) {

    // mostrar los detalles en la pagina
    var allDetails = snapshot.val();
        for (var key in allDetails) {
        var comentario = $("#demo");
        var nombreMail = $("#demo");
        nombreMail.append("<div class='especial2'>"+allDetails[key].name + ": " + "<br>" + allDetails[key].email + "</div>");
        comentario.append("<div class='especial'>"+allDetails[key].comentario + "</div><br>");
        
    
    }
});*/


function writeUserData(userId, name, email, empresa, comentario) {

    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        empresa: empresa,
        comeentario: comentario,
    });
}

// 
function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };


    
    var newPostKey = firebase.database().ref().child('posts').push().key;

   
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);

    document.write("Enviado satisfactoriamente");

    return false; 
}

