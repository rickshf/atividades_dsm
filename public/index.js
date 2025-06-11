/**
 * Função genérica para fazer a requisição à API e exibir o resultado.
 * @param {string} url - A URL do endpoint da API.
 * @param {string} resultadoElementId - O ID do elemento HTML onde o resultado será exibido.
 */
async function fazerRequisicao(url, resultadoElementId) {
  const elementoResultado = document.getElementById(resultadoElementId);
  
  // Limpa as classes de estilo da requisição anterior
  elementoResultado.classList.remove('ok', 'erro');

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Se a resposta for bem-sucedida, exibe o resultado e adiciona a classe .ok
      elementoResultado.innerHTML = `<strong>Resultado:</strong> ${data.resultado}`;
      elementoResultado.classList.add('ok'); // <-- MUDANÇA AQUI
    } else {
      // Se a resposta indicar um erro, exibe o erro e adiciona a classe .erro
      elementoResultado.innerHTML = `<strong>Erro:</strong> ${data.erro}`;
      elementoResultado.classList.add('erro'); // <-- MUDANÇA AQUI
    }
  } catch (error) {
    // Em caso de erro de rede, exibe a falha e adiciona a classe .erro
    elementoResultado.innerHTML = '<strong>Erro:</strong> Falha na comunicação com o servidor.';
    elementoResultado.classList.add('erro');
  }
}

// As outras funções (calcularSomatorio, calcularMedia, etc.) não precisam ser alteradas.
// Elas continuarão funcionando normalmente com a nova versão da fazerRequisicao.

async function calcularSomatorio() {
  const inicio = document.getElementById('somatorioInicio').value;
  const fim = document.getElementById('somatorioFim').value;
  const url = `/operacoes/somatorio?inicio=${inicio}&fim=${fim}`;
  await fazerRequisicao(url, 'somatorioResultado');
}

async function calcularMedia() {
  const numeros = document.getElementById('mediaInput').value;
  const url = `/operacoes/media?numeros=${encodeURIComponent(numeros)}`;
  await fazerRequisicao(url, 'mediaResultado');
}

async function calcularFatorial() {
  const numero = document.getElementById('fatorialInput').value;
  const url = `/operacoes/fatorial?numero=${numero}`;
  await fazerRequisicao(url, 'fatorialResultado');
}

async function calcularPrimo() {
  const numero = document.getElementById('primoInput').value;
  const url = `/operacoes/primo?numero=${numero}`;
  await fazerRequisicao(url, 'primoResultado');
}