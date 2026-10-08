/**
 * SCRIPT.JS - LOGIKA FRONT-END SITTA UNIVERSITAS TERBUKA
 * Tugas Praktik 1 - STSI4209 Pemrograman Berbasis Web
 * Mahasiswa: Aulia Ardi Nur Waluyo (NIM: 052144403)
 */

document.addEventListener("DOMContentLoaded", function () {
  initGlobalUI();

  // Deteksi halaman berdasarkan elemen unik di dokumen
  if (document.getElementById("formLogin")) {
    initLoginPage();
  }
  if (document.getElementById("dashboardGreeting")) {
    initDashboardPage();
  }
  if (document.getElementById("formTracking")) {
    initTrackingPage();
  }
  if (document.getElementById("tabelBahanAjar")) {
    initStokPage();
  }
});

/* ==========================================================================
   GLOBAL UTILITIES & AUTH SESSION
   ========================================================================== */

/**
 * Mendapatkan user yang sedang aktif dari localStorage atau default dummy
 */
function getCurrentUser() {
  var saved = localStorage.getItem("sitta_user");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal parsing session user:", e);
    }
  }
  // Fallback default: Rina Wulandari (User 1 dari dataPengguna)
  if (typeof dataPengguna !== "undefined" && dataPengguna.length > 0) {
    return dataPengguna[0];
  }
  return {
    nama: "Aulia Ardi Nur Waluyo",
    role: "Mahasiswa / User",
    lokasi: "UPBJJ Jakarta"
  };
}

/**
 * Menghasilkan teks salam berdasarkan local time pengguna
 */
function getGreeting() {
  var hour = new Date().getHours();
  if (hour >= 4 && hour < 11) {
    return "Selamat pagi";
  } else if (hour >= 11 && hour < 15) {
    return "Selamat siang";
  } else if (hour >= 15 && hour < 18) {
    return "Selamat sore";
  } else {
    return "Selamat malam";
  }
}

/**
 * Inisialisasi elemen umum seperti nama user di header dan tombol logout
 */
function initGlobalUI() {
  var user = getCurrentUser();

  var userNameEl = document.getElementById("headerUserName");
  if (userNameEl) {
    userNameEl.textContent = user.nama;
  }

  var userRoleEl = document.getElementById("headerUserRole");
  if (userRoleEl) {
    userRoleEl.textContent = user.role + " - " + user.lokasi;
  }

  // Tombol Logout
  var logoutBtn = document.getElementById("btnLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("sitta_user");
      window.location.href = "login.html";
    });
  }

  // Setup modal close listeners untuk semua modal
  document.querySelectorAll(".modal-overlay").forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelectorAll(".modal-close, .btn-modal-close").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = btn.closest(".modal-overlay");
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  // Listener tombol ESC keyboard
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.show").forEach(function (m) {
        closeModal(m.id);
      });
    }
  });
}

/**
 * Buka modal box berdasarkan ID
 */
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

/**
 * Tutup modal box berdasarkan ID
 */
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

/**
 * Tampilkan pesan alert / dialog notifikasi kustom
 */
function showCustomAlert(message, title, icon) {
  title = title || "Pemberitahuan";
  icon = icon || "⚠️";

  var alertModal = document.getElementById("modalAlert");
  if (!alertModal) {
    // Fallback jika elemen modalAlert belum ada di DOM
    alert(message);
    return;
  }

  document.getElementById("alertTitle").textContent = title;
  document.getElementById("alertIcon").textContent = icon;
  document.getElementById("alertMessage").textContent = message;

  openModal("modalAlert");
}

/* ==========================================================================
   1. HALAMAN LOGIN (login.html)
   ========================================================================== */
