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

$usuario_curso_id = $_POST['usuario_curso_id'] ?? null;

if (!$usuario_curso_id) {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

try {
    $sql = "DELETE FROM usuarios_cursos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$usuario_curso_id]);

    echo json_encode(['success' => true, 'message' => 'Curso removido do seu perfil.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao remover curso.']);
}
