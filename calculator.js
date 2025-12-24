// Données des tarifs - seront chargées depuis les CSV
let tarifsData = {};
let currentCountry = '';

// Constantes
const FIXED_FEES = 2.05;
const PREMIUM_FEE = 30;
const TARGET_FEE = 15;
const RDV_FEE = 5;
const GAZOLE_PART = 0.25; // 25% de part énergie dans le tarif transport
const GAZOLE_REFERENCE = 1.1618;

// Charger les tarifs depuis les CSV
async function loadTarifs() {
    const countries = ['BE', 'DE', 'ES', 'IT', 'NL'];
    
    for (const country of countries) {
        try {
            const response = await fetch(`/tarifs_${country}_WIDE_NATIVE.csv`);
            if (!response.ok) {
                console.error(`Erreur HTTP ${response.status} pour ${country}`);
                continue;
            }
            const text = await response.text();
            tarifsData[country] = parseCSV(text);
            console.log(`✅ Tarifs ${country} chargés:`, tarifsData[country].length, 'zones');
        } catch (error) {
            console.error(`❌ Erreur chargement tarifs ${country}:`, error);
        }
    }
    
    // Charger aussi la France si le fichier existe
    try {
        const response = await fetch('/tarifs_FR_WIDE_NATIVE.csv');
        if (response.ok) {
            const text = await response.text();
            tarifsData['FR'] = parseCSV(text);
            console.log('✅ Tarifs FR chargés:', tarifsData['FR'].length, 'zones');
        }
    } catch (error) {
        console.log('ℹ️ Pas de tarifs France disponibles');
        // Créer des données de test pour la France
        tarifsData['FR'] = generateFrenchTestData();
    }
}

// Parser CSV
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            const value = values[index];
            // Convertir les nombres
            if (index >= 3 && value) {
                row[header] = parseFloat(value) || 0;
            } else {
                row[header] = value;
            }
        });
        
        data.push(row);
    }
    
    return data;
}

// Générer des données de test pour la France
function generateFrenchTestData() {
    const departments = [
        { zone: 'FR - 35', region: 'Ille et Vilaine' },
        { zone: 'FR - 75', region: 'Paris' },
        { zone: 'FR - 13', region: 'Marseille' },
        { zone: 'FR - 69', region: 'Lyon' },
        { zone: 'FR - 33', region: 'Bordeaux' }
    ];
    
    const testData = [];
    departments.forEach(dept => {
        const row = {
            Pays: 'FR',
            Zone: dept.zone,
            Région: dept.region,
            'MIN 200': 47.13,
            '201 300': 57.35,
            '301 400': 68.82,
            '401 500': 81.88,
            '501 600': 94.72,
            '601 700': 107.38,
            '701 800': 119.83,
            '801 900': 129.83,
            '901 1000': 139.68,
            '1001 1200': 152.16,
            '1201 1400': 175.22,
            '1401 1600': 197.99,
            '1601 1800': 205.01,
            '1801 2000': 211.9,
            '2001 2500': 252.74,
            '2500 MAX': 298.86
        };
        testData.push(row);
    });
    
    return testData;
}

// Mettre à jour les régions selon le pays sélectionné
function updateRegions() {
    const country = document.getElementById('country').value;
    const regionSelect = document.getElementById('region');
    
    currentCountry = country;
    regionSelect.innerHTML = '<option value="">Chargement...</option>';
    
    if (!country) {
        regionSelect.innerHTML = '<option value="">Sélectionnez d\'abord un pays</option>';
        return;
    }
    
    if (!tarifsData[country]) {
        regionSelect.innerHTML = '<option value="">Erreur: Tarifs non disponibles</option>';
        return;
    }
    
    regionSelect.innerHTML = '<option value="">Sélectionnez une zone</option>';
    
    tarifsData[country].forEach((row, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${row.Zone} - ${row.Région}`;
        regionSelect.appendChild(option);
    });
    
    calculate();
}

// Calculer le montant total
function calculate() {
    const country = document.getElementById('country').value;
    const regionIndex = document.getElementById('region').value;
    const weightColumn = document.getElementById('weight').value; // Maintenant c'est directement la colonne CSV
    const gazoilRate = parseFloat(document.getElementById('gazoilRate').value) || 0;
    
    const premium = document.getElementById('premium').checked;
    const target = document.getElementById('target').checked;
    const rdv = document.getElementById('rdv').checked;
    
    if (!country || regionIndex === '' || !tarifsData[country] || !weightColumn) {
        updateDisplay(0, 0, 0, 0, premium, target, rdv, false);
        return;
    }
    
    const regionData = tarifsData[country][parseInt(regionIndex)];
    
    if (!regionData || !regionData[weightColumn]) {
        console.error('Tarif non trouvé pour:', country, regionIndex, weightColumn);
        updateDisplay(0, 0, 0, 0, premium, target, rdv, false);
        return;
    }
    
    // Tarif de base depuis la grille
    const baseRate = regionData[weightColumn];
    
    // Calculer le montant gazole
    const gazoilAmount = baseRate * GAZOLE_PART * (gazoilRate / 100);
    
    // Frais fixes
    const fixedFees = FIXED_FEES;
    
    // Options
    let optionsTotal = 0;
    if (premium) optionsTotal += PREMIUM_FEE;
    if (target) optionsTotal += TARGET_FEE;
    if (rdv) optionsTotal += RDV_FEE;
    
    // IDF (pour la France uniquement, départements 75, 77, 78, 91, 92, 93, 94, 95)
    const isIDF = country === 'FR' && regionData.Zone && ['75', '77', '78', '91', '92', '93', '94', '95'].some(dept => regionData.Zone.includes(dept));
    
    // Total
    const total = baseRate + gazoilAmount + fixedFees + optionsTotal;
    
    updateDisplay(total, baseRate, fixedFees, gazoilAmount, premium, target, rdv, isIDF);
}

// Mettre à jour l'affichage
function updateDisplay(total, baseRate, fixedFees, gazoilAmount, premium, target, rdv, idf) {
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    document.getElementById('baseRate').textContent = baseRate.toFixed(2);
    document.getElementById('fixedFees').textContent = fixedFees.toFixed(2);
    document.getElementById('gasoilAmount').textContent = gazoilAmount.toFixed(2);
    
    document.getElementById('premiumValue').textContent = premium ? PREMIUM_FEE.toFixed(2) + '€' : '-';
    document.getElementById('targetValue').textContent = target ? TARGET_FEE.toFixed(2) + '€' : '-';
    document.getElementById('rdvValue').textContent = rdv ? RDV_FEE.toFixed(2) + '€' : '-';
    document.getElementById('idfValue').textContent = idf ? 'Oui' : '-';
}

// Toggle theme (pour plus tard)
function toggleTheme() {
    // À implémenter si besoin
    console.log('Theme toggle');
}

// Initialiser au chargement de la page
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Chargement des tarifs...');
    await loadTarifs();
    console.log('Tarifs chargés:', Object.keys(tarifsData));
    
    // Calculer avec les valeurs par défaut
    calculate();
});
