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
router.get("/somatorio", async function (req, res) {
  const { inicio, fim } = req.query;

});

/*
Testes:
http://localhost:3003/operacoes/fatorial
http://localhost:3003/operacoes/fatorial?numero=a
http://localhost:3003/operacoes/fatorial?numero=-5
http://localhost:3003/operacoes/fatorial?numero=5
*/
// Rota para calcular o fatorial
router.get("/fatorial", async function (req, res) {
  const { numero } = req.query;

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
router.get("/media", async function (req, res) {
  const { numeros } = req.query;

});

/*
http://localhost:3003/operacoes/primo
http://localhost:3003/operacoes/primo?numero=a
http://localhost:3003/operacoes/primo?numero=1
http://localhost:3003/operacoes/primo?numero=2
http://localhost:3003/operacoes/primo?numero=9
 */
router.get("/primo", async function (req, res) {
  const { numero } = req.query;

});

// Exporta o router para ser usado no servidor principal
module.exports = router;
