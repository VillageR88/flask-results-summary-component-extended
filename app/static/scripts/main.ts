const val1 = document.getElementById('PLT') as HTMLElement;
const val1li = document.getElementById('PLTli') as HTMLElement;
const val2 = document.getElementById('TTFB') as HTMLElement;
const val2li = document.getElementById('TTFBli') as HTMLElement;
const val3 = document.getElementById('DCL') as HTMLElement;
const val3li = document.getElementById('DCLli') as HTMLElement;
const val4 = document.getElementById('FCP') as HTMLElement;
const val4li = document.getElementById('FCPli') as HTMLElement;
const totalScore = document.getElementById('totalScore') as HTMLElement;
const comment1 = document.getElementById('comment1') as HTMLElement;
const comment2 = document.getElementById('comment2') as HTMLElement;

let pageLoadTimeScore = 0;
let ttfbScore = 0;
let domContentLoadedScore = 0;
let fcpScore = 0;

function calculateScore(value: number, max: number): number {
    return Math.max(0, Math.min(100, (100 - (value / max) * 100)));
}

function updateTotalScore() {
    const scores = [pageLoadTimeScore, ttfbScore, domContentLoadedScore, fcpScore];
    const validScores = scores.filter(score => score > 0);
    const averageScore = validScores.reduce((acc, score) => acc + score, 0) / validScores.length;
    totalScore.textContent = `${Math.floor(averageScore)}`;
    if (Number(totalScore.textContent) < 50) {
        comment1.textContent = 'Your website performance needs improvement.';
        comment2.textContent = 'Consider using tools like Lighthouse or PageSpeed Insights to identify issues and optimize performance.';
    } else if (Number(totalScore.textContent) < 80) {
        comment1.textContent = 'Your website performance is average.';
        comment2.textContent = 'To enhance speed, you might want to optimize various aspects of your site. Tools like Lighthouse and PageSpeed Insights can provide valuable suggestions.';
    } else {
        comment1.textContent = 'Great job!';
        comment2.textContent = 'Your website is performing well. Keep up the good work!';
    }
}

window.addEventListener('load', () => {
    const pageLoadTime = performance.now() - performance.timing.navigationStart;
    pageLoadTimeScore = Math.floor(calculateScore(pageLoadTime, 3000)); // Assuming 3000ms as the worst case
    val1.textContent = `${pageLoadTimeScore}`;
    val1li.setAttribute('title', `Page Load Time ${pageLoadTime.toFixed(2)} ms`);
    const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
    ttfbScore = Math.floor(calculateScore(ttfb, 1000)); // Assuming 1000ms as the worst case
    val2.textContent = `${ttfbScore}`;
    val2li.setAttribute('title', `Time to First Byte ${ttfb} ms`);
    const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    domContentLoadedScore = Math.floor(calculateScore(domContentLoaded, 5000)); // Assuming 5000ms as the worst case
    val3.textContent = `${domContentLoadedScore}`;
    val3li.setAttribute('title', `DOM Content Loaded ${domContentLoaded} ms`);
    updateTotalScore();
});

new PerformanceObserver((entryList) => {
    const [fcpEntry] = entryList.getEntriesByName('first-contentful-paint');
    if (fcpEntry) {
        fcpScore = Math.floor(calculateScore(fcpEntry.startTime, 2000)); // Assuming 2000ms as the worst case
        val4.textContent = `${fcpScore}`;
        val4li.setAttribute('title', `First Contentful Paint ${fcpEntry.startTime.toFixed(2)} ms`);
        updateTotalScore();
    }
}).observe({ type: 'paint', buffered: true });

