<?php
ob_start();
function conecta_bd(){		
  $servidor = "localhost";    //Servidor
  $usuario = "friyawa";          //Usuario
  $clave = "";        //Clave
  $bd = "friyawa";		           //Base de datos

 	 //Procesa la solicitud GET
 	 
	$conn=mysqli_connect($servidor,$usuario,$clave, $bd);
		
	if(mysqli_connect_errno()){
		echo mysqli_connect_error();
		exit(0);
	}
		
	# Seleccion de BD
	return $conn;
}
 
function procesarGet(){
	if ($_REQUEST["id_user"] != "") {
		$idArticle = $_GET["id_user"];
		$sql = "SELECT * FROM friyawa.users WHERE users.id_user = $idArticle";
	} else {
		$sql = "SELECT * FROM friyawa.users";
	}
	return $sql;
}
$conn = conecta_bd();
$sql = procesarGet();
$rs = mysqli_query($conn, $sql);

$array = array();
if ($rs) {
	$array = array();
	while ($fila = mysqli_fetch_assoc($rs)) {	
		$array[] = array_map('utf8_encode', $fila);
	}
	$res = json_encode($array, JSON_NUMERIC_CHECK);
}else{
	$res = null;
	echo mysqli_error($conn);
}
mysqli_close($conn);

echo $res;
header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        ob_end_flush();
?>