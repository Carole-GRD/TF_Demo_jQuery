// SETUP
let setUpList = new Array(20).fill('----------');
let previousUrl = null
let nextUrl = 'https://pokeapi.co/api/v2/pokemon'

getPokemons('next')

$('#pkm-img-front').hide()
$('#pkm-img-back').hide()


//Boutons PREV et NEXT
$('#btn-prev').on('click', function () {
    getPokemons('prev')
})

$('#btn-next').on('click', function () {
    getPokemons('next')
})



function getPokemons(prevOrNext) {
    let reqUrl = prevOrNext == 'prev' ? previousUrl : nextUrl
    $.ajax({
        url: reqUrl,
        type: 'GET',
        dataType: 'json',
        success : function(res, status) {
            console.log(res);

            nextUrl = res.next
            previousUrl = res.previous

            $('#btn-prev').attr('disabled', previousUrl == null)
            $('#btn-next').attr('disabled', nextUrl == null)

            $('#pokemons').empty()
            res.results.forEach(pkm => {
                $('#pokemons').append(`<p onclick="getOne('${pkm.url}')" class="pkm-select">${pkm.name}</p>`)
                
            })
        }
    })
}

function getOne(url) {
    $.ajax({
        url,
        type : 'GET',
        dataType : 'json',
        success : function(res, status) {
            console.log(res);

            $("#pkm-name").text(res.name)
            $("#pkm-img-none").hide()
            $("#pkm-img-front").attr('src', res.sprites['front_default'])
            $("#pkm-img-back").attr('src', res.sprites['back_default'])
            $("#pkm-img-front").show()
            $("#pkm-img-back").show()
            $("#pkm-id").text(res.id)
            $("#pkm-weight").text(res.weight/10)
            $("#pkm-height").text(res.height*10)
            $("#infos").removeClass()
            $("#name").removeClass()
            $("#infos").addClass(['infos' , res.types[0].type.name])
            $("#name").addClass(['name' , res.types[0].type.name])

        }
    })
}