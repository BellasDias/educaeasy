<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'conexao.php';

$usuario_id = $_POST['usuario_id'] ?? null;
$curso_id   = $_POST['curso_id'] ?? null;

if (!$usuario_id || !$curso_id) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

try {
    $sql = "INSERT INTO usuarios_cursos (usuario_id, curso_id, status)
            VALUES (?, ?, 'iniciado')
            ON DUPLICATE KEY UPDATE status = 'iniciado'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$usuario_id, $curso_id]);

    echo json_encode(['success' => true, 'message' => 'Curso adicionado à sua lista!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar curso.']);
}
