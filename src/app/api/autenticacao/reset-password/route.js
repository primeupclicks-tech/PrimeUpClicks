import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token e senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'A senha deve ter no mínimo 8 caracteres' },
        { status: 400 }
      )
    }

    const tokenResult = await pool.query(
      `SELECT user_id, expires FROM password_resets WHERE token = $1`,
      [token]
    )

    if (tokenResult.rowCount === 0) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      )
    }

    const record = tokenResult.rows[0]

    if (new Date(record.expires) < new Date()) {
      await pool.query('DELETE FROM password_resets WHERE token = $1', [token])
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 400 }
      )
    }

    const userResult = await pool.query(
      'SELECT id FROM usuario WHERE id = $1',
      [record.user_id]
    )

    if (userResult.rowCount === 0) {
      await pool.query('DELETE FROM password_resets WHERE token = $1', [token])
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 400 }
      )
    }

    const hash = await bcrypt.hash(password, 12)

    await pool.query(
      'UPDATE usuario SET senha = $1 WHERE id = $2',
      [hash, record.user_id]
    )
    await pool.query('DELETE FROM password_resets WHERE user_id = $1', [record.user_id])

    return NextResponse.json({ 
      success: true,
      message: 'Senha redefinida com sucesso' 
    })

  } catch (error) {
    console.error('Erro no reset-password:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}