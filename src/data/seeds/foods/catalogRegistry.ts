export const chainCategories: Record<string, string[]> = {
  "牛丼・丼": ["松屋", "すき家", "吉野家", "なか卯", "こめらく", "天丼てんや"],
  "うどん・そば": ["丸亀製麺", "はなまるうどん", "ウエスト", "資さんうどん"],
  ファストフード: ["マクドナルド", "モスバーガー", "ケンタッキー", "バーガーキング", "サブウェイ", "コストコ"],
  "カレー・弁当": ["CoCo壱番屋", "ほっともっと", "オリジン弁当"],
  "中華・麺": ["リンガーハット", "餃子の王将", "大阪王将", "バーミヤン", "三田製麺所", "舎鈴"],
  和食: ["スシロー", "はま寿司", "トリトン", "北々亭"],
  定食: ["大戸屋", "やよい軒", "しんぱち食堂", "とんでん"],
  ファミレス: ["びっくりドンキー", "ガスト", "ロイヤルホスト", "サイゼリヤ", "オリーブの丘", "デニーズ", "ジョイフル", "ジョナサン", "華屋与兵衛", "藍屋"],
  ステーキ: ["いきなりステーキ", "ペッパーランチ", "感動の肉と米"],
  イタリアン: ["パンチョ", "カプリチョーザ", "マンマパスタ", "ポポラマーマ", "すぱじろう"],
  エスニック: ["モンスーンカフェ", "ティーヌン"],
  カフェ: ["スターバックス", "ドトール", "タリーズ", "コメダ珈琲", "サーティワン"],
  ドーナツ: ["ミスタードーナツ", "クリスピークリーム", "アイムドーナツ"],
  粉物: ["築地銀だこ", "たこ家道頓堀くくる", "道とん堀"],
  コンビニ: ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"],
  居酒屋: [],
  その他: ["佐野PA"],
};

export type FoodCatalogCoverage =
  | "official_full"
  | "official_core"
  | "current_names_estimated_nutrition"
  | "local_store_catalog"
  | "review_required";

export type FoodCatalogRegistryItem = {
  brand: string;
  group: string;
  coverage: FoodCatalogCoverage;
  sourceUrl?: string;
  verifiedAt?: string;
  refreshDays: number;
  minimumItems: number;
  note?: string;
};

