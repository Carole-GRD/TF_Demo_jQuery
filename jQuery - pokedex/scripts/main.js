let offset = 0;
let limit = 20;
let pokemon = '';



// **************
// Requêtes AJAX
// **************

// Au chargement de la page
// *************************
$(document).ready(pokemonList(), $('.btn-prev').attr('disabled', true));



// Récupérer une liste de 20 pokémon + le premier pokémon
// ******************************************************
function pokemonList() {
    $('.btn-prev').attr('disabled', false);

    $.ajax({

        url : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
        type : 'GET',
        dataType : 'json',
        success : function(res, status) {
            console.log('SUCCESS RES : ', res);
            console.log('SUCCESS STATUS : ', status);
            
            
            res.results.map(result => $('.poke-list').append(`<li> ${result.name} </li>`));

            // $('.poke-name').text(`${res.results[0].name}`)
            $('.poke-name').text(`${res.results[0].name[0].toUpperCase() + res.results[0].name.slice(1)}`)

            $.ajax({

                url : `${res.results[0].url}`,
                type : 'GET',
                dataType : 'json',
                success : function(res, status) {
                    // console.log('COMPLETE -> SUCCESS RES : ', res);
                    // console.log('COMPLETE -> SUCCESS RES.sprites.front_default : ', res.sprites.front_default);
                    // console.log('COMPLETE -> SUCCESS STATUS : ', status);

                    $('.poke-img').append(`<img src="${res.sprites.front_default}" alt="Image de ${res.name}"  />`)

                    $('.poke-descr').append(`<p>N° : ${res.order}</p>`)
                    $('.poke-descr').append(`<p>Poids : ${res.weight * 10} kg</p>`)
                    $('.poke-descr').append(`<p>Taille : ${res.height * 10} cm</p>`)
                }             
            })

            $('.poke-list li').on('click', function() {
                pokemon = `${$(this).text().trim()}`;
                newPokemon();
            });
        },
        error : function(res, status, err) {
            // console.log('ERR RES : ', res);
            // console.log('ERR STATUS : ', status);
            // console.log('ERR : ', err);
        },
        complete : function(res, status) {
            // console.log('COMPLETE RES : ', res);
            // console.log('COMPLETE STATUS : ', status);

        }
    })

}




// Au click sur un des 20 pokémons
// ********************************
function newPokemon() {
    console.log('pokémon sélectionné : ', pokemon);
    console.log('function newPokemon');

    $('.poke-name p').remove()
    $('.poke-img img').remove()
    $('.poke-descr p').remove()

        $.ajax({
            url : `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
            type : 'GET',
            dataType : 'json',
            success : function(res, status) {
                console.log('SUCCESS - function newPokemon');
                console.log('SUCCESS RES : ', res);
                console.log('SUCCESS STATUS : ', status);
                
                
                $('.poke-name').text(`${res.name[0].toUpperCase() + res.name.slice(1)}`)

                $('.poke-img').append(`<img src="${res.sprites.front_default}" alt="Image de ${res.name}"  />`)

                $('.poke-descr').append(`<p>N° : ${res.order}</p>`)
                $('.poke-descr').append(`<p>Poids : ${res.weight * 10} kg</p>`)
                $('.poke-descr').append(`<p>Taille : ${res.height * 10} cm</p>`)

            },
            error : function(res, status, err) {
                // console.log('ERR RES : ', res);
                // console.log('ERR STATUS : ', status);
                // console.log('ERR : ', err);
            },
            complete : function(res, status) {
                // console.log('COMPLETE RES : ', res);
                // console.log('COMPLETE STATUS : ', status);
            }
        })
};

    


// Bouton : Afficher les 20 pokémons précédents
// ********************************************
$('.btn-prev').on('click', function() {
    // console.log('.btn-prev');

    $('.poke-name p').remove();
    $('.poke-img img').remove();
    $('.poke-descr p').remove();
    $('.poke-list li').remove();

    $('.btn-next').attr('disabled', false);
    
    if (offset === 1280) {
        offset = 1200;
        limit = 20;
        console.log('offset === 1200 ?', offset);
        $.ajax({
            url : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            type : 'GET',
            dataType : 'json',
            success : function(res, status) {

                $('.poke-list li').remove();
                res.results.map(result => $('.poke-list').append(`<li> ${result.name} </li>`))

                // console.log('res.results[0].name : ',res.results[0].name);
                // $('.poke-name').text(`${res.results[0].name}`)
            }
        })
    } 
    else {

        if (offset === 200) {
            console.log('offset ?', offset);
             $('.btn-prev').attr('disabled', true);
        }
        

        offset -= 200;
        limit = 20;
        console.log('offset : ', offset);
    
        $.ajax({
            url : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            type : 'GET',
            dataType : 'json',
            success : function(res, status) {
                // console.log('SUCCESS RES : ', res);
                // console.log('SUCCESS STATUS : ', status);

                // $('.poke-list li').remove();
                res.results.map(result => $('.poke-list').append(`<li> ${result.name} </li>`))
            
                $('.poke-name').text().trim()
            },
            error : function(res, status, err) {
                // console.log('ERR RES : ', res);
                // console.log('ERR STATUS : ', status);
                // console.log('ERR : ', err);
            },
            complete : function(res, status) {
                // console.log('COMPLETE RES : ', res);
                // console.log('COMPLETE STATUS : ', status);
            }
        })
           
    }
})



// Bouton : Afficher les 20 pokémons suivants
// ******************************************
$('.btn-next').on('click', function() {
    // console.log('.btn-next');

    $('.poke-name p').remove()
    $('.poke-img img').remove()
    $('.poke-descr p').remove()
    $('.poke-list li').remove()

    $('.btn-prev').attr('disabled', false);
    
    if (offset === 1200) {
        offset = 1280;
        limit = 1;
        console.log('offset === 1281 ?', offset);
        $.ajax({
            url : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            type : 'GET',
            dataType : 'json',
            success : function(res, status) {

                $('.poke-list li').remove();
                res.results.map(result => $('.poke-list').append(`<li> ${result.name} </li>`))
                $('.btn-next').attr('disabled', true);
                // $('.poke-name').text()
            }
        })
    } 
    else {

        offset += 200;
        limit = 20;
        console.log('offset : ', offset);

        $.ajax({
            url : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
            type : 'GET',
            dataType : 'json',
            success : function(res, status) {
                // console.log('SUCCESS RES : ', res);
                // console.log('SUCCESS STATUS : ', status);

                pokemonList();
                // $('.btn-prev').attr('disabled', false);
                // $('.poke-list li').remove();
                // res.results.map(result => $('.poke-list').append(`<li> ${result.name} </li>`))
                // $('.poke-name').text()
            },
            error : function(res, status, err) {
                // console.log('ERR RES : ', res);
                // console.log('ERR STATUS : ', status);
                // console.log('ERR : ', err);
            },
            complete : function(res, status) {
                // console.log('COMPLETE RES : ', res);
                // console.log('COMPLETE STATUS : ', status);
            }
        })
    } 
})




