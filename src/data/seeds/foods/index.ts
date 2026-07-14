import { genericFoods } from "./generic";
import { genericKonamonoFoods } from "./genericKonamono";
import { frozenFoods } from "./frozenFoods";
import { hokkaidoTravelFoods } from "./hokkaidoTravelFoods";
import { nutritionCareProductFoods } from "./nutritionCareProducts";
import { pantryProductFoods } from "./pantryProducts";
import { proteinProductFoods } from "./proteinProducts";
import { quickEstimateFoods } from "./quickEstimates";
import { snackDrinkFoods } from "./snacksDrinks";
import { userMenuImportFoods } from "./userMenuImports";
import { bamiyanMenuFoods } from "./chains/bamiyanMenu";
import { baskinRobbinsOfficialFoods } from "./chains/baskinRobbinsOfficial";
import { burgerKingMenuFoods } from "./chains/burgerkingMenu";
import { gyudonFoods } from "./chains/gyudon";
import { hanamaruOfficialFoods } from "./chains/hanamaruOfficial";
import { udonFoods } from "./chains/udon";
import { teishokuFoods } from "./chains/teishoku";
import { fastFoodFoods } from "./chains/fastFood";
import { familyRestaurantFoods } from "./chains/familyRestaurant";
import { cafeMenuFoods } from "./chains/cafeMenus";
import { familyRestaurantMenuFoods } from "./chains/familyRestaurantMenus";
import { cafeFoods } from "./chains/cafe";
import { convenienceFoods } from "./chains/convenience";
import { cocoichiOfficialFoods } from "./chains/cocoichiOfficial";
import { costcoFoodCourtFoods } from "./chains/costcoFoodCourt";
import { dailyChainOfficialFoods } from "./chains/dailyChainsOfficial";
import { donutChainFoods } from "./chains/donutChains";
import { doutorOfficialFoods } from "./chains/doutorOfficial";
import { externalNutritionFoods } from "./externalNutrition";
import { gyudonTeishokuOfficialCoverageFoods } from "./chains/gyudonTeishokuOfficialCoverage";
import { italianRestaurantMenuFoods } from "./chains/italianRestaurantMenus";
import { ikinariSteakOfficialFoods } from "./chains/ikinaristeakOfficial";
import { kandoNikuKomeMenuFoods } from "./chains/kandoNikuKomeMenu";
import { kfcOfficialFoods } from "./chains/kfcOfficial";
import { komerakuMenuFoods } from "./chains/komerakuMenu";
import { konamonoChainFoods } from "./chains/konamonoChains";
import { matsuyaOfficialFoods } from "./chains/matsuyaOfficial";
import { mcdonaldsOfficialFoods } from "./chains/mcdonaldsOfficial";
import { mcdonaldsKfcOfficialCoverageFoods } from "./chains/mcdonaldsKfcOfficialCoverage";
import { monsoonCafeMenuFoods } from "./chains/monsoonCafeMenu";
import { tinunMakuhariMenuFoods } from "./chains/tinunMakuhariMenu";
import { mosOfficialFoods } from "./chains/mosOfficial";
import { nakauOfficialFoods } from "./chains/nakauOfficial";
import { ootoyaMenuFoods } from "./chains/ootoyaMenu";
import { originBentoOfficialFoods } from "./chains/originBentoOfficial";
import { officialChainNutritionFoods } from "./chains/officialChainNutrition";
import { panchoMenuFoods } from "./chains/panchoMenu";
import { pepperLunchTsukemenMenuFoods } from "./chains/pepperLunchTsukemenMenus";
import { shinpachiAllEstimatedFoods } from "./chains/shinpachiEstimated";
import { subwayOfficialFoods } from "./chains/subwayOfficial";
import { sukiyaOfficialFoods } from "./chains/sukiyaOfficial";
import { sushiChainFoods } from "./chains/sushiChains";
import { tullysOfficialFoods } from "./chains/tullysOfficial";
import { yayoikenOfficialFoods } from "./chains/yayoikenOfficial";
import { yoshinoyaOfficialFoods } from "./chains/yoshinoyaOfficial";

const officialChainReplacementBrands = new Set([
  "びっくりドンキー",
  "ポポラマーマ",
  "ジョイフル",
  "デニーズ",
  "ロイヤルホスト",
  "丸亀製麺",
  "オリーブの丘",
  "とんでん",
]);

const comprehensiveOfficialCoverageBrands = new Set([
  "バーガーキング",
  "スターバックス",
  "ケンタッキー",
  "モスバーガー",
  "サブウェイ",
  "マクドナルド",
  "すき家",
  "吉野家",
  "松屋",
  "なか卯",
  "はなまるうどん",
  "やよい軒",
  "大戸屋",
  "ドトール",
  "タリーズ",
  "CoCo壱番屋",
  "いきなりステーキ",
]);

const legacyFoodSeeds = [
  ...genericFoods,
  ...genericKonamonoFoods,
  ...hokkaidoTravelFoods,
  ...frozenFoods,
  ...userMenuImportFoods,
  ...proteinProductFoods,
  ...nutritionCareProductFoods,
  ...pantryProductFoods,
  ...snackDrinkFoods,
  ...quickEstimateFoods,
  ...burgerKingMenuFoods,
  ...gyudonFoods,
  ...matsuyaOfficialFoods,
  ...sukiyaOfficialFoods,
  ...nakauOfficialFoods,
  ...yoshinoyaOfficialFoods,
  ...hanamaruOfficialFoods,
  ...udonFoods,
  ...teishokuFoods,
  ...ootoyaMenuFoods,
  ...shinpachiAllEstimatedFoods,
  ...yayoikenOfficialFoods,
  ...mosOfficialFoods,
  ...kfcOfficialFoods,
  ...komerakuMenuFoods,
  ...mcdonaldsOfficialFoods,
  ...mcdonaldsKfcOfficialCoverageFoods,
  ...gyudonTeishokuOfficialCoverageFoods,
  ...subwayOfficialFoods,
  ...donutChainFoods,
  ...doutorOfficialFoods,
  ...tullysOfficialFoods,
  ...cocoichiOfficialFoods,
  ...costcoFoodCourtFoods,
  ...konamonoChainFoods,
  ...originBentoOfficialFoods,
  ...dailyChainOfficialFoods,
  ...sushiChainFoods,
  ...fastFoodFoods,
  ...bamiyanMenuFoods,
  ...baskinRobbinsOfficialFoods,
  ...italianRestaurantMenuFoods,
  ...panchoMenuFoods,
  ...ikinariSteakOfficialFoods,
  ...kandoNikuKomeMenuFoods,
  ...pepperLunchTsukemenMenuFoods,
  ...monsoonCafeMenuFoods,
  ...tinunMakuhariMenuFoods,
  ...externalNutritionFoods,
  ...familyRestaurantMenuFoods,
  ...familyRestaurantFoods,
  ...cafeMenuFoods,
  ...cafeFoods,
  ...convenienceFoods,
];

export const foodSeeds = [
  ...legacyFoodSeeds.filter((item) => {
    const brand = item.brand ?? "";
    if (officialChainReplacementBrands.has(brand)) return false;
    if (comprehensiveOfficialCoverageBrands.has(brand) && item.data_source !== "official") return false;
    return true;
  }),
  ...officialChainNutritionFoods,
];
