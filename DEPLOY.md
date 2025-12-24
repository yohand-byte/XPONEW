# 🚀 Guide de Déploiement Express - 5 minutes

## Méthode 1 : Upload Direct (LA PLUS SIMPLE) ⚡

1. **Télécharge tout le dossier** `calculator-xpo-europe` sur ton PC

2. **Va sur Vercel.com**
   - Crée un compte (ou connecte-toi)
   - Clique sur "Add New..." → "Project"

3. **Drag & Drop**
   - Fais glisser le dossier complet dans Vercel
   - Attends 30 secondes
   - ✅ C'EST EN LIGNE !

---

## Méthode 2 : Via GitHub (recommandé si tu connais) 🐙

### Étape 1 : Pousser vers GitHub

```bash
cd calculator-xpo-europe
git init
git add .
git commit -m "Calculator XPO Europe v2.0"
git branch -M main
git remote add origin https://github.com/yohand-byte/XPONEW.git
git push -u origin main
```

### Étape 2 : Connecter à Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Clique sur "Import Project"
3. Sélectionne ton repo GitHub
4. Clique sur "Deploy"
5. ✅ C'EST EN LIGNE !

---

## Méthode 3 : Vercel CLI (pour les pros) 💻

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd calculator-xpo-europe
vercel --prod
```

---

## 🔥 Script Automatique

J'ai créé un script qui fait tout automatiquement :

```bash
cd calculator-xpo-europe
./deploy.sh
```

Le script va :
- ✅ Initialiser Git
- ✅ Configurer le remote GitHub
- ✅ Pousser le code
- ✅ Te donner les instructions Vercel

---

## ⚙️ Configuration Vercel

Si Vercel te demande des paramètres :

- **Framework Preset** : Other
- **Build Command** : (laisser vide)
- **Output Directory** : (laisser vide)
- **Install Command** : (laisser vide)

---

## 🧪 Tester en local AVANT de déployer

```bash
cd calculator-xpo-europe

# Option 1 : Python
python3 -m http.server 3000

# Option 2 : NPM
npx http-server -p 3000

# Option 3 : PHP
php -S localhost:3000
```

Puis ouvre : http://localhost:3000

---

## 🐛 Problèmes courants

### "Les tarifs ne se chargent pas"
➡️ Normal si tu ouvres juste index.html en double-cliquant
➡️ Solution : Lance un serveur (voir ci-dessus)

### "404 sur Vercel"
➡️ Vérifie que `vercel.json` est bien présent
➡️ Vérifie que tous les fichiers CSV sont dans le repo

### "Calcul à 0€"
➡️ Sélectionne un pays, une zone, et une tranche de poids

---

## 📞 Besoin d'aide ?

Si ça coince :
1. Vérifie la console du navigateur (F12)
2. Regarde les logs Vercel
3. Contacte-moi avec le message d'erreur

---

## 🎉 C'est prêt !

Ton calculateur est maintenant prêt à être déployé.
**Temps estimé : 3-5 minutes** ⏱️

**URL finale** : `https://ton-projet.vercel.app`

---

*Créé avec ❤️ pour Qualiwatt*
