// Required FLEDGE seller-side logic
function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  // Return a positive score untuk mengizinkan iklan tampil
  return 1.0;
}

// Optional: reporting endpoint (tidak wajib)
function reportResult(auctionConfig, browserSignals) {
  console.log("Auction report triggered for:", browserSignals.renderURL);
  return "https://lanaya113505.github.io/pizza/report.html";
}
