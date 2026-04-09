const mockData = [
    // Oil & Gas 
    { id: 1, name: "Brent Delta Platform", sector: "Oil & Gas", country: "UK", year: 2027, value: 450, status: "Planned", risk: "High" },
    { id: 2, name: "Statfjord A", sector: "Oil & Gas", country: "Norway", year: 2028, value: 600, status: "Review", risk: "High" },
    { id: 3, name: "Dan F Platform", sector: "Oil & Gas", country: "Denmark", year: 2029, value: 210, status: "Planned", risk: "Medium" },
    { id: 4, name: "Gullfaks C Subsea", sector: "Oil & Gas", country: "Norway", year: 2027, value: 320, status: "Approved", risk: "High" },
    { id: 5, name: "Rough Gas Storage", sector: "Oil & Gas", country: "UK", year: 2028, value: 180, status: "Planned", risk: "Medium" },
    { id: 6, name: "K12-B Platform", sector: "Oil & Gas", country: "Netherlands", year: 2030, value: 140, status: "Early Warning", risk: "Low" },
    { id: 7, name: "Ninian Northern", sector: "Oil & Gas", country: "UK", year: 2027, value: 410, status: "Active", risk: "High" },
    { id: 8, name: "Oseberg A", sector: "Oil & Gas", country: "Norway", year: 2030, value: 380, status: "Planned", risk: "Medium" },
    { id: 9, name: "Troll A Jacket", sector: "Oil & Gas", country: "Norway", year: 2031, value: 520, status: "Review", risk: "High" },
    { id: 10, name: "Valhall Flank", sector: "Oil & Gas", country: "Norway", year: 2027, value: 150, status: "Approved", risk: "Low" },

    // Wind (Early Gen)
    { id: 11, name: "Vindeby Offshore", sector: "Wind", country: "Denmark", year: 2027, value: 45, status: "Repowering", risk: "Low" },
    { id: 12, name: "Blyth Offshore", sector: "Wind", country: "UK", year: 2028, value: 65, status: "Evaluating", risk: "Low" },
    { id: 13, name: "Yttre Stengrund", sector: "Wind", country: "Sweden", year: 2027, value: 35, status: "Dismantling", risk: "Low" },
    { id: 14, name: "Utgrunden 1", sector: "Wind", country: "Sweden", year: 2029, value: 55, status: "Planned", risk: "Medium" },
    { id: 15, name: "Lely Wind Farm", sector: "Wind", country: "Netherlands", year: 2028, value: 40, status: "Repowering", risk: "Low" },
    { id: 16, name: "Horns Rev 1 (Ph 1)", sector: "Wind", country: "Denmark", year: 2031, value: 120, status: "Early Warning", risk: "Medium" },
    { id: 17, name: "North Hoyle", sector: "Wind", country: "UK", year: 2030, value: 85, status: "Planned", risk: "Low" },
    { id: 18, name: "Scroby Sands", sector: "Wind", country: "UK", year: 2029, value: 70, status: "Review", risk: "Medium" },
    { id: 19, name: "Middelgrunden", sector: "Wind", country: "Denmark", year: 2028, value: 50, status: "Repowering", risk: "Low" },
    { id: 20, name: "Alpha Ventus", sector: "Wind", country: "Germany", year: 2029, value: 90, status: "Approved", risk: "Medium" },

    // Petrochemical
    { id: 21, name: "Rotterdam Olefins #1", sector: "Petrochemical", country: "Netherlands", year: 2027, value: 180, status: "Planned", risk: "Critical" },
    { id: 22, name: "Antwerp Cracker 2", sector: "Petrochemical", country: "Belgium", year: 2028, value: 210, status: "Review", risk: "High" },
    { id: 23, name: "Grangemouth Ph 1", sector: "Petrochemical", country: "UK", year: 2029, value: 145, status: "Early Warning", risk: "High" },
    { id: 24, name: "Gelsenkirchen Ethylene", sector: "Petrochemical", country: "Germany", year: 2027, value: 260, status: "Approved", risk: "Critical" },
    { id: 25, name: "Fawley Polymers Unit", sector: "Petrochemical", country: "UK", year: 2028, value: 130, status: "Planned", risk: "Medium" },
    { id: 26, name: "Tarragona Cracker", sector: "Petrochemical", country: "Spain", year: 2030, value: 190, status: "Review", risk: "High" },
    { id: 27, name: "Gonfreville Base", sector: "Petrochemical", country: "France", year: 2029, value: 175, status: "Planned", risk: "Medium" },
    { id: 28, name: "Wilhelmshaven PVC", sector: "Petrochemical", country: "Germany", year: 2027, value: 140, status: "Active", risk: "High" },
    { id: 29, name: "Brindisi Ethylene Base", sector: "Petrochemical", country: "Italy", year: 2031, value: 220, status: "Early Warning", risk: "Medium" },
    { id: 30, name: "Priolo Gargallo Ph 2", sector: "Petrochemical", country: "Italy", year: 2028, value: 160, status: "Planned", risk: "High" },

    // Chemical
    { id: 31, name: "Ludwigshafen Base Chem 3", sector: "Chemical", country: "Germany", year: 2027, value: 110, status: "Planned", risk: "Medium" },
    { id: 32, name: "Chempark Dormagen site A", sector: "Chemical", country: "Germany", year: 2028, value: 85, status: "Review", risk: "Medium" },
    { id: 33, name: "Marl Chemical Park Area 4", sector: "Chemical", country: "Germany", year: 2029, value: 135, status: "Planned", risk: "High" },
    { id: 34, name: "Runcorn Chlorine Plant", sector: "Chemical", country: "UK", year: 2027, value: 200, status: "Approved", risk: "Critical" },
    { id: 35, name: "Lyon South Complex", sector: "Chemical", country: "France", year: 2030, value: 140, status: "Early Warning", risk: "Medium" },
    { id: 36, name: "Botlek Chlorine 2", sector: "Chemical", country: "Netherlands", year: 2028, value: 165, status: "Planned", risk: "High" },
    { id: 37, name: "Teesside Aromatics", sector: "Chemical", country: "UK", year: 2027, value: 125, status: "Active", risk: "Medium" },
    { id: 38, name: "Le Havre Ammonia Unit", sector: "Chemical", country: "France", year: 2029, value: 95, status: "Review", risk: "Low" },
    { id: 39, name: "Tarragona Specialty", sector: "Chemical", country: "Spain", year: 2028, value: 80, status: "Planned", risk: "Low" },
    { id: 40, name: "Geleen Nitrogen 1", sector: "Chemical", country: "Netherlands", year: 2031, value: 155, status: "Early Warning", risk: "High" },

    // Bioenergy
    { id: 41, name: "Piteå BioMass Unit", sector: "Bioenergy", country: "Sweden", year: 2028, value: 45, status: "Evaluating", risk: "Low" },
    { id: 42, name: "Kalundborg Symbiosis Bio", sector: "Bioenergy", country: "Denmark", year: 2027, value: 55, status: "Planned", risk: "Medium" },
    { id: 43, name: "Aarhus Bio-Pellet Gen 1", sector: "Bioenergy", country: "Denmark", year: 2029, value: 35, status: "Review", risk: "Low" },
    { id: 44, name: "Ghent Bio-Refinery Alpha", sector: "Bioenergy", country: "Belgium", year: 2028, value: 65, status: "Planned", risk: "Low" },
    { id: 45, name: "Drax Early Gen Biomass", sector: "Bioenergy", country: "UK", year: 2030, value: 120, status: "Early Warning", risk: "Medium" },
    { id: 46, name: "Rotterdam Biodiesel 1", sector: "Bioenergy", country: "Netherlands", year: 2027, value: 85, status: "Approved", risk: "Medium" },
    { id: 47, name: "Neste Porvoo Bio Gen 1", sector: "Bioenergy", country: "Finland", year: 2029, value: 75, status: "Planned", risk: "Low" },
    { id: 48, name: "Eemshaven Bio Hub", sector: "Bioenergy", country: "Netherlands", year: 2031, value: 90, status: "Review", risk: "Low" },
    { id: 49, name: "Lübeck Biomass Incinerator", sector: "Bioenergy", country: "Germany", year: 2028, value: 50, status: "Planned", risk: "Medium" },
    { id: 50, name: "Västerås Bio-Gen A", sector: "Bioenergy", country: "Sweden", year: 2027, value: 40, status: "Active", risk: "Low" },
    { id: 51, name: "Marseille Bio-fuel Unit", sector: "Bioenergy", country: "France", year: 2029, value: 60, status: "Evaluating", risk: "Low" }
];

