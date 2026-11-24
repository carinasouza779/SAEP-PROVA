// Criptografia autenticada AES-256-GCM para proteger o CPF armazenado no SQLite.
const crypto = require('crypto');

function obterChave() {
  const valor = process.env.CPF_ENCRYPTION_KEY || '';
  if (!/^[a-fA-F0-9]{64}$/.test(valor)) {
    throw new Error('CPF_ENCRYPTION_KEY deve conter exatamente 64 caracteres hexadecimais (32 bytes).');
  }
  return Buffer.from(valor, 'hex');
}

function criptografarCPF(cpf) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', obterChave(), iv);
  const cifrado = Buffer.concat([cipher.update(cpf, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString('hex'), tag.toString('hex'), cifrado.toString('hex')].join(':');
}

module.exports = { criptografarCPF };
