export function generateCancelToken() {
  let resultado = ''
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const tamanhoCaracteres = caracteres.length
  for (let i = 0; i < 6; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * tamanhoCaracteres),
    )
  }
  return resultado
}
