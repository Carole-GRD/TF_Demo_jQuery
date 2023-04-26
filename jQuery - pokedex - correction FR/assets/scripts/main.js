// SETUP
let previousUrl = null
let nextUrl = 'https://pokeapi.co/api/v2/pokemon'
let pkmList = []
 	
$("#pkm-spin").hide()
$('#pkm-img-front').hide()
$('#pkm-img-back').hide()


$( document ).ready( function() {
    getPokemons('next')
})


//Boutons PREV et NEXT
$('#btn-prev').on('click', function () {
    getPokemons('prev')

})

$('#btn-next').on('click', function () {
    getPokemons('next')
})



function getPokemons(prevOrNext) {
    $("#pkm-spin").show()

    let reqUrl = prevOrNext == 'prev' ? previousUrl : nextUrl
    $.ajax({
        url: reqUrl,
        type: 'GET',
        dataType: 'json',
        success : function (res, status) {
            console.log(res);

            nextUrl = res.next
            previousUrl = res.previous

            $('#btn-prev').attr('disabled', previousUrl == null)
            $('#btn-next').attr('disabled', nextUrl == null)

            $('#pokemons').empty()
            $('#pokemons').hide()
            $('#btn-prev').hide()
            $('#btn-next').hide()

            res.results.forEach(pkm => {
                $('#pokemons').append(`<p id=${pkm.name} onclick="getOne('${pkm.url}')" class="pkm-select">${pkm.name}</p>`)
            })

            $('#pokemons p').each(function(i) {
                 $.ajax({
                    url : `https://pokeapi.co/api/v2/pokemon/${$(this).text()}`,
                    type : 'GET',
                    dataType : 'json',
                    success : function(res2) {
                        $(`#${res2.name}`).css('color', `var(--${res2.types[0].type.name})`)
                        $.ajax({
                            url : res2.species.url,
                            type : 'GET',
                            dataType : 'json',
                            success : function(res3){
                                console.log(res3);
                                $(`#${res2.name}`).text(`${res3.names.find(p => p.language.name == 'fr').name}`)
                                
                            },
                            complete : function() {
                                if(i == 19) {  
                                    setTimeout(() => {

                                    
                                    $("#pkm-spin").hide() 
                                    $('#pokemons').show()
                                    $('#btn-prev').show()
                                    $('#btn-next').show()}, 300)
                                }
                            }

                        })
                    }
                })
                
            })
        },
    })

    console.log('fini');
}



function getOne(url) {
    $.ajax({
        url,
        type: 'GET',
        dataType: 'json',
        success: function (res, status) {
            console.log(res);

            $.ajax({
                url: res.species.url,
                type: 'GET',
                dataType: 'json',
                success: function (res2, status) {
                    //Nom FR
                    $("#pkm-name").text(res2.names.find(p => p.language.name == 'fr').name)
                    //Description FR
                    $("#description").text(res2['flavor_text_entries'].find(fte => fte.language.name == 'fr')['flavor_text'])
                }
            })

            //Images
            $("#pkm-img-none").hide()
            $("#pkm-img-front").attr('src', res.sprites['front_default'])
            $("#pkm-img-back").attr('src', res.sprites['back_default'])
            $("#pkm-img-front").show()
            $("#pkm-img-back").show()

            //Infos
            $("#pkm-id").text(res.id)
            $("#pkm-weight").text(res.weight / 10)
            $("#pkm-height").text(res.height * 10)

            //Affichage couleur en fonction du type
            $("#infos").removeClass()
            $("#name").removeClass()
            $("#infos").addClass(['infos', res.types[0].type.name])
            $("#name").addClass(['name', res.types[0].type.name])

        }
    })
}