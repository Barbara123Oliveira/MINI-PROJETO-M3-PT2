class Produto {
  constructor(nome, preco, descricao) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
  }
}

const produtos = [];

function showSection(id) {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('apresentacao').classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
  if (id === 'apresentacao') renderCards();
}

function renderLista() {
  const lista = document.getElementById('listaProdutos');
  lista.innerHTML = '';
  produtos.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <strong>${p.nome}</strong><br/>
      R$ ${p.preco.toFixed(2)}<br/>
      <em>${p.descricao}</em><br/>
      <button class="btn" onclick="editar(${i})">Editar</button>
      <button class="btn" onclick="deletar(${i})">Deletar</button>
    `;
    lista.appendChild(div);
  });
}

function renderCards() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  produtos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p>Preço: R$ ${p.preco.toFixed(2)}</p>
      <p>${p.descricao}</p>
    `;
    cards.appendChild(div);
  });
}

function editar(index) {
  const p = produtos[index];
  document.getElementById('nome').value = p.nome;
  document.getElementById('preco').value = p.preco;
  document.getElementById('descricao').value = p.descricao;
  deletar(index);
}

function deletar(index) {
  produtos.splice(index, 1);
  renderLista();
}

document.getElementById('formCadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const descricao = document.getElementById('descricao').value;

  if (nome && !isNaN(preco)) {
    produtos.push(new Produto(nome, preco, descricao));
    this.reset();
    renderLista();
  }
});

showSection('dashboard');
