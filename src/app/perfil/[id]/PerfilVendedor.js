export default function PerfilVendedor({ usuario }) {
  return (
    <div>
      <h1>Painel do vendedor {usuario.nome_completo}</h1>
      <p>Aqui ficam seus produtos, vendas, relatórios, etc.</p>
    </div>
  );
}