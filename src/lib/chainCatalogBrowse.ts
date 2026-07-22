export type ChainBrowseMode = "genre" | "kana";
export type ChainKanaGroup = "all" | "あ" | "か" | "さ" | "た" | "な" | "は" | "ま" | "や" | "ら" | "わ" | "英数" | "その他";

export const chainKanaGroups: ChainKanaGroup[] = ["all", "あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "英数"];

const chainBrandReadings: Record<string, string> = {
  "松屋": "まつや",
  "すき家": "すきや",
  "吉野家": "よしのや",
  "なか卯": "なかう",
  "こめらく": "こめらく",
  "天丼てんや": "てんどんてんや",
  "丸亀製麺": "まるがめせいめん",
  "はなまるうどん": "はなまるうどん",
  "ウエスト": "うえすと",
  "資さんうどん": "すけさんうどん",
  "マクドナルド": "まくどなるど",
  "モスバーガー": "もすばーがー",
  "ケンタッキー": "けんたっきー",
  "バーガーキング": "ばーがーきんぐ",
  "サブウェイ": "さぶうぇい",
  "コストコ": "こすとこ",
  "CoCo壱番屋": "ここいちばんや",
  "ほっともっと": "ほっともっと",
  "オリジン弁当": "おりじんべんとう",
  "リンガーハット": "りんがーはっと",
  "餃子の王将": "ぎょうざのおうしょう",
  "大阪王将": "おおさかおうしょう",
  "バーミヤン": "ばーみやん",
  "三田製麺所": "みたせいめんじょ",
  "舎鈴": "しゃりん",
  "スシロー": "すしろー",
  "はま寿司": "はまずし",
  "トリトン": "とりとん",
  "北々亭": "ほくほくてい",
  "大戸屋": "おおとや",
  "やよい軒": "やよいけん",
  "しんぱち食堂": "しんぱちしょくどう",
  "とんでん": "とんでん",
  "びっくりドンキー": "びっくりどんきー",
  "ガスト": "がすと",
  "ロイヤルホスト": "ろいやるほすと",
  "サイゼリヤ": "さいぜりや",
  "オリーブの丘": "おりーぶのおか",
  "デニーズ": "でにーず",
  "ジョイフル": "じょいふる",
  "ジョナサン": "じょなさん",
  "華屋与兵衛": "はなやよへい",
  "藍屋": "あいや",
  "いきなりステーキ": "いきなりすてーき",
  "ペッパーランチ": "ぺっぱーらんち",
  "感動の肉と米": "かんどうのにくとこめ",
  "パンチョ": "ぱんちょ",
  "カプリチョーザ": "かぷりちょーざ",
  "マンマパスタ": "まんまぱすた",
  "ポポラマーマ": "ぽぽらまーま",
  "すぱじろう": "すぱじろう",
  "モンスーンカフェ": "もんすーんかふぇ",
  "ティーヌン": "てぃーぬん",
  "スターバックス": "すたーばっくす",
  "ドトール": "どとーる",
  "タリーズ": "たりーず",
  "コメダ珈琲": "こめだこーひー",
  "サーティワン": "さーてぃわん",
  "ミスタードーナツ": "みすたーどーなつ",
  "クリスピークリーム": "くりすぴーくりーむ",
  "アイムドーナツ": "あいむどーなつ",
  "築地銀だこ": "つきじぎんだこ",
  "たこ家道頓堀くくる": "たこやどうとんぼりくくる",
  "道とん堀": "どうとんぼり",
  "セブンイレブン": "せぶんいれぶん",
  "ファミリーマート": "ふぁみりーまーと",
  "ローソン": "ろーそん",
  "ミニストップ": "みにすとっぷ",
  "佐野PA": "さのぱーきんぐえりあ",
};

export function getChainBrandReading(brand: string) {
  return chainBrandReadings[brand] ?? brand.toLocaleLowerCase("ja-JP");
}

export function getChainKanaGroup(brand: string): Exclude<ChainKanaGroup, "all"> {
  const first = getChainBrandReading(brand).charAt(0);
  if (/^[a-z0-9]/i.test(first)) return "英数";
  if (/[あいうえおぁぃぅぇぉゔ]/.test(first)) return "あ";
  if (/[かきくけこがぎぐげご]/.test(first)) return "か";
  if (/[さしすせそざじずぜぞ]/.test(first)) return "さ";
  if (/[たちつてとだぢづでど]/.test(first)) return "た";
  if (/[なにぬねの]/.test(first)) return "な";
  if (/[はひふへほばびぶべぼぱぴぷぺぽ]/.test(first)) return "は";
  if (/[まみむめも]/.test(first)) return "ま";
  if (/[やゆよゃゅょ]/.test(first)) return "や";
  if (/[らりるれろ]/.test(first)) return "ら";
  if (/[わをん]/.test(first)) return "わ";
  return "その他";
}

export function getChainBrandsForKana(categories: Record<string, string[]>, group: ChainKanaGroup) {
  const brands = Array.from(new Set(Object.values(categories).flat()));
  return brands
    .filter((brand) => group === "all" || getChainKanaGroup(brand) === group)
    .sort((a, b) => getChainBrandReading(a).localeCompare(getChainBrandReading(b), "ja-JP"));
}

export function getChainCategoryForBrand(categories: Record<string, string[]>, brand: string) {
  return Object.entries(categories).find(([, brands]) => brands.includes(brand))?.[0];
}
