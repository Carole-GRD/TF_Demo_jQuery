// Pour utiliser jQuery
// ********************
// // Soit
// console.log(jQuery("#bjr"));
// // Ou
// console.log($("#bjr"));



// ===========================================================================
// =========================   Les sélecteurs  ===============================
// ===========================================================================


// console.log('Via Id : ', $("#bjr"));
// console.log('Via class : ', $('.red'));
// console.log('Via balise : ', $('li'));
// console.log('Via sélecteur avancé : ', $('ul :nth-child(odd'));



// Pour avoir un élément en particulier
// ************************************
// console.log('element 3 : ', $('li')[2]);


// console.log($("#bjr").html('Au revoir'))    // remplace l'html

// console.log($('li').html())                 // Affiche l'html du premier élément
// // console.log($('li').html('<p>Liste</p>'))   // Attention, modifie le html de tous les éléments li

// // console.log($('li')[3].html())           // Error
// console.log($('li')[3].innerHTML)          // sur un élément en particulier, il faudra utiliser innerHTML

// console.log($(':not(li)'));
// console.log($(':has(p)'));



// Affinage
// ********
// console.clear()
// console.log($('#maliste').find('li.red'));    // Tous les li qui ont la calss red, contenu dans une ul qui a l'id "maliste"
// console.log($('#maliste li.red'));            // Same ↑



// forEach en jQuery
// ******************
// $('#autreliste').each(function() {
//     // console.log($(this));
//     $(this).hide();    // ! style inline
// });




// is (comparateur)
// *****************
// console.log('First li of maliste is blue ? ', $('#maliste li:first').is('.blue'));   // true
// console.log('First li of maliste is red AND blue ? ', $('#maliste li:first').is('.red .blue'));   // 'ET' -> false
// console.log('First li of maliste is red OR blue ? ', $('#maliste li:first').is('.red, .blue'));  // 'OU' -> true



// Manipuler html
// **************
// html() -> consulter permier élément de la collection obtenue avec le selector
// html('<p> du html </p>) -> Modifier le contenu de tous les éléments dela collection obtenue avec le selector



// ===========================================================================
// =======================   Manipuler le texte  =============================
// ===========================================================================



// console.log( $('li').text());                       //  Affiche le contenu de chaque élément collés les uns aux autres

// console.log( $('li').text('oui'));
// console.log( $('li').text('<p>oui</p>'));

// /!\ Attention, si vous récuperez un élément en particulier $(selector)[1], vous ne devrez plus utiliser html() et text()
// mais innerHTML et innerText comme en js classique


// ===========================================================================
// ========================   Manipuler input  ==============================
// ===========================================================================

// console.log($('input'));

// $('input').val('pouet');          // Met pouet dans tous les input
// $('#firstname').val('Carole');    // met Carole dans celui qui a l'id firstname
// $('input')[0].val('Gérard');      // Error -> utiliser la méthode classique du JS

// /!\ Attention, soit vous utiliser un selector assez précis pour ne modifier qu'un (ou plusieurs) input en particulier, sinon, modifie toute la collection




// ===========================================================================
// =====  Savoir combien on a d'éléments dans notre selector jQuery  =========
// ===========================================================================

// console.log('Combien d\'éléments "li" : ', $('li').length);





// ===========================================================================
// ========================   Les évènements  ==============================
// ===========================================================================

// // Sur le bouton ajout d'une fonction  surl'évènement click
// $('#btn-msg').on('click', function() {
    
//     // si input pas vide
//     if ($('#msg').val().trim() != '') {
        
//         // on affiche le message
//         $('#display-msg').text(`[Nouveau message] : ${$('#msg').val()}`)

//         // on vide la div
//         $('#msg').val('')

//     }
// })


// --------------------------------------------------------------------------------

// // Sur le bouton ajout d'une fonction  surl'évènement click
// $('#btn-msg').on('click', function() {
    
//     // si les inputs ne sont pas vide
//     if ($('#msg').val().trim() != '' && $('#msg-title').val().trim() != '') {
        
//         // on affiche le message
//         $('#display-msg').append($('<div>   </div>')

//             .append(`<h4> ${$('#msg-title').val()} ${new Date().toLocaleDateString('fr-BE')} </h4>
//                 <p>  ${$('#msg').val()}</p>`)
//         )
            

//         // on vide la div
//         $('#msg').val('')
//         $('#msg-title').val('')

//     }
// })



// ===========================================================================
// ==============================   Wrap  ====================================
// ===========================================================================

// $('#display-msg').wrap('<section>')
// $('#display-msg').unwrap('section')


// console.log($('#maliste').children());              // tous les li de la ul
// console.log($('#maliste').children('.blue'));       // les li de la ul qui ont la classe blue




// ===========================================================================
// ===================   Manipuler les attributs  =========================
// ===========================================================================

// $('#btn-msg').attr('disabled', true)
// $('#msg').attr({'disabled': true, 'placeholder' : 'Bloqué'})

// $('#btn-msg')[0].disabled = false





// ===========================================================================
// ===================   Images  =========================
// ===========================================================================




// ===========================================================================
// ======================   Retirer des éléments  ===========================
// ===========================================================================
// $('li.blue').remove()   // supprime tous les li avec la class blue





// ===========================================================================
// ========================     Les classes      =============================
// ===========================================================================
// $('#italique').on('click', function() {
//     if ($('#txt-class').hasClass('italique')) {
//         $('#txt-class').removeClass('italique')
//     }
//     else {
//         $('#txt-class').addClass('italique')
//     }
// })
// $('#gros').on('click', function() {
//     $('#txt-class').toggleClass('gros')
// })
// $('#gras').on('click', function() {
//     $('#txt-class').toggleClass('gras')
// })




// ===========================================================================
// ========================     Animations      =============================
// ===========================================================================



// // Show / Hide
// $('#img-animate').hide()
// // $('#img-animate').show()

// $('#img-show').on('click', function() {
//     $('#img-animate').fadeIn(3000, 'swing', function() {
//         console.log('Done !');
//     })
//     $('#img-show').addClass('blue', 3000, 'linear', 
//         function() {console.log('blued')}
//     )
// })




// ===========================================================================
// ==========================     Scroll      ===============================
// ===========================================================================
// $('.box').scrollTop(87)





// ===========================================================================
// ==========================     AJAX      ===============================
// ===========================================================================

$('#btn-agify').on('click', function() {

    if ($('#name').val().trim() != '') {

        $.ajax({
            url: `https://api.agify.io?name=${$('#name').val()}&country_id=BE`,
            type: 'GET',
            dataType: 'json',
            success: function (res, status) {
                console.log('SUCCESS RES : ', res);
                console.log('SUCCESS ERR STATUS : ', status);
                $('#response').text(`L\'âge moyen de ${$('#name').val()} est de ${res.age} ans.`)
            },
            error : function (res, status, err) {
                console.log('ERR RES : ', res);
                console.log('ERR STATUS : ', status);
                console.log('ERR ERROR : ', err);
            },
            complete : function (res, status) {
                console.log('COMPLETE RES : ', res);
                console.log('COMPLETE STATUS : ', status);
            }
        })
    }
})







