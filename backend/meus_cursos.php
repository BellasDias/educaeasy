<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

include 'conexao.php';

$usuario_id = $_GET['usuario_id'] ?? null;

if (!$usuario_id) {
    echo json_encode([]);
    exit;
}

/*
  Supondo tabelas:

  cursos: id, slug, titulo, descricao, habilidades, ...
  usuarios_cursos: id, usuario_id, curso_id, status, progresso (0–100)

  Se ainda não tiver a coluna progresso, você pode criar:
  ALTER TABLE usuarios_cursos ADD COLUMN progresso TINYINT DEFAULT 0;
*/

$sql = "SELECT 
          c.id,
          c.slug,
          c.titulo,
          c.descricao,
          c.habilidades,
          uc.progresso
        FROM usuarios_cursos uc
        INNER JOIN cursos c ON c.id = uc.curso_id
        WHERE uc.usuario_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$usuario_id]);
$cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ajusta campos para o formato esperado pelo front
foreach ($cursos as &$curso) {
    $curso['descricao_curta'] = mb_strimwidth($curso['descricao'], 0, 90, '...');
    $curso['habilidades'] = $curso['habilidades']
        ? explode(',', $curso['habilidades'])
        : [];
    $curso['progresso'] = isset($curso['progresso']) ? (int)$curso['progresso'] : 0;
}

echo json_encode($cursos);
