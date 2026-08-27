import type { Post } from '../../lib/blog-types';
import { post as avchunDidaktiMadrichHorim } from './avchun-didakti-madrich-horim';
import { post as eichLivchorMetapelRegashiLayeled } from './eich-livchor-metapel-regashi-layeled';
import { post as ksheiKriyaYelad } from './kshei-kriya-yelad';
import { post as viturRegashiMadrich } from './vitur-regashi-madrich';
import { post as horaMetatenet } from './hora-metatenet';
import { post as yaldaLoOhevetAtzmah } from './yalda-lo-ohevet-atzmah';
import { post as mesuravBeitSefer } from './mesurav-beit-sefer';
import { post as cbtYelad } from './cbt-yelad';
import { post as ishaLoMaaminahBatzmah } from './isha-lo-maaminah-batzmah';
import { post as lehaskirLayeladAlTipul } from './lehaskir-layelad-al-tipul';
import { post as mahZeEmr } from './mah-ze-emr';
import { post as nituvLeshoniFiziologi } from './nituv-leshoni-fiziologi';
import { post as hitpartzuyotZaamYeladim } from './hitpartzuyot-zaam-yeladim';
import { post as hetkefHaradaYeladim } from './hetkef-harada-yeladim';
import { post as haradaHevratitYeladim } from './harada-hevratit-yeladim';
import { post as hardatPridaYeladim } from './hardat-prida-yeladim';
import { post as hayeledLoRotzeLilmod } from './hayeled-lo-rotze-lilmod';
import { post as nlpCbtEmrHashvaa } from './nlp-cbt-emr-hashvaa';
import { post as ocdYeladim } from './ocd-yeladim';
import { post as pchadimBalaylaYeladim } from './pchadim-balayla-yeladim';
import { post as hardatBechinot } from './hardat-bechinot';
import { post as keeveiBetenRegashiim } from './keevei-beten-regashiim';

/**
 * Every post, in publication-file order. The sitemap generator reads this order,
 * so append new posts at the end rather than inserting.
 */
export const allPosts: Post[] = [
  avchunDidaktiMadrichHorim,
  eichLivchorMetapelRegashiLayeled,
  ksheiKriyaYelad,
  viturRegashiMadrich,
  horaMetatenet,
  yaldaLoOhevetAtzmah,
  mesuravBeitSefer,
  cbtYelad,
  ishaLoMaaminahBatzmah,
  lehaskirLayeladAlTipul,
  mahZeEmr,
  nituvLeshoniFiziologi,
  hitpartzuyotZaamYeladim,
  hetkefHaradaYeladim,
  haradaHevratitYeladim,
  hardatPridaYeladim,
  hayeledLoRotzeLilmod,
  nlpCbtEmrHashvaa,
  ocdYeladim,
  pchadimBalaylaYeladim,
  hardatBechinot,
  keeveiBetenRegashiim,
];
