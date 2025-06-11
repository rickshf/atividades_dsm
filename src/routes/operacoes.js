const router = require("express").Router();

/**
 * Rota para calcular o somatório dos números em um intervalo.
 * @route GET /operacoes/somatorio
 * @param {number} inicio - O início do intervalo.
 * @param {number} fim - O fim do intervalo.
 * @returns {object} - JSON com o resultado ou uma mensagem de erro.
 */
router.get("/somatorio", (req, res) => {
  const { inicio, fim } = req.query;

  // Validações de entrada
  if (inicio === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'inicio' é obrigatório" });
  }
  if (fim === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'fim' é obrigatório" });
  }

  const numInicio = Number(inicio);
  const numFim = Number(fim);

  if (isNaN(numInicio)) {
    return res.status(400).json({ erro: "Parâmetro 'inicio' precisa ser um número" });
  }
  if (isNaN(numFim)) {
    return res.status(400).json({ erro: "Parâmetro 'fim' precisa ser um número" });
  }
  if (numInicio > numFim) {
    return res.status(400).json({ erro: "O valor de 'inicio' não pode ser maior que 'fim'" });
  }

  // Cálculo do somatório
  let soma = 0;
  for (let i = numInicio; i <= numFim; i++) {
    soma += i;
  }

  return res.json({ resultado: soma });
});

/**
 * Rota para calcular o fatorial de um número.
 * @route GET /operacoes/fatorial
 * @param {number} numero - O número para calcular o fatorial.
 * @returns {object} - JSON com o resultado ou uma mensagem de erro.
 */
router.get("/fatorial", (req, res) => {
  const { numero } = req.query;

  // Validações de entrada
  if (numero === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'numero' é obrigatório" });
  }

  const num = Number(numero);

  if (isNaN(num)) {
    return res.status(400).json({ erro: "Parâmetro 'numero' precisa ser um número" });
  }
  if (num < 0) {
    return res.status(400).json({ erro: "O valor de 'numero' não pode ser negativo" });
  }

  // Cálculo do fatorial
  let fatorial = 1;
  for (let i = 2; i <= num; i++) {
    fatorial *= i;
  }

  return res.json({ resultado: fatorial });
});

/**
 * Rota para calcular a média de uma lista de números.
 * @route GET /operacoes/media
 * @param {string} numeros - String com números separados por vírgula.
 * @returns {object} - JSON com o resultado ou uma mensagem de erro.
 */
router.get("/media", (req, res) => {
  const { numeros } = req.query;

  // Validações de entrada
  if (numeros === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'numeros' é obrigatório" });
  }

  // Regex para validar se a string contém apenas números (incluindo decimais) e vírgulas.
  // Garante que não há outros caracteres como ';', 'x', etc.
  const regex = /^[0-9.,\s]+$/;
  if (!regex.test(numeros) || numeros.includes(';')) {
      return res.status(400).json({ erro: "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }
  
  const numerosArray = numeros.split(',').map(num => parseFloat(num.trim()));

  if (numerosArray.some(isNaN)) {
    return res.status(400).json({ erro: "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }

  // Cálculo da média
  const soma = numerosArray.reduce((acc, curr) => acc + curr, 0);
  const media = soma / numerosArray.length;

  return res.json({ resultado: media });
});

/**
 * Rota para verificar se um número é primo.
 * @route GET /operacoes/primo
 * @param {number} numero - O número para verificar.
 * @returns {object} - JSON com o resultado (true/false) ou uma mensagem de erro.
 */
router.get("/primo", (req, res) => {
  const { numero } = req.query;

  // Validações de entrada
  if (numero === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'numero' é obrigatório" });
  }

  // A validação Number.isInteger não funciona bem com strings, então convertemos primeiro.
  const num = Number(numero);

  if (isNaN(num) || !Number.isInteger(num)) {
    return res.status(400).json({ erro: "Informe um número inteiro" });
  }
  if (num < 2) {
    return res.status(400).json({ erro: "Informe um número inteiro igual ou maior que 2" });
  }

  // Lógica para verificar se é primo
  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  return res.json({ resultado: isPrime });
});

// Exporta o router para ser usado no servidor principal
module.exports = router;