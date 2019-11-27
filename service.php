<?php
if(!empty($_GET['acao'])){
    $acao = $_GET['acao'];

    include('conection.php');

    if($acao == "listar_musicas"){
        $sql_music = "SELECT tb_music.id_music, tb_music.nome_music, tb_banda.nome_banda, tb_genero.nome_genero FROM tb_music INNER JOIN tb_banda ON tb_music.id_banda = tb_banda.id_banda INNER JOIN tb_genero ON tb_music.id_genero = tb_genero.id_genero;";
        $query_music = mysqli_query($conexao, $sql_music);

        if($query_music){
            $musics = [];

            while($dados = mysqli_fetch_array($query_music)){
                $id = $dados['id_music'];
                $nome = $dados['nome_music'];
                $banda = $dados['nome_banda'];
                $genero = $dados['nome_genero'];

                array_push($musics, ['id'=>$id,'nome'=>$nome, 'banda'=>$banda, 'genero'=>$genero]);
            }

            echo json_encode($musics);
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