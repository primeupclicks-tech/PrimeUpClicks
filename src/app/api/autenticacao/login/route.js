import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import bcrypt from 'bcrypt'

export async function POST(request) {
  try {
    const { email, senha } = await request.json()

    const result = await pool.query(
      'SELECT id, nome, senha, email_verificado FROM usuario WHERE email = $1',
      [email]
    )

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    if (!user.email_verificado) {
  return NextResponse.json(
    { error: 'Por favor, verifique seu email antes de fazer login' },
    { status: 403 }
  )
}

    return NextResponse.json(
      { id: user.id, nome: user.nome },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao logar consumidor:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
  