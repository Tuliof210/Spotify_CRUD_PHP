var pagina = new XMLHttpRequest();
pagina.onreadystatechange = function() {
    if (pagina.readyState === 4) {

        var dado = JSON.parse(pagina.responseText);
        var conteudoHTML = '';

        var lista_idbanda = new Set();
        var lista_idgenero = new Set();

        var conjunto_bandas = new Set();
        var conjunto_generos = new Set();
        var listaFinal = '';

        console.log(dado)
            //Atualizando lista de Cards
        for (var i = 0; i < dado.length; i++) {
            conteudoHTML += template(dado[i].id, dado[i].nome, dado[i].banda, dado[i].genero);
            conjunto_bandas.add(dado[i].banda);
            conjunto_generos.add(dado[i].genero);

            lista_idbanda.add(dado[i].idbanda);
            lista_idgenero.add(dado[i].idegenero);
        }
        document.getElementById('listagem').innerHTML = conteudoHTML;

        //Atualizando lista de Filtros Possiveis
        for (let item of conjunto_bandas) {
            listaFinal += `<a class="dropdown-item" onclick="Filtrar('` + item + `');" href="#">` + item + `</a>`;
        }
        document.getElementById('dropdown-banda').innerHTML = listaFinal;

        listaFinal = '';
        for (let item of conjunto_generos) {
            listaFinal += `<a class="dropdown-item" onclick="Filtrar('` + item + `');" href="#">` + item + `</a>`;
        }
        document.getElementById('dropdown-genero').innerHTML = listaFinal;
    }
};

pagina.open('GET', 'service.php?acao=listar_musicas');
pagina.send();

//ROTINAS PADRAO ACIMA ----------------------------------------------------------------------------------------



//FUNCOES RECORRENTES
function Atualizar_bandas() {
    var pagina = new XMLHttpRequest();
    pagina.onreadystatechange = function() {
        if (pagina.readyState === 4) {

            var dado = JSON.parse(pagina.responseText);
            var auxselect = '<option selected value="0">Selecione uma banda da lista</option>';

            //Atualizando lista de Bandas
            for (var i = 0; i < dado.length; i++) {
                auxselect += `<option value="` + dado[i].id_banda + `">` + dado[i].nome_banda + `</option>`;
            }
            document.getElementById('SelectBanda').innerHTML = auxselect;
        }
    }
    pagina.open('GET', 'service.php?acao=listar_bandas');
    pagina.send();
}

function Atualizar_generos() {
    var pagina = new XMLHttpRequest();
    pagina.onreadystatechange = function() {
        if (pagina.readyState === 4) {

            var dado = JSON.parse(pagina.responseText);
            var auxselect = '<option selected value="0">Selecione uma banda da lista</option>';

            //Atualizando lista de Generos
            for (var i = 0; i < dado.length; i++) {
                auxselect += `<option value="` + dado[i].id_genero + `">` + dado[i].nome_genero + `</option>`;
            }
            document.getElementById('SelectGenero').innerHTML = auxselect;
        }
    }
    pagina.open('GET', 'service.php?acao=listar_generos');
    pagina.send();
}

function Atualizar() {
    Atualizar_bandas();
    Atualizar_generos();
}

function EnviarMusica() {
    var nome = document.getElementById('entradaMusica').value;
    var selectbanda = document.getElementById('SelectBanda').value;
    var selectgenero = document.getElementById('SelectGenero').value;

    if (nome == "" || selectbanda == 0 || selectgenero == 0) {
        alert("Todos os campos devem ser preenchidos");

    } else {
        var http = new XMLHttpRequest();
        var params = 'nome=' + nome + '&banda=' + selectbanda + '&genero=' + selectgenero + '';

        http.open('POST', 'service.php?acao=inserir_musica', true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                var dado = JSON.parse(http.responseText);

                if (dado != 0) {
                    if (dado == 2) {
                        alert("Não é possivel duplicar registros")
                    } else {
                        alert("Musica Inserida com sucesso, por favor atualize a Pagina");
                    }
                } else {
                    alert("Erro ao inserir musica");
                }
            }
        }
        http.send(params);
    }

    document.getElementById('entradaMusica').value = '';
    document.getElementById('SelectBanda').value = 0;
    document.getElementById('SelectGenero').value = 0;
}

function EnviarBanda() {
    var nome = document.getElementById('entradaBanda').value;
    document.getElementById('entradaBanda').value = '';

    if (nome != '') {

        var http = new XMLHttpRequest();
        var params = 'nome=' + nome + '';

        http.open('POST', 'service.php?acao=inserir_banda', true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                var dado = JSON.parse(http.responseText);

                if (dado != 0) {
                    if (dado == 2) {
                        alert("Não é possivel duplicar registros")
                    } else {
                        alert("Banda Inserida com sucesso");
                    }
                } else {
                    alert("Erro ao inserir banda");
                }
            }
        }
        http.send(params);
    } else {
        alert("Informe um nome para Banda");
    }
}

function EnviarGenero() {
    var nome = document.getElementById('entradaGenero').value;
    document.getElementById('entradaGenero').value = '';

    if (nome != '') {

        var http = new XMLHttpRequest();
        var params = 'nome=' + nome + '';

        http.open('POST', 'service.php?acao=inserir_genero', true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                var dado = JSON.parse(http.responseText);

                if (dado != 0) {
                    if (dado == 2) {
                        alert("Não é possivel duplicar registros")
                    } else {
                        alert("Genero Inserido com sucesso");
                    }
                } else {
                    alert("Erro ao inserir genero");
                }
            }
        }
        http.send(params);
    } else {
        alert("Informe um tipo de Genero");
    }
}

function deletar(e, id) {

    console.log(e, id);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var dado = JSON.parse(xhr.responseText);

            if (dado == 1) { //codigo 1 = deletado com sucesso
                e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
            } else {
                alert("Erro ao deletar");
            }
        }
    };

    xhr.open('GET', 'service.php?acao=apagar&id=' + id);
    xhr.send();
}

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
        <div class="` + genero + ` card text-white bg-dark mb-3 ` + banda + ` col-md-6" style="max-width: 18rem;">
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