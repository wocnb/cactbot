import ZoneId from '../../../../../resources/zone_id.js';
import NetRegexes from '../../../../../resources/netregexes.js';
import Conditions from '../../../../../resources/conditions.js';
import { Responses } from '../../../../../resources/responses.js';

const sharedOutputStrings = {
  sharedTankStack: {
    en: 'Tank stack',
    de: 'Tanks sammeln',
    cn: '坦克分摊',
    ko: '탱끼리 모이기',
  },
};

export default {
  zoneId: ZoneId.CastrumMarinumExtreme,
  triggers: [
    {
      id: 'EmeraldEx Emerald Shot',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55B0' }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55B0' }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55B0' }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55B0' }),
      condition: Conditions.caresAboutMagical(),
      response: Responses.tankBuster(),
    },
    {
      id: 'EmeraldEx Optimized Ultima',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: ['55B1', '5B10'], capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: ['55B1', '5B10'], capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: ['55B1', '5B10'], capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: ['55B1', '5B10'], capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'EmeraldEx Aetheroplasm Production',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55AA', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55AA', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55AA', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55AA', capture: false }),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get orbs',
          de: 'Orbs nehmen',
          cn: '撞球',
          ko: '구슬 부딪히기',
        },
      },
    },
    {
      id: 'EmeraldEx Magitek Magnetism',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '5594', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '5594', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '5594', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '5594', capture: false }),
      condition: (data) => data.seenMines || data.role !== 'tank',
      delaySeconds: 9,
      durationSeconds: 6,
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get Near Same Polarity Mines',
        },
      },
      run: (data) => data.seenMines = true,
    },
    {
      id: 'EmeraldEx Divide Et Impera P1',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '5537', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '5537', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '5537', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '5537', capture: false }),
      alertText: (data, _, output) => {
        if (data.role === 'tank')
          return output.sharedTankStack();
        return output.spread();
      },
      outputStrings: {
        spread: {
          en: 'Spread',
          de: 'Verteilen',
          fr: 'Ecartez-vous',
          ja: '散開',
          cn: '分散',
          ko: '산개',
        },
        ...sharedOutputStrings,
      },
    },
    {
      id: 'EmeraldEx Magitek Magnetism Flare',
      netRegex: NetRegexes.headMarker({ id: '0057' }),
      condition: Conditions.targetIsYou(),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Flare on YOU',
          de: 'Flare auf DIR',
          ja: '自分にフレア',
          cn: '核爆点名',
          ko: '플레어 대상자',
        },
      },
    },
    {
      id: 'EmeraldEx Magitek Magnetism Bait',
      netRegex: NetRegexes.headMarker({ id: '0017' }),
      condition: Conditions.targetIsYou(),
      alertText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Bait Lines Away From Safe Spot',
        },
      },
    },
    {
      id: 'EmeraldEx Expire',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55[D9]1', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55[D9]1', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55[D9]1', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55[D9]1', capture: false }),
      response: Responses.getOut(),
    },
    {
      id: 'EmeraldEx Bit Storm',
      netRegex: NetRegexes.addedCombatant({ name: 'Claw Bit', capture: false }),
      delaySeconds: 3,
      suppressSeconds: 2,
      response: Responses.getIn(),
    },
    {
      id: 'EmeraldEx Photon Ring',
      netRegex: NetRegexes.removingCombatant({ name: 'Claw Bit', capture: false }),
      delaySeconds: 3,
      suppressSeconds: 2,
      response: Responses.getOut(),
    },
    {
      id: 'EmeraldEx Divide Et Impera P2',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '555B', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '555B', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '555B', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '555B', capture: false }),
      alertText: (data, _, output) => {
        if (data.role === 'tank')
          return output.sharedTankStack();
        return output.protean();
      },
      outputStrings: {
        protean: {
          en: 'Protean',
          de: 'Himmelsrichtungen',
          fr: 'Position',
          ja: '散開',
          cn: '分散站位',
          ko: '정해진 위치로 산개',
        },
        ...sharedOutputStrings,
      },
    },
    {
      id: 'EmeraldEx Primus Terminus Est',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55C3', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55C3', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55C3', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55C3', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go sides, aim across',
          de: 'Geh zu den Seiten, ziehle nach gegenüber',
          cn: '靠边，注意箭头朝向',
          ko: '구석으로, 서로 겹치지 않게',
        },
      },
    },
    {
      id: 'EmeraldEx Tertius Terminus est',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55CC', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55CC', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55CC', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55CC', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Swords',
          de: 'Schwerter',
          cn: '注意落剑顺序',
          ko: '검',
        },
      },
    },
    {
      id: 'EmeraldEx Sidescathe Left',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55D5', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55D5', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55D5', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55D5', capture: false }),
      response: Responses.goLeft(),
    },
    {
      id: 'EmeraldEx Sidescathe Right',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55D4', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55D4', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55D4', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55D4', capture: false }),
      response: Responses.goRight(),
    },
    {
      // TODO: use headmarkers for this
      id: 'EmeraldEx Secundus Terminus est',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55C8', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55C8', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55C8', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55C8', capture: false }),
      alarmText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'X to cards, + to intercards',
          de: 'X in die Cardinalen, + in die Intercardinale Himmelsrichtungen',
          cn: '靠边放剑(十字四角)',
          ko: 'X는 동서남북, +는 대각위치로',
        },
      },
    },
    {
      id: 'EmeraldEx Legio Phantasmatis',
      netRegex: NetRegexes.startsUsing({ source: 'The Emerald Weapon', id: '55B4', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ source: 'Smaragd-Waffe', id: '55B4', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ source: 'Arme Émeraude', id: '55B4', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ source: 'エメラルドウェポン', id: '55B4', capture: false }),
      infoText: (data, _, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Numbered Divebombs',
          de: 'Nummerierte Sturzflüge',
          cn: '注意士兵顺序，结束返回中央',
          ko: '엑사플레어 준비',
        },
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'The Emerald Weapon': 'Smaragd-Waffe',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'The Emerald Weapon': 'Arme Émeraude',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'The Emerald Weapon': 'エメラルドウェポン',
      },
    },
  ],
};
