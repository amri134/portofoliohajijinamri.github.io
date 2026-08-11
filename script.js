const body = document.body;
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-menu');
const themeButton = document.querySelector('.theme-toggle');
const detailModal = document.querySelector('.certificate-modal');
const previewModal = document.querySelector('.certificate-preview');
const moreCertificatesModal = document.querySelector('.more-certificates-modal');
let activeCertificate = null;
let returnToContact = false;

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeButton.querySelector('span').textContent = body.classList.contains('dark') ? '☾' : '☼';
});

function populateDetails(certificate) {
  detailModal.querySelector('.modal-issuer').textContent = certificate.issuer;
  detailModal.querySelectorAll('.modal-title').forEach(element => { element.textContent = certificate.title; });
  const dates = detailModal.querySelectorAll('.modal-meta strong');
  dates[0].textContent = certificate.issued;
  dates[1].textContent = certificate.valid;
  detailModal.querySelector('.modal-document').src = certificate.image;
}

document.querySelectorAll('#sertifikat .certificate-item:not(.more-certificates-trigger)').forEach(item => item.addEventListener('click', () => {
  activeCertificate = item.dataset;
  previewModal.querySelector('.preview-issuer').textContent = activeCertificate.issuer;
  previewModal.querySelector('.preview-title').textContent = activeCertificate.title;
  previewModal.querySelector('.preview-document').src = activeCertificate.image;
  previewModal.showModal();
}));

document.querySelector('.open-certificate-details').addEventListener('click', () => {
  populateDetails(activeCertificate);
  previewModal.close();
  detailModal.showModal();
});

document.querySelector('.close-preview').addEventListener('click', () => previewModal.close());
document.querySelector('.close-modal').addEventListener('click', () => detailModal.close());
document.querySelector('.more-certificates-trigger').addEventListener('click', () => moreCertificatesModal.showModal());
document.querySelector('.close-more-cert').addEventListener('click', () => moreCertificatesModal.close());
detailModal.addEventListener('close', () => {
  const certificateSection = document.querySelector('#sertifikat');
  document.querySelector('.certificate-group').open = true;
  certificateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
[previewModal, detailModal, moreCertificatesModal].forEach(modal => modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
}));

function restoreContactSection() {
  if (!returnToContact) return;
  returnToContact = false;
  const contactSection = document.querySelector('#kontak');
  const contactGroup = contactSection.querySelector('.contact-group');
  contactGroup.open = true;
  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('#kontak .certificate-item[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => { returnToContact = true; });
});

window.addEventListener('focus', () => window.setTimeout(restoreContactSection, 100));
