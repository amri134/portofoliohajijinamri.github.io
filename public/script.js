const body = document.body;
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-menu');
const themeButton = document.querySelector('.theme-toggle');
const detailModal = document.querySelector('.certificate-modal');
const previewModal = document.querySelector('.certificate-preview');
const moreCertificatesModal = document.querySelector('.more-certificates-modal');
let activeCertificate = null;
let returnToContact = false;
const firstProject = document.querySelector('#proyek .project-group');
if (firstProject) firstProject.open = true;
const certificateGroup = document.querySelector('#sertifikat .certificate-group');
if (certificateGroup) certificateGroup.open = false;
const certificateList = document.querySelector('#sertifikat .certificate-list');
const moreCertificateTrigger = certificateList?.querySelector('.more-certificates-trigger');
if (certificateList && moreCertificateTrigger && !certificateList.querySelector('[data-title="PEDAS Bronze Award"]')) {
  const pedas = document.createElement('button');
  pedas.className = 'certificate-item'; pedas.dataset.title = 'PEDAS Bronze Award'; pedas.dataset.issuer = 'APTIKOM'; pedas.dataset.issued = '19 September 2025'; pedas.dataset.valid = 'Peraih Bronze Award'; pedas.dataset.image = '/sertifikat/pedas.jpg';
  pedas.innerHTML = '<span class="certificate-item-icon">★</span><span><strong>PEDAS Bronze Award</strong><small>APTIKOM · Peraih Bronze Award 2025</small></span><i>›</i>';
  pedas.addEventListener('click', () => { activeCertificate = pedas.dataset; previewModal.querySelector('.preview-issuer').textContent = activeCertificate.issuer; previewModal.querySelector('.preview-title').textContent = activeCertificate.title; previewModal.querySelector('.preview-document').src = activeCertificate.image; previewModal.showModal(); });
  certificateList.insertBefore(pedas, moreCertificateTrigger);
}
const modalDocument = document.querySelector('.modal-document');
if (modalDocument) modalDocument.addEventListener('click', () => modalDocument.classList.toggle('zoomed'));
const projectGroups = document.querySelector('#proyek .project-groups');
if (projectGroups) {
  const projects = [...projectGroups.querySelectorAll('.project-group')];
  projects.slice(1).forEach(project => {
    project.hidden = true;
    project.open = false;
  });
  if (projects.length > 1) {
    const moreProjects = document.createElement('button');
    moreProjects.type = 'button';
    moreProjects.className = 'more-projects-button';
    moreProjects.textContent = `More Proyek (${projects.length - 1})`;
    moreProjects.setAttribute('aria-expanded', 'false');
    moreProjects.addEventListener('click', () => {
      const expanded = moreProjects.getAttribute('aria-expanded') === 'true';
      projects.slice(1).forEach(project => { project.hidden = expanded; });
      moreProjects.setAttribute('aria-expanded', String(!expanded));
      moreProjects.textContent = expanded ? `More Proyek (${projects.length - 1})` : 'Sembunyikan proyek';
    });
    projectGroups.insertAdjacentElement('afterend', moreProjects);
  }
}
document.querySelectorAll('img').forEach(image => { image.loading = image.classList.contains('avatar') ? 'eager' : 'lazy'; image.decoding = 'async'; });

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
function openCertificateByTitle(title) {
  const item = [...document.querySelectorAll('#sertifikat .certificate-item')].find(entry => entry.dataset.title === title);
  if (!item) return;
  certificateGroup.open = true;
  item.click();
  document.querySelector('#sertifikat').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('.project-link[data-certificate-title]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); openCertificateByTitle(link.dataset.certificateTitle); }));
const projectCertificateMap = {'Lihat sertifikat Cloud Computing →':'Bangkit Cloud Computing','Lihat sertifikasi terkait →':'PEDAS Bronze Award','Lihat sertifikat PBI →':'Data Scientist Project-Based Internship'};
document.querySelectorAll('.project-link').forEach(link => { const title = projectCertificateMap[link.textContent.trim()]; if (title) { link.dataset.certificateTitle = title; link.addEventListener('click', event => { event.preventDefault(); openCertificateByTitle(title); }); } });

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
