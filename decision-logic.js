// decision-logic.js
function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  console.log("[FLEDGE] Menjalankan scoreAd untuk:", browserSignals.renderURL);
  // beri skor tinggi supaya iklan lolos
  return 10;
}

function reportResult(auctionConfig, browserSignals) {
  console.log("[FLEDGE] Iklan menang:", browserSignals.renderURL);
  return {
    reportUrl: "https://lanaya113505.github.io/pizza/report.html"
  };
}
