import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
     const { nome_completo, email, senha } = await request.json();

    const usuario = await pool.connect();

    const existe = await usuario.query(
      "SELECT id FROM usuario WHERE email = $1",
      [email]
    );
    if (existe.rowCount > 0) {
      usuario.release();
      return NextResponse.json({ error: "email já cadastrado" }, { status: 409 });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const result = await usuario.query(
      "INSERT INTO usuario (nome_completo, email, senha) VALUES ($1, $2, $3) RETURNING id",
      [nome_completo, email, senhaHash]
    );

    usuario.release();

    const id = result.rows[0].id;

    return NextResponse.json({ id }, { status: 201 });

  } catch (error) {
    console.error("Erro ao adicionar usuario:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}