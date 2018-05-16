<?php
	//conectamos Con el servidor
	$conectar=@mysql_connect('localhost','root','');
	//verificamos la conexion
	if(!$conectar){
		echo"No Se Pudo Conectar Con El Servidor";
	}else{

		$base=mysql_select_db('milugar');
		if(!$base){
			echo"No Se Encontro La Base De Datos";
		}
	}
	//recuperar las variables
	$nombre=$_POST['contact-name'];
	$correo=$_POST['contact-email'];
	$mensaje=$_POST['contact-message'];
	//hacemos la sentencia de sql
	$sql="INSERT INTO contactos VALUES('$nombre',
								   '$email',
								   '$mensaje')";
	//ejecutamos la sentencia de sql
	$ejecutar=mysql_query($sql);
	//verificamos la ejecucion
	if(!$ejecutar){
		echo"Hubo Algun Error";
	}else{
		echo"Datos Guardados Correctamente<br><a data-href='#page-index'>Volver</a>";
	}
?>
