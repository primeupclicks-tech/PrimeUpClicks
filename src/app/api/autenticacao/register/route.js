import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { nome_completo, email, senha } = await req.json()

    // Validações
    if (!nome_completo || !email || !senha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (senha.length < 8) {
      return NextResponse.json(
        { error: 'A senha deve ter no mínimo 8 caracteres' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const emailCheck = await pool.query(
      'SELECT id FROM usuario WHERE email = $1',
      [email]
    )

    if (emailCheck.rowCount > 0) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hash = await bcrypt.hash(senha, 12)

    // Inserir usuário (email NÃO verificado inicialmente)
    const result = await pool.query(
      `INSERT INTO usuario (nome_completo, email, senha, email_verificado) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome_completo, email, email_verificado`,
      [nome_completo, email, hash, false]
    )

    const usuario = result.rows[0]

    const codigo = Math.floor(100000 + Math.random() * 900000).toString()
    const expira_em = new Date(Date.now() + 1000 * 60 * 15) 

      await pool.query(
          'DELETE FROM email_verificacoes WHERE usuario_id = $1',
          [usuario.id]
        )
    
        await pool.query(
          `INSERT INTO email_verificacoes (usuario_id, codigo, expira_em) 
           VALUES ($1, $2, $3)`,
          [usuario.id, codigo, expira_em]
        )

    // Enviar email com código
    const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verificar-email?usuario_id=${usuario.id}`

await resend.emails.send({
  from: 'PrimeUp <onboarding@resend.dev>',
  to: email,
  subject: 'Verifique seu email - PrimeUp Clicks',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00315f;">Bem-vindo ao PrimeUp Clicks, ${nome_completo}!</h2>

      <p>Seu cadastro foi realizado com sucesso.</p>
      <p>Para ativar sua conta, insira o código abaixo:</p>

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

      <h3>👉 ou clicar no link abaixo para abrir a página de verificação:</h3>

      <a href="${verificationUrl}"
        style="display:inline-block;padding:12px 18px;
        background:#0055b1;color:#fff;border-radius:8px;
        text-decoration:none;font-weight:700">
        Verificar email
      </a>

      <p style="margin-top:10px">${verificationUrl}</p>

      <p><strong>Este código expira em 15 minutos.</strong></p>
      <p>Se você não se cadastrou, ignore este email.</p>

      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
      <p style="color:#666;font-size:12px;">
        PrimeUp Clicks &copy; ${new Date().getFullYear()}
      </p>
    </div>
  `,
})


    return NextResponse.json({ 
      success: true,
      message: 'Cadastro realizado! Verifique seu email.',
      usuario_id: usuario.id,
      precisa_verificar: true
    })

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro ao realizar cadastro' },
      { status: 500 }
    )
  }
}