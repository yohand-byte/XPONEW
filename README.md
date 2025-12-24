# Calculateur XPO Europe - Qualiwatt

Calculateur de prix de transport XPO pour les destinations européennes.

## 🌍 Pays supportés

- 🇫🇷 France
- 🇧🇪 Belgique
- 🇩🇪 Allemagne
- 🇪🇸 Espagne
- 🇮🇹 Italie
- 🇳🇱 Pays-Bas

## ✨ Fonctionnalités

- **Sélection du pays** : Choisissez la destination parmi 6 pays européens
- **Zones détaillées** : Plus de 400 zones différentes avec tarifs spécifiques
- **Tranches de poids** : De 0,5 à 8+ tranches (0-2500+ kg)
- **Options** :
  - Premium : +30€
  - Target : +15€
  - Prise de RDV : +5€
- **Calcul automatique** :
  - Tarif grille selon zone et poids
  - Frais fixes : 2,05€
  - Surcharge gazole personnalisable
  - Détection IDF automatique (France uniquement)

## 📊 Structure des tarifs

Les tarifs sont organisés par :
1. **Pays** (BE, DE, ES, IT, NL, FR)
2. **Zone** (ex: BE - 10, DE - 01)
3. **Région** (ex: Bruxelles, Dresden)
4. **Tranche de poids** (16 tranches disponibles)

## 🚀 Déploiement sur Vercel

### Option 1 : Via Git (recommandé)

```bash
# 1. Initialiser le repo git
git init
git add .
git commit -m "Initial commit - Calculator XPO Europe"

# 2. Pousser vers GitHub
git remote add origin https://github.com/yohand-byte/XPONEW.git
git branch -M main
git push -u origin main

# 3. Connecter à Vercel
# Aller sur vercel.com, importer le repo, et déployer
```

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 🛠️ Développement local

```bash
# Installer un serveur HTTP simple
npm install -g http-server

# Lancer le serveur
http-server -p 3000 -o

# Ou utiliser Python
python3 -m http.server 3000
```

## 📝 Configuration

### Modifier les frais fixes

Dans `calculator.js`, ligne 9 :
```javascript
const FIXED_FEES = 2.05;
```

### Modifier les options

Dans `calculator.js`, lignes 10-12 :
```javascript
const PREMIUM_FEE = 30;
const TARGET_FEE = 15;
const RDV_FEE = 5;
```

### Modifier le taux de gazole par défaut

Dans `index.html`, ligne 137 :
```html
<input type="number" id="gazoilRate" value="5.79" step="0.01">
```

## 🎨 Personnalisation

### Couleurs Qualiwatt

Les couleurs sont définies dans le CSS :
- Bleu principal : `#1e3a8a`
- Vert (résultats) : `#10b981`

### Ajouter un nouveau pays

1. Ajouter le fichier CSV : `tarifs_XX_WIDE_NATIVE.csv`
2. Ajouter l'option dans le select (index.html, ligne 163)
3. Ajouter le pays dans la liste de chargement (calculator.js, ligne 30)

## 📦 Fichiers inclus

- `index.html` - Interface utilisateur
- `calculator.js` - Logique de calcul
- `package.json` - Configuration NPM
- `vercel.json` - Configuration Vercel
- `tarifs_*.csv` - Fichiers de tarifs par pays
- `README.md` - Documentation

## 🐛 Résolution de problèmes

### Les tarifs ne se chargent pas

Vérifiez que :
1. Les fichiers CSV sont bien présents
2. Le serveur est lancé (pas juste en ouvrant index.html)
3. La console du navigateur pour voir les erreurs

### Le calcul est à 0€

Vérifiez que :
1. Un pays est sélectionné
2. Une zone est sélectionnée
3. Une tranche de poids est sélectionnée

### Erreur 404 sur Vercel

Vérifiez que :
1. Le fichier `vercel.json` est présent
2. Tous les fichiers CSV sont dans le repo
3. Le build s'est terminé sans erreur

## 📄 Licence

MIT - Qualiwatt © 2025

---

**Développé avec ❤️ pour Qualiwatt par Claude & Yohan**
