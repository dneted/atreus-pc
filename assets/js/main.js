// =========================================================
// 🟦 SCROLL SUAVE EN LOS LINKS DEL MENÚ
// =========================================================
const navLinks = document.querySelectorAll('.nav__link[href^="#"]')

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    const targetId = href.slice(1)
    const targetEl = document.getElementById(targetId)
    if (!targetEl) return

    event.preventDefault()
    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

// =========================================================
// 🟦 MENÚ HAMBURGUESA (MÓVIL)
// =========================================================
const navToggle = document.getElementById('navToggle')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open')
  })
}

// Cerrar menú al hacer click en un link (en móvil)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open')
  })
})

// =========================================================
// 🟦 CAMBIO DE TEMA OSCURO / CLARO
// =========================================================
const body = document.body
const themeToggleBtn = document.getElementById('themeToggle')

// Cargar tema guardado
const savedTheme = localStorage.getItem('atreus-theme')
if (savedTheme === 'light') {
  body.classList.add('theme--light')
  if (themeToggleBtn) themeToggleBtn.textContent = '☀️'
} else {
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙'
}

// Toggle de tema al click
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = body.classList.toggle('theme--light')

    if (isLight) {
      themeToggleBtn.textContent = '☀️'
      localStorage.setItem('atreus-theme', 'light')
    } else {
      themeToggleBtn.textContent = '🌙'
      localStorage.setItem('atreus-theme', 'dark')
    }
  })
}

// =========================================================
// 🟦 FILTROS EN HISTORIAL DE COMPONENTES
// =========================================================
const filterButtons = document.querySelectorAll('.components-filters__btn')
const componentBlocks = document.querySelectorAll('.component-block')

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter || 'all'

    // activar visualmente el botón
    filterButtons.forEach(b => b.classList.remove('is-active'))
    btn.classList.add('is-active')

    // mostrar / ocultar bloques
    componentBlocks.forEach(block => {
      const type = block.dataset.type
      if (filter === 'all' || filter === type) {
        block.style.display = 'block'
      } else {
        block.style.display = 'none'
      }
    })
  })
})

// =========================================================
// 🟦 DETALLE DE EQUIPO (AL HACER CLICK EN UNA PC ARMADA)
// =========================================================
const buildCards = document.querySelectorAll('#equipos .build')
const detalleSection = document.getElementById('detalle-equipo')
const detalleCard = document.getElementById('detalleCard')
const detalleNombre = document.getElementById('detalleNombre')
const detalleUso = document.getElementById('detalleUso')
const detalleSpecs = document.getElementById('detalleSpecs')
const detallePrecio = document.getElementById('detallePrecio')

if (buildCards.length > 0 && detalleSection && detalleCard && detalleNombre && detalleUso && detalleSpecs && detallePrecio) {
  buildCards.forEach(card => {
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('.card__title')
      const usoEl = card.querySelector('.build__usage')
      const specsEls = card.querySelectorAll('.build__specs li')
      const priceEl = card.querySelector('.build__price')

      if (!titleEl || !usoEl || !priceEl || specsEls.length === 0) return

      detalleNombre.textContent = titleEl.textContent
      detalleUso.textContent = usoEl.textContent

      // limpiar specs anteriores y volver a llenarlos
      detalleSpecs.innerHTML = ''
      specsEls.forEach(li => {
        const newLi = document.createElement('li')
        newLi.textContent = li.textContent
        detalleSpecs.appendChild(newLi)
      })

      detallePrecio.textContent = priceEl.textContent

      // mostrar tarjeta de detalle
      detalleCard.style.display = 'block'

      // scroll hasta la sección de detalle
      detalleSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  })
}
