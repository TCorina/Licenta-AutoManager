# Corina Trușculescu - Facultatea de Automatică si Calculatoare - Secțiunea Informatică - Sesiunea Iunie 2025

# AutoManager

Aceasta lucrare își propune să dezvolte o aplicație web intuitivă și eficientă, destinată proprietarilor de autovehicule, care să centralizeze toate informațiile esențiale legate de vehiculul propriu. Aplicația oferă funcționalități precum crearea unui cont, adăugarea unui vehicul său mai multe, ștergerea său editarea informațiilor vehiculului, notificări în aplicație înainte de expirarea termenelor. Printr-un design intuitiv realizat cu tehnologii noi precum Material UI, aplicația oferă o experiență ușor de utilizat și adaptată nevoilor cotidiene ale utilizatorilor auto.

## Backend - Applicatie Kotlin + Spring + MongoDB - Ghid de rulare

Acest ghid descrie pașii necesari pentru a deschide și rula o aplicație Kotlin folosind IntelliJ IDEA.

---

### Cerințe

- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (Community sau Ultimate)
- [Java Development Kit (JDK)](https://adoptium.net/) – Java 11 sau mai nou
- [MongoDB](https://www.mongodb.com/try/download/community) - MongoDB Server
- Plugin Kotlin instalat în IntelliJ (de obicei vine preinstalat)


### Pornirea bazei de date MongoDB (local, fără Docker)

#### 1. Instalare MongoDB

- Accesează: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Descarcă și instalează versiunea potrivită sistemului tău de operare (Windows, macOS sau Linux).
- Asigură-te că bifezi opțiunea de a include `MongoDB Shell (mongosh)` în timpul instalării.
- (Opțional) Instalează și MongoDB Compass – interfață grafică pentru gestionarea datelor.

---

#### 2. Creează directorul de stocare a datelor (doar Linux/macOS)

MongoDB are nevoie de un folder unde să stocheze datele (default: `/data/db`):

```bash
sudo mkdir -p /data/db
sudo chown -R $(whoami) /data/db
```

Pe Windows, acest pas nu este necesar – folderul C:\data\db este creat automat.

#### 3. Pornește serverul MongoDB

Rulează comanda în terminal pentru a porni serviciul MongoDB:

```bash
mongod
```

### Pornirea rularea aplicației Kotlin în IntelliJ IDEA

#### 1. Deschiderea proiectului în IntelliJ IDEA

1. Deschide IntelliJ IDEA.
2. Selectează `File` > `Open...`.
3. Navighează către folderul proiectului și apasă `OK`.
4. Asigură-te că ai instalat plugin-ul **Kotlin** și folosești o versiune actualizată de IntelliJ IDEA.

---

#### 2. Configurarea JDK-ului (dacă este necesar)

1. Mergi la `File` > `Project Structure` (`Ctrl + Alt + Shift + S`).
2. În tab-ul `Project`, selectează o versiune validă de JDK (ex: **Java 17**).
3. Apasă `OK` pentru a salva modificările.

---

####  3. Rularea aplicației

1. Deschide fișierul `Licenta-AutoManager\backend\src\main\kotlin\com\corina\auto_manager\AutoManagerApplication.kt`.
2. Apasă pe butonul ▶️ din stânga rândului cu `main()`  
   **sau** click dreapta în fișier și selectează `Run`.



## Frontend - Applicatie React + MUI

Acest ghid descrie pașii necesari pentru a porni local aplicația React.

---


### 1. Cerințe preliminare

Asigură-te că ai instalate următoarele:

- [Node.js](https://nodejs.org/) (versiunea recomandată este LTS)
- [npm](https://www.npmjs.com/) sau [Yarn](https://yarnpkg.com/)
- Un terminal (CMD, PowerShell, Terminal, etc.)

---

### 2. Instalare dependențe

Navighează în directorul proiectului și rulează:

```bash
npm install
```

### 3. Rulare aplicație în modul dezvoltare


```bash
npm run dev
```

Aplicația va fi deschisă automat în browser la:

```bash
http://localhost:5173/
```

