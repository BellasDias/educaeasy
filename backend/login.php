<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    $sql = "SELECT id, nome, email, senha FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($senha, $usuario['senha'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Login realizado!',
            'id'      => $usuario['id'],
            'nome'    => $usuario['nome'],
            'email'   => $usuario['email']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Email ou senha inválidos.'
        ]);
    }

} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método inválido.'
    ]);
}
