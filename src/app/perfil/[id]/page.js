import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../api/auth/[...nextauth]/route";
import db from "@/lib/db"; 
import ClienteView from "./ClienteView";
import { redirect } from "next/navigation";

export default async function PerfilPage({ params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/naoAutorizado");
  }

  const userId = String(session.user.id);
  const requestedId = String(id);

  if (userId !== requestedId) {
    redirect("/naoAutorizado");
  }

  const result = await db.query(
    "SELECT * FROM usuario WHERE id = $1",
    [requestedId]
  );

  if (result.rowCount === 0) {
    redirect("/naoAutorizado");
  }

  const usuario = result.rows[0];

if (!session.user.email_verificado) {
  redirect(`/verificar-email?usuario_id=${usuario.id}`);
}


return <ClienteView usuario={usuario} />; 
}
