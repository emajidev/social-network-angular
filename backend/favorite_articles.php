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

    mysqli_query($conn,"insert into favorite_articles(id_article, id_user) values
                  ('$params->id_article',$params->id_user)");
    
    class Result {}

    $res = new Result();
    $res->resultado = 'OK';
    echo json_encode($res);
    
  } else if ($_SERVER["REQUEST_METHOD"] == "GET"){
    ///Extraer los registros de la BD
    $idUser = intval($_GET["id_user"]);
    //Comprueba si se desea extraer toda la información relacioanda a los articulos fasvoritos del usuario 
    if ($_GET["all_articles"] == "yes") {
       //Construye la consulta SQL
    $sql = "SELECT favorite_articles.id_article, articles.title, articles.size, articles.details, articles.description, articles.hashtags, favorite_articles.id_user, articles.number_article, articles.likes
            FROM   friyawa.favorite_articles, friyawa.articles 
            WHERE  favorite_articles.id_article = articles.id_article
            AND (favorite_articles.id_user = $idUser) ORDER BY favorite_articles.id_article DESC ";  
    } else {
        //Construye la consulta SQL
        $sql = "SELECT * FROM friyawa.favorite_articles WHERE (favorite_articles.id_user = $idUser) ORDER BY favorite_articles.id_article DESC ";
    }
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
    $sql = "DELETE FROM favorite_articles WHERE (favorite_articles.id_user = $idUser AND favorite_articles.id_article = $idArticle)";
    mysqli_query($conn, $sql);
    class Result {}
    $res = new Result();
    $res->resultado = 'OK';
    echo json_encode($res);
}
  header('Content-Type: application/json');  
?>