const scanLogs = [
    "[SYSTEM] Initiating Global Gemini OS v4.2",
    "[NETWORK] Interfacing with European Environmental Agency Databanks... OK",
    "[SCRAPER] Querying North Sea Transition Authority (NSTA) records...",
    "[SCRAPER] Parsing European Chemical Industry Council (Cefic) databases...",
    "[SCRAPER] Scanning Petrochemical Site Registers...",
    "[SCRAPER] Reviewing Bioenergy Europe plant lifecycle data...",
    "[SCRAPER] Analyzing WindEurope end-of-life turbine reports...",
    "[AI-LOGIC] Cross-referencing environmental compliance deadlines...",
    "[AI-LOGIC] Filtering out nuclear assets per user compliance guardrails...",
    "[AI-LOGIC] Identifying assets with 1-5 year remediation windows...",
    "[CALCULATING] Estimating remediation values based on historic indices...",
    "[SUCCESS] Yield: 51 high-priority targets mapped. Rendering dashboard."
];

const mockNews = [
    {
        id: 1,
        title: "Decommissioning journey commences for Germany's first offshore wind farm",
        source: "OffshoreWind.biz",
        link: "https://www.offshorewind.biz/2025/11/19/decommissioning-journey-commences-for-germanys-first-offshore-wind-farm/",
        date: "2025-11-19",
        category: "End-of-Asset Life",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 2,
        title: "UK regulator NSTA orders decommissioning plans for aging Southern North Sea gas fields as permits expire",
        source: "EnergyVoice",
        link: "https://www.energyvoice.com/?s=NSTA+decommissioning+Southern+North+Sea",
        date: "2026-03-12",
        category: "Permit End",
        sector: "Oil & Gas",
        country: "United Kingdom"
    },
    {
        id: 3,
        title: "BASF signals potential closure and dismantling of older chemical plants at Ludwigshafen site by 2027",
        source: "ChemicalWatch",
        link: "https://chemicalwatch.com/search?q=BASF+Ludwigshafen+decommissioning+closure",
        date: "2026-02-28",
        category: "Decommissioning Announcement",
        sector: "Chemical",
        country: "Germany"
    },
    {
        id: 4,
        title: "Dutch Government announces acceleration of North Sea wind park dismantling to free up critical zones",
        source: "RechargeNews",
        link: "https://www.rechargenews.com/search?q=Dutch+Government+North+Sea+wind+park+dismantling",
        date: "2026-01-15",
        category: "Regulatory Update",
        sector: "Wind",
        country: "Netherlands"
    },
    {
        id: 5,
        title: "Ineos initiates review for potential scale-down and decommissioning of legacy cracker units in Grangemouth",
        source: "PetroChem Weekly",
        link: "https://www.petrochemical-weekly.com/?s=Ineos+Grangemouth+decommissioning",
        date: "2025-12-04",
        category: "Decommissioning Announcement",
        sector: "Petrochemical",
        country: "United Kingdom"
    },
    {
        id: 6,
        title: "EnQuest accelerates timeline to decommission Heather and Thistle platforms ahead of 2026 deadlines",
        source: "Upstream Online",
        link: "https://www.upstreamonline.com/search?q=EnQuest+Heather+Thistle+decommissioning",
        date: "2026-04-02",
        category: "End-of-Asset Life",
        sector: "Oil & Gas",
        country: "United Kingdom"
    }
];