function initLoginPage() {
  var formLogin = document.getElementById("formLogin");
  var inputEmail = document.getElementById("inputEmail");
  var inputPassword = document.getElementById("inputPassword");

  // Handler Submit Form Login
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = inputEmail.value.trim();
    var password = inputPassword.value.trim();

    // Validasi input kosong
    if (!email || !password) {
      showCustomAlert("Silakan masukkan email dan password Anda terlebih dahulu.", "Validasi Form", "⚠️");
      return;
    }

    // Pencocokan data dengan dummy dataPengguna pada data.js
    var matchedUser = null;
    if (typeof dataPengguna !== "undefined") {
      for (var i = 0; i < dataPengguna.length; i++) {
        if (dataPengguna[i].email.toLowerCase() === email.toLowerCase() && dataPengguna[i].password === password) {
          matchedUser = dataPengguna[i];
          break;
        }
      }
    }

    if (matchedUser) {
      // Simpan session pengguna
      localStorage.setItem("sitta_user", JSON.stringify(matchedUser));
      // Redirect ke dashboard
      window.location.href = "dashboard.html";
    } else {
      // Sesuai soal tugas poin 1:
      // "Jika salah atau tidak sesuai, munculkan pop-up/alert yang berisi bahwa 'email/password yang anda masukkan salah'"
      showCustomAlert("email/password yang anda masukkan salah", "Login Gagal", "❌");
    }
  });

  // Modal Lupa Password
  var btnLupaPassword = document.getElementById("btnLupaPassword");
  if (btnLupaPassword) {
    btnLupaPassword.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("modalLupaPassword");
    });
  }

  var formLupaPassword = document.getElementById("formLupaPassword");
  if (formLupaPassword) {
    formLupaPassword.addEventListener("submit", function (e) {
      e.preventDefault();
      var resetEmail = document.getElementById("inputResetEmail").value.trim();
      if (!resetEmail) {
        showCustomAlert("Silakan masukkan alamat email akun Anda.", "Input Kosong", "⚠️");
        return;
      }
      closeModal("modalLupaPassword");
      showCustomAlert("Tautan instruksi reset password telah dikirim ke email: " + resetEmail, "Sukses Terkirim", "✅");
      formLupaPassword.reset();
    });
  }

  // Modal Daftar Akun Baru
  var btnDaftar = document.getElementById("btnDaftar");
  if (btnDaftar) {
    btnDaftar.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("modalDaftar");
    });
  }

  var formDaftar = document.getElementById("formDaftar");
  if (formDaftar) {
    formDaftar.addEventListener("submit", function (e) {
      e.preventDefault();
      var namaBaru = document.getElementById("inputDaftarNama").value.trim();
      var emailBaru = document.getElementById("inputDaftarEmail").value.trim();
      var passBaru = document.getElementById("inputDaftarPassword").value.trim();
      var roleBaru = document.getElementById("selectDaftarRole").value;
      var lokasiBaru = document.getElementById("inputDaftarLokasi").value.trim();

      if (!namaBaru || !emailBaru || !passBaru) {
        showCustomAlert("Mohon lengkapi semua isian bertanda bintang (*).", "Validasi Registrasi", "⚠️");
        return;
      }

      // Tambahkan ke dataPengguna sementara di memori
      var newUser = {
        id: dataPengguna.length + 1,
        nama: namaBaru,
        email: emailBaru,
        password: passBaru,
        role: roleBaru,
        lokasi: lokasiBaru || "UPBJJ Daerah"
      };
      dataPengguna.push(newUser);

      closeModal("modalDaftar");
      formDaftar.reset();
      showCustomAlert("Akun baru untuk " + namaBaru + " berhasil didaftarkan! Anda sekarang dapat login menggunakan email tersebut.", "Pendaftaran Berhasil", "✅");
    });
  }
}

/* ==========================================================================
   2. DASHBOARD MENU (dashboard.html)
   ========================================================================== */
