
// Validación y formateo de RUT
export function validarRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (rut.length < 8) return false;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
  }

export function formatearRut(valor) {
    let rut = valor.replace(/[^0-9kK]/g, '').toUpperCase();
    if (rut.length === 0) return '';
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    let cuerpoFormateado = '';
    for (let i = cuerpo.length - 1, j = 1; i >= 0; i--, j++) {
      cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
      if (j % 3 === 0 && i !== 0) cuerpoFormateado = '.' + cuerpoFormateado;
    }
    return cuerpoFormateado + '-' + dv;
  }