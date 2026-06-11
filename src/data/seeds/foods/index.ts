import { genericFoods } from "./generic";
import { proteinProductFoods } from "./proteinProducts";
import { quickEstimateFoods } from "./quickEstimates";
import { gyudonFoods } from "./chains/gyudon";
import { udonFoods } from "./chains/udon";
import { teishokuFoods } from "./chains/teishoku";
import { fastFoodFoods } from "./chains/fastFood";
import { familyRestaurantFoods } from "./chains/familyRestaurant";
import { cafeMenuFoods } from "./chains/cafeMenus";
import { familyRestaurantMenuFoods } from "./chains/familyRestaurantMenus";
import { cafeFoods } from "./chains/cafe";
import { convenienceFoods } from "./chains/convenience";
import { externalNutritionFoods } from "./externalNutrition";
import { kfcOfficialFoods } from "./chains/kfcOfficial";
import { matsuyaOfficialFoods } from "./chains/matsuyaOfficial";
import { mcdonaldsOfficialFoods } from "./chains/mcdonaldsOfficial";
import { nakauOfficialFoods } from "./chains/nakauOfficial";
import { ootoyaMenuFoods } from "./chains/ootoyaMenu";
import { shinpachiMenuFoods } from "./chains/shinpachiMenu";
import { subwayOfficialFoods } from "./chains/subwayOfficial";
import { yayoikenOfficialFoods } from "./chains/yayoikenOfficial";
import { yoshinoyaOfficialFoods } from "./chains/yoshinoyaOfficial";

export const foodSeeds = [
  ...genericFoods,
  ...proteinProductFoods,
  ...quickEstimateFoods,
  ...gyudonFoods,
  ...matsuyaOfficialFoods,
  ...nakauOfficialFoods,
  ...yoshinoyaOfficialFoods,
  ...udonFoods,
  ...teishokuFoods,
  ...ootoyaMenuFoods,
  ...shinpachiMenuFoods,
  ...yayoikenOfficialFoods,
  ...fastFoodFoods,
  ...kfcOfficialFoods,
  ...mcdonaldsOfficialFoods,
  ...subwayOfficialFoods,
  ...externalNutritionFoods,
  ...familyRestaurantMenuFoods,
  ...familyRestaurantFoods,
  ...cafeMenuFoods,
  ...cafeFoods,
  ...convenienceFoods,
];
