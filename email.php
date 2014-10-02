<?php
/**
 * @file: email.php
 * @author: Michael J. Brovenko <webmikez@gmail.com>
 * @date: 30.09.14
 */

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $rc = array();
    $hasError = false;

    if(!empty($_REQUEST['name'])) {
        die();
    }

    header('Content-type: application/json');

    $author = htmlspecialchars($_REQUEST['author'], ENT_QUOTES, 'UTF8');
    $email = htmlspecialchars($_REQUEST['email'], ENT_QUOTES, 'UTF8');
    $phone = htmlspecialchars($_REQUEST['phone'], ENT_QUOTES, 'UTF8');
    $comment = htmlspecialchars($_REQUEST['comment'], ENT_QUOTES, 'UTF8');

    if(empty($author)) {
        $hasError = true;
        $rc['author'] = 'Вы должны заполнить поле Имя';
    }
    if(empty($email)) {
        $hasError = true;
        $rc['email'] = 'Вы должны заполнить поле Email';
    }
    if(empty($comment) || $comment == ' ') {
        $hasError = true;
        $rc['comment'] = 'Вы должны заполнить поле Сообщение';
    }
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $hasError = true;
        $rc['email'] = 'Вы ввели некорректный email';
    }


    if(!$hasError) {
        $to = 'webmikez@gmail.com';
        $subject = 'Новая заявка на сайте ALS';
        $message = "Имя: {$author} \n Email: {$email} \n Телефон: {$phone} \n Комментарий: {$comment}";
        $headers = 'From: ' . $email . "\r\n";

        if (!mail($to, $subject, $message, $headers)) {
            $hasError = true;
            $rc["error"] = 'Произошла ошибка, попробуйте повторить позже';
        }
    }

    if(!$hasError) {
        $rc = array("status" => "success", "success" => 'Спасибо, ваше сообщение успешно отправлено.<br>Мы свяжемся с вами в ближайшее время.');
    }
    echo json_encode($rc);
}
