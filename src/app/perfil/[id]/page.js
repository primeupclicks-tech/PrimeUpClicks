import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../api/auth/[...nextauth]/route";
import db from "@/lib/db"; 
import PerfilComprador from "./PerfilComprador";
import PerfilVendedor from "./PerfilVendedor"; 
import { redirect } from "next/navigation";

export default async function PerfilPage({ params }) {
  // IMPORTANTE: params é uma Promise, então use await
  const { id } = await params; // Desempacote a Promise
  
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/naoAutorizado"); 
  }

  const userId = session.user.id.toString();
  const requestedId = id.toString(); // Agora use 'id' diretamente

  if (userId !== requestedId) {
    redirect("/naoAutorizado"); 
  }

  try {
    const result = await db.query("SELECT * FROM usuario WHERE id = $1", [requestedId]);
    
    if (result.rowCount === 0) {
      return <h1>Usuário não encontrado</h1>;
    }

    const usuario = result.rows[0];

    if (usuario.tipo_usuario === "comprador") {
      return <PerfilComprador usuario={usuario} />;
    }

    if (usuario.tipo_usuario === "vendedor") {
      return <PerfilVendedor usuario={usuario} />;
    }

    return <h1>Tipo de usuário inválido</h1>;
    
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return <h1>Erro ao carregar perfil</h1>;
  }
}