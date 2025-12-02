<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include 'conexao.php';

$slug = $_GET['slug'] ?? '';

$sql = "SELECT id, slug, titulo, descricao, duracao, nivel, habilidades
        FROM cursos
        WHERE slug = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$slug]);
$curso = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$curso) {
    echo json_encode(['success' => false, 'message' => 'Curso não encontrado']);
    exit;
}

$curso['habilidades'] = $curso['habilidades']
    ? explode(',', $curso['habilidades'])
    : [];

echo json_encode(['success' => true, 'curso' => $curso]);