const mockTenders = [
    {
        id: 1,
        title: "IWB civil engineering work for gas decommissioning",
        source: "Tender Impulse (Iwb industrial werke basel)",
        link: "https://tenderimpulse.com/government-tenders/switzerland/iwb-civil-engineering-work-for-gas-decommissioning-12263741",
        date: "2026-03-20",
        category: "Civil Engineering",
        sector: "Oil & Gas",
        country: "Switzerland"
    },
    {
        id: 2,
        title: "Finalrave for first German offshore wind farm: Vattenfall starts preparing decommissioning tender",
        source: "OffshoreWind.biz",
        link: "https://www.offshorewind.biz/2025/10/10/finalrave-for-first-german-offshore-wind-farm-as-vattenfall-starts-preparing-decommissioning-tender/",
        date: "2025-10-10",
        category: "Dismantling",
        sector: "Wind",
        country: "Germany"
    },
    {
        id: 3,
        title: "Provision of Heavy Lift Vessel Services for Statfjord A Platform Decommissioning",
        source: "GlobalTenders",
        link: "https://www.globaltenders.com/search?q=Heavy+Lift+Vessel+Services+Statfjord+A+Platform+Decommissioning",
        date: "2026-04-05",
        category: "Heavy Lift",
        sector: "Oil & Gas",
        country: "Norway"
    },
    {
        id: 4,
        title: "Demolition and Site Clearance of Petrochemical Units at Antwerp Port",
        source: "European Procurement Portal",
        link: "https://ted.europa.eu/en/tender-search?q=Demolition+Site+Clearance+Petrochemical+Units+Antwerp+Port",
        date: "2026-01-22",
        category: "Demolition",
        sector: "Petrochemical",
        country: "Belgium"
    },
    {
        id: 5,
        title: "Environmental Remediation and Waste Management Services for Rotterdam Olefins #1",
        source: "Tender Impulse",
        link: "https://tenderimpulse.com/search?q=Environmental+Remediation+Rotterdam+Olefins",
        date: "2026-02-14",
        category: "Waste Management",
        sector: "Chemical",
        country: "Netherlands"
    },
    {
        id: 6,
        title: "Onshore Recycling Facility Contracting for Turbine Blades - Middelgrunden",
        source: "Danish Government Procurement",
        link: "https://ted.europa.eu/en/tender-search?q=Onshore+Recycling+Facility+Contracting+Turbine+Blades+Middelgrunden",
        date: "2025-12-05",
        category: "Recycling",
        sector: "Wind",
        country: "Denmark"
    }
];
