import React from 'react';

// Aviso intencional para demonstrar a diferenca entre CI=true e CI=false.
// Remova esta variavel ao finalizar o exercicio e restaure o build rigoroso.
const avisoDidatico = 'Esta variavel nao e utilizada';

export default function App() {
  return (
    <main>
      <h1>Variaveis de ambiente no CI/CD</h1>
      <p>O build de producao foi gerado com CI=false.</p>
      <p>Os avisos continuam no log e devem ser corrigidos pela equipe.</p>
    </main>
  );
}
