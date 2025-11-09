// ======== LOGIN SIMPLES ========
function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  if (user === 'admin' && pass === '1234') {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    carregarDados();
  } else {
    alert('Usuário ou senha inválidos! (use admin / 1234)');
  }
}

function logout() {
  document.getElementById('main-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');
}

// ======== CLIENTES ========
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

function addCliente() {
  const nome = document.getElementById('nomeCliente').value;
  const telefone = document.getElementById('telefoneCliente').value;
  if (!nome) return alert('Informe o nome do cliente!');
  clientes.push({ nome, telefone });
  localStorage.setItem('clientes', JSON.stringify(clientes));
  atualizarListas();
}

function addProduto() {
  const nome = document.getElementById('nomeProduto').value;
  const qtd = parseInt(document.getElementById('quantidadeProduto').value);
  const preco = parseFloat(document.getElementById('precoProduto').value);
  if (!nome || !qtd || !preco) return alert('Preencha todos os campos!');
  estoque.push({ nome, qtd, preco });
  localStorage.setItem('estoque', JSON.stringify(estoque));
  atualizarListas();
}

function fazerVenda() {
  const cliente = document.getElementById('clienteVenda').value;
  const produto = document.getElementById('produtoVenda').value;
  const qtdVenda = parseInt(document.getElementById('qtdVenda').value);
  const item = estoque.find(p => p.nome === produto);
  if (!item || item.qtd < qtdVenda) return alert('Estoque insuficiente!');
  item.qtd -= qtdVenda;
  const total = item.preco * qtdVenda;
  vendas.push({ cliente, produto, qtdVenda, total });
  localStorage.setItem('estoque', JSON.stringify(estoque));
  localStorage.setItem('vendas', JSON.stringify(vendas));
  atualizarListas();
  alert(`Venda realizada: R$ ${total.toFixed(2)}`);
}

function showSection(sec) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sec).classList.add('active');
}

function atualizarListas() {
  // Clientes
  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = clientes.map(c => `<li>${c.nome} - ${c.telefone}</li>`).join('');
  
  // Estoque
  const listaEstoque = document.getElementById('listaEstoque');
  listaEstoque.innerHTML = estoque.map(p => `<li>${p.nome} - ${p.qtd} unid - R$ ${p.preco.toFixed(2)}</li>`).join('');
  
  // Vendas
  const listaVendas = document.getElementById('listaVendas');
  listaVendas.innerHTML = vendas.map(v => `<li>${v.cliente} comprou ${v.qtdVenda}x ${v.produto} (R$ ${v.total.toFixed(2)})</li>`).join('');
  
  // Combos
  const clienteVenda = document.getElementById('clienteVenda');
  const produtoVenda = document.getElementById('produtoVenda');
  clienteVenda.innerHTML = clientes.map(c => `<option>${c.nome}</option>`).join('');
  produtoVenda.innerHTML = estoque.map(p => `<option>${p.nome}</option>`).join('');
}

function carregarDados() {
  atualizarListas();
}
