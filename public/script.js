const body = document.body;
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-menu');
const themeButton = document.querySelector('.theme-toggle');
const detailModal = document.querySelector('.certificate-modal');
const previewModal = document.querySelector('.certificate-preview');
const moreCertificatesModal = document.querySelector('.more-certificates-modal');
const certificateSection = document.querySelector('#sertifikat');
const certificateMoreGroup = certificateSection?.querySelector('.certificate-more-group');
const previewDocument = previewModal?.querySelector('.preview-document');
const modalDocument = detailModal?.querySelector('.modal-document');
let activeCertificate = null;
let returnToContact = false;

function showCertificatePreview(item) {
  activeCertificate = item.dataset;
  if (!activeCertificate?.title) return;
  previewModal.querySelector('.preview-issuer').textContent = activeCertificate.issuer;
  previewModal.querySelector('.preview-title').textContent = activeCertificate.title;
  previewModal.showModal();
  // File ukuran penuh baru diminta setelah modal terbuka.
  previewDocument.src = activeCertificate.image;
}

function openCertificateByTitle(title) {
  const item = [...document.querySelectorAll('#sertifikat .certificate-item')].find((entry) => entry.dataset.title === title);
  if (!item) return;
  if (certificateMoreGroup?.contains(item)) certificateMoreGroup.open = true;
  certificateSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showCertificatePreview(item);
}

document.querySelectorAll('#sertifikat .certificate-item').forEach((item) => {
  item.addEventListener('click', () => showCertificatePreview(item));
});

document.querySelectorAll('[data-open-netacad]').forEach((button) => button.addEventListener('click', () => {
  if (!certificateSection) return;
  if (certificateMoreGroup) certificateMoreGroup.open = true;
  certificateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

document.querySelectorAll('.project-more-group, .certificate-more-group').forEach((group) => group.addEventListener('toggle', () => {
  const label = group.querySelector('summary b[data-open-label]');
  if (label) label.textContent = group.open ? label.dataset.closeLabel : label.dataset.openLabel;
}));

const projectCertificateMap = {
  'Lihat sertifikat Cloud Computing': 'Cloud Computing',
  'Lihat sertifikasi terkait': 'PEDAS Bronze Award',
  'Lihat sertifikat PBI': 'Data Scientist Project-Based Internship',
};
document.querySelectorAll('.project-link').forEach((link) => {
  const title = projectCertificateMap[link.textContent.trim()];
  if (!title) return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openCertificateByTitle(title);
  });
});

document.querySelector('.open-certificate-details')?.addEventListener('click', () => {
  if (!activeCertificate) return;
  detailModal.querySelector('.modal-issuer').textContent = activeCertificate.issuer;
  detailModal.querySelectorAll('.modal-title').forEach((element) => { element.textContent = activeCertificate.title; });
  const dates = detailModal.querySelectorAll('.modal-meta strong');
  dates[0].textContent = activeCertificate.issued;
  dates[1].textContent = activeCertificate.valid;
  previewModal.close();
  detailModal.showModal();
  // Sama seperti pratinjau, dokumen penuh hanya dimuat saat modal detail aktif.
  modalDocument.src = activeCertificate.image;
});

document.querySelector('.close-preview')?.addEventListener('click', () => previewModal.close());
document.querySelector('.close-modal')?.addEventListener('click', () => detailModal.close());
document.querySelector('.close-more-cert')?.addEventListener('click', () => moreCertificatesModal.close());

previewModal?.addEventListener('close', () => previewDocument?.removeAttribute('src'));
detailModal?.addEventListener('close', () => {
  modalDocument?.removeAttribute('src');
  modalDocument?.classList.remove('zoomed');
  certificateSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
[previewModal, detailModal, moreCertificatesModal].filter(Boolean).forEach((modal) => modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
}));

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

themeButton?.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeButton.querySelector('span').textContent = body.classList.contains('dark') ? '☾' : '☼';
});

document.querySelectorAll('img').forEach((image) => {
  image.loading = image.classList.contains('avatar') ? 'eager' : 'lazy';
  image.decoding = 'async';
});

function restoreContactSection() {
  if (!returnToContact) return;
  returnToContact = false;
  const contactSection = document.querySelector('#kontak');
  const contactGroup = contactSection?.querySelector('.contact-group');
  if (!contactSection || !contactGroup) return;
  contactGroup.open = true;
  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('#kontak .certificate-item[target="_blank"]').forEach((link) => link.addEventListener('click', () => { returnToContact = true; }));
window.addEventListener('focus', () => window.setTimeout(restoreContactSection, 100));
