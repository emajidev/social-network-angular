<?php 
  header('Access-Control-Allow-Origin: *'); 
  header('Access-Control-Allow-Methods: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
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

  $conn = conecta_bd();

  //Verifica si se está haciendo una solicitud via POST (enviar comentario) o vía GET (solicitar comentarios)

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Guardar un nuevo registro en la tabla comments
    $json = file_get_contents('php://input');
 
    $params = json_decode($json);

    mysqli_query($conn,"insert into liked_articles(id_article, id_user) values
                  ('$params->id_article',$params->id_user)");
    
    class Result {}

    $res = new Result();
    //Devulve el numero actual de likes para el articulo en cuestion
    $reglikes = mysqli_query($conn, "SELECT Count(*) AS total_likes FROM liked_articles WHERE id_article = $params->id_article");
    $rowLikes = $reglikes->fetch_array(MYSQLI_ASSOC);
    $likes = $rowLikes['total_likes']; 
    //Actualiza el campo likes del articulo en cuestión en la tabla articles
    mysqli_query($conn,"UPDATE articles SET likes = $likes WHERE id_article = $params->id_article");
    $res->resultado = 'OK';
    $res->mensaje = $likes;
    echo json_encode($res);
    
  } else if ($_SERVER["REQUEST_METHOD"] == "GET"){
    ///Extraer los registros de la BD
    $idUser = intval($_GET["id_user"]);
    //Construye la consulta SQL
    $sql = "SELECT * FROM friyawa.liked_articles WHERE (liked_articles.id_user = $idUser) ORDER BY liked_articles.id_article DESC ";
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

//ELimina un articulo de la lista de favoritos del usuario
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $idUser = $_REQUEST["id_user"];
    $idArticle = $_REQUEST["id_article"];
    $sql = "DELETE FROM liked_articles WHERE (liked_articles.id_user = $idUser AND liked_articles.id_article = $idArticle)";
    mysqli_query($conn, $sql);
    //Devuelve el numero actual de likes para el articulo en cuestion
    $reglikes = mysqli_query($conn, "SELECT Count(*) AS total_likes FROM liked_articles WHERE id_article = $idArticle");
    $rowLikes = $reglikes->fetch_array(MYSQLI_ASSOC);
    $likes = $rowLikes['total_likes']; 
    //Actualiza el campo likes del articulo en cuestión en la tabla articles
    mysqli_query($conn,"UPDATE articles SET likes = $likes WHERE id_article = $idArticle");
    //Devuelve una respuesta con el numero actual de likes del articulo en cuestion
    class Result {}
    $res = new Result();
    $res->resultado = 'OK';
    $res->mensaje = $likes;
    echo json_encode($res);
}
  header('Content-Type: application/json');  
?>