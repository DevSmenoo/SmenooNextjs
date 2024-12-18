var path="https://template.smenoo.it/";

function openCat(idCategoria) {
    $("#filtrCat").val(idCategoria);
 
    var url = 'ajaxPrintPiatti.php?id='+idCategoria+'&l='+getCookie('sessLang');
 
    //verifichiamo se ci sono filtri attivi
    if ($("#filt1").val()!="") {
       url = url+'&f1=1'
    }
 
    if ($("#filt2").val()!="") {
       url = url+'&f2=1'
    }
 
    if ($("#filt3").val()!="") {
       url = url+'&f3=1'
    }
 
    if ($("#filt4").val()!="") {
       url = url+'&f4=1'
    }
 
    
 
    //stampo i piatti
    $('#elencoPiatti').load(url, function(){});
    document.getElementById("navCat"+idCategoria).focus();
 }

 

function filterMenu() {

    var url = 'ajaxPrintCategorieMenu';
    var querystring='';
 
    //verifichiamo se ci sono filtri attivi
    if ($("#filt1").val()!="") {
       if (querystring=="") {
          querystring = querystring+'?f1=1'
       }else{
          querystring = querystring+'&f1=1'
       }
       
    }
 
    if ($("#filt2").val()!="") {
       if (querystring=="") {
          querystring = querystring+'?f2=1'
       }else{
          querystring = querystring+'&f2=1'
       }
    }
 
    if ($("#filt3").val()!="") {
       if (querystring=="") {
          querystring = querystring+'?f3=1'
       }else{
          querystring = querystring+'&f3=1'
       }
    }
 
    if ($("#filt4").val()!="") {
       if (querystring=="") {
          querystring = querystring+'?f4=1'
       }else{
          querystring = querystring+'&f4=1'
       }
    }
 
    url=url+querystring;
 
    //console.log(url);
    $('#categorieMenu').load(url, function(){});
 }
 
 function closeCat(){
    $("#sidebar").animate({width: "0"});
    document.getElementById("sidebar").innerHTML="";
    $("body").css({ "overflow-y": "auto" });
     
 }
 
 function addPrefer(id) {
    $.ajax({
       url:'ajaxSavePreferito.php',
       data: {
           id : id
       },
       type: "POST",
       success: function(data){
          console.log(data);
          $("#prefer-"+id).attr('src', path+'img/Stella-attiva-preferiti.svg');
          document.getElementById('prefer-'+id).setAttribute('onclick','removePrefer('+id+')');
          countPrefer();
       },
    });
 }
 
 function removePrefer(id) {
    $.ajax({
       url:'ajaxRemovePreferito',
       data: {
           id : id
       },
       type: "POST",
       success: function(data){
          console.log(data);
          $("#prefer-"+id).attr('src', path+'img/Stella-preferiti.svg');
          document.getElementById('prefer-'+id).setAttribute('onclick','addPrefer('+id+')');
          countPrefer();
       },
    });
 }
 
 function countPrefer() {
    $.ajax({
       url:'ajaxCntPreferito',
       type: "POST",
       success: function(data){
          $('span#cntPref').html(data);
          console.log(data);
          //se ci sono preferiti, abilito il pallino del contatore, altrimenti disabilito
          if (data=="0") {
             $("#prefBoll").css("display", "none");
          }else {
             $("#prefBoll").css("display", "inline");
          }
       },
    });
 }
 
 function viewPref() {
    //stampo i preferiti
    $('#modalPrefBody').load('ajaxLoadPref', function(){});
 }
 
 function closePref() {
    $("#ulPref").animate({height: "0"});
    document.getElementById("ulPref").innerHTML="";
 
    $("#frecciaMenu").css("transform","rotate(90deg)");
    document.getElementById('frecciaMenu').setAttribute('onclick','viewPref()');
 }
 
 $("#preferitiModal").on('shown.bs.modal', function(){
    viewPref();
 });
 
 function removePrefModal(id) {
    //rimuovo il preferito
    removePrefer(id);
 
    //lo rimuovo anche dal modal
    $("#preferito-"+id).html("");
 }
 
 
 function addFilter(filtro) {
    //inserisco nell'input hidden il filtro attivo
    if (filtro=="vegano") {
       if ($("#filt1").val()=="") {
          $("#filt1").val("1");
       }else{
          $("#filt1").val("");
       }
    }else if (filtro=="vegetariano") {
       if ($("#filt2").val()=="") {
          $("#filt2").val("1");
       }else{
          $("#filt2").val("");
       }
    }else if (filtro=="senza_glutine") {
       if ($("#filt3").val()=="") {
          $("#filt3").val("1");
       }else{
          $("#filt3").val("");
       }
    }else if (filtro=="hot") {
       if ($("#filt4").val()=="") {
          $("#filt4").val("1");
       }else{
          $("#filt4").val("");
       }
    }
 
    countFilter();
    //chiudo il modal
    var myModalEl = document.getElementById('filtriModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    //modal.hide();
    //se ho filtri attivi, voglio che si filtri anche il menù delle categorie
    filterMenu();
    openCat($("#filtrCat").val());
 }
 
 
 function countFilter() {
    var cntFilter=0;
    
    if ($("#filt1").val()!="") {
       cntFilter=cntFilter+1;
    }
    if ($("#filt2").val()!="") {
       cntFilter=cntFilter+1;
    }
    if ($("#filt3").val()!="") {
       cntFilter=cntFilter+1;
    }
    if ($("#filt4").val()!="") {
       cntFilter=cntFilter+1;
    }
 
    //stampo o meno il bollino del cnt
    if (cntFilter==0) {
       $("#filtrBoll").css("display", "none");
    }else {
       $("#filtrBoll").css("display", "inline");
    }
 
    $("#cntFiltri").html(cntFilter);
 }
 
 function disableScroll() { 
    $("body").css("overflow-y", "hidden");
 } 
 
 function enableScroll() { 
   $("body").css("overflow-y", "auto");
 } 
 
 function openModalSidebar(modal) {
 
    //assegno ad ogni voce del menu la chiusura della sidebar
    $(document).on('click','.navbar-collapse.collapse.show',function(e) {
       if( $(e.target).is('a') ) {
          $(this).collapse('hide');
       }
    });
 
    //apro il modal che mi interessa
    $('#'+modal+'Modal').modal('show');
 }
 
 function changeIcon(icon){
    $('#'+icon+'Modal').on('show.bs.modal', function (e) {
       console.log(icon+' modal opened');
       $("#"+icon+"Icon").attr('src', path+'img/'+icon+'-active.svg');
    });
 
    $('#'+icon+'Modal').on('hide.bs.modal', function (e) {
       console.log(icon+' modal closed');
       $("#"+icon+"Icon").attr('src', path+'img/'+icon+'-inactive.svg');
    });   
 }
 
 function translateString() {
    var lang = $("#lang").val();
    //var arrayNomePiattiIT = <?php echo json_encode($nomePiatti); ?>;
    //var arrayDescPiattiIT = <?php echo json_encode($descPiatti); ?>;
    const arrayNomePiattiTrad = [];
    const arrayDescPiattiTrad = [];
 
    console.log(arrayNomePiattiIT);
 
 
    for (var i = 0; i < arrayNomePiattiIT.length; i++) {
       $.ajax({
 
          url:'ajaxTranslate.php',
         data: {
          lang : lang,
          text : arrayNomePiattiIT[i]
         },
         type: "POST",
         success: function(data){
           console.log(data);
           arrayNomePiattiTrad.splice(i, 0, data);
         },
       });
    }
    //console.log(arrayNomePiattiTrad);
 }
 
 function getLang() {
    console.log("entro");
    //al click del select ricavo le lingue disponibili per le traduzioni
    $("#lang").load("ajaxGetLang.php");
 
    //rimuovo poi la funzione per evitare doppi richiami
    $("#lang").prop("onclick", null).off("click");
 }
 
 function changeLanguage() {
    var linguaScelta=$("#lang").val();
    var idCat=$("#filtrCat").val();
 
    //setto il cookie con la nuova lingua
    setCookie("sessLang", linguaScelta, 365);
 
    //apro piatti tradotti
    openCat(idCat,"");
 }

 

 function changeImage() {
    var image = document.getElementById("menuIconBB");
    if (image.src.match("Menu-Active")) {
      image.src = path+"img/Menu-inactive.svg";
    } else {
      image.src = path+"img/Menu-Active.svg";
    }
  }
  
  
var gStorage = {};
  
function toogle(anImage, anAltSrcArr) {
    if (typeof(anImage) === "undefined" || typeof(anAltSrcArr) === "undefined" || anAltSrcArr.length === 0) {
        return;
    }

    var id = anImage.id;
    var oldSrc = anImage.src;

    if (typeof(gStorage[id]) === "undefined") {
        gStorage[id] = {
            'id': id,
            'origSrc': oldSrc,
            'i': 0
        };
    }

    gStorage[id].i += 1;
    if (gStorage[id].i > anAltSrcArr.length) {
        gStorage[id].i = 0;
    }

    if (gStorage[id].i === 0) {
        anImage.src = gStorage[id].origSrc;
    } else {
        anImage.src = anAltSrcArr[gStorage[id].i - 1];
    }
}

$('#sommelierModal').on('show.bs.modal', function (e) {
    askToSommelier()
});
  

  
  
function askToSommelier(){
    $.ajax({
    url:'apiSommelier.php',
    type: "POST",
    success: function(data){
        console.log(data);
        $('#sommelierVirtuale').html(data);
    },
    });
}


$(document).ready(function(){
   //avvio il conteggio preferiti a caricamento pagina
   countPrefer();

   //apro la stampa dei piatti
   openCat($("#filtrCat").val());
});

