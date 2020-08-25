<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  function conecta_bd(){		
    $servidor = "localhost";    //Servidor
    $usuario = "friyawa";          //Usuario
    $clave = "";        //Clave
    $bd = "friyawa";		           //Base de datos
  
  
        //Procesa la solicitud GET
        
      $conn=mysqli_connect($servidor,$usuario,$clave, $bd);
          
      if(mysqli_connect_error()){
          echo mysqli_connect_error();
          exit(0);
      }
          
      # Seleccion de BD
      return $conn;
  }

  $conn = conecta_bd();

  //Verifica si se está haciendo una solicitud via POST (enviar comentario) o vía GET (solicitar comentarios)

  if (!isset($_GET["id_article"])) {
    //Guardar un nuevo registro en la tabla comments
    $json = file_get_contents('php://input');
 
    $params = json_decode($json);

    mysqli_query($conn,"insert into comments(content,id_article,id_user) values
                  ('$params->content',$params->id_article, $params->id_user)");
    
    class Result {}

    $res = new Result();
    $res->resultado = 'OK';
    $res->mensaje = 'datos grabados';
    echo json_encode($res);
    
  } else if ($_GET["recent_comment"] != "" and $_GET["older_comment"] != "" and $_GET["id_article"] != "") {
    ///Extraer los registros de la BD
    $idArticle = intval($_GET["id_article"]); //Referencia al articulo el cual se extraerán los comentarios
    $recentComment = intval($_GET["recent_comment"]); //referencia al registro mas reciente de la porción
    $olderComment = intval($_GET["older_comment"]); //referencia al registro mas antiguo de la porción
    $rowsToShow = 4; //Registros a mostrar por cada paginación (para el infinite scroll)
    //Construye la consulta SQL
    //$sql = "SELECT * FROM friyawa.comments WHERE (comments.id_article = $idArticle) AND ((comments.id_comment > $recentComment) OR (comments.id_comment < $olderComment)) ORDER BY comments.id_comment DESC LIMIT $rowsToShow ";
    $sql = "SELECT comments.id_comment, comments.content, comments.id_user, users.username
            FROM friyawa.comments, friyawa.users WHERE  (comments.id_user = users.id_user) AND ((comments.id_article = $idArticle) AND ((comments.id_comment > $recentComment) OR (comments.id_comment < $olderComment))) ORDER BY comments.id_comment DESC LIMIT $rowsToShow ";
    //Ejecuta la consulta SQL
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

}
  header('Content-Type: application/json');  
?>