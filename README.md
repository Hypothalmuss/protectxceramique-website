# ProtectX — site statique

## Mettre en place les images
Copiez vos 3 photos dans le dossier `images/` en conservant exactement ces noms :

- `images/1.jpeg`
- `images/22.jpeg`
- `images/wdfe.jpeg`

Elles sont déjà référencées partout dans le site (hero, avant/après, galerie, Instagram, Studio). Tant qu'elles ne sont pas ajoutées, les emplacements s'affichent comme des images cassées — c'est normal.

## Lancer le site en local
Aucune installation requise. Ouvrez `index.html` dans un navigateur, ou lancez un petit serveur local pour éviter les restrictions de certains navigateurs :

```bash
cd protectx
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000`.

## Structure
```
protectx/
├── index.html      Accueil
├── services.html    Céramique / Lustrage / Nettoyage approfondi
├── gallery.html      Galerie avant/après + portfolio filtrable
├── about.html         Le studio
├── contact.html        Réservation, WhatsApp, plan
├── faq.html             Questions fréquentes
├── css/style.css
├── js/main.js
└── images/  (1.jpeg, 22.jpeg, wdfe.jpeg à ajouter)
```

## À personnaliser avant mise en ligne
- Coordonnées GPS précises dans les blocs `<iframe>` Google Maps (actuellement une recherche texte "El Mourouj 6, Tunisie").
- Tarifs indicatifs des formules céramique (page Services) — actuellement "Sur devis".
- Le formulaire de réservation (`contact.html`) est câblé côté front uniquement : branchez-le sur un service d'envoi (Formspree, backend, e-mail) pour recevoir réellement les demandes.
- Lien du profil Google Avis (actuellement une recherche Google générique).
