const router = require("express").Router();

/*
Testes:
http://localhost:3003/operacoes/somatorio
http://localhost:3003/operacoes/somatorio?inicio=a
http://localhost:3003/operacoes/somatorio?inicio=a&fim=b
http://localhost:3003/operacoes/somatorio?inicio=10&fim=b
http://localhost:3003/operacoes/somatorio?inicio=10&fim=1
http://localhost:3003/operacoes/somatorio?inicio=1&fim=10
*/
// Rota para calcular o somatório
router.get("/somatorio", (req, res) => {
  const { inicio, fim } = req.query;


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


  let soma = 0;
  for (let i = numInicio; i <= numFim; i++) {
    soma += i;
  }

  return res.json({ resultado: soma });
});

/*
Testes:
http://localhost:3003/operacoes/fatorial
http://localhost:3003/operacoes/fatorial?numero=a
http://localhost:3003/operacoes/fatorial?numero=-5
http://localhost:3003/operacoes/fatorial?numero=5
*/
// Rota para calcular o fatorial
router.get("/fatorial", (req, res) => {
  const { numero } = req.query;


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


  let fatorial = 1;
  for (let i = 2; i <= num; i++) {
    fatorial *= i;
  }

  return res.json({ resultado: fatorial });
});

/*
http://localhost:3003/operacoes/media
http://localhost:3003/operacoes/media?numeros=a,b,c
http://localhost:3003/operacoes/media?numeros=1;2;3
http://localhost:3003/operacoes/media?numeros=1,x,3
http://localhost:3003/operacoes/media?numeros=4.32
http://localhost:3003/operacoes/media?numeros=1,2.9,3
 */
// Rota para calcular a média
router.get("/media", (req, res) => {
  const { numeros } = req.query;

 
  if (numeros === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'numeros' é obrigatório" });
  }


  const regex = /^[0-9.,\s]+$/;
  if (!regex.test(numeros) || numeros.includes(';')) {
      return res.status(400).json({ erro: "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }
  
  const numerosArray = numeros.split(',').map(num => parseFloat(num.trim()));

  if (numerosArray.some(isNaN)) {
    return res.status(400).json({ erro: "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }

  const soma = numerosArray.reduce((acc, curr) => acc + curr, 0);
  const media = soma / numerosArray.length;

  return res.json({ resultado: media });
});

/*
http://localhost:3003/operacoes/primo
http://localhost:3003/operacoes/primo?numero=a
http://localhost:3003/operacoes/primo?numero=1
http://localhost:3003/operacoes/primo?numero=2
http://localhost:3003/operacoes/primo?numero=9
 */
router.get("/primo", (req, res) => {
  const { numero } = req.query;

  // Validações de entrada
  if (numero === undefined) {
    return res.status(400).json({ erro: "Parâmetro 'numero' é obrigatório" });
  }


  const num = Number(numero);

  if (isNaN(num) || !Number.isInteger(num)) {
    return res.status(400).json({ erro: "Informe um número inteiro" });
  }
  if (num < 2) {
    return res.status(400).json({ erro: "Informe um número inteiro igual ou maior que 2" });
  }


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