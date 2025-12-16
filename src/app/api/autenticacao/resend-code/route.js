import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { usuario_id } = await req.json()

    if (!usuario_id) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar usuário
    const userResult = await pool.query(
      'SELECT id, nome_completo, email FROM usuario WHERE id = $1',
      [usuario_id]
    )

    if (userResult.rowCount === 0) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 400 }
      )
    }

    const usuario = userResult.rows[0]

    // Gerar novo código
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()
    const expira_em = new Date(Date.now() + 1000 * 60 * 15) 

    // Inserir novo código (limpar anteriores)
    await pool.query(
      'DELETE FROM email_verificacoes WHERE usuario_id = $1',
      [usuario_id]
    )

    await pool.query(
      `INSERT INTO email_verificacoes (usuario_id, codigo, expira_em) 
       VALUES ($1, $2, $3)`,
      [usuario_id, codigo, expira_em]
    )

    // Enviar email
    await resend.emails.send({
      from: 'PrimeUp <onboarding@resend.dev>',
      to: usuario.email,
      subject: 'Novo código de verificação - PrimeUp Clicks',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00315f;">Novo código de verificação</h2>
          <p>Olá, ${usuario.nome_completo}!</p>
          <p>Use o código abaixo para verificar sua conta:</p>
          
          <div style="
            background: linear-gradient(135deg, #00315fff 0%, #0055b1ff 100%);
            color: white;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 10px;
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
            font-family: monospace;
          ">
            ${codigo}
          </div>
          
          <p><strong>Este código expira em 15 minutos.</strong></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            PrimeUp Clicks &copy; ${new Date().getFullYear()}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true,
      message: 'Novo código enviado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao reenviar código:', error)
    return NextResponse.json(
      { error: 'Erro ao reenviar código' },
      { status: 500 }
    )
  }
}