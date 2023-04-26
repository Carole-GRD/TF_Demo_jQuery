// * Pour utiliser jQuery
//Soit 
console.log(jQuery("#bjr"))
//Ou (le plus utilisé)
console.log($("#bjr"))

// * Les sélecteurs
// Tous les selecteurs CSS :
// Via id -> #
console.log("Via div ", $("#bjr"))
// Via nom class -> .
console.log("Via class ", $(".red"))
// Via nom balise
console.log("Via balise ", $("li"));
// Via selecteurs plus avancés
console.log("Via sélecteurs avancés ", $("ul :nth-child(odd)"));

// Pour avoir un élément en particulier
console.log("Element 3 : ", $('li')[2]);

console.log($('#bjr').html("Au revoir"))

console.log($('li').html()) //Vous affiche l'html du premier élément
// console.log($('li').html("<p> Liste </p>")) //Attention modifie le html de tous les éléments li

// console.log($('li')[3].html()) // Error
console.log($('li')[3].innerHTML) //Sur un élément en particulier, il faudra utiliser innerHTML 

console.log($(':not(li)'))
console.log($(':has(p)'))

// Affinage (avec le find)
console.clear()
console.log($('#maliste').find('li.red')); //Tous les li qui ont la classe red, contenus dans une ul qui a l'id maliste
console.log($('#maliste li.red')); //Same ↑

// forEach en jQuery
$('#autreliste li').each(function() { 
    $(this).hide() // ! style inline
})

//is (comparateur)
console.log("First li of maliste is blue ? ", $('#maliste li:first').is('.blue') ) 
//true
console.log("First li of maliste is blue and red ? ", $('#maliste li:first').is('.red .blue') ) 
//false ET (espace)
console.log("First li of maliste is blue or red ? ", $('#maliste li:first').is('.red , .blue') )
//true OU (,)

// * Manipuler html :
// $(selector).html() -> Consulter premier élément de la collection obtenue avec le selector
// $(selector).html("<p> du HTML </p>") -> Modifier le contenu de tous les éléments de la collection obtenue avec le selector

// * Manipuler le texte :
console.log( $("li").text() ) 
// ↑ Affiche le contenu texte de chaque élément collés les uns aux autres (pas de séparateurs)
console.log( $("li").text("<p>oui</p>") ) 
//Remplace le contenu texte de chacun des éléments (attention comme innerText ou textContent, n'interprête pas le html)

// ! Attention si vous récupérez UN élément en particulier $(selector)[1], vous ne devrez plus utiliser html() et text() mais innerHTML et innerText comme en js classique

// * Manipuler input
//$('input').val("pouet") //Met pouet dans tous les inputs
$('#firstname').val("Aude") //Met Aude dans celui qui a l'id firstname
$('input')[0].value = 'Beurive' //Méthode classique du JS
// ! Attention également, soit vous utilisez un selector assez précis pour ne modifier qu'un (ou plusieurs) input en particulier, sinon, modifie toute la collection

// * Savoir combien on a d'éléments dans notre selecteur jQuery
console.log( $('li').length );

// * Evènements

//Sur le button ajout d'une fonction sur l'évènement click
$('#btn-msg').on('click', function() {
    //Si les input ne sont pas vides
    if($("#msg").val().trim() != '' && $("#msg-title").val().trim() != '') {
        //On affiche le message dans la div
        //$("#display-msg").text(`[Nouveau message] : ${ $("#msg").val() }`)

        //On ajoute le message dans la liste
        // $("#display-msg")
        //     .prepend($("<div>  </div>")
        //         .append(`<h4> ${ $("#msg-title").val() } ${ new Date().toLocaleTimeString('fr-BE') } </h4> <p> ${ $("#msg").val() } </p>`)
        //     )

        ($("<div>  </div>")
            .append(`<h4> ${ $("#msg-title").val() } ${ new Date().toLocaleTimeString('fr-BE') } </h4> <p> ${ $("#msg").val() } </p>`)).insertAfter('#last-msg')

        //On vide l'input
        $("#msg").val("")
        $("#msg-title").val("")
    }
})

// * Wrap / Unwrap
$("#display-msg").wrap('<section>')
$("#display-msg").unwrap('section')

// * Children
console.log($('#maliste').children()) //Tous les li dans la ul
console.log($('#maliste').children('.blue')) //Tous les li qui ont la classe blue

// * Manipuler les attributs
$('#btn-msg').attr('disabled', true)
$('#msg').attr({ 'disabled' : true, 'placeholder' : 'Bloqué' })

$('#btn-msg')[0].disabled = false
//$('#ouioui').attr('src', '/images/tehvoice.png')
//$('#ouioui')[0].src = '/images/tehvoice.png' //Si vous voulez mixer avec js classique sur un élément en particulier

// * Retirer des éléments
//$('li.blue').remove() //Supprime tous les li avec la class blue

// * LES CLASSES
$('#italique').on('click', function() {
    if($('#txt-class').hasClass('italique')) {
        $('#txt-class').removeClass('italique')
    } else {
        $('#txt-class').addClass('italique')
    }
})

$('#gros').on('click', function() {
    $('#txt-class').toggleClass('gros')

})

$('#gras').on('click', function() {
    $('#txt-class').toggleClass('gras')

})

// * Animations
// Show / Hide
$("#img-animate").hide()

$('#img-show').on('click', function() {
    $("#img-animate").fadeIn(3000, 'swing', function() {
        console.log("Done !");
    })
    $('#img-show').addClass('blue ', 3000, 'linear', function() { console.log('blued')} )
})

// Scroll
console.log($('.box').scrollTop(87))

// -------- AJAX --------

$('#btn-agify').on('click', function() {
    if($("#name").val().trim() != '') {

        $.ajax({
            url : `https://api.agify.io?name=${ $("#name").val() }&country_id=BE`,
            type : 'GET',
            dataType : 'json',
            //Se déclenche si succes de la requête
            //res contiendra l'objet déjà formaté en json
            success : function(res, status) {
                console.log('SUCCESS RES : ', res);
                console.log('SUCCESS STATUS : ', status);
                $("#response").text(`L'âge moyen de ${ $('#name').val() } est de ${res.age} ans `)
            },
            //Se déclenche si error de la requête
            //res contient tout l'objet d'erreur
            //err contient juste le nom de l'erreur
            error : function(res, status, err) {
                console.log('ERR RES : ', res);
                console.log('ERR STATUS : ', status);
                console.log('ERR : ', err);
            },
            //Se déclenché à la fin de la requête, qu'elle ai réussie ou échouée
            //res contient tout l'objet xhr
            complete : function(res, status) {
                console.log('COMPLETE RES : ', res);
                console.log('COMPLETE STATUS : ', status);
            }
        })
    }
})