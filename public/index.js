async function fazerRequisicao(url, resultadoElementId) {
  const elementoResultado = document.getElementById(resultadoElementId);
  

  elementoResultado.classList.remove('ok', 'erro');

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
     
      elementoResultado.innerHTML = `<strong>Resultado:</strong> ${data.resultado}`;
      elementoResultado.classList.add('ok'); 
    } else {
     
      elementoResultado.innerHTML = `<strong>Erro:</strong> ${data.erro}`;
      elementoResultado.classList.add('erro'); 
    }
  } catch (error) {
    
    elementoResultado.innerHTML = '<strong>Erro:</strong> Falha na comunicação com o servidor.';
    elementoResultado.classList.add('erro');
  }
}

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