function initDashboardPage() {
  var user = getCurrentUser();
  var greetingPrefix = getGreeting();

  var greetingTitle = document.getElementById("dashboardGreeting");
  if (greetingTitle) {
    greetingTitle.textContent = greetingPrefix + ", " + user.nama;
  }

  // Jam digital live
  var clockTimeEl = document.getElementById("liveClockTime");
  var clockDateEl = document.getElementById("liveClockDate");

  function updateClock() {
    var now = new Date();
    if (clockTimeEl) {
      var h = String(now.getHours()).padStart(2, "0");
      var m = String(now.getMinutes()).padStart(2, "0");
      var s = String(now.getSeconds()).padStart(2, "0");
      clockTimeEl.textContent = h + ":" + m + ":" + s + " WIB";
    }
    if (clockDateEl) {
      var options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      clockDateEl.textContent = now.toLocaleDateString("id-ID", options);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   3. TRACKING PENGIRIMAN (tracking.html)
   ========================================================================== */
function initTrackingPage() {
  var formTracking = document.getElementById("formTracking");
  var inputNomorDO = document.getElementById("inputNomorDO");
  var trackingResultContainer = document.getElementById("trackingResultContainer");

  formTracking.addEventListener("submit", function (e) {
    e.preventDefault();

    var nomorDO = inputNomorDO.value.trim();
    if (!nomorDO) {
      showCustomAlert("Silakan masukkan Nomor Delivery Order (DO) terlebih dahulu.", "Validasi Input", "⚠️");
      return;
    }

    // Cari di dataTracking (data.js)
    var data = null;
    if (typeof dataTracking !== "undefined" && dataTracking[nomorDO]) {
      data = dataTracking[nomorDO];
    }

    if (!data) {
      trackingResultContainer.style.display = "none";
      showCustomAlert("Nomor Delivery Order '" + nomorDO + "' tidak ditemukan dalam sistem database SITTA.", "Data Tidak Ditemukan", "❌");
      return;
    }

    renderTrackingResult(data);
  });
}

/**
 * Render hasil tracking ke DOM
 */
function renderTrackingResult(data) {
  var container = document.getElementById("trackingResultContainer");
  container.style.display = "block";

  // Data header
  document.getElementById("resNomorDO").textContent = data.nomorDO || "-";
  document.getElementById("resNama").textContent = data.nama || "-";
  document.getElementById("resEkspedisi").textContent = data.ekspedisi || "-";
  document.getElementById("resTanggalKirim").textContent = data.tanggalKirim || "-";
  document.getElementById("resPaket").textContent = data.paket || "-";
  document.getElementById("resTotal").textContent = data.total || "-";

  // Status Badge
  var badgeEl = document.getElementById("resStatusBadge");
  badgeEl.textContent = data.status;
  if (data.status.toLowerCase().includes("selesai") || data.status.toLowerCase().includes("terima")) {
    badgeEl.className = "status-badge delivered";
  } else {
    badgeEl.className = "status-badge in-transit";
  }

  // Progress Stepper (Simulasi progress status)
  updateProgressStepper(data.status);

  // Render Riwayat Perjalanan (Timeline)
  var timelineList = document.getElementById("timelineList");
  timelineList.innerHTML = "";

  if (data.perjalanan && data.perjalanan.length > 0) {
    // Buat urutan kronologis terbaru di atas atau sesuai alur
    data.perjalanan.forEach(function (step) {
      var li = document.createElement("li");
      li.className = "timeline-item";

      var timeDiv = document.createElement("div");
      timeDiv.className = "timeline-time";
      timeDiv.textContent = step.waktu;

      var descDiv = document.createElement("div");
      descDiv.className = "timeline-desc";
      descDiv.textContent = step.keterangan;

      li.appendChild(timeDiv);
      li.appendChild(descDiv);
      timelineList.appendChild(li);
    });
  } else {
    timelineList.innerHTML = "<li class='timeline-item'><div class='timeline-desc'>Belum ada rincian perjalanan.</div></li>";
  }

  // Scroll halus ke hasil
  container.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Simulasi visual progress stepper berdasarkan status pengiriman
 */
function updateProgressStepper(status) {
  var step1 = document.getElementById("step1");
  var step2 = document.getElementById("step2");
  var step3 = document.getElementById("step3");
  var step4 = document.getElementById("step4");
  var fill = document.getElementById("stepperFill");

  var s = status.toLowerCase();

  // Reset
  [step1, step2, step3, step4].forEach(function (el) {
    if (el) el.className = "step-item";
  });

  if (s.includes("selesai")) {
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("completed");
    step4.classList.add("completed");
    if (fill) fill.style.width = "100%";
  } else if (s.includes("antar") || s.includes("kota")) {
    step1.classList.add("completed");
    step2.classList.add("completed");
    step3.classList.add("active");
    if (fill) fill.style.width = "66%";
  } else if (s.includes("perjalanan") || s.includes("kirim") || s.includes("hub")) {
    step1.classList.add("completed");
    step2.classList.add("active");
    if (fill) fill.style.width = "33%";
  } else {
    step1.classList.add("active");
    if (fill) fill.style.width = "10%";
  }
}

/* ==========================================================================
   4. INFORMASI STOK BAHAN AJAR (stok.html)
   ========================================================================== */
function initStokPage() {
  renderTabelStok();

  // Modal Tambah Bahan Ajar
  var btnBukaModalTambah = document.getElementById("btnBukaModalTambah");
  if (btnBukaModalTambah) {
    btnBukaModalTambah.addEventListener("click", function () {
      openModal("modalTambahStok");
    });
  }

  // Form Tambah Baris Stok Baru via DOM
  var formTambahStok = document.getElementById("formTambahStok");
  if (formTambahStok) {
    formTambahStok.addEventListener("submit", function (e) {
      e.preventDefault();

      var kodeLokasi = document.getElementById("inputKodeLokasi").value.trim();
      var kodeBarang = document.getElementById("inputKodeBarang").value.trim().toUpperCase();
      var namaBarang = document.getElementById("inputNamaBarang").value.trim();
      var jenisBarang = document.getElementById("selectJenisBarang").value;
      var edisi = document.getElementById("inputEdisi").value.trim();
      var stok = parseInt(document.getElementById("inputStok").value, 10);
      var cover = document.getElementById("inputCover").value.trim() || "img/pengantar_komunikasi.jpg";

      // Validasi input
      if (!kodeLokasi || !kodeBarang || !namaBarang || !edisi || isNaN(stok)) {
        showCustomAlert("Mohon isi semua data bahan ajar dengan lengkap dan valid.", "Validasi Form", "⚠️");
        return;
      }

      if (stok < 0) {
        showCustomAlert("Jumlah stok tidak boleh bernilai negatif.", "Validasi Stok", "⚠️");
        return;
      }

      var itemBaru = {
        kodeLokasi: kodeLokasi,
        kodeBarang: kodeBarang,
        namaBarang: namaBarang,
        jenisBarang: jenisBarang,
        edisi: edisi,
        stok: stok,
        cover: cover
      };

      // Tambahkan ke array konstanta dataBahanAjar
      dataBahanAjar.push(itemBaru);

      // Manipulasi DOM: append baris baru ke tabel secara langsung
      tambahBarisTabelDOM(itemBaru, dataBahanAjar.length);

      closeModal("modalTambahStok");
      formTambahStok.reset();

      showCustomAlert("Bahan Ajar '" + namaBarang + " (" + kodeBarang + ")' berhasil ditambahkan ke stok!", "Stok Ditambahkan", "✅");
    });
  }

  // Filter / live search stok bahan ajar
  var searchStokInput = document.getElementById("searchStok");
  if (searchStokInput) {
    searchStokInput.addEventListener("input", function (e) {
      var query = e.target.value.toLowerCase();
      var rows = document.querySelectorAll("#tabelBahanAjar tbody tr");

      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        if (text.includes(query)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
}

/**
 * Render keseluruhan data dummy dataBahanAjar ke dalam elemen <table>
 */
function renderTabelStok() {
  var tbody = document.querySelector("#tabelBahanAjar tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (typeof dataBahanAjar !== "undefined" && dataBahanAjar.length > 0) {
    dataBahanAjar.forEach(function (item, index) {
      tambahBarisTabelDOM(item, index + 1);
    });
  } else {
    tbody.innerHTML = "<tr><td colspan='8' style='text-align: center; padding: 20px;'>Belum ada data bahan ajar.</td></tr>";
  }
}

/**
 * Menambahkan baris tabel bahan ajar menggunakan manipulasi DOM murni
 */
function tambahBarisTabelDOM(item, nomor) {
  var tbody = document.querySelector("#tabelBahanAjar tbody");
  if (!tbody) return;

  var tr = document.createElement("tr");

  // Status ketersediaan stok
  var pillClass = "stock-pill stock-high";
  var statusLabel = "Aman";
  if (item.stok <= 180) {
    pillClass = "stock-pill stock-low";
    statusLabel = "Menipis";
  } else if (item.stok <= 300) {
    pillClass = "stock-pill stock-med";
    statusLabel = "Sedang";
  }

  // Format kolom tabel
  tr.innerHTML =
    "<td><strong>" + nomor + "</strong></td>" +
    "<td><img src='" + item.cover + "' alt='Cover " + item.namaBarang + "' class='book-cover-cell' onerror=\"this.src='img/pengantar_komunikasi.jpg'\"></td>" +
    "<td><code>" + item.kodeLokasi + "</code></td>" +
    "<td><strong>" + item.kodeBarang + "</strong></td>" +
    "<td>" + item.namaBarang + "</td>" +
    "<td><span style='background:#E2E8F0; padding:2px 8px; border-radius:4px; font-size:0.8rem;'>" + item.jenisBarang + "</span></td>" +
    "<td>Edisi " + item.edisi + "</td>" +
    "<td><span class='" + pillClass + "'>" + item.stok + " (" + statusLabel + ")</span></td>";

  tbody.appendChild(tr);
}
