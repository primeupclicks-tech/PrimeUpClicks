import { NextResponse } from 'next/server'
import pool from "@/lib/db"
import { randomBytes } from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { email } = await req.json()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Formato de email inválido' },
      { status: 400 }
    )
  }

  const userResult = await pool.query(
    'SELECT id, email FROM usuario WHERE email = $1',
    [email]
  )
  if (userResult.rowCount === 0) {
    console.log(`Tentativa de reset para email não cadastrado: ${email}`);
    return NextResponse.json({ 
      message: 'Se o email estiver cadastrado, você receberá um link de recuperação' 
    })
  }

  const user = userResult.rows[0]
  const existingToken = await pool.query(
    'SELECT * FROM password_resets WHERE user_id = $1 AND expires > NOW()',
    [user.id]
  )

  if (existingToken.rowCount > 0) {
    return NextResponse.json({ 
      message: 'Um link de recuperação já foi enviado recentemente. Verifique seu email.' 
    })
  }

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 1000 * 60 * 15) 
  
  await pool.query(
    `INSERT INTO password_resets (user_id, token, expires) VALUES ($1, $2, $3)`,
    [user.id, token, expires]
  )

  const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`

  try {
    await resend.emails.send({
      from: 'PrimeUp <onboarding@resend.dev>',
      to: user.email, 
      subject: 'Redefinir senha',
      html: `
        <h2>Redefinição de senha</h2>
        <p>Você solicitou a redefinição de senha.</p>
        <a href="${resetLink}">Clique aqui para redefinir sua senha</a>
        <p>Esse link expira em 15 minutos.</p>
        <p>Se você não solicitou isso, ignore este email.</p>
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar email de recuperação' },
      { status: 500 }
    )
  }

  return NextResponse.json({ 
    message: 'Se o email estiver cadastrado, você receberá um link de recuperação' 
  })
}

