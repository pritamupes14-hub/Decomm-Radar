document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulation Logic
    const overlay = document.getElementById('simulation-overlay');
    const dashboard = document.getElementById('dashboard');
    const terminal = document.getElementById('terminal');
    const progressBar = document.getElementById('progress-bar');
    const refreshBtn = document.getElementById('refresh-scan-btn');

    function runSimulation() {
        overlay.classList.remove('hidden');
        overlay.classList.remove('fade-out');
        dashboard.classList.add('hidden');
        terminal.innerHTML = '';
        progressBar.style.width = '0%';
        
        let delay = 0;
        
        scanLogs.forEach((log, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = 'terminal-line';
                if(log.includes('[SUCCESS]')) p.classList.add('success');
                p.textContent = log;
                terminal.appendChild(p);
                terminal.scrollTop = terminal.scrollHeight;
                
                // Update progress bar
                const progress = ((index + 1) / scanLogs.length) * 100;
                progressBar.style.width = `${progress}%`;
                
            }, delay);
            delay += 600 + Math.random() * 400; // Random delay between prints
        });

        // Hide overlay and show dashboard after simulation completes
        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.classList.add('hidden');
                dashboard.classList.remove('hidden');
                initDashboard();
            }, 1000);
        }, delay + 500);
    }

    refreshBtn.addEventListener('click', runSimulation);

    // Initial Run
    runSimulation();

    // 2. Dashboard Logic
    let charts = {}; // To store chart instances for destroying on update

    function initDashboard(filterSector = "all") {
        const filteredData = filterSector === "all" ? mockData : mockData.filter(d => d.sector === filterSector);
        
        updateKPIs(filteredData);
        renderCharts(filteredData);
        renderTable(filteredData);
    }

    function updateKPIs(data) {
        document.getElementById('kpi-total-assets').textContent = data.length;
        
        const totalValue = data.reduce((sum, item) => sum + item.value, 0);
        document.getElementById('kpi-total-value').textContent = `€${totalValue} Mil`;

        // Top Sector
        const counts = data.reduce((acc, curr) => {
            acc[curr.sector] = (acc[curr.sector] || 0) + 1;
            return acc;
        }, {});
        const topSector = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "--");
        document.getElementById('kpi-top-sector').textContent = topSector;

        // Critical in Next 12 months (Year 2027 based on mock data base year 2026)
        const criticalCount = data.filter(d => d.year === 2027).length;
        document.getElementById('kpi-critical').textContent = criticalCount;
    }

    // Chart Global Defaults for Dark Mode
    Chart.defaults.color = '#666666';
    Chart.defaults.font.family = "'Inter', sans-serif";

    function renderCharts(data) {
        const bgColors = {
            'Oil & Gas': 'rgba(50, 101, 170, 0.8)', /* Blue */
            'Wind': 'rgba(76, 180, 230, 0.8)', /* Light Blue */
            'Petrochemical': 'rgba(153, 53, 132, 0.8)', /* Pink */
            'Chemical': 'rgba(119, 110, 169, 0.8)', /* Medium Purple */
            'Bioenergy': 'rgba(224, 4, 78, 0.8)' /* Evalueserve Red */
        };
        const borderColors = {
            'Oil & Gas': '#3265aa',
            'Wind': '#4cb4e6',
            'Petrochemical': '#993584',
            'Chemical': '#776ea9',
            'Bioenergy': '#e0044e'
        };

        // Cleanup old charts
        if(charts.timeline) charts.timeline.destroy();
        if(charts.sector) charts.sector.destroy();
        if(charts.country) charts.country.destroy();

        // 1. Timeline Chart (Line)
        const yearCounts = data.reduce((acc, curr) => {
            acc[curr.year] = (acc[curr.year] || 0) + 1;
            return acc;
        }, {});
        
        const years = Object.keys(yearCounts).sort();
        const counts = years.map(y => yearCounts[y]);

        const ctxTime = document.getElementById('timelineChart').getContext('2d');
        charts.timeline = new Chart(ctxTime, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Assets Reaching EOL',
                    data: counts,
                    borderColor: '#e0044e',
                    backgroundColor: 'rgba(224, 4, 78, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e0044e',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
                    x: { grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });

        // 2. Sector Chart (Doughnut)
        const sectorCounts = data.reduce((acc, curr) => {
            acc[curr.sector] = (acc[curr.sector] || 0) + 1;
            return acc;
        }, {});

        const ctxSector = document.getElementById('sectorChart').getContext('2d');
        charts.sector = new Chart(ctxSector, {
            type: 'doughnut',
            data: {
                labels: Object.keys(sectorCounts),
                datasets: [{
                    data: Object.values(sectorCounts),
                    backgroundColor: Object.keys(sectorCounts).map(s => bgColors[s]),
                    borderColor: Object.keys(sectorCounts).map(s => borderColors[s]),
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#666666' } }
                }
            }
        });

        // 3. Country Chart (Bar)
        const countryCounts = data.reduce((acc, curr) => {
            acc[curr.country] = (acc[curr.country] || 0) + 1;
            return acc;
        }, {});
        
        const countries = Object.keys(countryCounts).sort((a,b) => countryCounts[b] - countryCounts[a]);
        const cCounts = countries.map(c => countryCounts[c]);

        const ctxCountry = document.getElementById('countryChart').getContext('2d');
        charts.country = new Chart(ctxCountry, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Number of Assets',
                    data: cCounts,
                    backgroundColor: 'rgba(50, 101, 170, 0.8)',
                    borderColor: '#3265aa',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
                    x: { grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    function renderTable(data) {
        const tbody = document.getElementById('asset-table-body');
        tbody.innerHTML = '';

        data.forEach(item => {
            const tr = document.createElement('tr');
            
            let badgeClass = '';
            if(item.sector === 'Oil & Gas') badgeClass = 'oil';
            if(item.sector === 'Wind') badgeClass = 'wind';
            if(item.sector === 'Petrochemical') badgeClass = 'petrochemical';
            if(item.sector === 'Chemical') badgeClass = 'chemical';
            if(item.sector === 'Bioenergy') badgeClass = 'bioenergy';

            let riskClass = '';
            if(item.risk === 'Critical') riskClass = 'risk-critical';
            if(item.risk === 'High') riskClass = 'risk-high';
            if(item.risk === 'Medium') riskClass = 'risk-medium';
            if(item.risk === 'Low') riskClass = 'risk-low';

            tr.innerHTML = `
                <td>
                    <span class="risk-indicator ${riskClass}" title="Risk: ${item.risk}"></span>
                    <strong>${item.name}</strong>
                </td>
                <td><span class="sector-badge ${badgeClass}">${item.sector}</span></td>
                <td>${item.country}</td>
                <td>${item.year}</td>
                <td>€${item.value}M</td>
                <td><button class="action-btn" data-id="${item.id}">Analyze</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Re-render dashboard
            const filter = e.target.getAttribute('data-filter');
            initDashboard(filter);
        });
    });

    // 3. Modal Logic & MBB Analysis
    const modal = document.getElementById('analysis-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Event delegation for Analyze buttons
    document.getElementById('asset-table-body').addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = mockData.find(d => d.id === itemId);
            if (item) {
                openAnalysisModal(item);
            }
        }
    });

    function getMBBAnalysis(item) {
        return `
            <p><strong>Strategic Context:</strong> The ${item.name} facility located in ${item.country} represents a core legacy asset within the ${item.sector} portfolio. With its operational life projected to conclude by ${item.year}, the asset triggers critical regulatory and environmental compliance mandates.</p>
            <p><strong>Financial Implications:</strong> The estimated remediation liability of €${item.value}M poses a significant CAPEX/OPEX drain. Proactive decommissioning planning is required to optimize vendor contracting and mitigate inflationary pressures on dismantling costs.</p>
            <p><strong>Risk Assessment:</strong> Assessed as a <strong>${item.risk} Risk</strong> priority. Deferred action exacerbates structural integrity risks and potential regulatory liabilities, which could result in severe reputational damage and punitive fines.</p>
            <p><strong>Recommendation:</strong> Initiate Front-End Engineering Design (FEED) for the decommissioning phase immediately. Engage specialized advisory to evaluate circular economy avenues (e.g. materials recycling) to partially offset the overall operational closure costs.</p>
        `;
    }

    function openAnalysisModal(item) {
        document.getElementById('modal-asset-name').textContent = item.name + " - Action Plan";
        document.getElementById('modal-analysis-text').innerHTML = getMBBAnalysis(item);
        modal.classList.remove('hidden');
    }

    // 4. Sidebar Navigation Logic
    const navOverview = document.getElementById('nav-overview');
    const navAssets = document.getElementById('nav-assets');
    const navSectors = document.getElementById('nav-sectors');
    const navExport = document.getElementById('nav-export');
    const navBtns = [navOverview, navAssets, navSectors, navExport];

    function setActiveNav(btn) {
        navBtns.forEach(b => b.parentElement.classList.remove('active'));
        if(btn && btn !== navExport) btn.parentElement.classList.add('active');
    }

    navOverview.addEventListener('click', () => {
        setActiveNav(navOverview);
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
    });

    navSectors.addEventListener('click', () => {
        setActiveNav(navSectors);
        const section = document.getElementById('section-sectors');
        document.querySelector('.main-content').scrollTo({
            top: section.offsetTop - 30,
            behavior: 'smooth'
        });
    });

    navAssets.addEventListener('click', () => {
        setActiveNav(navAssets);
        const section = document.getElementById('section-assets');
        document.querySelector('.main-content').scrollTo({
            top: section.offsetTop - 30,
            behavior: 'smooth'
        });
    });

    navExport.addEventListener('click', () => {
        // Trigger CSV Download
        setActiveNav(navOverview); 
        
        // Build CSV string
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Asset Name,Sector,Country,Decommissioning Year,Estimated Value (Mil EUR),Risk Status\\n";
        
        mockData.forEach(function(row) {
            // encapsulate strings in quotes in case of commas
            const rowStr = `"${row.name}","${row.sector}","${row.country}",${row.year},${row.value},"${row.risk}"`;
            csvContent += rowStr + "\\n";
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Target_Assets_Decommissioning_Report.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
    });

});
