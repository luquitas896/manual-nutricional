const consejos = [
  "Llevar agua siempre que puedas",
  "Incluir vegetales de hoja verde en tus comidas",
  "Preferir versiones mínimamente procesadas",
  "Combinar proteínas y carbohidratos en cada plato",
  "Planificar compras para evitar desperdicios"
];

const consejosList = document.getElementById('consejos-list');
const filtroConsejo = document.getElementById('filtroConsejo');
const consejoFeedback = document.getElementById('consejo-feedback');
const resultadoIMC = document.getElementById('resultado');
const btnCalcular = document.getElementById('btnCalcular');
const contactForm = document.getElementById('contact-form');
const contactErrors = document.getElementById('contact-errors');

function crearConsejos() {
  consejosList.innerHTML = '';
  consejos.forEach((texto) => {
    const li = document.createElement('li');
    li.textContent = texto;
    consejosList.appendChild(li);
  });
}

function filtrarConsejos(event) {
  const busqueda = event.target.value.toLowerCase().trim();
  const coincidencias = consejos.filter((consejo) =>
    consejo.toLowerCase().includes(busqueda)
  );

  consejosList.innerHTML = '';
  if (busqueda.length === 0) {
    crearConsejos();
    consejoFeedback.textContent = 'Escribí para filtrar los consejos.';
    return;
  }

  if (coincidencias.length === 0) {
    consejoFeedback.textContent = 'No se encontraron consejos para esa búsqueda.';
  } else {
    consejoFeedback.textContent = `Se encontraron ${coincidencias.length} consejos.`;
  }

  coincidencias.forEach((texto) => {
    const li = document.createElement('li');
    li.textContent = texto;
    consejosList.appendChild(li);
  });
}

function obtenerEstadoIMC(imc) {
  if (imc < 18.5) return 'Bajo peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  return 'Obesidad';
}

function calcularIMC() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const sexo = document.getElementById('sexo').value;

  try {
    if (!peso || !altura) {
      throw new Error('Peso y altura son obligatorios.');
    }
    if (peso <= 0 || altura <= 0) {
      throw new Error('Ingresá valores numéricos positivos.');
    }

    const imc = peso / (altura * altura);
    const estado = obtenerEstadoIMC(imc);
    resultadoIMC.textContent = `Tu IMC es ${imc.toFixed(2)} → ${estado} (${sexo})`;
    resultadoIMC.className = 'success-text';
  } catch (error) {
    resultadoIMC.textContent = error.message;
    resultadoIMC.className = 'error-text';
  }
}

function validarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  try {
    if (!nombre || !email || !mensaje) {
      throw new Error('Completá todos los campos antes de enviar.');
    }
    if (!email.includes('@')) {
      throw new Error('Ingresá un correo electrónico válido.');
    }

    contactErrors.textContent = 'Formulario enviado correctamente. Gracias!';
    contactErrors.className = 'success-text';
    contactForm.reset();
  } catch (error) {
    contactErrors.textContent = error.message;
    contactErrors.className = 'error-text';
  }
}

function initApp() {
  crearConsejos();
  filtroConsejo.addEventListener('input', filtrarConsejos);
  btnCalcular.addEventListener('click', calcularIMC);
  contactForm.addEventListener('submit', validarFormulario);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