const audited: Record<string, Omit<FoodCatalogRegistryItem, "brand" | "group">> = {
  松屋: { coverage: "official_core", sourceUrl: "https://www.matsuyafoods.co.jp/matsuya/menu/", verifiedAt: "2026-06-09", refreshDays: 60, minimumItems: 40, note: "公式栄養を確認できた主要メニュー" },
  すき家: { coverage: "official_full", sourceUrl: "https://images.zensho.co.jp/materials/sukiya/allergen/nutrition.pdf", verifiedAt: "2026-07-15", refreshDays: 45, minimumItems: 450 },
  吉野家: { coverage: "official_core", sourceUrl: "https://www.yoshinoya.com/pdf/allergy/", verifiedAt: "2026-06-04", refreshDays: 60, minimumItems: 60, note: "公式栄養を確認できた主要メニュー" },
  なか卯: { coverage: "official_full", sourceUrl: "https://images.zensho.co.jp/materials/nakau/allergen/nutrition.pdf", verifiedAt: "2026-06-13", refreshDays: 60, minimumItems: 200 },
  はなまるうどん: { coverage: "official_full", sourceUrl: "https://www.hanamaruudon.com/assets/pdf/allergy.pdf", verifiedAt: "2026-06-13", refreshDays: 60, minimumItems: 70 },
  マクドナルド: { coverage: "official_core", sourceUrl: "https://www.mcdonalds.co.jp/products/", verifiedAt: "2026-06-12", refreshDays: 60, minimumItems: 60, note: "公式栄養を確認できた主要・定番メニュー" },
  モスバーガー: { coverage: "official_full", sourceUrl: "https://www.mos.jp/menu/pdf/nutrition.pdf", verifiedAt: "2026-07-15", refreshDays: 30, minimumItems: 160 },
  ケンタッキー: { coverage: "official_full", sourceUrl: "https://www.kfc.co.jp/food_information", verifiedAt: "2026-07-08", refreshDays: 30, minimumItems: 30 },
  バーガーキング: { coverage: "official_full", sourceUrl: "https://www.burgerking.co.jp/images/org/pdf/2026/01/08/af889feb-3500-412c-abee-a7ce17e65986.pdf", verifiedAt: "2026-06-12", refreshDays: 60, minimumItems: 75 },
  サブウェイ: { coverage: "official_full", sourceUrl: "https://www.subway.co.jp/menu/pdf/eiyo.pdf", verifiedAt: "2026-06-10", refreshDays: 60, minimumItems: 150 },
  CoCo壱番屋: { coverage: "official_full", sourceUrl: "https://www.ichibanya.co.jp/menu/pdf/nutrition.pdf", verifiedAt: "2026-06-13", refreshDays: 60, minimumItems: 160 },
  タリーズ: { coverage: "official_full", sourceUrl: "https://www.tullys.co.jp/menu/allergy.html", verifiedAt: "2026-07-03", refreshDays: 30, minimumItems: 120 },
  サーティワン: { coverage: "official_full", sourceUrl: "https://www.31ice.co.jp/contents/product/", verifiedAt: "2026-07-14", refreshDays: 30, minimumItems: 80 },
  リンガーハット: { coverage: "official_core", sourceUrl: "https://www.ringerhut.jp/quality/allergy-nutrition_value/", verifiedAt: "2026-07-22", refreshDays: 45, minimumItems: 85, note: "全国定番と掲載中の期間限定品を、公式栄養値・サイズ別で登録" },
  丸亀製麺: { coverage: "official_full", sourceUrl: "https://www.marugame-seimen.com/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 120 },
  びっくりドンキー: { coverage: "official_full", sourceUrl: "https://www.bikkuri-donkey.com/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 300 },
  ポポラマーマ: { coverage: "official_full", sourceUrl: "https://www.popolamama.com/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 190 },
  デニーズ: { coverage: "official_full", sourceUrl: "https://www.dennys.jp/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 350 },
  ジョイフル: { coverage: "official_full", sourceUrl: "https://www.joyfull.co.jp/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 250 },
  ロイヤルホスト: { coverage: "official_full", sourceUrl: "https://www.royalhost.jp/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 300 },
  オリーブの丘: { coverage: "official_full", sourceUrl: "https://www.olivenooka.jp/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 180 },
  とんでん: { coverage: "official_full", sourceUrl: "https://www.tonden.co.jp/menu/", verifiedAt: "2026-07-10", refreshDays: 45, minimumItems: 300 },
  ウエスト: { coverage: "official_core", sourceUrl: "https://www.shop-west.jp/menu/", verifiedAt: "2026-07-12", refreshDays: 60, minimumItems: 20, note: "公式カロリーが公開されている品目を優先" },
  やよい軒: { coverage: "official_core", sourceUrl: "https://www.yayoiken.com/menu_list/", verifiedAt: "2026-07-10", refreshDays: 60, minimumItems: 35 },
  大戸屋: { coverage: "official_core", sourceUrl: "https://www.ootoya.com/menu_list/info/nutrition/27378", verifiedAt: "2026-06-12", refreshDays: 60, minimumItems: 150, note: "公式栄養を確認できた主要メニュー" },
  いきなりステーキ: { coverage: "official_full", sourceUrl: "https://ikinaristeak.com/wp-content/uploads/nutritioninfo.pdf", verifiedAt: "2026-06-19", refreshDays: 60, minimumItems: 55 },
  マンマパスタ: { coverage: "current_names_estimated_nutrition", sourceUrl: "https://www.giraud.co.jp/mamma-pasta/menu/", verifiedAt: "2026-07-12", refreshDays: 45, minimumItems: 15, note: "標準麺250g、大盛1.5倍を反映" },
  ティーヌン: { coverage: "local_store_catalog", sourceUrl: "https://www.aeon.jp/sc/makuharishintoshin/shop/store/food-forest/", verifiedAt: "2026-07-13", refreshDays: 90, minimumItems: 10, note: "イオンモール幕張新都心店" },
  セブンイレブン: { coverage: "official_core", sourceUrl: "https://www.sej.co.jp/products/", verifiedAt: "2026-07-16", refreshDays: 21, minimumItems: 4, note: "全国定番・公式栄養確認品のみ" },
  ファミリーマート: { coverage: "official_core", sourceUrl: "https://www.family.co.jp/goods.html", verifiedAt: "2026-07-16", refreshDays: 21, minimumItems: 5, note: "全国定番・公式栄養確認品のみ" },
  ローソン: { coverage: "official_core", sourceUrl: "https://www.lawson.co.jp/recommend/original/", verifiedAt: "2026-07-16", refreshDays: 21, minimumItems: 6, note: "全国定番・公式栄養確認品のみ" },
  ミニストップ: { coverage: "official_core", sourceUrl: "https://www.ministop.co.jp/syohin/", verifiedAt: "2026-07-16", refreshDays: 21, minimumItems: 4, note: "全国定番・公式栄養確認品のみ" },
  ドトール: { coverage: "official_full", sourceUrl: "https://allergy.doutor.co.jp/allergy_check/doutor_coffee_shop/pdf/nutrient/food/", verifiedAt: "2026-06-13", refreshDays: 60, minimumItems: 100 },
};

export const foodCatalogRegistry: FoodCatalogRegistryItem[] = Object.entries(chainCategories).flatMap(([group, brands]) =>
  brands.map((brand) => {
    const review = audited[brand] ?? { coverage: "review_required" as const, refreshDays: 90, minimumItems: 1 };
    return { brand, group, ...review };
  }),
);
