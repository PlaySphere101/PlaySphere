/* Complete script.js
   - Paste this into your script.js and reload the page.
   - Keeps favorites/ratings/recents while updating the game list.
*/

/* ---------- Storage keys & migration ---------- */
const CURRENT_GAMES_KEY = 'mgz_games_v3';           // main games key (new)
const LEGACY_GAMES_KEYS = ['mgz_games_v1', 'mgz_games_v2']; // older keys to check
const FAV_KEY = 'mgz_favs_v1';
const RECENT_KEY = 'mgz_recent_v1';
const RATING_KEY = 'mgz_ratings_v1';

/* ---------- Small helper for placeholder images ---------- */
function sampleImage(id) {
  const seed = String(id).split('').reduce((s,c)=> s + c.charCodeAt(0), 0) % 1000;
  return `https://picsum.photos/seed/${seed}/800/480`;
}

/* ---------- Your editable game list (replace / add games here) ---------- */
const sampleGames = [
  {
    id: 'pt1', title: 'Jungle Jump', category: 'Platform', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/junglejump300.webp',
    embed: 'https://cdn.htmlgames.com/JungleJump/index.html',
  },
  {id: 'pt2',title: 'Frozen For Christmas',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/frozenforchristmas300200.webp',
    embed: 'https://cdn.htmlgames.com/FrozenForChristmas/index.html',
  },
  {id: 'pt3',title: 'Acid Rain',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/acidrain300200.webp',
    embed: 'https://cdn.htmlgames.com/AcidRain/index.html',
  },
  {id: 'pt4',title: 'Monkey In Trouble',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/monkeyIntrouble300200.webp',
    embed: 'https://cdn.htmlgames.com/MonkeyInTrouble/index.html',},
  {id: 'pt5',title: 'Frenzy Farm',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/frenzyfarm300200.webp',
    embed: 'https://cdn.htmlgames.com/FrenzyFarm/index.html',},
  {id: 'pt6',title: 'Goblin Run',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/goblinrun300200.webp',
    embed: 'https://cdn.htmlgames.com/GoblinRun/index.html',},
  {id: 'pt7',title: 'Alice In Wonder land',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/aliceInwonderland300200.webp',
    embed: 'https://cdn.htmlgames.com/AliceInWonderland/index.html',},
  {id: 'pt8',title: 'Dragon Run',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dragonrun300x200.webp',
    embed: 'https://cdn.htmlgames.com/DragonRun/index.html',},  
   {id: 'pt9',title: 'Neon Jump',category: 'Platform',
    thumb: 'https://www.htmlgames.com/uploaded/game/thumb/neonjump300200.webp',
    embed: 'https://cdn.htmlgames.com/NeonJump/index.html',},
  {id: 'pt10',title: 'Catch The Thief',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/catchthethief300200.webp',
    embed: 'https://cdn.htmlgames.com/CatchTheThief/index.html',},
  {id: 'pt11',title: 'Stay In The Dark',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/stayinthedark300200.webp',
    embed: 'https://cdn.htmlgames.com/StayInTheDark/index.html',},
  {id: 'pt12',title: 'Space Escape',category: 'Platform',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/spaceescape300200.webp',
    embed: 'https://cdn.htmlgames.com/SpaceEscape/index.html',},
  {id: 'sh1',title: 'Bottle Shooter',category: 'Shooting & War',
    thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bottleshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/BottleShooter/index.html',},
  {id: 'sh2',title: 'Soldier Attack 2',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/soldierattack2300200.webp',
    embed: 'https://cdn.htmlgames.com/SoldierAttack2/index.html',},
  {id: 'sh3',title: 'Airport Sniper',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/airportsniper300200.webp',
    embed: 'https://cdn.htmlgames.com/AirportSniper/index.html',},
  { id: 'sh4',title: 'Galaxy Shooter',category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/galaxyshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/GalaxyShooter/index.html',},
  {id: 'sh5',title: 'Soldier Attack 1', category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/soldierattack1300200.webp',
    embed: 'https://cdn.htmlgames.com/SoldierAttack1/index.html',},
  {id: 'sh6',title: 'Master Archer',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/archer300200.webp',
    embed: 'https://cdn.htmlgames.com/Archer/index.html',},
  {id: 'sh7',title: 'Archery Training',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/acherytraining300200.webp',
    embed: 'https://cdn.htmlgames.com/ArcheryTraining/index.html',},
  {id: 'sh8',title: 'Circus Shooter',category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/circusshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/CircusShooter/index.html',},
  {id: 'sh9',title: 'Ninja Darts', category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/ninjadarts300200.webp',
    embed: 'https://cdn.htmlgames.com/NinjaDarts/index.html',},
  {id: 'sh10',title: 'Sword Hit',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/swordhit300200.webp',
    embed: 'https://cdn.htmlgames.com/SwordHit/index.html',},
  {id: 'sh11',title: 'Winter Attack',category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/winterattack300200.webp',
    embed: 'https://cdn.htmlgames.com/WinterAttack/index.html',},
  {id: 'sh12',title: 'Rocket Tap', category: 'Shooting & War',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/rockettap300.webp',
    embed: 'https://cdn.htmlgames.com/RocketTap/index.html',},
  {id: 'sh13', title: 'Jungle Sniper', category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/junglesniper300200.webp',
    embed: 'https://cdn.htmlgames.com/JungleSniper/index.html',},
  {id: 'sh14',title: 'Soldier Attack 3', category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/soldierattack3300200.webp',
    embed: 'https://cdn.htmlgames.com/SoldierAttack3/index.html',},
  {id: 'sh15',title: 'Saloon Shootout',category: 'Shooting & War', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/saloonshootout300.webp',
    embed: 'https://cdn.htmlgames.com/SaloonShootout/index.html',},
  {id: 'sp1',title: 'Dutch Shuffleboard ', category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dutchshuffleboard300200.webp',
    embed: 'https://cdn.htmlgames.com/DutchShuffleboard/index.html',},
  {id: 'sp2', title: 'Maya Golf 2', category: 'Sports', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mayagolf2300200.webp',
    embed: 'https://cdn.htmlgames.com/MayaGolf2/index.html',},
  {id: 'sp3',title: 'Downhill',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/downhill300200.webp',
    embed: 'https://cdn.htmlgames.com/Downhill/index.html',},
  {id: 'sp4',title: 'Tennis',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tennis300200.webp',
    embed: 'https://cdn.htmlgames.com/Tennis/index.html',},
  {id: 'sp5',title: 'AirHockey',category: 'Sports', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/airhockey300200.webp',
    embed: 'https://cdn.htmlgames.com/AirHockey/index.html',},
  {id: 'sp6',title: 'Basketball Legend',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/basketballlegend300200.webp',
    embed: 'https://cdn.htmlgames.com/BasketballLegend/index.html',},
  {id: 'sp7',title: 'Bowling',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bowling300200.webp',
    embed: 'https://cdn.htmlgames.com/Bowling/index.html',},
  {id: 'sp8', title: 'Soccer Pinball', category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/soccerpinball300200.webp',
    embed: 'https://cdn.htmlgames.com/SoccerPinball/index.html',},
  {id: 'sp9',title: 'Maya Golf',category: 'Sports', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mayagolf300200.webp',
    embed: 'https://cdn.htmlgames.com/MayaGolf/index.html',},
  {id: 'sp10',title: 'Giant Slalom',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/giantslalom300200.webp',
    embed: 'https://cdn.htmlgames.com/GiantSlalom/index.html',},
  {id: 'sp11', title: 'Around The World Darts', category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/aroundtheworlddarts300200.webp',
    embed: 'https://cdn.htmlgames.com/AroundTheWorldDarts/index.html',},
  {id: 'sp12',title: 'Ski Slalom',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/skislalom300200.webp',
    embed: 'https://cdn.htmlgames.com/SkiSlalom/index.html',},
  {id: 'sp13',title: 'Table Soccer',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tablesoccer300200.webp',
    embed: 'https://cdn.htmlgames.com/TableSoccer/index.html',},
  {id: 'sp14',title: 'Baseball',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/baseball300200.webp',
    embed: 'https://cdn.htmlgames.com/Baseball/index.html', },
  { id: 'sp15', title: 'Downhill Ski', category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/downhillski300200.webp',
    embed: 'https://cdn.htmlgames.com/DownhillSki/index.html',},
  {id: 'sp16',title: 'Mini Golf',category: 'Sports', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/minigolf300200.webp',
    embed: 'https://cdn.htmlgames.com/MiniGolf/index.html',},
  {id: 'sp17',title: 'Summer Beach',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/summerbeach300200.webp',
    embed: 'https://cdn.htmlgames.com/SummerBeach/index.html',},
  {id: 'sp18',title: 'Dunk Balls',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dunkballs300200.webp',
    embed: 'https://cdn.htmlgames.com/DunkBalls/index.html',},
  {id: 'sp19',title: 'Table Shuffleboard',category: 'Sports',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tableshuffleboard300200.webp',
    embed: 'https://cdn.htmlgames.com/TableShuffleboard/index.html',},
  {id: 'bs1',title: 'Marble Shooter',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/marbleshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/MarbleShooter/index.html',},
  {id: 'bs2',title: 'Love Bubbles',category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/lovebubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/LoveBubbles/index.html',},
  {id: 'bs3',title: 'Christmas Bubbles',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/christmasbubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/ChristmasBubbles/index.html',},
  {id: 'bs4',title: 'Bubble Monster', category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubblemonster300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleMonster/index.html',},
  {id: 'bs5',title: 'Bubble Shooter',category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubble_shooter300200.webp',
    embed: 'https://cdn.htmlgames.com/Bubble_Shooter/index.html',},
  { id: 'bs6',title: 'Winter Bubble',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/winterbubble300200.webp',
    embed: 'https://cdn.htmlgames.com/WinterBubble/index.html',},
  {id: 'bs7',title: '4 Seasons Bubbles',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/4seasonsbubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/4SeasonsBubbles/index.html',},
  {id: 'bs8',title: 'Forest Bubbles',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/forestbubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/ForestBubbles/index.html',},
  {id: 'bs9', title: 'Sweet Candy', category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/sweetcandy300.webp',
    embed: 'https://cdn.htmlgames.com/SweetCandy/index.html',},
  {id: 'bs10',title: 'Neon Bubble', category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/neonbubble-300200.webp',
    embed: 'https://cdn.htmlgames.com/NeonBubble/index.html',},
  { id: 'bs11', title: 'Maya Bubbles', category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mayabubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/MayaBubbles/index.html',},
  {id: 'bs12',title: 'Bubble Buster',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubblebuster300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleBuster/index.html',},
  {id: 'bs13',title: 'Bubble Wheel',category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubblewheel300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleWheel/index.html',},
  {id: 'bs14',title: 'Fruit Bubble',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/fruitbubble300200.webp',
    embed: 'https://cdn.htmlgames.com/FruitBubble/index.html',},
  {id: 'bs15',title: 'Egyptian Marbles', category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/egyptianmarbles300200.webp',
    embed: 'https://cdn.htmlgames.com/EgyptianMarbles/index.html',},
  {id: 'bs16',title: 'Forest Bubble Shooter', category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/forestbubbleshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/ForestBubbleShooter/index.html',},
  {id: 'bs17',title: 'Bubble Shooter',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubbleshooter-300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleShooter/index.html',},
  {id: 'bs18',title: 'Ghost Bubbles',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/ghostbubbles300200.webp',
    embed: 'https://cdn.htmlgames.com/GhostBubbles/index.html',},
  {id: 'bs19',title: 'Frozen Bubble',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/frozenbubble300200.webp',
    embed: 'https://cdn.htmlgames.com/FrozenBubble/index.html',},
  {id: 'bs20',title: 'Bubble Zoobies',category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubblezoobies300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleZoobies/index.html',},
  {id: 'bs21',title: 'Cupid Bubble',category: 'Bubble Shooter', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/cupidbubble300.webp',
    embed: 'https://cdn.htmlgames.com/CupidBubble/index.html',},
  {id: 'bs22',title: 'Classic Bubble Shooter',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/classicbubbleshooter300200.webp',
    embed: 'https://cdn.htmlgames.com/ClassicBubbleShooter/index.html',},
  {id: 'bs23',title: 'Muffin Fun',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/muffinfun300200.webp',
    embed: 'https://cdn.htmlgames.com/MuffinFun/index.html',},
  {id: 'bs24',title: 'Bubble Billiards',category: 'Bubble Shooter',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bubblebilliards300200.webp',
    embed: 'https://cdn.htmlgames.com/BubbleBilliards/index.html',},
  {id: 'ma1',title: 'Flower World 2',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/flowerworld2-300x200.webp',
    embed: 'https://cdn.htmlgames.com/FlowerWorld2/index.html',},
  { id: 'ma2', title: 'Christmas Match 3', category: 'Match 3', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/christmasmatch3300200.webp',
    embed: 'https://cdn.htmlgames.com/ChristmasMatch3/index.html',},
  { id: 'ma3', title: 'Chocolate Match',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/chocolatematch300200.webp',
    embed: 'https://cdn.htmlgames.com/ChocolateMatch/index.html',},
  {id: 'ma4',title: 'Emoji Match', category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/emojimatch300200.webp',
    embed: 'https://cdn.htmlgames.com/EmojiMatch/index.html',},
  {id: 'ma5',title: 'Jittles',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jittles300.webp',
    embed: 'https://cdn.htmlgames.com/Jittles/index.html',},
  {id: 'ma6', title: 'Kill The Virus', category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/killthevirus300200.webp',
    embed: 'https://cdn.htmlgames.com/KillTheVirus/index.html',},
  {id: 'ma7',title: 'Forgotten Relics', category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/forgottenrelics300200.webp',
    embed: 'https://cdn.htmlgames.com/ForgottenRelics/index.html',},
  {id: 'ma8',title: 'Crystal Fairy',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/crystalfairy300.webp',
    embed: 'https://cdn.htmlgames.com/CrystalFairy/index.html',},
  {id: 'ma9',title: 'Wizard Jewels',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/wizardjewels300200.webp',
    embed: 'https://cdn.htmlgames.com/WizardJewels/index.html',},
  { id: 'ma10',title: 'laddin And The Magic Lamp', category: 'Match 3', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/aladdinandthemagiclamp300200.webp',
    embed: 'https://cdn.htmlgames.com/AladdinAndTheMagicLamp/index.html',},
  {id: 'ma11',title: 'KingsGold',category: 'Match 3', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/kingsgold300200.webp',
    embed: 'https://cdn.htmlgames.com/KingsGold/index.html',},
  {id: 'ma12',title: 'Treasures Of Atlantis', category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/treasuresofatlantis300200.webp',
    embed: 'https://cdn.htmlgames.com/TreasuresOfAtlantis/index.html',},
  {id: 'ma13',title: 'ButterflyMatch3',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/butterflymatch3300200.webp',
    embed: 'https://cdn.htmlgames.com/ButterflyMatch3/index.html',},
  {id: 'ma14',title: 'Flower World',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/flowerworld300200.webp',
    embed: 'https://cdn.htmlgames.com/FlowerWorld/index.html',},
  {id: 'ma15',title: 'Fruit Flip Match 3',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/fruitflipmatch3300200.webp',
    embed: 'https://cdn.htmlgames.com/FruitFlipMatch3/index.html',},
  { id: 'ma16', title: 'Match 3 Rabbits',category: 'Match 3', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/match3rabbits300200.webp',
    embed: 'https://cdn.htmlgames.com/Match3Rabbits/index.html',},
  {id: 'ma17',title: 'Happy Bees', category: 'Match 3', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/happybees300200.webp',
    embed: 'https://cdn.htmlgames.com/HappyBees/index.html',},
  {id: 'ma18',title: 'Princess Jewels', category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/princess-jewels-300.webp',
    embed: 'https://cdn.htmlgames.com/PrincessJewels/index.html',},
  {id: 'ma19',title: 'Bumble Tumble',category: 'Match 3',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bumbletumble300200.webp',
    embed: 'https://cdn.htmlgames.com/BumbleTumble/index.html',},
  {id: 'ho1',title: 'Street Hidden Objects',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/streethiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/StreetHiddenObjects/index.html',},
  {id: 'ho2',title: 'Japanese Garden',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/japanesegarden-hiddensecrets300200.webp',
    embed: 'https://cdn.htmlgames.com/JapaneseGarden-HiddenSecrets/index.html',},
  {id: 'ho3',title: 'Find The Odd One Out',category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/findtheoddout300200.webp',
    embed: 'https://cdn.htmlgames.com/FindTheOddOneOut/index.html',},
  {id: 'ho4',title: 'HiddenSpotsCity',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hiddenspots-city300200.webp',
    embed: 'https://cdn.htmlgames.com/HiddenSpotsCity/index.html',},
  {id: 'ho5', title: 'Amsterdam Hidden Objects',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/amsterdamhiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/AmsterdamHiddenObjects/index.html',},
  {id: 'ho6',title: 'Hidden Spots Jewelry',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hiddenspots-jewelry300200.webp',
    embed: 'https://cdn.htmlgames.com/HiddenSpotsJewelry/index.html',},
  {id: 'ho7', title: 'Sydney Hidden Objects', category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/sydneyhiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/SydneyHiddenObjects/index.html',},
  {id: 'ho8',title: 'Prague Hidden Objects',category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/praquehiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/PragueHiddenObjects/index.html',},
  {id: 'ho9', title: 'Tokyo Hidden Objects', category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tokyohiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/TokyoHiddenObjects/index.html',},
  {id: 'ho10',title: 'The Palace Hotel', category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/thepalacehotel300200.webp',
    embed: 'https://cdn.htmlgames.com/ThePalaceHotel/index.html',},
  { id: 'ho11', title: 'Berlin Hidden Objects', category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/berlinhiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/BerlinHiddenObjects/index.html',},
  {id: 'ho12',title: 'Chenonceau Hidden Objects',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/chenonceauhiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/ChenonceauHiddenObjects/index.html',},
  { id: 'ho13', title: 'Garden Secrets Hidden Objects', category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/gardensecretshiddenobjects-300200.webp',
    embed: 'https://cdn.htmlgames.com/GardenSecretsHiddenObjects/index.html',},
  { id: 'ho14', title: 'The Lost Crown',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/thelostcrown300200.webp',
    embed: 'https://cdn.htmlgames.com/TheLostCrown/index.html',},
  {id: 'ho15',title: 'Hidden Spots Indonesia', category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hiddenspotsindonesia300200.webp',
    embed: 'https://cdn.htmlgames.com/HiddenSpotsIndonesia/index.html',},
  {id: 'ho16', title: 'Hidden Kitchen',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hiddenkitchen300200.webp',
    embed: 'https://cdn.htmlgames.com/HiddenKitchen/index.html',},
  {id: 'ho17',title: 'London Hidden Objects',category: 'Hidden Objects',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/londonhiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/LondonHiddenObjects/index.html',},
  {id: 'ho18',title: 'Rome Hidden Objects',category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/romehiddenobjects300200.webp',
    embed: 'https://cdn.htmlgames.com/RomeHiddenObjects/index.html',},
  { id: 'ho19',title: 'Pirates And Treasures',category: 'Hidden Objects', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/piratesandtreasures300200.webp',
    embed: 'https://cdn.htmlgames.com/PiratesAndTreasures/index.html',},
  { id: 'es1', title: 'EscapeRoom-HomeEscape',category: 'Escape ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/escaperoom-homeescape300200.webp',
    embed: 'https://cdn.htmlgames.com/EscapeRoom-HomeEscape/index.html',},
  {id: 'd1',title: 'Playground Differences',category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/playgrounddifferences300200.webp',
    embed: 'https://cdn.htmlgames.com/PlaygroundDifferences/index.html',},
  { id: 'd2', title: 'Illustrations 3', category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/illustrations3300200.webp',
    embed: 'https://cdn.htmlgames.com/Illustrations3/index.html',},
  {id: 'd3',title: 'A Day In The Museum', category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/adayinthemuseum-300200.webp',
    embed: 'https://cdn.htmlgames.com/ADayInTheMuseum/index.html',},
  { id: 'd4',title: 'Famous Paintings 1', category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/famouspaintings1300200.webp',
    embed: 'https://cdn.htmlgames.com/FamousPaintings1/index.html',},
  {id: 'd5',title: 'Famous Paintings 3',category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/famouspaintings3300200.webp',
    embed: 'https://cdn.htmlgames.com/FamousPaintings3/index.html',},
  {id: 'd6',title: 'European Cities', category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/europeancities300.webp',
    embed: 'https://cdn.htmlgames.com/EuropeanCities/index.html',},
  {id: 'd7',title: 'Famous Paintings 2',category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/famouspaintings2300200.webp',
    embed: 'https://cdn.htmlgames.com/FamousPaintings2/index.html',},
  {id: 'd8',title: 'Warehouse Hidden  Differences',category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/warehousehiddenobjects-300200.webp',
    embed: 'https://cdn.htmlgames.com/WarehouseHiddenDifferences/index.html',},
  {id: 'd9',title: 'Discover China', category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/discoverchina-300200.webp',
    embed: 'https://cdn.htmlgames.com/DiscoverChina/index.html',},
  {id: 'd10',title: 'Illustrations 2',category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/illustrations2300200.webp',
    embed: 'https://cdn.htmlgames.com/Illustrations2/index.html',},
  {id: 'd11',title: 'Restaurant Hidden Differences',category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/restauranthiddendifferences300.webp',
    embed: 'https://cdn.htmlgames.com/RestaurantHiddenDifferences/index.html',},
  {id: 'd12',title: 'Illustrations 1', category: 'Difference Games ', thumb: 'https://www.htmlgames.com/uploaded/game/thumb/illustrations1300200.webp',
    embed: 'https://cdn.htmlgames.com/Illustrations1/index.html',},
  {id: 'd13',title: 'Animal Differences', category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/animaldifferences300200.webp',
    embed: 'https://cdn.htmlgames.com/AnimalDifferences/index.html',},
  { id: 'd14', title: 'Garden Secrets',category: 'Difference Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/gardensecretsfindthedifferences300200.webp',
    embed: 'https://cdn.htmlgames.com/GardenSecretsFindTheDifferences/index.html',},
  { id: 'm1', title: 'Nikakudori',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/nikakudori300200.webp',
    embed: 'https://cdn.htmlgames.com/Nikakudori/index.html',},
    { id: 'm2', title: 'Triple Dimensions Ice Age',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/triple-dimensions-ice-age-300.webp',
    embed: 'https://cdn.htmlgames.com/TripleDimensionsIceAge/index.html',},
    { id: 'm3', title: 'Delicious Duos',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/deliciousduos300200.webp',
    embed: 'https://cdn.htmlgames.com/DeliciousDuos/index.html',},
    { id: 'm4', title: 'Mahjongg Pyramids',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mahjonggpyramids300200.webp',
    embed: 'https://cdn.htmlgames.com/MahjonggPyramids/index.html',},
    { id: 'm5', title: 'Christmas Connect',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/christmasconnect-300200.webp',
    embed: 'https://cdn.htmlgames.com/ChristmasConnect/index.html',},
    { id: 'm6', title: 'Black And White Mahjong3',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/blackandwhitemahjong3300200.webp',
    embed: 'https://cdn.htmlgames.com/BlackAndWhiteMahjong3/index.html',},
    { id: 'm7', title: 'Mahjong Titans',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mahjongg-titans-300.webp',
    embed: 'https://cdn.htmlgames.com/MahjongTitans/index.html',},
    { id: 'm8', title: 'Wallpaper Connect',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/wallpaperconnect300200.webp',
    embed: 'https://cdn.htmlgames.com/WallpaperConnect/index.html',},
    { id: 'm9', title: 'Mahjong Connect Jungle',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mahjongconnectjungle300200.webp',
    embed: 'https://cdn.htmlgames.com/MahjongConnectJungle/index.html',},
    { id: 'm10', title: 'Farm Mahjong',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/farmmahjongg300200.webp',
    embed: 'https://cdn.htmlgames.com/FarmMahjong/index.html',},
    { id: 'm11', title: 'Dark Mahjong Solitaire',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/darkmahjongsolitaire300200.webp',
    embed: 'https://cdn.htmlgames.com/DarkMahjongSolitaire/index.html',},
    { id: 'm12', title: 'Tiles Of Japan',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tilesofjapan300200.webp',
    embed: 'https://cdn.htmlgames.com/TilesOfJapan/index.html',},
    { id: 'm13', title: 'Mahjong Collection',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mahjongcollection300200.webp',
    embed: 'https://cdn.htmlgames.com/MahjongCollection/index.html',},
    { id: 'm14', title: 'Cup Of Tea Mahjong',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/cupofteamahjong300200.webp',
    embed: 'https://cdn.htmlgames.com/CupOfTeaMahjong/index.html',},
    { id: 'm15', title: 'Animals Connect',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/animalsconnect300.webp',
    embed: 'https://cdn.htmlgames.com/AnimalsConnect/index.html',},
    { id: 'm16', title: 'Jolly Jong Sands Of Egypt',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jollyjongsandsofegypt300200.webp',
    embed: 'https://cdn.htmlgames.com/JollyJongSandsOfEgypt/index.html',},
    { id: 'm17', title: 'China Temple Mahjong',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/chinatemplemahjong300200.webp',
    embed: 'https://cdn.htmlgames.com/ChinaTempleMahjong/index.html',},
    { id: 'm18', title: 'Caribbean Slide',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/caribbeanslide300200.webp',
    embed: 'https://cdn.htmlgames.com/CaribbeanSlide/index.html',},
    { id: 'm19', title: 'Mahjongg China',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mahjonggchina300200.webp',
    embed: 'https://cdn.htmlgames.com/MahjonggChina/index.html',},
    { id: 'm20', title: 'Memory Mahjong',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/memorymahjong300200.webp',
    embed: 'https://cdn.htmlgames.com/MemoryMahjong/index.html',},
    { id: 'm21', title: 'Jewels Kyodai',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jewelskyodai300200.webp',
    embed: 'https://cdn.htmlgames.com/JewelsKyodai/index.html',},
    { id: 'm22', title: 'Slidon',category: 'Mahjong ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/slidon300200.webp',
    embed: 'https://cdn.htmlgames.com/Slidon/index.html',},
    { id: 'b1', title: 'Nonogram Saga',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/nonogramsaga300200.webp',
    embed: 'https://cdn.htmlgames.com/NonogramSaga/index.html',},
    { id: 'b2', title: '4 Winds',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/4winds300200.webp',
    embed: 'https://cdn.htmlgames.com/4Winds/index.html',},
    { id: 'b3', title: 'Higher Or Lower',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/higherorLower300200.webp',
    embed: 'https://cdn.htmlgames.com/HigherOrLower/index.html',},
    { id: 'b4', title: 'Number Search',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/numbersearch300.webp',
    embed: 'https://cdn.htmlgames.com/NumberSearch/index.html',},
    { id: 'b5', title: 'BBQ Roast',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/bbqroast300200.webp',
    embed: 'https://cdn.htmlgames.com/BBQRoast/index.html',},
    { id: 'b6', title: 'Tic Tac Toe',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tictactoe300200.webp',
    embed: 'https://cdn.htmlgames.com/TicTacToe/index.html',},
    { id: 'b7', title: 'Blitz Wizards',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/blitzwizards300200.webp',
    embed: 'https://cdn.htmlgames.com/BlitzWizards/index.html',},
    { id: 'b8', title: 'Illuminate 1',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/illuminate1300.webp',
    embed: 'https://cdn.htmlgames.com/Illuminate1/index.html',},
    { id: 'b9', title: 'Illuminate 2',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/Illuminate2300.webp',
    embed: 'https://cdn.htmlgames.com/Illuminate2/index.html',},
    { id: 'b10', title: 'Illuminate 3',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/illuminate3300200.webp',
    embed: 'https://cdn.htmlgames.com/Illuminate3/index.html',},
    { id: 'b11', title: 'Swipe A Car',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/swipeacar300200.webp',
    embed: 'https://cdn.htmlgames.com/SwipeACar/index.html',},
    { id: 'b12', title: 'Honey Bee',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/honeybee300200.webp',
    embed: 'https://cdn.htmlgames.com/HoneyBee/index.html',},
    { id: 'b13', title: 'Reach 7',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/reach7300200.webp',
    embed: 'https://cdn.htmlgames.com/Reach7/index.html',},
    { id: 'b14', title: 'Robot Master',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/robotmaster300200.webp',
    embed: 'https://cdn.htmlgames.com/RobotMaster/index.html',},
    { id: 'b15', title: 'ET Brain',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/etbrain300200.webp',
    embed: 'https://cdn.htmlgames.com/ETBrain/index.html',},
    { id: 'b16', title: 'Neon Lights',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/neonlights300200.webp',
    embed: 'https://cdn.htmlgames.com/NeonLights/index.html',},
    { id: 'b17', title: 'Aquatic Slice',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/aquaticslice300200.webp',
    embed: 'https://cdn.htmlgames.com/AquaticSlice/index.html',},
    { id: 'b18', title: 'The Brain Train',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/thebraintrain300200.webp',
    embed: 'https://cdn.htmlgames.com/TheBrainTrain/index.html',},
    { id: 'b19', title: 'Tap It Away 3D',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/tapitaway3d300200.webp',
    embed: 'https://cdn.htmlgames.com/TapItAway3D/index.html',},
    { id: 'b20', title: 'Harbour Escape',category: 'Brain Games ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/harbourescape300200.webp',
    embed: 'https://cdn.htmlgames.com/HarbourEscape/index.html',},
    { id: 'p1', title: 'Neon Factory',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/neonfactory300200.webp',
    embed: 'https://cdn.htmlgames.com/NeonFactory/index.html',},
     { id: 'p2', title: 'Daily Nonograms',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dailynonograms300.webp',
    embed: 'https://cdn.htmlgames.com/DailyNonograms/index.html',},
     { id: 'p3', title: 'Daily Kakurasu',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dailykakurasu300.webp',
    embed: 'https://cdn.htmlgames.com/DailyKakurasu/index.html',},
     { id: 'p4', title: 'Hashiwokakero',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hashiwokakero300.webp',
    embed: 'https://cdn.htmlgames.com/Hashiwokakero/index.html',},
     { id: 'p5', title: 'Mystery Paradise',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/mysteryparadise300200.webp',
    embed: 'https://cdn.htmlgames.com/MysteryParadise/index.html',},
     { id: 'p6', title: 'Daily Shikaku',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/dailyshikaku300.webp',
    embed: 'https://cdn.htmlgames.com/DailyShikaku/index.html',},
     { id: 'p7', title: 'Jigsaw Cities 1',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jigsawcities1300200.webp',
    embed: 'https://cdn.htmlgames.com/JigsawCities1/index.html',},
     { id: 'p8', title: 'Creepy Creatures',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/creepycreatures300200.webp',
    embed: 'https://cdn.htmlgames.com/CreepyCreatures/index.html',},
     { id: 'p9', title: 'Jigsaw Jam World',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jigsawjamworld-300.webp',
    embed: 'https://cdn.htmlgames.com/JigsawJamWorld/index.html',},
     { id: 'p10', title: 'Extreme Vexed',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/extremevexed300.webp',
    embed: 'https://cdn.htmlgames.com/ExtremeVexed/index.html',},
     { id: 'p11', title: 'Lines And Blocks 2',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/linesandblocks2300200.webp',
    embed: 'https://cdn.htmlgames.com/LinesAndBlocks2/index.html',},
     { id: 'p12', title: 'Picture Pie Ancient City',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/picturepieancientcity300200.webp',
    embed: 'https://cdn.htmlgames.com/PicturePieAncientCity/index.html',},
     { id: 'p13', title: 'Squirrel Connection',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/squirrelconnection300200.webp',
    embed: 'https://cdn.htmlgames.com/SquirrelConnection/index.html',},
     { id: 'p14', title: 'Jigsaw Jam Animal',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/jigsawjamanimal300200.webp',
    embed: 'https://cdn.htmlgames.com/JigsawJamAnimal/index.html',},
     { id: 'p15', title: 'Lines And Blocks',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/linesandblocks300200.webp',
    embed: 'https://cdn.htmlgames.com/LinesAndBlocks/index.html',},
     { id: 'p16', title: 'Move And Match',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/moveandmatch300200.webp',
    embed: 'https://cdn.htmlgames.com/MoveAndMatch/index.html',},
     { id: 'p17', title: 'Lucky Clover',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/luckyclover300200.webp',
    embed: 'https://cdn.htmlgames.com/LuckyClover/index.html',},
     { id: 'p18', title: 'Hex Stream',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/hexstream300.webp',
    embed: 'https://cdn.htmlgames.com/HexStream/index.html',},
     { id: 'p19', title: 'Rotate Puzzle Summer Beach',category: 'Puzzle ',thumb: 'https://www.htmlgames.com/uploaded/game/thumb/rotatepuzzle-summerbeach300200.webp',
    embed: 'https://cdn.htmlgames.com/RotatePuzzleSummerBeach/index.html',},
];
const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => {
  if (playerIframe.requestFullscreen) {
    playerIframe.requestFullscreen();
  } else if (playerIframe.webkitRequestFullscreen) { // Safari
    playerIframe.webkitRequestFullscreen();
  } else if (playerIframe.msRequestFullscreen) { // IE11
    playerIframe.msRequestFullscreen();
  }
});

/* ---------- Storage helpers ---------- */
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) { console.warn('storage error', e); }
}

/* ---------- Merge / ensure game list (preserve user data & older custom games) ---------- */
function findLegacyGames() {
  for (const k of LEGACY_GAMES_KEYS) {
    const raw = localStorage.getItem(k);
    if (raw) {
      try { return JSON.parse(raw); } catch(e){}
    }
  }
  return null;
}

function ensureAndMergeGameList(newGames) {
  // get previously stored games (prefer current key)
  let oldGames = loadFromStorage(CURRENT_GAMES_KEY, null);
  if (!oldGames) {
    oldGames = findLegacyGames();
  }

  if (!oldGames || oldGames.length === 0) {
    // first run — just save newGames
    saveToStorage(CURRENT_GAMES_KEY, newGames);
    return;
  }

  // Merge: for each new game, if it existed in oldGames -> keep old properties (like any custom fields)
  const oldMap = new Map(oldGames.map(g => [g.id, g]));
  const mergedMain = newGames.map(g => {
    if (oldMap.has(g.id)) {
      // preserve extra fields from old game, but override with the new canonical fields
      return { ...oldMap.get(g.id), ...g };
    }
    return g;
  });
  // Append any old-only games that are not in the new list (so user-added games are not lost)
  const extras = oldGames.filter(og => !newGames.some(ng => ng.id === og.id));
  const finalList = [...mergedMain, ...extras];
  saveToStorage(CURRENT_GAMES_KEY, finalList);
}
 /* Always load new games and update storage */
let GAMES = sampleGames;
saveToStorage(CURRENT_GAMES_KEY, GAMES);
/*shuffle games*/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
GAMES = shuffleArray(GAMES);
saveToStorage(CURRENT_GAMES_KEY, GAMES);


// Example usage
GAMES = shuffleArray(GAMES);

/* ---------- Load other user data ---------- */
let FAVS = loadFromStorage(FAV_KEY, {});
let RECENT = loadFromStorage(RECENT_KEY, []);
let RATINGS = loadFromStorage(RATING_KEY, {});

/* ---------- DOM refs (IDs match your index.html) ---------- */
const gamesGrid = document.getElementById('games-grid');         // grid container
const categoryBar = document.getElementById('category-bar');     // category buttons
const searchInput = document.getElementById('search-input');     // search box
const sidePanel = document.getElementById('side-panel');         // recent/fav panel
const openRecentBtn = document.getElementById('open-recent-btn');
const closePanelBtn = document.getElementById('close-panel');
const recentList = document.getElementById('recent-list');
const favList = document.getElementById('fav-list');

const playerModal = document.getElementById('player-modal');
const playerIframe = document.getElementById('player-iframe');
const closePlayerBtn = document.getElementById('close-player');
const modalTitle = document.getElementById('modal-game-title');
const ratingStars = document.getElementById('rating-stars');

let activeCategory = 'All';
let searchTerm = '';

/* ---------- Utilities ---------- */
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}
function getIdFromEvent(e) {
  const el = e.target.closest('[data-id]');
  return el ? el.dataset.id : null;
}

/* ---------- Categories ---------- */
function getCategories() {
  const cats = new Set(['All']);
  GAMES.forEach(g => cats.add(g.category || 'Uncategorized'));
  return Array.from(cats);
}

function renderCategories() {
  categoryBar.innerHTML = '';
  getCategories().forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderCategories();
      renderGames();
    });
    categoryBar.appendChild(btn);
  });
}

/* ---------- Cards / Grid ---------- */
function createCard(game) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <a class="thumb" href="#" data-id="${escapeHtml(game.id)}">
      <img loading="lazy" decoding="async" src="${escapeHtml(game.thumb || sampleImage(game.id))}" alt="${escapeHtml(game.title)}">
      <div class="play-overlay">
        <button class="play-btn" data-id="${escapeHtml(game.id)}">Play</button>
      </div>
    </a>
    <div class="card-body">
      <div class="card-title">${escapeHtml(game.title)}</div>
      <div class="card-meta">
        <div class="controls">
          <button class="icon-heart" data-id="${escapeHtml(game.id)}" title="Favorite">♥</button>
          <div class="stars" data-id="${escapeHtml(game.id)}"></div>
        </div>
        <div class="cat" title="${escapeHtml(game.category || '')}">${escapeHtml(game.category || '')}</div>
      </div>
    </div>
  `;

  // play events
  const thumb = div.querySelector('.thumb');
  const playBtn = div.querySelector('.play-btn');
  thumb && thumb.addEventListener('click', e => { e.preventDefault(); onPlayClick(e); });
  playBtn && playBtn.addEventListener('click', onPlayClick);

  // favorite
  const heart = div.querySelector('.icon-heart');
  const id = game.id;
  heart && heart.addEventListener('click', e => {
    e.stopPropagation();
    toggleFavorite(id);
    updateFavHeart(heart, id);
    renderFavList();
  });
  updateFavHeart(heart, id);

  // stars
  const starsWrap = div.querySelector('.stars');
  renderStars(starsWrap, game.id);

  return div;
}

function renderGames() {
  const searchLower = searchTerm.trim().toLowerCase();
  const filtered = GAMES.filter(g => {
    const matchesCat = activeCategory === 'All' || g.category === activeCategory;
    const matchesSearch = !searchLower || (g.title && g.title.toLowerCase().includes(searchLower));
    return matchesCat && matchesSearch;
  });
  gamesGrid.innerHTML = '';
  filtered.forEach(g => gamesGrid.appendChild(createCard(g)));
}

/* ---------- Favorites ---------- */

function toggleFavorite(id) {
  if (FAVS[id]) delete FAVS[id];
  else {
    const g = GAMES.find(x => x.id === id);
    if (g) FAVS[id] = { id: g.id, title: g.title, thumb: g.thumb, category: g.category };
  }
  saveToStorage(FAV_KEY, FAVS);
}
function updateFavHeart(buttonEl, id) {
  if (!buttonEl) return;
  if (FAVS[id]) buttonEl.classList.add('active');
  else buttonEl.classList.remove('active');
}
function renderFavList() {
  favList.innerHTML = '';
  const items = Object.values(FAVS);
  if (items.length === 0) {
    favList.innerHTML = '<li style="color:var(--muted)">No favorites yet</li>';
    return;
  }
  items.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${escapeHtml(i.thumb)}" alt="${escapeHtml(i.title)}"><div style="flex:1"><strong>${escapeHtml(i.title)}</strong><div style="color:var(--muted);font-size:13px">${escapeHtml(i.category||'')}</div></div>`;
    li.addEventListener('click', () => openGameById(i.id));
    favList.appendChild(li);
  });
}

/* ---------- Recently Played ---------- */
function pushRecent(game) {
  RECENT = RECENT.filter(x => x.id !== game.id);
  RECENT.unshift({ id: game.id, title: game.title, thumb: game.thumb });
  if (RECENT.length > 7) RECENT.pop();
  saveToStorage(RECENT_KEY, RECENT);
  renderRecent();
}
function renderRecent() {
  recentList.innerHTML = '';
  if (!RECENT || RECENT.length === 0) {
    recentList.innerHTML = '<li style="color:var(--muted)">No recent plays</li>';
    return;
  }
  RECENT.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${escapeHtml(i.thumb)}" alt="${escapeHtml(i.title)}"><div style="flex:1"><strong>${escapeHtml(i.title)}</strong></div>`;
    li.addEventListener('click', () => openGameById(i.id));
    recentList.appendChild(li);
  });
}

/* ---------- Ratings (stars) ---------- */
function renderStars(container, gameId) {
  if (!container) return;
  container.innerHTML = '';
  const score = RATINGS[gameId] || 0;
  for (let s = 1; s <= 5; s++) {
    const btn = document.createElement('button');
    btn.innerHTML = s <= score ? '★' : '☆';
    btn.title = `${s} star${s > 1 ? 's' : ''}`;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      RATINGS[gameId] = s;
      saveToStorage(RATING_KEY, RATINGS);
      renderStars(container, gameId);
      if (ratingStars.dataset.game === gameId) renderModalStars(gameId);
    });
    container.appendChild(btn);
  }
}
function renderModalStars(gameId) {
  if (!ratingStars) return;
  ratingStars.innerHTML = '';
  const score = RATINGS[gameId] || 0;
  for (let s = 1; s <= 5; s++) {
    const btn = document.createElement('button');
    btn.textContent = s <= score ? '★' : '☆';
    btn.title = `${s} star${s > 1 ? 's' : ''}`;
    btn.addEventListener('click', () => {
      RATINGS[gameId] = s;
      saveToStorage(RATING_KEY, RATINGS);
      renderModalStars(gameId);
      renderGames(); // update grid stars too
    });
    ratingStars.appendChild(btn);
  }
}

/* ---------- Player modal & playing ---------- */
function onPlayClick(e) {
  const id = getIdFromEvent(e);
  if (!id) return;
  const game = GAMES.find(g => g.id === id);
  if (!game) return;
  openPlayer(game);
}
function openPlayer(game) {
  // set iframe src (embedding subject to game's CORS/Frame-Options)
  playerIframe.src = game.embed;
  playerModal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = game.title || '';
  ratingStars.dataset.game = game.id;
  renderModalStars(game.id);
  pushRecent(game);

  // create or update "Open in new tab" link in modal footer for fallback
  try {
    const footer = playerModal.querySelector('.modal-footer');
    if (footer) {
      let openNew = footer.querySelector('#modal-open-new');
      if (!openNew) {
        openNew = document.createElement('a');
        openNew.id = 'modal-open-new';
        openNew.setAttribute('target', '_blank');
        openNew.setAttribute('rel', 'noopener noreferrer');
        openNew.className = 'play-btn';
        openNew.style.marginLeft = '8px';
        openNew.style.textDecoration = 'none';
        openNew.style.display = 'inline-block';
        openNew.style.padding = '6px 10px';
        openNew.style.borderRadius = '8px';
        // visually adapt if needed (styles already in CSS for .play-btn)
        footer.appendChild(openNew);
      }
      openNew.href = game.embed;
      openNew.textContent = 'Open in new tab';
    }
  } catch (err) { /* not critical */ }
}
function closePlayer() {
  playerModal.setAttribute('aria-hidden', 'true');
  // stop iframe
  try { playerIframe.src = ''; } catch (e) {}
}
function openGameById(id) {
  const g = GAMES.find(x => x.id === id);
  if (g) openPlayer(g);
}

/* ---------- Search & UI events ---------- */
if (searchInput) {
  searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderGames();
  });
}

if (openRecentBtn) openRecentBtn.addEventListener('click', () => sidePanel.classList.toggle('open'));
if (closePanelBtn) closePanelBtn.addEventListener('click', () => sidePanel.classList.remove('open'));
if (closePlayerBtn) closePlayerBtn.addEventListener('click', closePlayer);
playerModal && playerModal.addEventListener('click', (e) => { if (e.target === playerModal) closePlayer(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    sidePanel.classList.remove('open');
    closePlayer();
  }
});

/* Optional: if user edits games and wants immediate refresh from console:
   call refreshGamesFromScript() to re-run merging with the sampleGames array */
function refreshGamesFromScript() {
  ensureAndMergeGameList(sampleGames);
  GAMES = loadFromStorage(CURRENT_GAMES_KEY, sampleGames);
  renderCategories();
  renderGames();
  renderFavList();
  renderRecent();
}

/* ---------- Init ---------- */
function init() {
  GAMES = loadFromStorage(CURRENT_GAMES_KEY, sampleGames);
  // If for some reason GAMES is empty, seed it
  if (!GAMES || GAMES.length === 0) {
    saveToStorage(CURRENT_GAMES_KEY, sampleGames);
    GAMES = sampleGames.slice();
  }
  renderCategories();
  renderGames();
  renderFavList();
  renderRecent();
    }init();
 

/* ---------- Expose a couple of functions for debugging in console (optional) ---------- */
window.mgz = {
  GAMES_KEY: CURRENT_GAMES_KEY,
  refreshGamesFromScript,
  getAllGames: () => loadFromStorage(CURRENT_GAMES_KEY, []),
  getFavs: () => loadFromStorage(FAV_KEY, {}),
  clearGameStorage: () => { localStorage.removeItem(CURRENT_GAMES_KEY); location.reload(); }
};
