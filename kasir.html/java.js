const fallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs><linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#315e7c"/><stop offset="100%" stop-color="#18232e"/></linearGradient></defs>
        <rect width="600" height="800" fill="url(#background)"/>
        <circle cx="300" cy="285" r="115" fill="#d8e3ea" opacity=".9"/>
        <path d="M105 710c18-175 117-270 195-270s177 95 195 270" fill="#d8e3ea" opacity=".9"/>
        <text x="300" y="755" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="25" letter-spacing="5">FOTO PENGURUS</text>
    </svg>
`);

const organizationMembers = [
    ["Ketua Kelas", "shidik", "shidik.png", "Mengkoordinasikan kegiatan dan kebutuhan kelas."],
    ["Wakil Ketua Kelas", "Ido", "ido.png", "Membantu ketua kelas dan menggantikannya saat diperlukan."],
    ["Sekretaris", "selly", "sekte.png", "Mengelola administrasi serta mencatat informasi penting kelas."],
    ["Sekretaris", "aga", "aga.png", "Mengelola administrasi serta mencatat informasi penting kelas."],
    ["Bendahara", "anita", "benda.png", "Mengelola kas dan pencatatan keuangan kelas."],
    ["Bendahara", "nadia", "benda2.png", "Mengelola kas dan pencatatan keuangan kelas."],
    ["Kominfo", "aulia", "kominfo.png", "Mengelola informasi, dokumentasi, dan komunikasi kelas."],
    ["Kominfo", "zahra", "kominfo2.png", "Mengelola informasi, dokumentasi, dan komunikasi kelas."],
    ["Kominfo", "diaz", "kominfo3.png", "Mengelola informasi, dokumentasi, dan komunikasi kelas."],
    ["Peralatan", "bima", "peralatan.png", "Menyiapkan serta merawat perlengkapan kelas."],
    ["Peralatan", "keisha", "peralatan2.png", "Menyiapkan serta merawat perlengkapan kelas."],
    ["Keamanan", "zdakwan", "keamanan.png", "Membantu menjaga ketertiban dan keamanan kelas."],
    ["Keamanan", "nayla", "keamanan2.png", "Membantu menjaga ketertiban dan keamanan kelas."],
    ["Keamanan", "aditya", "keamanan3.png", "Membantu menjaga ketertiban dan keamanan kelas."],
    ["Keagamaan", "farhan", "keagamaan.png", "Mengoordinasikan kegiatan keagamaan kelas."],
    ["Keagamaan", "revalina", "keagamaan2.png", "Mengoordinasikan kegiatan keagamaan kelas."],
    ["Kebersihan", "galang", "kebersihan.png", "Menjaga kebersihan dan kenyamanan ruang kelas."],
    ["Kebersihan", "fahri", "kebersihan2.png", "Menjaga kebersihan dan kenyamanan ruang kelas."],
    ["Kesehatan", "sudarjat", "kesehatan.png", "Mengoordinasikan kebutuhan kesehatan dan P3K kelas."],
    ["Kesehatan", "salvina", "kesehatan2.png", "Mengoordinasikan kebutuhan kesehatan dan P3K kelas."],
    ["Humas", "galih", "humas.png", "Menjalin komunikasi kelas dengan pihak lain."],
    ["Humas", "regina", "humas2.png", "Menjalin komunikasi kelas dengan pihak lain."]
];

function useFallbackImage(image) {
    image.onerror = function () {
        image.onerror = null;
        image.src = fallbackImage;
    };
}

function setImageSource(image, source) {
    useFallbackImage(image);
    image.src = source;
}

function openModal(card) {
    document.getElementById("modalName").textContent = card.dataset.name;
    document.getElementById("modalRole").textContent = card.dataset.role;
    document.getElementById("modalClass").textContent = card.dataset.class;
    document.getElementById("modalDescription").textContent = card.dataset.description;
    setImageSource(document.getElementById("modalImage"), card.dataset.image);
    document.getElementById("profileModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("profileModal").classList.remove("active");
    document.body.style.overflow = "auto";
}

function closeOutside(event) {
    if (event.target.id === "profileModal") closeModal();
}

function searchStudent() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    let total = 0;
    document.querySelectorAll(".all-students .student-card").forEach(function (card) {
        const match = `${card.dataset.name} ${card.dataset.role}`.toLowerCase().includes(keyword);
        card.style.display = match ? "" : "none";
        if (match) total++;
    });
    document.getElementById("totalStudent").textContent = total;
}

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".student-grid");
    if (!grid) return;

    grid.innerHTML = "";
    let number = 1;
    organizationMembers.forEach(function ([role, name, filename, description]) {
            const label = name;
            const card = document.createElement("div");
            const image = `foto/${filename}`;
            card.className = "student-card";
            card.dataset.name = name;
            card.dataset.role = role;
            card.dataset.class = "XI PPLG 1";
            card.dataset.description = description;
            card.dataset.image = image;
            card.onclick = function () { openModal(card); };
            card.innerHTML = `<div class="student-image"><img src="${image}" alt="${label}"><span class="number">${String(number).padStart(2, "0")}</span><div class="view-text">LIHAT PROFIL →</div></div><div class="student-info"><span>${role.toUpperCase()}</span><h3>${label}</h3></div>`;
            grid.appendChild(card);
            number++;
    });

    document.querySelectorAll("img[src]").forEach(function (image) {
        useFallbackImage(image);
        if (image.complete && image.naturalWidth === 0) image.src = fallbackImage;
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
});
