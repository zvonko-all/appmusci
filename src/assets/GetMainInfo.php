<?php
header("Access-Control-Allow-Origin:*");
$handle ="http://www.guozipeng.tk/AppMusic/Json/Main.json";
print_r(file_get_contents($handle));

?>