const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');

// Inserir paciente
router.post('/add', async (req, res) => {
  try {
    const {CPF, nome, idade, dataConsulta, horaConsulta } = req.body;
    await Paciente.create({CPF, nome, idade, dataConsulta, horaConsulta });
    res.redirect('/');
  } catch (error) {
    res.status(400).send('Erro ao inserir paciente');
  }
});

// Listar pacientes
router.get('/', async (req, res) => {
  try {
    const paciente = await Paciente.findAll();
    res.render('index', { paciente });
  } catch (error) {
    res.status(400).send('Erro ao listar pacientes');
  }
});

// Apagar paciente
router.post('/delete', async (req, res) => {
  try {
    const {CPF} = req.body;
    await Paciente.destroy({ where: { CPF } });
    res.redirect('/');
  } catch (error) {
    res.status(400).send('Erro ao apagar paciente');
  }
});

// Rota para atualizar paciente
router.post('/update', async (req, res) => {
  const { CPF, nome, idade, dataConsulta, horaConsulta} = req.body;

  try {
    // Encontrar paciente pelo CPF
    const paciente = await Paciente.findOne({ where: { CPF } });

    if (!paciente) {
      return res.status(404).send('Paciente não encontrado');
    }

    // Atualizar campos com base no que foi fornecido
    if (nome) paciente.nome = nome;
    if (idade) paciente.idade = idade;
    if (dataConsulta) paciente.dataConsulta = dataConsulta;
    if (horaConsulta) paciente.horaConsulta = horaConsulta;

    await paciente.save();
    res.send('Paciente atualizado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar paciente');
  }
});


module.exports = router;

