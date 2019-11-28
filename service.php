<?php
if(!empty($_GET['acao'])){
    $acao = $_GET['acao'];

    include('conection.php');

    if($acao == "listar_musicas"){
        $sql_music = "SELECT tb_music.id_music, tb_music.nome_music, tb_banda.nome_banda, tb_banda.id_banda, tb_genero.nome_genero, tb_genero.id_genero FROM tb_music INNER JOIN tb_banda ON tb_music.id_banda = tb_banda.id_banda INNER JOIN tb_genero ON tb_music.id_genero = tb_genero.id_genero;";
        $query_music = mysqli_query($conexao, $sql_music);

        if($query_music){
            $musics = [];

            while($dados = mysqli_fetch_array($query_music)){
                $id = $dados['id_music'];
                $nome = $dados['nome_music'];
                $banda = $dados['nome_banda'];
                $genero = $dados['nome_genero'];
                $idbanda = $dados['id_banda'];
                $idgenero = $dados['id_genero'];

                array_push($musics, ['id'=>$id,'nome'=>$nome, 'banda'=>$banda, 'genero'=>$genero, 'idbanda'=>$idbanda,'idgenero'=>$idgenero]);
            }

            echo json_encode($musics);
        }else{
            echo 0;
        }
    }else if($acao == "inserir_musica"){

        if(!empty($_POST['nome']) && !empty($_POST['banda']) && !empty($_POST['genero'])){
            $nome = $_POST['nome'];
            $banda = $_POST['banda'];
            $genero = $_POST['genero'];

            $validar = "SELECT * FROM tb_music WHERE nome_music = '$nome';";
            $query_validar = mysqli_query($conexao, $validar);

            if(mysqli_num_rows($query_validar) > 0){
                echo 2;
            }else{
                $sql_inserir_banda = "INSERT INTO tb_music(nome_music, id_banda, id_genero) VALUES ('$nome', $banda, $genero);";
                $query_inserir_banda = mysqli_query($conexao, $sql_inserir_banda);
        
                if($query_inserir_banda){
                    echo 1;
    
                }else{
                    echo 0;
                }
            }
        }else{
            echo 0;
        }

    }else if($acao == "listar_bandas"){
        $sql_listar_banda = "SELECT id_banda, nome_banda FROM tb_banda;";
        $query_listar_banda = mysqli_query($conexao, $sql_listar_banda);

        if($query_listar_banda){
            $todas_bandas = [];

            while($dados_banda = mysqli_fetch_array($query_listar_banda)){
                $id_banda = $dados_banda['id_banda'];
                $nome_banda = $dados_banda['nome_banda'];

                array_push($todas_bandas, ['id_banda'=>$id_banda,'nome_banda'=>$nome_banda]);
            }

            echo json_encode($todas_bandas);
        }else{
            echo 0;
        }
    }else if($acao == "listar_generos"){
        $sql_listar_genero = "SELECT id_genero, nome_genero FROM tb_genero;";
        $query_listar_genero = mysqli_query($conexao, $sql_listar_genero);

        if($query_listar_genero){
            $todos_generos = [];

            while($dados_genero = mysqli_fetch_array($query_listar_genero)){
                $id_genero = $dados_genero['id_genero'];
                $nome_genero = $dados_genero['nome_genero'];

                array_push($todos_generos, ['id_genero'=>$id_genero,'nome_genero'=>$nome_genero]);
            }

            echo json_encode($todos_generos);
        }else{
            echo 0;
        }
    }else if($acao == "apagar"){

        if(!empty($_GET['id'])){

            $id_apagar = $_GET['id'];

            $sql_apagar = "DELETE FROM tb_music WHERE id_music=".$id_apagar.";";
            $query_apagar = mysqli_query($conexao, $sql_apagar);
    
            if($query_apagar){
                echo 1;
            }else{
                echo 0;
            }
        }else{
            echo 0;
        }
    }else if($acao == "inserir_banda"){

        if(!empty($_POST['nome'])){
            $nome = $_POST['nome'];

            $validar = "SELECT * FROM tb_banda WHERE nome_banda = '$nome';";
            $query_validar = mysqli_query($conexao, $validar);

            if(mysqli_num_rows($query_validar) > 0){
                echo 2;
            }else{
                $sql_inserir_banda = "INSERT INTO tb_banda (nome_banda) VALUES ('$nome')";
                $query_inserir_banda = mysqli_query($conexao, $sql_inserir_banda);
        
                if($query_inserir_banda){
                    echo 1;
    
                }else{
                    echo 0;
                }
            }
        }else{
            echo 0;
        }

    }else if($acao == "inserir_genero"){

        if(!empty($_POST['nome'])){
            $nome = $_POST['nome'];
            
            $validar = "SELECT * FROM tb_genero WHERE nome_genero = '$nome';";
            $query_validar = mysqli_query($conexao, $validar);

            if(mysqli_num_rows($query_validar) > 0){
                echo 2;
            }else{

                $sql_inserir_genero = "INSERT INTO tb_genero (nome_genero) VALUES ('$nome')";
                $query_inserir_genero = mysqli_query($conexao, $sql_inserir_genero);
        
                if($query_inserir_genero){
                    echo 1;
                }else{
                    echo 0;
                }
            }
        }else{
            echo 0;
        }

    }else{
        echo 0;
    }

}else{
    echo 0;
}
?>