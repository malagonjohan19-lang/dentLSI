
/*
  DENTALIS - CONFIGURACIÓN DE LA PLANTILLA

  Reemplaza el número de ejemplo por el WhatsApp real
  de la clínica antes de realizar una demostración funcional.
*/

const WHATSAPP_NUMBER = "573245214499";


/* MENÚ MÓVIL */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}


/* AÑO AUTOMÁTICO */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* WHATSAPP */

function validWhatsAppNumber(number) {
  return /^\d{8,15}$/.test(number);
}

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {
  if (validWhatsAppNumber(WHATSAPP_NUMBER)) {
    whatsappButton.href = whatsappUrl(
      "Hola, quisiera información sobre los servicios de DENTALIS."
    );
  } else {
    whatsappButton.href = "#contacto";
  }
}


/* FORMULARIO DE SOLICITUD DE INFORMACIÓN */

const appointmentForm = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!appointmentForm.reportValidity()) {
      return;
    }

    if (!validWhatsAppNumber(WHATSAPP_NUMBER)) {
      formStatus.textContent =
        "La clínica debe configurar su número de WhatsApp.";

      return;
    }

    const nombre = document
      .getElementById("patientName")
      .value.trim();

    const telefono = document
      .getElementById("patientPhone")
      .value.trim();

    const servicio = document
      .getElementById("serviceSelect")
      .value;

    const mensaje = [
      "Hola, quisiera solicitar información a DENTALIS.",
      "",
      `Nombre: ${nombre}`,
      `Teléfono de contacto: ${telefono || "No proporcionado"}`,
      `Servicio de interés: ${servicio}`,
      "",
      "Quisiera consultar la disponibilidad de una cita."
    ].join("\n");

    formStatus.textContent =
      "Preparando el mensaje para WhatsApp...";

    const url = whatsappUrl(mensaje);

    const newWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      formStatus.textContent =
        "El navegador bloqueó la ventana. Puedes usar el botón de WhatsApp de la página.";
    }
  });
}
