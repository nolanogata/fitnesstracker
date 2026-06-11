import { estimated, official } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sources = {
  coco: "https://www.ichibanya.co.jp/menu/pdf/nutrition.pdf",
  tenya: "https://www.tenya.co.jp/pdf/allergen-shop.pdf",
  ringer: "https://www.ringerhut.jp/quality/allergy-nutrition_value/",
  mos: "https://www.mos.jp/menu/pdf/nutrition.pdf",
  hotto: "https://www.hottomotto.com/menu_list/info/13",
  ohsho: "https://www.ohsho.co.jp/menu/east/",
};

type OfficialChainInput = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label?: string;
  source_url: string;
  tags?: string[];
};

const chainOfficial = (input: OfficialChainInput) =>
  official({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["公式栄養", ...(input.tags ?? [])],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: input.source_url,
    fetched_at: fetchedAt,
  });

const ohshoEstimated = (input: Omit<OfficialChainInput, "brand" | "source_url">) =>
  estimated({
    brand: "餃子の王将",
    name: input.name,
    category: "チェーン店",
    tags: ["中華", "公式メニュー確認", "栄養推定", ...(input.tags ?? [])],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sources.ohsho,
    fetched_at: fetchedAt,
  });

export const dailyChainOfficialFoods = [
  chainOfficial({ brand: "CoCo壱番屋", name: "ポークカレー", calories: 701, protein_g: 11.0, fat_g: 18.3, carbs_g: 126.9, salt_g: 3.4, tags: ["カレー"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "ビーフカレー", calories: 823, protein_g: 17.3, fat_g: 29.6, carbs_g: 125.8, salt_g: 3.1, tags: ["カレー"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "チキンにこみカレー", calories: 769, protein_g: 24.4, fat_g: 19.7, carbs_g: 128.7, salt_g: 4.3, tags: ["カレー", "チキン"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "ロースカツカレー", calories: 1116, protein_g: 27.1, fat_g: 48.7, carbs_g: 149.3, salt_g: 4.3, tags: ["カレー", "カツ"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "パリパリチキンカレー", calories: 995, protein_g: 29.2, fat_g: 36.4, carbs_g: 139.1, salt_g: 4.8, tags: ["カレー", "チキン"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "チーズカレー", calories: 896, protein_g: 23.9, fat_g: 34.1, carbs_g: 128.3, salt_g: 4.4, tags: ["カレー", "チーズ"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "やさいカレー", calories: 783, protein_g: 12.8, fat_g: 20.1, carbs_g: 142.4, salt_g: 3.5, tags: ["カレー", "野菜"], source_url: sources.coco }),
  chainOfficial({ brand: "CoCo壱番屋", name: "海の幸カレー", calories: 826, protein_g: 28.8, fat_g: 22.7, carbs_g: 132.2, salt_g: 4.5, tags: ["カレー", "魚介"], source_url: sources.coco }),

  chainOfficial({ brand: "天丼てんや", name: "元祖てんやの天丼（あおさ汁付き）", calories: 719, protein_g: 20.0, fat_g: 23.1, carbs_g: 111.6, salt_g: 4.6, tags: ["天丼"], source_url: sources.tenya }),
  chainOfficial({ brand: "天丼てんや", name: "てんやの上天丼（あおさ汁付き）", calories: 662, protein_g: 15.7, fat_g: 19.0, carbs_g: 111.4, salt_g: 4.2, tags: ["天丼"], source_url: sources.tenya }),
  chainOfficial({ brand: "天丼てんや", name: "てんやの特上天丼（あおさ汁付き）", calories: 705, protein_g: 19.2, fat_g: 21.8, carbs_g: 111.6, salt_g: 4.3, tags: ["天丼"], source_url: sources.tenya }),
  chainOfficial({ brand: "天丼てんや", name: "オールスター天丼（あおさ汁付き）", calories: 798, protein_g: 23.9, fat_g: 26.6, carbs_g: 119.9, salt_g: 4.5, tags: ["天丼"], source_url: sources.tenya }),
  chainOfficial({ brand: "天丼てんや", name: "野菜天丼（あおさ汁付き）", calories: 755, protein_g: 10.5, fat_g: 27.7, carbs_g: 121.3, salt_g: 4.2, tags: ["天丼", "野菜"], source_url: sources.tenya }),

  chainOfficial({ brand: "リンガーハット", name: "長崎ちゃんぽん", calories: 611, protein_g: 24.3, fat_g: 24.7, carbs_g: 81.8, salt_g: 7.4, tags: ["ちゃんぽん", "麺類"], source_url: sources.ringer }),
  chainOfficial({ brand: "リンガーハット", name: "長崎ちゃんぽん 麺少なめ", calories: 465, protein_g: 18.9, fat_g: 24.0, carbs_g: 49.7, salt_g: 7.2, tags: ["ちゃんぽん", "麺類"], source_url: sources.ringer }),
  chainOfficial({ brand: "リンガーハット", name: "野菜たっぷりちゃんぽん", calories: 759, protein_g: 28.4, fat_g: 35.7, carbs_g: 92.0, salt_g: 9.3, tags: ["ちゃんぽん", "野菜"], source_url: sources.ringer }),
  chainOfficial({ brand: "リンガーハット", name: "ピリカラちゃんぽん", calories: 656, protein_g: 25.4, fat_g: 28.0, carbs_g: 83.4, salt_g: 7.7, tags: ["ちゃんぽん", "辛い"], source_url: sources.ringer }),
  chainOfficial({ brand: "リンガーハット", name: "長崎皿うどん", calories: 728, protein_g: 18.2, fat_g: 37.3, carbs_g: 83.6, salt_g: 7.5, tags: ["皿うどん", "麺類"], source_url: sources.ringer }),
  chainOfficial({ brand: "リンガーハット", name: "ぎょうざ（5個）", calories: 199, protein_g: 4.7, fat_g: 14.1, carbs_g: 13.1, salt_g: 0.7, tags: ["餃子", "サイド"], source_url: sources.ringer }),

  chainOfficial({ brand: "モスバーガー", name: "モスバーガー", calories: 372, protein_g: 15.2, fat_g: 17.0, carbs_g: 40.0, salt_g: 2.3, tags: ["バーガー"], source_url: sources.mos }),
  chainOfficial({ brand: "モスバーガー", name: "モスチーズバーガー", calories: 425, protein_g: 18.2, fat_g: 21.4, carbs_g: 40.4, salt_g: 2.8, tags: ["バーガー", "チーズ"], source_url: sources.mos }),
  chainOfficial({ brand: "モスバーガー", name: "テリヤキバーガー", calories: 385, protein_g: 14.3, fat_g: 18.2, carbs_g: 41.2, salt_g: 2.6, tags: ["バーガー"], source_url: sources.mos }),
  chainOfficial({ brand: "モスバーガー", name: "テリヤキチキンバーガー", calories: 303, protein_g: 20.1, fat_g: 10.3, carbs_g: 32.4, salt_g: 2.2, tags: ["バーガー", "チキン"], source_url: sources.mos }),
  chainOfficial({ brand: "モスバーガー", name: "海老カツバーガー", calories: 397, protein_g: 14.5, fat_g: 19.3, carbs_g: 42.2, salt_g: 2.1, tags: ["バーガー", "海老"], source_url: sources.mos }),
  chainOfficial({ brand: "モスバーガー", name: "モスチキン", calories: 269, protein_g: 15.3, fat_g: 16.6, carbs_g: 14.7, salt_g: 1.5, tags: ["チキン", "サイド"], source_url: sources.mos }),

  chainOfficial({ brand: "ほっともっと", name: "のり弁当", calories: 770, protein_g: 22.5, fat_g: 23.6, carbs_g: 116.9, salt_g: 3.7, tags: ["弁当"], source_url: "https://www.hottomotto.com/menu_list/view/13/1563" }),
  chainOfficial({ brand: "ほっともっと", name: "4コ入りから揚弁当", calories: 702, protein_g: 30.2, fat_g: 19.5, carbs_g: 101.5, salt_g: 3.0, tags: ["弁当", "唐揚げ"], source_url: "https://www.hottomotto.com/menu_list/view/13/1557" }),
  chainOfficial({ brand: "ほっともっと", name: "チキン南蛮弁当", calories: 859, protein_g: 25.5, fat_g: 27.4, carbs_g: 126.5, salt_g: 3.0, tags: ["弁当", "チキン"], source_url: sources.hotto }),
  chainOfficial({ brand: "ほっともっと", name: "ロースかつとじ弁当", calories: 810, protein_g: 34.3, fat_g: 26.0, carbs_g: 113.0, salt_g: 4.1, tags: ["弁当", "カツ"], source_url: sources.hotto }),
  chainOfficial({ brand: "ほっともっと", name: "肉野菜炒め弁当", calories: 617, protein_g: 22.2, fat_g: 16.9, carbs_g: 99.3, salt_g: 4.3, tags: ["弁当", "野菜"], source_url: sources.hotto }),

  ohshoEstimated({ name: "餃子", calories: 346, protein_g: 12, fat_g: 18, carbs_g: 34, tags: ["餃子"] }),
  ohshoEstimated({ name: "鶏の唐揚", calories: 720, protein_g: 38, fat_g: 42, carbs_g: 45, tags: ["唐揚げ"] }),
  ohshoEstimated({ name: "炒飯", calories: 650, protein_g: 18, fat_g: 24, carbs_g: 88, tags: ["炒飯", "ごはん"] }),
  ohshoEstimated({ name: "天津飯", calories: 650, protein_g: 20, fat_g: 18, carbs_g: 98, tags: ["ごはん"] }),
  ohshoEstimated({ name: "餃子の王将ラーメン", calories: 640, protein_g: 24, fat_g: 24, carbs_g: 82, tags: ["ラーメン", "麺類"] }),
];
