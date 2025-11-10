// decision-logic.js
function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  // Semua ad dikasih skor positif biar lolos
  console.log("Menjalankan scoreAd untuk:", browserSignals.renderURL);
  return 1;
}

function reportResult(auctionConfig, browserSignals) {
  console.log("Ad menang:", browserSignals.renderURL);
  return {
    reportUrl: "https://lanaya113505.github.io/pizza/report.html"
  };
}
