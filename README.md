# TravelTips Frontend

Le projet TravelTips est une application web conçue pour offrir des conseils et astuces de voyage aux utilisateurs. Ce README fournit des instructions pour configurer l'environnement de développement et lancer le projet en utilisant Docker et VSCode Dev Containers.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Docker](https://docs.docker.com/get-docker/)
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [VSCode Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Configuration de l'Environnement de Développement

1. **Cloner le Projet**

   Ouvrez un terminal et clonez le dépôt git en utilisant la commande suivante :

   ```bash
   git clone https://github.com/HugoD66/TravelTips-frontend.git

   ```

2. **Naviguez dans le dossier du projet :**

cd TravelTips-frontend
Ouvrir avec VSCode

Ouvrez le dossier du projet dans VSCode. Vous pouvez le faire depuis le terminal avec :

code .

3. **Lancer le Dev Container**

Avec le projet ouvert dans VSCode, une notification devrait apparaître vous suggérant d'ouvrir le projet dans un conteneur. Sélectionnez "Reopen in Container" pour construire et ouvrir le projet dans le Dev Container. Si la notification n'apparaît pas, vous pouvez ouvrir la commande palette (Cmd+Shift+P sur macOS, Ctrl+Shift+P sur Windows/Linux) et chercher "Remote-Containers: Reopen in Container".

4. **Lancer le Projet**

Une fois dans le conteneur, vous pouvez lancer l'application en exécutant :

npm start

Votre application devrait maintenant être accessible sur http://localhost:3000.

## Structure du Projet

src/ : Contient le code source de l'application.

public/ : Contient les fichiers statiques publics, comme le index.html.

.devcontainer/ : Contient la configuration du Dev Container pour VSCode.

Dockerfile : Définit l'environnement Docker pour l'application.

## Developpeurs

Mélina MITTERRAND

Maurane HUGON

Hugo DESSAUW
