import { NextResponse } from 'next/server'
import pool from "@/lib/db"

export async function POST(req) {
  try {
    const { usuario_id, codigo } = await req.json()

    if (!usuario_id || !codigo) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    // Buscar código salvo
    const result = await pool.query(
      `SELECT *
FROM email_verificacoes
WHERE usuario_id = $1
ORDER BY criado_em DESC
LIMIT 1`,
      [usuario_id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Código não encontrado ou expirado' },
        { status: 400 }
      )
    }

const verificacao = result.rows[0];

const codigoBanco = String(verificacao.codigo).trim();
const codigoInput = String(codigo).trim();

// 🔒 Muitas tentativas
if (verificacao.tentativas >= 3) {
  await pool.query(
    'DELETE FROM email_verificacoes WHERE usuario_id = $1',
    [usuario_id]
  );

  return NextResponse.json(
    { error: 'Muitas tentativas. Solicite um novo código.' },
    { status: 400 }
  );
}

// ⏰ Expirado
if (new Date(verificacao.expira_em) < new Date()) {
  await pool.query(
    'DELETE FROM email_verificacoes WHERE usuario_id = $1',
    [usuario_id]
  );

  return NextResponse.json(
    { error: 'Código expirado' },
    { status: 400 }
  );
}

// ❌ Código errado → incrementa tentativa
if (codigoBanco !== codigoInput) {
  await pool.query(
    'UPDATE email_verificacoes SET tentativas = tentativas + 1 WHERE usuario_id = $1',
    [usuario_id]
  );

  return NextResponse.json(
    { error: 'Código inválido' },
    { status: 400 }
  );
}

    // ✅ Marcar email como verificado
    await pool.query(
      `UPDATE usuario
       SET email_verificado = true
       WHERE id = $1`,
      [usuario_id]
    )

    // Remover código
    await pool.query(
      'DELETE FROM email_verificacoes WHERE usuario_id = $1',
      [usuario_id]
    )

    return NextResponse.json({
      success: true,
      message: 'Email verificado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao verificar email:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar email' },
      { status: 500 }
    )
  }
}
