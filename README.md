<div align="center">

  # MH Assistant

  <img src="https://deploy-badge.vercel.app/vercel/mh-assistant-app?style=for-the-badge" alt="Vercel Deploy"><br>
  <img src="https://img.shields.io/github/languages/top/Alex-M-2013/MH-Assistant?style=for-the-badge&logo=javascript" alt="Top Language">
  <img src="https://img.shields.io/github/repo-size/Alex-M-2013/MH-Assistant?style=for-the-badge&logo=github" alt="Repo Size">

  __Link:__ https://mh-assistant-app.vercel.app/

  An assistant app containing info about Monsters from various Monster Hunter games. <br>
  Includes info from: Wilds, Rise/Sunbreak, World/Iceborne and GU.

  <img src="./docs/screenshots/dark theme.png" alt="Dark Theme">
</div>

## Features
- View monster info from: Wilds, Rise/Sunbreak, World/Iceborne and GU
- Mobile friendly
- Dark and Light themes

## Running the project
  
### Requirements:
- [NodeJS](https://nodejs.org/en)

### Steps:
1. Clone the repo:
```
git clone https://github.com/Alex-M-2013/MH-Assistant.git
```
> If you don't have Git, click the "Code" button at the top and click "Download ZIP" then extract its contents
2. In the project root, run: 
```
npm i
```
3. Run the App:  
```
npm run dev
```
4. View the app at [localhost:5173](http://localhost:5173)


## Credits

### Inspired By: 
- [NMS Assistant](https://nmsassistant.com/)
- [MHGU Database](https://github.com/gatheringhallstudios/MHGenDatabase)

### Libraries/Tools used:
- [Deploy Badge Generator](https://deploy-badge.vercel.app)
- [JSONC Parser](https://www.npmjs.com/package/jsonc-parser)
- [Toastify JS](https://github.com/apvarun/toastify-js)

### Data from:
- __Wilds data:__ [Monster Hunter Wilds API](https://docs.wilds.mhdb.io/)
- __*Rise/Sunbreak Data:__ https://github.com/Neryss/monster_hunter_db/blob/master/rise_monster_db.json
- __World/Iceborne Data:__ [Monster Hunter World API](https://docs.mhw-db.com)
- __**MHGU Data pulled from:__ https://github.com/gatheringhallstudios/MHGenDatabase/blob/develop/app/src/main/assets/databases/mhgu.db.zip

### Icons From:
- __Wilds, Rise and World:__ Pulled from game files
- __MHGU:__ https://github.com/gatheringhallstudios/MHGenDatabase/tree/develop/app/src/main/icon-res/drawable
- __Other icons:__ [Bootstrap Icons](https://icons.getbootstrap.com/)
<br><br>

> _*Some monsters were missing, so I used Claude to add them. I did check the data manually, but there may be minor inaccuracies._ <br> <br>
> _Missing Monsters:_
> - _Chaotic Gore Magala_
> - _Velkhana_ 
> - _Risen Kushala Daora_ 
> - _Risen Teostra_ 
> - _Risen Crimson Glow Valstrax_ 
> - _Amatsu_ 
> - _Risen Shagaru Magala_ 
>- _Primordial Malzeno_ 

>_**Claude was used to convert the database tables into JSON format._
