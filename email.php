<?php
/**
 * @file: email.php
 * @author: Michael J. Brovenko <webmikez@gmail.com>
 * @date: 30.09.14
 */

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $name = htmlspecialchars($_REQUEST['author'], ENT_QUOTES, 'UTF8');
    $email = htmlspecialchars($_REQUEST['email'], ENT_QUOTES, 'UTF8');
    $phone = htmlspecialchars($_REQUEST['phone'], ENT_QUOTES, 'UTF8');
    $comment = htmlspecialchars($_REQUEST['comment'], ENT_QUOTES, 'UTF8');

    header('Content-type: application/json');
    $rc = array("status" => "success");
    echo json_encode($rc);

}
