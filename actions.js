var pagina = new XMLHttpRequest();
pagina.onreadystatechange = function() {
    if (pagina.readyState === 4) {

        var dado = JSON.parse(pagina.responseText);
        var conteudoHTML = '';

        var conjunto_bandas = new Set();
        var conjunto_generos = new Set();
        var listaFinal = '';

        for (var i = 0; i < dado.length; i++) {
            conteudoHTML += template(dado[i].id, dado[i].nome, dado[i].banda, dado[i].genero);
            conjunto_bandas.add(dado[i].banda);
            conjunto_generos.add(dado[i].genero);
        }
        document.getElementById('listagem').innerHTML = conteudoHTML;

        for (let item of conjunto_bandas) {
            console.log(item)
            listaFinal += `<a class="dropdown-item" onclick="Filtrar('` + item + `');" href="#">` + item + `</a>`;
        }
        document.getElementById('dropdown-banda').innerHTML = listaFinal;

        listaFinal = '';
        for (let item of conjunto_generos) {
            console.log(item)
            listaFinal += `<a class="dropdown-item" onclick="Filtrar('` + item + `');" href="#">` + item + `</a>`;
        }
        document.getElementById('dropdown-genero').innerHTML = listaFinal;
    }
};

pagina.open('GET', 'service.php?acao=listar_musicas');
pagina.send();

//ROTINAS PADRAO ACIMA ----------------------------------------------------------------------------------------








//FUNCOES RECORRENTES
function Filtrar(texto) {
    document.getElementById('rotulo').innerHTML = texto;

    var aux = document.getElementsByClassName('card');

    if (texto != 'Todos') {
        for (let item of aux) {
            item.style.display = 'none';
        }
        var aux = document.getElementsByClassName(texto);
        for (let item of aux) {
            item.style.display = 'block';
        }
    } else {
        for (let item of aux) {
            item.style.display = 'block';
        }
    }
}


var template = function(id, nome, banda, genero) {

    var html = `
        <div class="` + genero + ` card text-white bg-dark mb-3 ` + banda + `" style="max-width: 18rem;">
            <div class="card-header">
                <strong class="titulo-banda">` + banda + `</strong>
                <button type="button" onClick="deletar(this, ` + id + `);" class="d-flex align-self-center ml-auto btn btn-danger btncard"><strong>Excluir</strong></button>
            </div>
            <div class="card-body bg-warning">
                <h5 class="card-title"><strong>` + nome + `</strong></h5>
            </div>
            <div class="card-header">
                <h5 class="card-title">` + genero + `</h5>
            </div>
        </div>
    `;
    //var htmlaux = '<div class="card col-4" style="width: 18rem;"> <iframe class="card-img-top" src="https://www.youtube.com/embed/' + id_youtube + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <div class="card-body"> <h5 class="card-title">' + nome + '</h5> <input type="text" class="entradacoment" name="campo_comentario" id="campo_' + id + '"> <input type="button" onClick="comentar(' + id + ');" class="btn btn-primary" value="Comentar"> <input type="button" onClick="deletar(this, ' + id + ');" class="btn btn-block btn-danger" value="Deletar Filme"> </div> </div>';
    return html;
}