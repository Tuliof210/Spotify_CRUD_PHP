<?php

$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "spotify";

$conexao = mysqli_connect($servidor,$usuario,$senha,$banco);

mysqli_set_charset($conexao, "utf8");

?>