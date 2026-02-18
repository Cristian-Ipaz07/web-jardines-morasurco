export const guardarDato = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor))
}

export const obtenerDato = (clave, defecto = '') => {
  const data = localStorage.getItem(clave)
  return data ? JSON.parse(data) : defecto
}