function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  // Semua iklan kita kasih skor 1 biar lolos
  return 1;
}

function reportResult(auctionConfig, browserSignals) {
  // Logging sederhana
  console.log("Ad menang:", browserSignals.renderURL);
  return { reportUrl: "https://lanaya113505.github.io/pizza/report.html" };
}
