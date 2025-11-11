const express = require('express');
const router = express.Router();
let professores = require('../data/professoresdata.js');

// 1️⃣ Listar todos os professores
router.get('/', (req, res) => {
  res.json(professores);
});

// 2️⃣ Buscar um professor por ID
router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  if (!professor) {
    return res.status(404).json({ mensagem: 'Id não existente' });
  }
  res.json(professor);
});

// 3️⃣ Listar todas as turmas de um professor
router.get('/:id/turmas', (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  if (!professor) {
    return res.status(404).json({ mensagem: 'Id não existente' });
  }
  res.json(professor.turmas);
});

// 4️⃣ Atualizar dados de um professor
router.put('/:id', (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Id não existente' });
  }

  const { nome, idade, departamento } = req.body;
  if (nome) professores[index].nome = nome;
  if (idade) professores[index].idade = idade;
  if (departamento) professores[index].departamento = departamento;

  res.json({ mensagem: 'Professor atualizado com sucesso!', professor: professores[index] });
});

// 5️⃣ Adicionar uma turma para um professor
router.post('/:id/turmas', (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  if (!professor) {
    return res.status(404).json({ mensagem: 'Id não existente' });
  }

  const { codigo, disciplina, alunos } = req.body;
  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas.push(novaTurma);

  res.json({ mensagem: 'Turma adicionada com sucesso!', professor });
});

// 6️⃣ Listar professores por departamento
router.get('/departamento/:departamento', (req, res) => {
  const depto = req.params.departamento.toLowerCase();
  const resultado = professores.filter(p => p.departamento.toLowerCase() === depto);

  if (resultado.length === 0) {
    return res.status(404).json({ mensagem: 'Nenhum professor encontrado nesse departamento.' });
  }
  res.json(resultado);
});

// 7️⃣ Remover um professor
router.delete('/:id', (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Id não existente' });
  }

  professores.splice(index, 1);
  res.json({ mensagem: 'Professor removido com sucesso!' });
});

module.exports = router;
