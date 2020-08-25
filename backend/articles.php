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
	//Consulta para articles/
	if ($_GET["id_article"] != "") {
		$idArticle = $_GET["id_article"];
		//Construye la consulta SQL
		$sql = "SELECT * FROM articles WHERE articles.id_article = $idArticle";
	//Consulta de Hastags para search/ 
	} else if ($_GET["hashtag"] != "" and $_GET["page"] != "" ) {
	
		$rowsToShow = 4; //Registros a mostrar por cada paginación (para el infinite scroll)
		$page = intval($_GET["page"]); //Obtiene el valor de la variable Page
		$hashtag = $_GET["hashtag"]; 
		//Calcular la paginación
		if ($page == 0) {
			$currentRow = 0; //Primera paginación
		} else if ($page > 0) {
			$currentRow = ($page*$rowsToShow); //Calcula el registro desde el cual partirá a mostrar los demas
		} 
		//Construye la consulta SQL
		$sql = 'SELECT articles.* , users.username FROM articles, users WHERE articles.id_user = users.id_user AND LOWER(articles.hashtags) LIKE ("%'.$hashtag.'%") LIMIT '.$currentRow.','.$rowsToShow;
		//Proximas mejoras implementar la siguiente consulta SQL para N hashtags
		/* SELECT * FROM friyawa.articles WHERE LOWER(articles.hashtags) LIKE ("%animales%") OR (LOWER(articles.hashtags) LIKE("%punk%")); */
	

	//Consulta de hashtag para search/
	} else if ($_GET["hashtag"] != "" and $_GET["recent_article"] != "" and $_GET["older_article"] != "") {
		$rowsToShow = 4; //Registros a mostrar por cada paginación (para el infinite scroll)
		$hashtag = $_GET["hashtag"]; 	
		$recentArticle = intval($_GET["recent_article"]); //referencia al registro mas reciente de la porción
		$olderArticle = intval($_GET["older_article"]); //referencia al registro mas antiguo de la porción
		//Construye la consulta SQL
		$sql = 'SELECT articles.* , users.username FROM articles, users WHERE articles.id_user = users.id_user AND LOWER(articles.hashtags) LIKE ("%'.$hashtag.'%") AND ((articles.number_article > '.$recentArticle.') OR (articles.number_article < '.$olderArticle.')) ORDER BY articles.number_article DESC LIMIT '.$rowsToShow;
		//Consulta para home/ mediante paginación	
	}else if ($_GET["page"] != "") {
		//Procesar primero el Page
		$rowsToShow = 4; //Registros a mostrar por cada paginación (para el infinite scroll)
		$page = intval($_GET["page"]); //Obtiene el valor de la variable Page

		if ($page == 0) {
			$currentRow = 0; //Primera paginación
		} else {
			if ($page > 0) {
				$currentRow = ($page*$rowsToShow); //Calcula el registro desde el cual partirá a mostrar los demas
			}
		} 
		//Construye la consulta SQL
		$sql = "SELECT articles.* , users.username FROM articles, users WHERE articles.id_user = users.id_user LIMIT $currentRow,$rowsToShow";


	//Consulta a ejecutar cada vez que el cliente haga scroll down en home/
	} else if ($_GET["recent_article"] != "" and $_GET["older_article"] != "") {
		$recentArticle = intval($_GET["recent_article"]); //referencia al registro mas reciente de la porción
		$olderArticle = intval($_GET["older_article"]); //referencia al registro mas antiguo de la porción
		$rowsToShow = 4; //Registros a mostrar por cada paginación (para el infinite scroll)
		//Construye la consulta SQL
		$sql = "SELECT articles.* , users.username FROM articles, users WHERE articles.id_user = users.id_user AND ((articles.number_article > $recentArticle) OR (articles.number_article < $olderArticle)) ORDER BY articles.number_article DESC LIMIT $rowsToShow ";

	//Consulta SQL por defecto
	} else {
		//Construye la consulta SQL
		$sql = "SELECT * FROM friyawa.articles";
	}

	return $sql;
}

$conn = conecta_bd();
$sql = procesarGet();
$rs = mysqli_query($conn, $sql);
//Genera un docuemnto JSON con la consulta SQL ejecutada
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