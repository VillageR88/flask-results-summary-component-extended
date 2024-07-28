"use strict";
var val1 = document.getElementById('PLT');
var val1li = document.getElementById('PLTli');
var val2 = document.getElementById('TTFB');
var val2li = document.getElementById('TTFBli');
var val3 = document.getElementById('DCL');
var val3li = document.getElementById('DCLli');
var val4 = document.getElementById('FCP');
var val4li = document.getElementById('FCPli');
var totalScore = document.getElementById('totalScore');
var comment1 = document.getElementById('comment1');
var comment2 = document.getElementById('comment2');
var pageLoadTimeScore = 0;
var ttfbScore = 0;
var domContentLoadedScore = 0;
var fcpScore = 0;
function calculateScore(value, max) {
    return Math.max(0, Math.min(100, (100 - (value / max) * 100)));
}
function updateTotalScore() {
    var scores = [pageLoadTimeScore, ttfbScore, domContentLoadedScore, fcpScore];
    var validScores = scores.filter(function (score) { return score > 0; });
    var averageScore = validScores.reduce(function (acc, score) { return acc + score; }, 0) / validScores.length;
    totalScore.textContent = "".concat(Math.floor(averageScore));
    if (Number(totalScore.textContent) < 50) {
        comment1.textContent = 'Poor';
        comment2.textContent = 'Use tools like Lighthouse and PageSpeed Insights to optimize various aspects of your site.';
    }
    else if (Number(totalScore.textContent) < 80) {
        comment1.textContent = 'Average';
        comment2.textContent = 'Use tools like Lighthouse and PageSpeed Insights to optimize various aspects of your site.';
    }
    else {
        comment1.textContent = 'Great job!';
        comment2.textContent = 'Your website is performing well. Keep up the good work!';
    }
}
window.addEventListener('load', function () {
    var pageLoadTime = performance.now() - performance.timing.navigationStart;
    pageLoadTimeScore = Math.floor(calculateScore(pageLoadTime, 3000)); // Assuming 3000ms as the worst case
    val1.textContent = "".concat(pageLoadTimeScore);
    val1li.setAttribute('title', "Page Load Time ".concat(pageLoadTime.toFixed(2), " ms"));
    var ttfb = performance.timing.responseStart - performance.timing.navigationStart;
    ttfbScore = Math.floor(calculateScore(ttfb, 1000)); // Assuming 1000ms as the worst case
    val2.textContent = "".concat(ttfbScore);
    val2li.setAttribute('title', "Time to First Byte ".concat(ttfb, " ms"));
    var domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    domContentLoadedScore = Math.floor(calculateScore(domContentLoaded, 5000)); // Assuming 5000ms as the worst case
    val3.textContent = "".concat(domContentLoadedScore);
    val3li.setAttribute('title', "DOM Content Loaded ".concat(domContentLoaded, " ms"));
    updateTotalScore();
});
new PerformanceObserver(function (entryList) {
    var fcpEntry = entryList.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
        fcpScore = Math.floor(calculateScore(fcpEntry.startTime, 2000)); // Assuming 2000ms as the worst case
        val4.textContent = "".concat(fcpScore);
        val4li.setAttribute('title', "First Contentful Paint ".concat(fcpEntry.startTime.toFixed(2), " ms"));
        updateTotalScore();
    }
}).observe({ type: 'paint', buffered: true });
