// worker-fs-bypass.js
self.onmessage = async (e) => {
  try {
    // Coba akses StorageManager → dapatkan sandboxed file system
    // Di Chromium, ini memanggil StorageManagerFileSystemAccess::getDirectory()
    const root = await navigator.storage.getDirectory();

    // Jika sampai sini → BERARTI BUG ADA!
    // Kita punya akses ke sandboxed file system TANPA IZIN

    // Coba tulis file
    const file = await root.getFileHandle('bypass_test.txt', { create: true });
    const writable = await file.createWritable();
    await writable.write('[BUG] Akses file tanpa izin via worker!');
    await writable.close();

    // Baca kembali
    const read = await file.getFile();
    const text = await read.text();

    self.postMessage({
      success: true,
      message: '✅ Bypass berhasil! File ditulis tanpa izin.',
      content: text
    });

  } catch (err) {
    self.postMessage({
      success: false,
      message: '❌ Gagal: ' + (err.message || err.toString())
    });
  }
};
