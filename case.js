import './control/settings.js';
import fs from 'fs';
import os from 'os';
import sharp from 'sharp';
import util from 'util';
import crypto from 'crypto';
import path from 'path';
import axios from 'axios';
import { spawn, exec, execSync } from 'child_process';
import fetch from 'node-fetch';
import { pathToFileURL } from 'url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

import { proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } from '@itsliaaa/baileys';
import { smsg, isUrl, generateMessageTag, getBuffer, runtime, fetchJson, sleep, processTime, getTime, tanggal, parseMention } from './lib/myfunc.js';
import { jadibot, stopjadibot, listjadibot } from './lib/jadibot.js';
import { getGroupDB, saveGroupDB, initGroupData } from './lib/group_guard.js';
import * as ww from './lib/werewolf.js';
import { scrapePinterest } from './scrape/pinterest.js';
import { ffstalk } from './scrape/ffstalk.js';
import { generateIqc } from './scrape/iqc.js';
import { mlbuild } from './scrape/mlbuild.js';
import { ssweb, DEVICES as SS_DEVICES } from './scrape/ssweb.js';
import { generateFakeGoPay, saveGoPayTemplate } from './scrape/fakegopay.js';
import { generateFakeRoblox, saveRobloxTemplate } from './scrape/fakeroblox.js';
import { generateBrat, generateBratVideo, parseBratInput } from './scrape/brat.js';
import { generateFakeBca, saveBcaTemplate } from './scrape/fakebca.js';
import generateCardPkg from 'fake-ml';
import generateFFPkg from 'fake-ff';

const generateFFCard = generateFFPkg.default || generateFFPkg;
const generateMlCard = generateCardPkg.default || generateCardPkg;
const ffmpegPath = ffmpegInstaller.path;
const OWNER_PATH = "./lib/database/owner.json";
const PREM_PATH = "./lib/database/premium.json";
const FONT_PATH = "./lib/database/font.json";
const RPG_PATH = "./lib/database/rpg.json";
const WHITEGROUP_PATH = "./lib/database/whitegroup.json";
const FIREBASE_DB_URL = "https://chess-bc7fa-default-rtdb.asia-southeast1.firebasedatabase.app";
const CHESS_WEB_URL = "https://guts-chess-gate.vercel.app";

let whitegroups = fs.existsSync(WHITEGROUP_PATH) ?
JSON.parse(fs.readFileSync(WHITEGROUP_PATH, 'utf-8')) : [];
let ownerbot = fs.existsSync(OWNER_PATH) ? JSON.parse(fs.readFileSync(OWNER_PATH)) : [];
let premium = fs.existsSync(PREM_PATH) ? JSON.parse(fs.readFileSync(PREM_PATH)) : [];

const tebakGambarSessions = {};
const family100Sessions = {};
const akinatorSessions = {};
const wwRooms = {};
const tebakBomSessions = {};
const suitSessions = {};
const tttSessions = {};
const susunKataSessions = {};
const cakLontongSessions = {};
const tebakBenderaSessions = {};
const tebakLaguSessions = {};
const siapakahAkuSessions = {};
const blackjackSessions = {};
const spacemanSessions = {};
const hackSessions = {};

function drawCard() {
    const suits = ['♠️', '♥️', '♣️', '♦️'];
    const ranks = [
        { r: 'A', v: 11 }, { r: '2', v: 2 }, { r: '3', v: 3 }, { r: '4', v: 4 },
        { r: '5', v: 5 }, { r: '6', v: 6 }, { r: '7', v: 7 }, { r: '8', v: 8 },
        { r: '9', v: 9 }, { r: '10', v: 10 }, { r: 'J', v: 10 }, { r: 'Q', v: 10 }, { r: 'K', v: 10 }
    ];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { label: `${rank.r}${suit}`, val: rank.v, rank: rank.r };
}

  function generateCyberPuzzle(difficulty = 2, mode = 'breach') {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // ── PUZZLE DARURAT DEFENDER DI DM ──
    if (mode === 'defend') {
        const defTypes = ['bitwise_nand', 'hex_sub', 'pin_checksum'];
        const pick = defTypes[randInt(0, defTypes.length - 1)];

        if (pick === 'bitwise_nand') {
            let b1 = '', b2 = '', ans = '';
            for (let i = 0; i < 5; i++) {
                const bit1 = randInt(0, 1);
                const bit2 = randInt(0, 1);
                b1 += bit1;
                b2 += bit2;

                ans += (bit1 === 1 && bit2 === 1) ? '0' : '1';
            }
            return {
                title: 'EMERGENCY NAND GATE LOCK',
                question:
                    `Pecahkan gerbang **NAND** 5-bit berikut:\n` +
                    `👉 *\`${b1}\` NAND \`${b2}\`*\n` +
                    `💡 _Aturan NAND: Jika kedua bit sejajar sama-sama \`1\` maka hasilnya \`0\`, selain itu hasilnya \`1\`!_`,
                answer: ans
            };
        }

        if (pick === 'hex_sub') {
            const hexVal = randInt(18, 45);
            const hexStr = '0x' + hexVal.toString(16).toUpperCase();
            const mult = randInt(4, 7);
            const sub = randInt(15, 49);
            const ans = (hexVal * mult) - sub;
            return {
                title: 'KERNEL HEX PATCHING',
                question:
                    `Hitung nilai desimal penutup port berikut:\n` +
                    `👉 Rumus: *\`(${hexStr} × ${mult}) -${sub}\`*\n` +
                    `💡 _ Cara hitung Hex \`${hexStr}\`: (${Math.floor(hexVal / 16)} × 16) + ${hexVal % 16}_`,
                answer: String(ans)
            };
        }

        const d = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
        const sum = d[0] + d[1] + d[2] + d[3];
        const reversed = [...d].reverse().join('');
        const ans = `${reversed}-${sum}`;
        return {
            title: 'DUAL-FACTOR PAYLOAD SEAL',
            question:
                `Dari kode PIN *\`${d.join('')}\`*:\n` +
                `1. Balik urutan ke-4 angkanya dari belakang ke depan\n` +
                `2. Hitung total penjumlahan ke-4 angkanya\n` +
                `👉 Format Jawaban: *\`<PIN_Terbalik>-<Total_Jumlah>\`* (Contoh: \`4321-10\`)`,
            answer: ans
        };
    }

    // ── PUZZLE LOGIKA HACKER DI DM ──
    const pool = ['bin_hex_combo', 'double_bitwise', 'caesar_reverse', 'modulo_matrix', 'regex_math'];
    const chosen = pool[randInt(0, pool.length - 1)];

    if (chosen === 'bin_hex_combo') {
        const decBin = randInt(19, 58);
        const binStr = decBin.toString(2).padStart(6, '0');
        const hexDec = randInt(17, 47);
        const hexStr = '0x' + hexDec.toString(16).toUpperCase();
        const mult = randInt(2, 4);
        const finalAns = (decBin * mult) + hexDec;

        return {
            title: 'MULTI-BASE MEMORY INJECTION',
            question:
                `Selesaikan persamaan lintas-basis (Biner & Hex) berikut ke angka **Desimal**:\n` +
                `👉 Rumus: *\`(Biner ${binStr} × ${mult}) + Hex${hexStr}\`*\n\n` +
                `📌 *Panduan Logika:*\n` +
                `• Nilai bit 6-digit: \`32 | 16 | 8 | 4 | 2 | 1\`\n` +
                `• Nilai Hex \`0xXY\`: \`(X × 16) + Y\` (A=10, B=11, C=12, D=13, E=14, F=15)`,
            answer: String(finalAns)
        };
    }

    if (chosen === 'double_bitwise') {
        const len = 6;
        let a = '', b = '', c = '', ans = '';
        for (let i = 0; i < len; i++) {
            const ba = randInt(0, 1);
            const bb = randInt(0, 1);
            const bc = randInt(0, 1);
            a += ba;
            b += bb;
            c += bc;
            const xorRes = ba ^ bb;
            const andRes = xorRes & bc;

            ans += (andRes === 1 ? '0' : '1');
        }
        return {
            title: 'TRIPLE-LAYER BITWISE GATE',
            question:
                `Pecahkan rangkaian 3 gerbang logika 6-bit berikut secara berurutan:\n` +
                `👉 *\`NOT( (${a} XOR ${b}) AND${c} )\`*\n\n` +
                `📌 *Urutan Pengerjaan:*\n` +
                `1. **XOR**: Bandingkan \`${a}\` & \`${b}\` (Sama=\`0\`, Beda=\`1\`)\n` +
                `2. **AND**: Bandingkan hasil tadi dengan \`${c}\` (Hanya \`1\` & \`1\` yang jadi \`1\`, sisanya \`0\`)\n` +
                `3. **NOT**: Balik semua hasilnya (\`1\` jadi \`0\`, \`0\` jadi \`1\`)`,
            answer: ans
        };
    }

    if (chosen === 'caesar_reverse') {
        const words = ['KERNEL', 'DAEMON', 'CYPHER', 'SOCKET', 'PACKET', 'TROJAN', 'VECTOR', 'BUFFER', 'BOTNET'];
        const plain = words[randInt(0, words.length - 1)];
        const shift = randInt(2, 4);

        const reversedPlain = plain.split('').reverse().join('');
        const cipherArr = reversedPlain
            .split('')
            .map(ch => String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65));

        return {
            title: `REVERSE CAESAR CIPHER (-${shift} SHIFT)`,
            question:
                `Dekripsi sandi berlapis berikut:\n` +
                `👉 Sandi: *\`${cipherArr.join(' - ')}\`*\n\n` +
                `📌 *2 Langkah Dekripsi:*\n` +
                `1. Geser **MUNDUR -${shift} huruf alfabet** untuk setiap huruf di atas.\n` +
                `2. Setelah ketemu hurufnya, **BALIK urutan katanya dari belakang ke depan**!`,
            answer: plain
        };
    }

    if (chosen === 'modulo_matrix') {
        const n1 = randInt(140, 290);
        const mod1 = randInt(13, 29);
        const n2 = randInt(85, 175);
        const mod2 = randInt(9, 19);
        const mult = randInt(5, 9);

        const r1 = n1 % mod1;
        const r2 = n2 % mod2;
        const ans = (r1 * mult) + (r2 * r2);

        return {
            title: 'RSA MODULAR ARITHMETIC',
            question:
                `Hitung kunci privat RSA dari operasi Modulo (\`%\` = sisa pembagian) berikut:\n` +
                `👉 Rumus: *\`((${n1} % ${mod1}) ×${mult}) + ((${n2} \%${mod2})²)\`*\n\n` +
                `📌 *Panduan:*\n` +
                `• \`A % B\` adalah **sisa bagi** dari \`A ÷ B\`.\n` +
                `• Hitung hasil \`(${n1} \%${mod1})\` lalu kalikan \`${mult}\`, kemudian tambahkan dengan kuadrat dari \`(${n2} \%${mod2})\`!`,
            answer: String(ans)
        };
    }

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const nums = Array.from({ length: 6 }, () => randInt(1, 9));
    const dump = nums.map(n => `${chars[randInt(0, 23)]}${n}`).join('-');
    const oddNums = nums.filter(n => n % 2 !== 0);
    const evenNums = nums.filter(n => n % 2 === 0);
    const sumAll = nums.reduce((a, b) => a + b, 0);
    const codePart = [...oddNums, ...evenNums].join('');
    const ans = `${codePart}-${sumAll}`;

    return {
        title: 'MEMORY DUMP PARSER & CHECKSUM',
        question:
            `Perhatikan struktur Memory Dump berikut:\n` +
            `👉 Dump: *\`${dump}\`*\n\n` +
            `📌 *Instruksi Ekstraksi:*\n` +
            `1. Ambil semua **angka GANJIL** berurutan dari kiri ke kanan, lalu sambung dengan semua **angka GENAP** dari kiri ke kanan.\n` +
            `2. Tambahkan tanda strip \`-\` diikuti **total penjumlahan** seluruh 6 angka tersebut.\n` +
            `💡 _Contoh jika angkanya 2,5,4,3,8,1 ➔ Ganjil(531) + Genap(248) - Jumlah(23) = \`531248-23\`_`,
        answer: ans
    };
}

function calcHand(hand) {
    let total = hand.reduce((acc, c) => acc + c.val, 0);
    let aces = hand.filter(c => c.rank === 'A').length;
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}

function getRpgDB() {
    if (!fs.existsSync('./lib/database')) fs.mkdirSync('./lib/database', { recursive: true });
    if (!fs.existsSync(RPG_PATH)) fs.writeFileSync(RPG_PATH, JSON.stringify({}, null, 2));
    try {
        return JSON.parse(fs.readFileSync(RPG_PATH, 'utf-8'));
    } catch (e) {
        return {};
    }
}

function saveWhiteGroups(data) {
    if (!fs.existsSync('./lib/database')) fs.mkdirSync('./lib/database', { recursive: true });
    fs.writeFileSync(WHITEGROUP_PATH, JSON.stringify(data, null, 2));
}

const lastSyncedSnapshot = {};
function saveRpgDB(data) {
    if (!fs.existsSync('./lib/database')) fs.mkdirSync('./lib/database', { recursive: true });
    fs.writeFileSync(RPG_PATH, JSON.stringify(data, null, 2));

    // Otomatis sinkronkan ke Firebase jika ada perubahan money / crypto / forex dari command WA!
    try {
        for (const [jid, uData] of Object.entries(data)) {
            if (!jid.endsWith('@s.whatsapp.net') || !uData || typeof uData !== 'object') continue;
            const snapKey = `${uData.money || 0}_${JSON.stringify(uData.crypto || {})}_${(uData.forexPositions || []).length}`;
            if (lastSyncedSnapshot[jid] !== undefined && lastSyncedSnapshot[jid] !== snapKey) {
                lastSyncedSnapshot[jid] = snapKey;
                syncUserToFirebase(jid, uData).catch(() => {});
            } else if (lastSyncedSnapshot[jid] === undefined) {
                lastSyncedSnapshot[jid] = snapKey;
            }
        }
    } catch (_) {}
}

function initUserRpg(db, jid) {
    if (!db[jid]) {
        db[jid] = {
            money: 1000,
            exp: 0,
            level: 1,
            limit: 50,
            diamond: 0,
            potion: 2,
            ikan: 0,
            batu: 0,
            besi: 0,
            emas: 0,
            umpan: 5,
            lastFishing: 0,
            lastMining: 0,
            lastRob: 0,
            lastDaily: 0
        };
        saveRpgDB(db);
    }
    if (!db[jid].pancingan) db[jid].pancingan = 1;
    if (!db[jid].fishes) db[jid].fishes = {};
  if (typeof db[jid].lastHack !== 'number') db[jid].lastHack = 0;
if (typeof db[jid].firewall !== 'number') db[jid].firewall = 0;
if (!db[jid].cyberSkills) {
    db[jid].cyberSkills = {
        bruteforce: 0,
        zero_day: 0,
        ghost_vpn: 0,
        encryption: 0,
        ice_wall: 0,
        ai_ids: 0
    };
}
        if (typeof db[jid].limit !== 'number') db[jid].limit = 50;
    if (typeof db[jid].lastDaily !== 'number') db[jid].lastDaily = 0;
    if (!db[jid].pet) db[jid].pet = { type: null, level: 1, exp: 0, lastFeed: 0 };
    if (!db[jid].crypto) db[jid].crypto = { guts: 0, btc: 0, eth: 0, sol: 0 };
    if (!Array.isArray(db[jid].forexPositions)) db[jid].forexPositions = [];
    return db[jid];
}

if (!global.marketControlState) {
    global.marketControlState = {
        mult: { guts: 1, btc: 1, eth: 1, sol: 1 },
        fxShift: { xau: 0, eur: 0, gbp: 0, idr: 0 },
        eventName: '',
        expiresAt: 0,
        lastBroadcastId: 0,
        lastTaxRaidId: 0
    };
}

function getForexPrices() {
    const nowSec = Math.floor(Date.now() / 1000);
    const isCtrlActive = global.marketControlState && (global.marketControlState.expiresAt === 0 || Date.now() < global.marketControlState.expiresAt);
    const fxShift = isCtrlActive ? (global.marketControlState.fxShift || {}) : {};

    const fxMeta = {
        xau: { pair: 'XAU/USD', name: 'Gold Spot (Emas)', seed: 11, base: 2610, range: 95, dec: 2 },
        eur: { pair: 'EUR/USD', name: 'Euro / US Dollar', seed: 22, base: 1.0820, range: 0.0280, dec: 4 },
        gbp: { pair: 'GBP/JPY', name: 'Great Britain Pound / Yen', seed: 33, base: 191.20, range: 6.40, dec: 2 },
        idr: { pair: 'USD/IDR', name: 'US Dollar / Rupiah', seed: 44, base: 15750, range: 480, dec: 0 }
    };

    const calcWave = (sec, seed) => {
        const trend = Math.sin(sec / 300 + seed * 1.7) * 0.38;
        const swing = Math.sin(sec / 45 + seed * 3.1) * 0.25;
        const spike = Math.pow(Math.sin(sec / 18 + seed * 5.3), 3) * 0.22;
        const tick  = Math.sin(sec / 2 + seed * 11.7) * 0.08;
        const rawNoise = Math.sin(sec * 12.9898 + seed * 78.233) * 43758.5453;
        const jitter = ((rawNoise - Math.floor(rawNoise)) - 0.5) * 0.07;
        return (trend + swing + spike + tick + jitter + 1) / 2;
    };

    const out = {};
    for (const [k, m] of Object.entries(fxMeta)) {
        const shiftPct = Number(fxShift[k]) || 0;
        const curWave = calcWave(nowSec, m.seed);
        const openDayWave = calcWave(nowSec - 300, m.seed);

        let curRaw = (m.base + curWave * m.range) * (1 + (shiftPct / 100));
        curRaw = Math.max(m.base * 0.2, curRaw);
        const prevRaw = m.base + openDayWave * m.range;

        const price = Number(curRaw.toFixed(m.dec));
        const prevPrice = Number(prevRaw.toFixed(m.dec));
        const changePct = (((price - prevPrice) / prevPrice) * 100).toFixed(2);

        out[k] = {
            key: k,
            pair: m.pair,
            name: m.name,
            price,
            dec: m.dec,
            change: changePct
        };
    }
    return out;
}

function calcForexPosition(pos, currentPrice) {
    const entry = Number(pos.entryPrice);
    const margin = Number(pos.margin);
    const lev = Number(pos.leverage);
    const dir = pos.side === 'LONG' ? 1 : -1;

    const priceDiffRatio = ((currentPrice - entry) / entry) * dir;
    const roePct = priceDiffRatio * lev * 100;
    const pnlUsd = Math.floor(margin * (roePct / 100));
    const equity = margin + pnlUsd;

    // Margin Call terjadi jika rugi mencapai -95% dari Margin
    const liqPrice = pos.side === 'LONG'
        ? entry * (1 - (0.95 / lev))
        : entry * (1 + (0.95 / lev));

    const isLiquidated = roePct <= -95 || equity <= 0 ||
        (pos.side === 'LONG' && currentPrice <= liqPrice) ||
        (pos.side === 'SHORT' && currentPrice >= liqPrice);

    const isTpHit = pos.tp && pos.tp > 0 && (
        (pos.side === 'LONG' && currentPrice >= pos.tp) ||
        (pos.side === 'SHORT' && currentPrice <= pos.tp)
    );

    const isSlHit = pos.sl && pos.sl > 0 && (
        (pos.side === 'LONG' && currentPrice <= pos.sl) ||
        (pos.side === 'SHORT' && currentPrice >= pos.sl)
    );

    return {
        pnlUsd,
        roePct: Number(roePct.toFixed(2)),
        equity: Math.max(0, equity),
        liqPrice,
        isLiquidated,
        isTpHit,
        isSlHit
    };
}

async function pullWebCryptoIfNewer(jid, db, userData) {
    try {
        const cleanNum = jid.split('@')[0].split(':')[0];
        const res = await axios.get(`${FIREBASE_DB_URL}/wa_users/${cleanNum}.json`, { timeout: 6000 });
        const remote = res.data;
        if (remote && typeof remote === 'object' && remote.webUpdatedAt) {
            const lastLocalSync = userData.lastWebSync || 0;
            if (remote.webUpdatedAt > lastLocalSync) {
                if (typeof remote.money === 'number') userData.money = Math.max(0, Math.floor(remote.money));
                if (remote.crypto && typeof remote.crypto === 'object') {
                    if (!userData.crypto) userData.crypto = { guts: 0, btc: 0, eth: 0, sol: 0 };
                    for (const c of ['guts', 'btc', 'eth', 'sol']) {
                        if (typeof remote.crypto[c] === 'number') {
                            userData.crypto[c] = Number(Math.max(0, remote.crypto[c]).toFixed(4));
                        }
                    }
                }
                userData.forexPositions = Array.isArray(remote.forexPositions) ? remote.forexPositions : [];
                userData.lastWebSync = remote.webUpdatedAt;
                saveRpgDB(db);
                return true;
            }
        }
    } catch (_) {}
    return false;
}

async function syncUserToFirebase(jid, userData, extra = {}) {
    try {
        const cleanNum = jid.split('@')[0].split(':')[0];
        const nowTs = Date.now();
        userData.lastWebSync = nowTs;

        const ownerNums = ['6287841489287', '6287851101531', ...(global.owner || []), ...ownerbot]
            .map(v => String(v).replace(/[^0-9]/g, ''))
            .filter(Boolean);
        const isAdminUser = ownerNums.includes(cleanNum);

        const payload = {
            jid,
            number: cleanNum,
            username: extra.username || userData.username || cleanNum,
            ppUrl: extra.ppUrl || userData.ppUrl || "https://telegra.ph/file/24fa902ead26340f3df2c.png",
            secretKey: userData.secretKey || null,
            isAdmin: isAdminUser,
            money: userData.money || 0,
            limit: userData.limit ?? 50,
            level: userData.level || 1,
            exp: userData.exp || 0,
            diamond: userData.diamond || 0,
            crypto: userData.crypto || { guts: 0, btc: 0, eth: 0, sol: 0 },
            forexPositions: Array.isArray(userData.forexPositions) ? userData.forexPositions : [],
            chessWin: userData.chessWin || 0,
            chessLose: userData.chessLose || 0,
            updatedAt: nowTs,
            webUpdatedAt: nowTs
        };
        await axios.patch(`${FIREBASE_DB_URL}/wa_users/${cleanNum}.json`, payload, { timeout: 10000 });
        if (userData.secretKey) {
            await axios.put(`${FIREBASE_DB_URL}/secret_keys/${userData.secretKey}.json`, {
                number: cleanNum,
                jid
            }, { timeout: 10000 });
        }
        return payload;
    } catch (e) {
        console.error('[FIREBASE SYNC ERROR]:', e.message);
        return null;
    }
}

async function executeWealthTax(customRatePct = null, reasonTitle = 'PAJAK KEKAYAAN SULTAN OTOMATIS') {
    const rpg = getRpgDB();
    const market = getCryptoPrices();
    let taxedUsers = [];
    let totalTaxCollected = 0;

    for (const [jid, u] of Object.entries(rpg)) {
        if (!jid.endsWith('@s.whatsapp.net')) continue;
        const cash = u.money || 0;
        let cryptoVal = 0;
        if (u.crypto) {
            for (const c of ['guts', 'btc', 'eth', 'sol']) {
                cryptoVal += (u.crypto[c] || 0) * (market[c]?.price || 0);
            }
        }
        const netWorth = cash + cryptoVal;
        if (netWorth < 100000000) continue;

        let rate = customRatePct !== null ? (customRatePct / 100) : (netWorth >= 100000000000 ? 0.12 : netWorth >= 1000000000 ? 0.08 : 0.05);
        rate = Math.min(0.50, Math.max(0.01, rate));

        const cashTax = Math.floor(cash * rate);
        u.money = Math.max(0, cash - cashTax);

        let cryptoTaxUsd = 0;
        if (u.crypto) {
            for (const c of ['guts', 'btc', 'eth', 'sol']) {
                if ((u.crypto[c] || 0) > 0) {
                    const cutCoin = Number((u.crypto[c] * rate).toFixed(4));
                    u.crypto[c] = Number(Math.max(0, u.crypto[c] - cutCoin).toFixed(4));
                    cryptoTaxUsd += Math.floor(cutCoin * (market[c]?.price || 0));
                }
            }
        }

        const totalUserTax = cashTax + cryptoTaxUsd;
        if (totalUserTax > 0) {
            totalTaxCollected += totalUserTax;
            taxedUsers.push({ jid, totalUserTax, ratePct: Math.round(rate * 100) });
            await syncUserToFirebase(jid, u);
        }
    }

    if (taxedUsers.length > 0) {
        saveRpgDB(rpg);
        taxedUsers.sort((a, b) => b.totalUserTax - a.totalUserTax);
        const topList = taxedUsers.slice(0, 8).map((t, i) => `${i + 1}. @${t.jid.split('@')[0]} — *-$${t.totalUserTax.toLocaleString()}* (${t.ratePct}%)`).join('\n');
        const taxMsg =
            `*[ 🏦⚖️ ${reasonTitle} ]*\n` +
            `Bank Sentral GutS telah menarik pajak progresif dari akun Elite (Kekayaan > $100 Juta)!\n\n` +
            `*Daftar User Terkena Pajak:*\n${topList}\n\n` +
            `🔥 *Total Uang & Aset Dibakar:* *$${totalTaxCollected.toLocaleString()}*`;

        if (global.activeChessSock && whitegroups.length > 0) {
            for (const gid of whitegroups) {
                await global.activeChessSock.sendMessage(gid, {
                    text: taxMsg,
                    mentions: taxedUsers.slice(0, 8).map(t => t.jid)
                }).catch(() => {});
            }
        }
    }
}

if (!global.chessPayoutInterval) {
    global.chessPayoutInterval = setInterval(async () => {
        if (!global.activeChessSock) return;
        try {
            const res = await axios.get(`${FIREBASE_DB_URL}/rooms.json?orderBy="waPayoutStatus"&equalTo="pending"`, { timeout: 10000 });
            const rooms = res.data;
            if (!rooms || typeof rooms !== 'object') return;

            for (const [roomCode, room] of Object.entries(rooms)) {
                if (!room || room.waPayoutStatus !== 'pending') continue;

                await axios.patch(`${FIREBASE_DB_URL}/rooms/${roomCode}.json`, { waPayoutStatus: 'done' });

                const rpg = getRpgDB();
                const wJid = room.white?.jid;
                const bJid = room.black?.jid;
                const bet = Number(room.bet) || 0;
                const resultType = room.winnerColor;

                if (!wJid || !bJid) continue;
                const uWhite = initUserRpg(rpg, wJid);
                const uBlack = initUserRpg(rpg, bJid);

                let announceText = '';
                if (resultType === 'draw') {
                    uWhite.money += bet;
                    uBlack.money += bet;
                    saveRpgDB(rpg);
                    await syncUserToFirebase(wJid, uWhite);
                    await syncUserToFirebase(bJid, uBlack);

                    announceText =
                        `*[ 🤝 𝙲𝙷𝙴𝚂𝚂 𝙼𝙰𝚃𝙲𝙷 𝙳𝚁𝙰𝚆! ]*\n` +
                        `• *Room:* \`${roomCode}\`\n` +
                        `• *Putih:* @${wJid.split('@')[0]}\n` +
                        `• *Hitam:* @${bJid.split('@')[0]}\n` +
                        `• *Alasan:* ${room.winReason || 'Remis / Kesepakatan'}\n\n` +
                        `${bet > 0 ? `💰 Taruhan *$${bet.toLocaleString()}* telah dikembalikan ke masing-masing pemain.` : 'Pertandingan berakhir seri!'}`;
                } else if (resultType === 'w' || resultType === 'b') {
                    const winJid = resultType === 'w' ? wJid : bJid;
                    const loseJid = resultType === 'w' ? bJid : wJid;
                    const uWin = resultType === 'w' ? uWhite : uBlack;
                    const uLose = resultType === 'w' ? uBlack : uWhite;

                    const totalPot = bet > 0 ? bet * 2 : 5000;
                    const netProfit = bet > 0 ? bet : 5000;

                    uWin.money += totalPot;
                    uWin.exp += 150;
                    uWin.chessWin = (uWin.chessWin || 0) + 1;
                    uLose.chessLose = (uLose.chessLose || 0) + 1;
                    saveRpgDB(rpg);

                    await syncUserToFirebase(winJid, uWin);
                    await syncUserToFirebase(loseJid, uLose);

                    announceText =
                        `*[ ♟️🏆 𝙲𝙷𝙴𝚂𝚂 𝙼𝙰𝚃𝙲𝙷 𝚁𝙴𝚂𝚄𝙻𝚃 ]*\n` +
                        `• *Room:* \`${roomCode}\`\n` +
                        `• *Pemenang:* @${winJid.split('@')[0]} (${resultType === 'w' ? '♔ Putih' : '♚ Hitam'})\n` +
                        `• *Kalah:* @${loseJid.split('@')[0]}\n` +
                        `• *Status:* ${room.winReason || 'Skakmat'}\n\n` +
                        `🎉 *Hadiah Pemenang:* +$${netProfit.toLocaleString()} Money${bet > 0 ? `(Total Cair $${totalPot.toLocaleString()})` : ''} & +150 EXP!`;
                }

                if (room.groupChat && announceText) {
                    await global.activeChessSock.sendMessage(room.groupChat, {
                        text: announceText,
                        mentions: [wJid, bJid]
                    }).catch(() => {});
                }
            }
        } catch (_) {}
    }, 6000);
}

if (!global.cryptoWebSyncInterval) {
    setTimeout(async () => {
        try {
            const rpg = getRpgDB();
            for (const [jid, uData] of Object.entries(rpg)) {
                if (!jid.endsWith('@s.whatsapp.net')) continue;
                const pulled = await pullWebCryptoIfNewer(jid, rpg, uData);
                if (!pulled) {
                    const hasCrypto = uData.crypto && Object.values(uData.crypto).some(v => v > 0);
                    const hasFx = Array.isArray(uData.forexPositions) && uData.forexPositions.length > 0;
                    if (uData.secretKey || hasCrypto || hasFx || (uData.money || 0) > 1000) {
                        await syncUserToFirebase(jid, uData);
                    }
                }
            }
        } catch (e) {}
    }, 4000);

    setInterval(() => {
        executeWealthTax(null, 'PAJAK KEKAYAAN SULTAN OTOMATIS').catch(() => {});
    }, 6 * 3600 * 1000);

    global.cryptoWebSyncInterval = setInterval(async () => {
        try {
            const res = await axios.get(`${FIREBASE_DB_URL}/wa_users.json`, { timeout: 8000 });
            const allWebUsers = res.data;
            if (!allWebUsers || typeof allWebUsers !== 'object') return;

            const ctrl = allWebUsers._market_control;
            if (ctrl && typeof ctrl === 'object') {
                const prevBroadcast = global.marketControlState.lastBroadcastId || 0;
                const prevTaxRaid = global.marketControlState.lastTaxRaidId || 0;

                global.marketControlState = {
                    mult: ctrl.mult || { guts: 1, btc: 1, eth: 1, sol: 1 },
                    fxShift: ctrl.fxShift || { xau: 0, eur: 0, gbp: 0, idr: 0 },
                    eventName: ctrl.eventName || '',
                    expiresAt: Number(ctrl.expiresAt) || 0,
                    lastBroadcastId: Number(ctrl.broadcastId) || prevBroadcast,
                    lastTaxRaidId: Number(ctrl.taxRaidId) || prevTaxRaid
                };

                if (ctrl.broadcastId && ctrl.broadcastId > prevBroadcast && prevBroadcast !== 0 && global.activeChessSock) {
                    const mPrices = getCryptoPrices();
                    const fxPrices = getForexPrices();
                    const alertTxt =
                        `*[ 🚨📊 𝙱𝚁𝙴𝙰𝙺𝙸𝙽𝙶 𝙽𝙴𝚆𝚂: 𝙶𝚄𝚃𝚂 𝙴𝚇𝙲𝙷𝙰𝙽𝙶𝙴 ]*\n` +
                        `📢 *Event:* *${ctrl.eventName || 'Pergerakan Pasar Ekstrem!'}*\n` +
                        `${ctrl.customMsg ? `💬 _"${ctrl.customMsg}"_\n` : ''}\n` +
                        `*Harga Crypto & Forex Saat Ini:*\n` +
                        `• *GUTS:* $${mPrices.guts.price.toLocaleString()} \vert{} *BTC:*$${mPrices.btc.price.toLocaleString()}\n` +
                        `• *XAU/USD:* ${fxPrices.xau.price} \vert{} *GBP/JPY:*${fxPrices.gbp.price}\n\n` +
                        `⚡ _Cek posisi *.forex* dan *.crypto* kalian sebelum kena Margin Call!_`;

                    for (const gid of whitegroups) {
                        await global.activeChessSock.sendMessage(gid, { text: alertTxt }).catch(() => {});
                    }
                } else if (ctrl.broadcastId && prevBroadcast === 0) {
                    global.marketControlState.lastBroadcastId = ctrl.broadcastId;
                }

                if (ctrl.taxRaidId && ctrl.taxRaidId > prevTaxRaid && prevTaxRaid !== 0) {
                    const ratePct = Number(ctrl.taxRaidRate) || 10;
                    await executeWealthTax(ratePct, `SIDAK PAJAK RAYA (${ratePct}%)`);
                } else if (ctrl.taxRaidId && prevTaxRaid === 0) {
                    global.marketControlState.lastTaxRaidId = ctrl.taxRaidId;
                }
            }

            const rpg = getRpgDB();
            const fxPrices = getForexPrices();
            let changed = false;

            for (const [cleanNum, remote] of Object.entries(allWebUsers)) {
                if (cleanNum === '_market_control' || !remote || !remote.webUpdatedAt) continue;
                const jid = remote.jid || `${cleanNum}@s.whatsapp.net`;
                const u = initUserRpg(rpg, jid);

                if (remote.webUpdatedAt > (u.lastWebSync || 0)) {
                    if (typeof remote.money === 'number') u.money = Math.max(0, Math.floor(remote.money));
                    if (remote.crypto && typeof remote.crypto === 'object') {
                        for (const c of ['guts', 'btc', 'eth', 'sol']) {
                            if (typeof remote.crypto[c] === 'number') {
                                u.crypto[c] = Number(Math.max(0, remote.crypto[c]).toFixed(4));
                            }
                        }
                    }
                    u.forexPositions = Array.isArray(remote.forexPositions) ? remote.forexPositions : [];
                    u.lastWebSync = remote.webUpdatedAt;
                    changed = true;
                }
            }

                        // Cek Margin Call (MC), Take Profit (TP), & Stop Loss (SL) secara SENYAP (Tanpa Spam Grup WA)
            for (const [jid, u] of Object.entries(rpg)) {
                if (!Array.isArray(u.forexPositions) || u.forexPositions.length === 0) continue;
                let userPosChanged = false;
                const remaining = [];

                for (const pos of u.forexPositions) {
                    const fx = fxPrices[pos.pairKey];
                    if (!fx) { remaining.push(pos); continue; }

                    const st = calcForexPosition(pos, fx.price);
                    if (st.isLiquidated) {
                        // Posisi hangus kena MC secara senyap tanpa kirim chat ke grup
                        userPosChanged = true;
                        changed = true;
                    } else if (st.isTpHit || st.isSlHit) {
                        // Cairkan ke saldo secara senyap tanpa kirim chat ke grup
                        userPosChanged = true;
                        changed = true;
                        u.money = (u.money || 0) + st.equity;
                    } else {
                        remaining.push(pos);
                    }
                }

                if (userPosChanged) {
                    u.forexPositions = remaining;
                    await syncUserToFirebase(jid, u);
                }
            }

            if (changed) saveRpgDB(rpg);
        } catch (_) {}
    }, 4000);
}

function getCryptoPrices() {
    const slot = Math.floor(Date.now() / 300000);
    const pseudo = (s, seed) => {
        const x = Math.sin(s * 999 + seed * 77) * 10000;
        return x - Math.floor(x);
    };

    // Natural Random Crash / Whale Pump (~7% peluang acak, tidak setiap jam!)
    const getNaturalEventMult = (s, seed) => {
        const r = pseudo(s + 33, seed * 19);
        if (r < 0.045) return 0.38; // 4.5% peluang Natural Flash Crash (-62%)
        if (r > 0.975) return 1.65; // 2.5% peluang Natural Whale Pump (+65%)
        return 1.0;
    };

    const isCtrlActive = global.marketControlState && (global.marketControlState.expiresAt === 0 || Date.now() < global.marketControlState.expiresAt);
    const adminMults = isCtrlActive ? (global.marketControlState.mult || {}) : {};

    const meta = {
        guts: { name: 'GUTS Coin', seed: 1, base: 200, range: 1300, vol: 35 },
        btc:  { name: 'Bitcoin (BTC)', seed: 2, base: 15000, range: 20000, vol: 20 },
        eth:  { name: 'Ethereum (ETH)', seed: 3, base: 3000, range: 5000, vol: 25 },
        sol:  { name: 'Solana (SOL)', seed: 4, base: 600, range: 1900, vol: 30 }
    };

    const out = {};
    for (const [k, m] of Object.entries(meta)) {
        const p = pseudo(slot, m.seed);
        const rawPrice = m.base + p * m.range;
        const natMult = getNaturalEventMult(slot, m.seed);
        const admMult = Number(adminMults[k]) || 1;
        const totalMult = natMult * admMult;

        const finalPrice = Math.max(1, Math.floor(rawPrice * totalMult));
        let baseChange = (p - 0.48) * m.vol;
        if (totalMult !== 1) {
            baseChange += (totalMult - 1) * 100;
        }
        out[k] = {
            name: m.name,
            price: finalPrice,
            change: baseChange.toFixed(2),
            eventActive: totalMult !== 1
        };
    }
    return out;
}

const monoToNormal = {
    '𝙰':'A','𝙱':'B','𝙲':'C','𝙳':'D','𝙴':'E','𝙵':'F','𝙶':'G','𝙷':'H','𝙸':'I','𝙹':'J','𝙺':'K','𝙻':'L','𝙼':'M','𝙽':'N','𝙾':'O','𝙿':'P','𝚀':'Q','𝚁':'R','𝚂':'S','𝚃':'T','𝚄':'U','𝚅':'V','𝚆':'W','𝚇':'X','𝚈':'Y','𝚉':'Z',
    '𝚊':'a','𝚋':'b','𝚌':'c','𝚍':'d','𝚎':'e','𝚏':'f','𝚐':'g','𝚑':'h','𝚒':'i','𝚓':'j','𝚔':'k','𝚕':'l','𝚖':'m','𝚗':'n','𝚘':'o','𝚙':'p','𝚚':'q','𝚛':'r','𝚜':'s','𝚝':'t','𝚞':'u','𝚟':'v','𝚠':'w','𝚡':'x','𝚢':'y','𝚣':'z',
    '𝟶':'0','𝟷':'1','𝟸':'2','𝟹':'3','𝟺':'4','𝟻':'5','𝟼':'6','𝟽':'7','𝟾':'8','𝟿':'9'
};

const normalToBold = {
    'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙',
    'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣','k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭','u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳',
    '0':'𝟎','1':'𝟏','2':'𝟐','3':'𝟑','4':'𝟒','5':'𝟓','6':'𝟔','7':'𝟕','8':'𝟖','9':'𝟗'
};

export function applyUserFont(text, jid) {
    if (typeof text !== 'string') return text;
    let userFonts = fs.existsSync(FONT_PATH) ? JSON.parse(fs.readFileSync(FONT_PATH)) : {};
    const type = userFonts[jid] || '1';
    if (type === '1') return text;

    let normal = [...text].map(ch => monoToNormal[ch] || ch).join('');
    if (type === '2') return normal;

    if (type === '3') {
        return [...normal].map(ch => normalToBold[ch] || ch).join('');
    }
    return text;
}

function parseDuration(str) {
    const match = /^(\d+)(s|m|h|d)$/i.exec(str);
    if (!match) return null;
    const val = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    if (unit === 's') return val * 1000;
    if (unit === 'm') return val * 60000;
    if (unit === 'h') return val * 3600000;
    if (unit === 'd') return val * 86400000;
    return null;
}

function isSameUser(jid1, jid2, participants = []) {
    if (!jid1 || !jid2) return false;
    const clean1 = jid1.split('@')[0].split(':')[0].toLowerCase();
    const clean2 = jid2.split('@')[0].split(':')[0].toLowerCase();
    if (clean1 === clean2) return true;

    for (const p of participants) {
        const pIds = [p.id, p.jid, p.lid, p.phoneNumber]
            .filter(Boolean)
            .map(x => x.split('@')[0].split(':')[0].toLowerCase());
        if (pIds.includes(clean1) && pIds.includes(clean2)) return true;
    }
    return false;
}

function getTargetUser(m, args, participants = [], sock = null, botNumber = '') {
    let rawTarget = null;
    if (m.quoted?.sender) {
        rawTarget = m.quoted.sender;
    } else if (m.message?.extendedTextMessage?.contextInfo?.participant) {
        rawTarget = m.message.extendedTextMessage.contextInfo.participant;
    } else {
        const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || m.msg?.contextInfo?.mentionedJid || m.mentionedJid;
        if (mentioned && mentioned[0]) rawTarget = mentioned[0];
    }

    if (!rawTarget && args[0]) {
        const clean = args[0].replace(/[^0-9]/g, '');
        if (clean.length >= 8) rawTarget = clean + '@s.whatsapp.net';
    }

    if (!rawTarget) return null;

    const cleanTarget = rawTarget.split('@')[0].split(':')[0].toLowerCase();

    if (sock?.user) {
        const botLid = (sock.user.lid || '').split('@')[0].split(':')[0].toLowerCase();
        const botPhone = (botNumber || sock.user.id || '').split('@')[0].split(':')[0].toLowerCase();
        if (cleanTarget === botLid || cleanTarget === botPhone) {
            return botPhone + '@s.whatsapp.net';
        }
    }

    if (participants.length > 0) {
        const found = participants.find(p =>
            [p.id, p.jid, p.lid, p.phoneNumber].filter(Boolean).some(x => x.split('@')[0].split(':')[0].toLowerCase() === cleanTarget)
        );
        if (found) {
            const phoneJid = [found.jid, found.phoneNumber, found.id].find(x => x && x.endsWith('@s.whatsapp.net'));
            if (phoneJid) return phoneJid.split(':')[0].split('@')[0] + '@s.whatsapp.net';
            return found.jid || found.id || rawTarget;
        }
    }

    if (rawTarget.endsWith('@s.whatsapp.net')) {
        return cleanTarget + '@s.whatsapp.net';
    }

    return rawTarget;
}

function addStickerExif(webpBuffer, packname, author) {
    try {
        const json = {
            "sticker-pack-id": "com.guts.md.bot",
            "sticker-pack-name": packname || global.botname || "𝔊𝔲𝔱𝔖 | 𝙼𝙳",
            "sticker-pack-publisher": author || global.namaown || "7Tyn",
            "emojis": ["🔥"]
        };
        const exifAttr = Buffer.from([
            0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00,
            0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x16, 0x00, 0x00, 0x00
        ]);
        const jsonBuf = Buffer.from(JSON.stringify(json), "utf-8");
        const exif = Buffer.concat([exifAttr, jsonBuf]);
        exif.writeUIntLE(jsonBuf.length, 14, 4);

        const exifChunkHeader = Buffer.from("EXIF", "ascii");
        const exifSize = Buffer.alloc(4);
        exifSize.writeUInt32LE(exif.length, 0);
        const pad = exif.length % 2 !== 0 ? Buffer.from([0x00]) : Buffer.alloc(0);

        const bufCopy = Buffer.from(webpBuffer);
        const riffHeader = bufCopy.slice(0, 12);
        let webpBody = bufCopy.slice(12);

        const vp8xIdx = bufCopy.indexOf("VP8X");
        if (vp8xIdx !== -1) {
            bufCopy[vp8xIdx + 8] |= 0x08;
            webpBody = bufCopy.slice(12);
        } else {
            const vp8xChunk = Buffer.from([
                0x56, 0x50, 0x38, 0x58, // "VP8X"
                0x0A, 0x00, 0x00, 0x00, // Chunk size = 10 bytes
                0x08, 0x00, 0x00, 0x00, // Flags: 0x08 (EXIF present)
                0xFF, 0x01, 0x00,       // Canvas Width - 1 = 511 (512px)
                0xFF, 0x01, 0x00
            ]);
            webpBody = Buffer.concat([vp8xChunk, webpBody]);
        }

        const out = Buffer.concat([riffHeader, webpBody, exifChunkHeader, exifSize, exif, pad]);
        out.writeUInt32LE(out.length - 8, 4);
        return out;
    } catch (e) {
        return webpBuffer;
    }
}

function getStringSimilarity(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    if (s1 === s2) return 1;
    if (s1.length < 2 || s2.length < 2) return 0;
    let bigrams1 = new Map();
    for (let i = 0; i < s1.length - 1; i++) {
        const bg = s1.substring(i, i + 2);
        bigrams1.set(bg, (bigrams1.get(bg) || 0) + 1);
    }
    let intersection = 0;
    for (let i = 0; i < s2.length - 1; i++) {
        const bg = s2.substring(i, i + 2);
        const count = bigrams1.get(bg) || 0;
        if (count > 0) {
            bigrams1.set(bg, count - 1);
            intersection++;
        }
    }
    return (2.0 * intersection) / (s1.length + s2.length - 2);
}

const ALL_CASE_COMMANDS = [
    'menu', 'setfont', 'rvo', 'readviewonce', 'ping', 'pinglive', 'serverinfo', 'monitor', 'public', 'self', 'jadibot', 'stopjadibot', 'listjadibot',
    'addowner', 'delowner', 'addprem', 'delprem',
    'cekidgroup', 'absen', 'cekabsen', 'add', 'addalarm', 'addbadword',
    'addlist', 'updatelist', 'uplist', 'addpoin', 'addreminder',
    'afk', 'antibadword', 'antibadwordnokick', 'antibot', 'antidelete',
    'antilink', 'antilinkchannel', 'antilinknokick', 'antiluar', 'antimentionsw',
    'antiviewonce', 'antiwame', 'antiwamenokick', 'banmember',
    'blacklist', 'delblacklist', 'listblacklist', 'resetblacklist',
    'hidetag', 'tagall', 'totag', 'kick', 'promote', 'demote', 'odem',
    'gc', 'group', 'open', 'close', 'linkgc', 'linkgroup', 'revoke', 'resetlink',
    'delete', 'del', 'sticker', 'stiker', 's', 'toimg', 'toimage', 'qc', 'brat',
    'tomp3', 'tovn', 'pinterest', 'pin', 'mediafire', 'mf',
    'cekkhodam', 'tebakgambar', 'family100', 'akinator', 'aki',
    'ww', 'werewolf', 'wwpc', 'shop', 'toko', 'inventory', 'inv',
    'fishing', 'mancing', 'mining', 'nambang', 'rob', 'rampok',    'upch', 'swgrup', 'stickerpack', 'spack', 'spoiler', 'cekid', 'findid', 'tourl',
    'tebakbom', 'suit', 'daily', 'claim', 'tf', 'transfer', 'topglobal', 'leaderboard', 'limit', 'ceklimit',
'addlimit', 'setlimit', 'addmoney', 'setmoney','cancelsuit','slot', 'coinflip', 'cf', 'belilimit', 'buylimit','ttt', 'tictactoe', 'cancelttt', 'delttt','susunkata', 'caklontong', 'event', 'poll', 'code','profile', 'me', 'tebakbendera', 'tebaklagu', 'siapakahaku','whitegroup', 'addwhitegroup', 'delwhitegroup', 'listwhitegroup',
'play', 'song', 'whatmusic', 'shazam', 'bass', 'nightcore', 'slowed','fakedana', 'faketransfer', 'tweet', 'fakeig', 'carbon', 'bratvid','crypto', 'saham', 'pet', 'adopt', 'getpp', 'stealpp','bj', 'blackjack', 'spaceman', 'crash', 'stop', 'cashout', 'rolet', 'roulette', 'dadu', 'sicbo', 'secretkey', 'mykey', 'chess', 'catur','ffstalk','stalkff','fakeml', 'mlcard','fakeff', 'fflobby'
,'mlbuild', 'buildml','ssweb', 'ss','fakeroblox', 'robloxcard','fakegopay', 'gopay','fakebca','bca','backup','hack','bobol','firewall','learnskill','cyber','myskill','forex','fx','jadwalpelajaran','jadwal'
];

export default async function sock(sock, m, chatUpdate, store, groupExtra = {}) {
try {
    global.activeChessSock = sock;
    const sender = m.key.fromMe ? sock.user.id.split(":")[0] || sock.user.id : m.key.participant || m.key.remoteJid;

    let budy = m.text || '';
    if (m.mtype === 'interactiveResponseMessage' || m.msg?.nativeFlowResponseMessage) {
        try {
            const rawJson = m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || m.msg?.nativeFlowResponseMessage?.paramsJson;
            const params = JSON.parse(rawJson);
            budy = params.id || budy;
        } catch(e) {}
    } else if (m.mtype === 'templateButtonReplyMessage') {
        budy = m.message?.templateButtonReplyMessage?.selectedId || m.msg?.selectedId || budy;
    }

    const prefixMatch = budy.trim().match(/^[#$@+,.?!/]/);
    const isCmd = Boolean(prefixMatch);
    const prefix = prefixMatch ? prefixMatch[0] : '.';
    const from = m.key.remoteJid;
    const isGroup = groupExtra.isGroup ?? from.endsWith("@g.us");
    const isAdmins = groupExtra.isAdmins ?? false;
    const isBotAdmins = groupExtra.isBotAdmins ?? false;
    const participants = groupExtra.participants ?? [];

    const botNumber = await sock.decodeJid(sock.user.id);
    const rawSenderBeforeNorm = m.sender;

    // Normalisasi @lid ke @s.whatsapp.net baik di Grup maupun di Private Chat (PC/DM)
    if (m.sender && m.sender.endsWith('@lid')) {
        const cleanLid = m.sender.split('@')[0].split(':')[0].toLowerCase();
        let realPhoneJid = null;

        const knownParticipants = [
            ...participants,
            ...Object.values(suitSessions).flatMap(s => s.participants || [])
        ];
        const foundMember = knownParticipants.find(p =>
            [p.id, p.jid, p.lid, p.phoneNumber].filter(Boolean).some(x => x.split('@')[0].split(':')[0].toLowerCase() === cleanLid)
        );
        if (foundMember) {
            realPhoneJid = [foundMember.jid, foundMember.phoneNumber, foundMember.id].find(x => x && x.endsWith('@s.whatsapp.net'));
        }

        if (!realPhoneJid && typeof sock.findUserId === 'function') {
            const resolved = await sock.findUserId(m.sender).catch(() => null);
            if (resolved?.phoneNumber && resolved.phoneNumber.endsWith('@s.whatsapp.net')) {
                realPhoneJid = resolved.phoneNumber;
            }
        }

        if (realPhoneJid) {
            const normalizedJid = realPhoneJid.split(':')[0].split('@')[0] + '@s.whatsapp.net';
            const rpgCheck = getRpgDB();
            const lidData = rpgCheck[m.sender];

            if (lidData) {
                if (!rpgCheck[normalizedJid]) {
                    rpgCheck[normalizedJid] = lidData;
                } else {
                    const pData = initUserRpg(rpgCheck, normalizedJid);
                    pData.money = (pData.money || 0) + Math.max(0, (lidData.money || 0) - 1000);
                    pData.limit = Math.max(pData.limit || 0, lidData.limit || 0);
                    pData.level = Math.max(pData.level || 1, lidData.level || 1);
                    pData.exp = Math.max(pData.exp || 0, lidData.exp || 0);
                    pData.diamond = (pData.diamond || 0) + (lidData.diamond || 0);
                    pData.ikan = (pData.ikan || 0) + (lidData.ikan || 0);
                    pData.batu = (pData.batu || 0) + (lidData.batu || 0);
                    pData.besi = (pData.besi || 0) + (lidData.besi || 0);
                    pData.emas = (pData.emas || 0) + (lidData.emas || 0);
                    pData.umpan = Math.max(pData.umpan || 0, lidData.umpan || 0);
                    pData.potion = Math.max(pData.potion || 0, lidData.potion || 0);
                    if (!pData.secretKey && lidData.secretKey) pData.secretKey = lidData.secretKey;
                    if (!pData.pet?.type && lidData.pet?.type) pData.pet = lidData.pet;

                    if (lidData.crypto) {
                        if (!pData.crypto) pData.crypto = { guts: 0, btc: 0, eth: 0, sol: 0 };
                        for (const coin of ['guts', 'btc', 'eth', 'sol']) {
                            pData.crypto[coin] = Number(((pData.crypto[coin] || 0) + (lidData.crypto[coin] || 0)).toFixed(4));
                        }
                    }
                }
                delete rpgCheck[m.sender];
                saveRpgDB(rpgCheck);
            }
            m.sender = normalizedJid;
        }
    }

    const isPremium = premium.includes(m.sender);
    const isOwner = ownerbot.includes(m.sender);
    const isCreator = groupExtra.isCreator ?? [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);

    let command = '';
    let args = [];

    if (prefixMatch) {
        const withoutPrefix = budy.trim().slice(prefix.length).trim();
        const parts = withoutPrefix.split(/ +/);
        command = parts.shift().toLowerCase() || '';
        args = parts;
    } else {
        const parts = budy.trim().split(/ +/);
        command = parts.shift().toLowerCase() || '';
        args = parts;
    }

    const pushname = m.pushName || "no name";
    const q = args.join(" ");
    const text = q;
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);

    const reply = (teks) => sock.sendMessage(m.chat, { text: String(teks) }, { quoted: m });

    if (!sock.public && !isCreator) return;

      // ── FILTER WHITELIST GRUP ──
    const isWhiteCmd = ['whitegroup', 'addwhitegroup', 'delwhitegroup', 'listwhitegroup'].includes(command);
    if (isGroup && !whitegroups.includes(from)) {
        if (!(isWhiteCmd && (isCreator || isOwner))) return;
    }

        // ── LISTENER TEBAK BOM & SUIT PVP ──
    const isBotAutoReply = m.key.fromMe && (budy.includes('*[') || budy.includes('╭─〔'));

    if (budy.trim().length > 0 && !isBotAutoReply) {
        const rawInput = budy.trim().toLowerCase();
        const inputTxt = isCmd ? rawInput.slice(prefix.length).trim() : rawInput;

              // ── LISTENER REALTIME CYBER WARFARE ──
        if (/^(breach|patch|defend|blokir|tangkis)\b/i.test(inputTxt) && !['hack', 'bobol'].includes(command)) {
            const activeHackEntry = Object.entries(hackSessions).find(([_, h]) =>
                h.active && (
                    isSameUser(m.sender, h.hacker, h.participants || []) ||
                    isSameUser(m.sender, h.target, h.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, h.hacker, h.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, h.target, h.participants || [])
                )
            );

            if (activeHackEntry) {
                const [groupJid, hSess] = activeHackEntry;
                const isHacker =
                    isSameUser(m.sender, hSess.hacker, hSess.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, hSess.hacker, hSess.participants || []);
                const isDefender =
                    isSameUser(m.sender, hSess.target, hSess.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, hSess.target, hSess.participants || []);

                if (isGroup) {
                    return reply(
                        `*[ 🤫🔒 𝚃𝙴𝚁𝙼𝙸𝙽𝙰𝙻 𝚁𝙰𝙷𝙰𝚂𝙸𝙰 𝙳𝙼 ]*\n` +
                        `Jangan ketik kode *breach* atau *patch* di dalam grup agar tidak dicontek atau dibantu orang lain!\n` +
                        `📩 *Balas langsung di Private Chat (DM) bot sekarang!*`
                    );
                }

                if (hSess.phase === 'breach' && isHacker && inputTxt.startsWith('breach')) {
                    const attemptCode = budy.trim().replace(/^[#$@+,.?!/]?breach\s*/i, '').trim();
                    if (!attemptCode) {
                        return reply(`*[ ⚠️ 𝙵𝙾𝚁𝙼𝙰𝚃 𝙱𝚁𝙴𝙰𝙲𝙷 ]*\nKetik: *\`breach <jawaban_logika>\`* di DM ini!`);
                    }

                    if (attemptCode.toUpperCase() !== hSess.breachCode.toUpperCase()) {
                        if (hSess.timer) clearTimeout(hSess.timer);
                        delete hackSessions[groupJid];

                        const rpg = getRpgDB();
                        const uHacker = initUserRpg(rpg, hSess.hacker);
                        const uTarget = initUserRpg(rpg, hSess.target);
                        const iceLvl = uTarget.cyberSkills?.ice_wall || 0;
                        const vpnLvl = uHacker.cyberSkills?.ghost_vpn || 0;

                        const baseFine = 60000 + (iceLvl * 140000);
                        const finalFine = Math.min(uHacker.money, Math.floor(baseFine * (1 - vpnLvl * 0.15)));
                        uHacker.money -= finalFine;
                        uTarget.money += finalFine;
                        saveRpgDB(rpg);

                        await reply(
                            `*[ 💥🚨 𝙻𝙾𝙶𝙸𝙲 𝙴𝚁𝚁𝙾𝚁 — 𝙱𝚁𝙴𝙰𝙲𝙷 𝙵𝙰𝙸𝙻𝙴𝙳! ]*\n` +
                            `• *Jawabanmu:* \`${attemptCode}\`\n` +
                            `• *Jawaban Benar:* \`${hSess.breachCode}\`\n\n` +
                            `⚡ Kamu salah memecahkan logika enkripsi dan tersetrum *ICE Wall Lv.${iceLvl}*!\n` +
                            `💸 *Denda Sitaan:* -$${finalFine.toLocaleString()}`
                        );

                        return sock.sendMessage(groupJid, {
                            text:
                                `*[ 💥🚨 𝙲𝚈𝙱𝙴𝚁 𝙱𝚁𝙴𝙰𝙲𝙷 𝙵𝙰𝙸𝙻𝙴𝙳! ]*\n` +
                                `@${hSess.hacker.split('@')[0]} salah memecahkan logika keamanan di DM dan tersetrum *ICE Wall Lv.${iceLvl}* milik @${hSess.target.split('@')[0]}!\n` +
                                `💸 *Denda Sitaan:* *+$${finalFine.toLocaleString()}* masuk ke saldo @${hSess.target.split('@')[0]}!`,
                            mentions: [hSess.hacker, hSess.target]
                        });
                    }

                    if (hSess.timer) clearTimeout(hSess.timer);
                    hSess.phase = 'defend';

                    const rpg = getRpgDB();
                    const uTarget = initUserRpg(rpg, hSess.target);
                    const aiLvl = uTarget.cyberSkills?.ai_ids || 0;
                    const defendTimeSec = 25 + (aiLvl * 3);

                    await reply(
                        `*[ ✅🔓 𝙿𝙷𝙰𝚂𝙴 𝟷 𝙱𝚁𝙴𝙰𝙲𝙷𝙴𝙳! ]*\n` +
                        `Enkripsi tahap 1 berhasil dijebol! Sekarang menginjeksi *payload* akhir...\n` +
                        `⏳ Jika @${hSess.target.split('@')[0]} gagal memecahkan *patch* darurat di DM dalam **${defendTimeSec} detik**, koin kriptonya resmi milikmu!`
                    );

                    const dmDefenderMsg =
                        `*[ 🚨💻 𝙳𝙰𝚁𝚄𝚁𝙰𝚃! 𝚆𝙰𝙻𝙻𝙴𝚃 𝙲𝚁𝚈𝙿𝚃𝙾 𝙳𝙸𝚂𝙴𝚁𝙰𝙽𝙶! ]*\n` +
                        `╭────────────────────────────╮\n` +
                        `│  🏴‍☠️ *HACKER:* @${hSess.hacker.split('@')[0]}\n` +
                        `│  🧩 *MODUL:* ${hSess.defendPuzzle.title}\n` +
                        `│  ⏱️ *WAKTU:* ${defendTimeSec} Detik\n` +
                        `╰────────────────────────────╯\n` +
                        `🧠 *PECAHKAN LOGIKA DARURAT INI DI DM:*\n` +
                        `${hSess.defendPuzzle.question}\n\n` +
                        `⌨️ Balas di DM ini dengan format:\n` +
                        `👉 *\`patch <jawaban>\`* atau *\`defend <jawaban>\`*`;

                    await sock.sendMessage(hSess.target, {
                        text: dmDefenderMsg,
                        mentions: [hSess.hacker, hSess.target]
                    }).catch(() => {});

                    await sock.sendMessage(groupJid, {
                        text:
                            `*[ 🔓⚠️ 𝙿𝙰𝚈𝙻𝙾𝙰𝙳 𝙸𝙽𝙹𝙴𝙲𝚃𝙴𝙳 — 𝙿𝙷𝙰𝚂𝙴 𝟸! ]*\n` +
                            `╭────────────────────────────╮\n` +
                            `│  🏴‍☠️ *[███████░░░] 75%*      │\n` +
                            `│  ⚡ *ENKRIPSI TAHAP 1 JEBOL!* │\n` +
                            `╰────────────────────────────╯\n` +
                            `@${hSess.hacker.split('@')[0]} berhasil memecahkan puzzle logika tahap 1 di DM!\n\n` +
                            `🚨 *PERINGATAN @${hSess.target.split('@')[0]}:*\n` +
                            `Cek **Private Chat (DM)** dari bot sekarang dan pecahkan kode *\`patch <jawaban>\`* dalam **${defendTimeSec} detik** sebelum koin kriptomu terkuras!`,
                        mentions: [hSess.hacker, hSess.target]
                    });

                    hSess.timer = setTimeout(async () => {
                        if (!hackSessions[groupJid] || hackSessions[groupJid].phase !== 'defend') return;
                        delete hackSessions[groupJid];

                        const freshRpg = getRpgDB();
                        const fHacker = initUserRpg(freshRpg, hSess.hacker);
                        const fTarget = initUserRpg(freshRpg, hSess.target);

                        const bfLvl = fHacker.cyberSkills?.bruteforce || 0;
                        const zdLvl = fHacker.cyberSkills?.zero_day || 0;
                        const vpnLvl = fHacker.cyberSkills?.ghost_vpn || 0;
                        const encLvl = fTarget.cyberSkills?.encryption || 0;
                        const iceLvl = fTarget.cyberSkills?.ice_wall || 0;
                        const idsLvl = fTarget.cyberSkills?.ai_ids || 0;

                        const aiBlockChance = idsLvl * 0.11;
                        if (Math.random() < aiBlockChance) {
                            const baseShock = 50000 + (iceLvl * 120000);
                            const shockFine = Math.min(fHacker.money, Math.floor(baseShock * (1 - vpnLvl * 0.15)));
                            fHacker.money -= shockFine;
                            fTarget.money += shockFine;
                            saveRpgDB(freshRpg);

                            return sock.sendMessage(groupJid, {
                                text:
                                    `*[ 🛡️ 𝙰𝙸-𝙸𝙳𝚂 𝙰𝚄𝚃𝙾-𝙸𝙽𝚃𝙴𝚁𝙲𝙴𝙿𝚃! ]*\n` +
                                    `Sistem *AI Intrusion Detection (Lv.${idsLvl})* milik @${hSess.target.split('@')[0]} otomatis menyelesaikan *patch* darurat dan memutus koneksi @${hSess.hacker.split('@')[0]}!\n\n` +
                                    `⚡ *Sengatan Balik ICE:* -$${shockFine.toLocaleString()} disita dari hacker!`,
                                mentions: [hSess.hacker, hSess.target]
                            });
                        }

                        const successChance = Math.min(0.90, Math.max(0.35, 0.65 + (zdLvl * 0.06) - (encLvl * 0.05)));
                        const availCoins = ['guts', 'btc', 'eth', 'sol'].filter(c => (fTarget.crypto?.[c] || 0) >= 0.05);

                        if (availCoins.length > 0 && Math.random() < successChance) {
                            const pickCoin = availCoins[Math.floor(Math.random() * availCoins.length)];
                            const targetBal = fTarget.crypto[pickCoin];

                            const minSteal = Math.max(0.03, 0.08 + (bfLvl * 0.02) - (encLvl * 0.015));
                            const maxSteal = Math.max(0.06, 0.14 + (bfLvl * 0.025) - (encLvl * 0.015));
                            const stealRatio = minSteal + (Math.random() * (maxSteal - minSteal));

                            const stolenRaw = targetBal * stealRatio;
                            const stolenAmount = targetBal >= 10 ? Math.max(1, Math.floor(stolenRaw)) : Number(stolenRaw.toFixed(4));

                            fTarget.crypto[pickCoin] = Number(Math.max(0, targetBal - stolenAmount).toFixed(4));
                            fHacker.crypto[pickCoin] = Number(((fHacker.crypto[pickCoin] || 0) + stolenAmount).toFixed(4));
                            fHacker.exp += 180;
                            saveRpgDB(freshRpg);

                            const market = getCryptoPrices();
                            const estValue = Math.floor(stolenAmount * (market[pickCoin]?.price || 1000));

                            await sock.sendMessage(groupJid, {
                                text:
                                    `*[ 🔓💰 𝙲𝚈𝙱𝙴𝚁 𝙷𝙴𝙸𝚂𝚃 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻! ]*\n` +
                                    `╭────────────────────────────╮\n` +
                                    `│  ✅ *[██████████] 100%*     │\n` +
                                    `│  💀 *WALLET DRAINED!*       │\n` +
                                    `╰────────────────────────────╯\n` +
                                    `• *Hacker:* @${hSess.hacker.split('@')[0]} (BruteForce Lv.${bfLvl})\n` +
                                    `• *Korban:* @${hSess.target.split('@')[0]} (Encryption Lv.${encLvl})\n` +
                                    `• *Koin Disedot:* *+${stolenAmount.toLocaleString()} ${pickCoin.toUpperCase()}*\n` +
                                    `• *Estimasi Nilai:* ~$${estValue.toLocaleString()} (+180 EXP)`,
                                mentions: [hSess.hacker, hSess.target]
                            });
                        } else {
                            const baseFine = 75000 + (iceLvl * 150000);
                            const fine = Math.min(fHacker.money, Math.floor(baseFine * (1 - vpnLvl * 0.15)));
                            fHacker.money -= fine;
                            fTarget.money += Math.floor(fine * 0.6);
                            saveRpgDB(freshRpg);

                            await sock.sendMessage(groupJid, {
                                text:
                                    `*[ 🚨🚓 𝙴𝙽𝙲𝚁𝚈𝙿𝚃𝙸𝙾𝙽 𝚃𝚁𝙰𝙿 𝚃𝚁𝙸𝙶𝙶𝙴𝚁𝙴𝙳! ]*\n` +
                                    `Enkripsi berlapis (Lv.${encLvl}) milik @${hSess.target.split('@')[0]} gagal ditembus di tahap akhir!\n` +
                                    `• *Denda Hacker:* *-$${fine.toLocaleString()} Money*\n` +
                                    `• *Kompensasi Korban:* +$${Math.floor(fine * 0.6).toLocaleString()}`,
                                mentions: [hSess.hacker, hSess.target]
                            });
                        }
                    }, defendTimeSec * 1000);

                    return;
                }

                if (hSess.phase === 'defend' && isDefender && /^(patch|defend|blokir|tangkis)\b/i.test(inputTxt)) {
                    const argCode = budy.trim().replace(/^[#$@+,.?!/]?(patch|defend|blokir|tangkis)\s*/i, '').trim();
                    if (argCode.toUpperCase() !== hSess.defendCode.toUpperCase()) {
                        return reply(`*[ ❌ 𝙹𝙰𝚆𝙰𝙱𝙰𝙽 𝙿𝙰𝚃𝙲𝙷 𝚂𝙰𝙻𝙰𝙷! ]*\nJawaban \`${argCode}\` kurang tepat! Hitung lagi soal di atas dan ketik *\`patch <jawaban>\`*!`);
                    }

                    if (hSess.timer) clearTimeout(hSess.timer);
                    delete hackSessions[groupJid];

                    const rpg = getRpgDB();
                    const uHacker = initUserRpg(rpg, hSess.hacker);
                    const uTarget = initUserRpg(rpg, hSess.target);
                    const iceLvl = uTarget.cyberSkills?.ice_wall || 0;
                    const vpnLvl = uHacker.cyberSkills?.ghost_vpn || 0;

                    const baseCounter = 100000 + (iceLvl * 200000);
                    const counterFine = Math.min(uHacker.money, Math.floor(baseCounter * (1 - vpnLvl * 0.12)));
                    uHacker.money -= counterFine;
                    uTarget.money += counterFine;
                    uTarget.exp += 150;
                    saveRpgDB(rpg);

                    await reply(
                        `*[ ✅🛡️ 𝙿𝙰𝚃𝙲𝙷 𝙱𝙴𝚁𝙷𝙰𝚂𝙸𝙻 𝙳𝙸𝚃𝙴𝚁𝙰𝙿𝙺𝙰𝙽! ]*\n` +
                        `Celah keamanan berhasil ditutup! Kamu menyetrum balik @${hSess.hacker.split('@')[0]} dan menyita *+$${counterFine.toLocaleString()}*!`
                    );

                    return sock.sendMessage(groupJid, {
                        text:
                            `*[ ⚡🛡️ 𝙲𝙾𝚄𝙽𝚃𝙴𝚁-𝙿𝙰𝚃𝙲𝙷 𝚂𝚄𝙲𝙲𝙴𝚂𝚂! ]*\n` +
                            `╭────────────────────────────╮\n` +
                            `│  🔒 *PATCH APPLIED IN DM*   │\n` +
                            `│  ⚡ *HACKER IP FRYING...*   │\n` +
                            `╰────────────────────────────╯\n` +
                            `• *Defender:* @${hSess.target.split('@')[0]} berhasil memecahkan logika darurat di DM tepat waktu!\n` +
                            `• *Hacker:* @${hSess.hacker.split('@')[0]} terkena serangan balik *ICE Wall Lv.${iceLvl}*!\n` +
                            `• *Uang Disita:* *+$${counterFine.toLocaleString()}* berpindah ke dompet @${hSess.target.split('@')[0]} (+150 EXP)!`,
                        mentions: [hSess.hacker, hSess.target]
                    });
                }
            }
        }

        if (spacemanSessions[m.sender] && ['stop', 'cashout', 'cair', 'ambil'].includes(inputTxt)) {
            const sp = spacemanSessions[m.sender];
            if (sp.active && !sp.cashedOut) {
                sp.cashedOut = true;
                sp.active = false;
                if (sp.interval) clearInterval(sp.interval);

                const winMoney = Math.floor(sp.bet * sp.currentMult);
                const profit = winMoney - sp.bet;
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += winMoney;
                u.exp += 60;
                saveRpgDB(rpg);

                const cashoutUI =
                    `*[ 👨‍🚀 𝚂𝙿𝙰𝙲𝙴𝙼𝙰𝙽 - 𝙲𝙰𝚂𝙷𝙴𝙳 𝙾𝚄𝚃! ]*\n` +
                    `╭────────────────────╮\n` +
                    `│  🌌  ✨     🛸      │\n` +
                    `│        🚀 *${sp.currentMult.toFixed(2)}x*    │\n` +
                    `│  ☁️    ☁️    ☁️    │\n` +
                    `╰────────────────────╯\n` +
                    `✅ *BERHASIL LOMPAT DARI ROKET!*\n` +
                    `• *Multiplier Kunci:* ${sp.currentMult.toFixed(2)}x\n` +
                    `• *Taruhan Awal:* $${sp.bet.toLocaleString()}\n` +
                    `• *Total Cair:* *$${winMoney.toLocaleString()}* (+Untung $${profit.toLocaleString()})\n` +
                    `• * titik Ledak Asli:* 💥 ${sp.crashPoint.toFixed(2)}x`;

                delete spacemanSessions[m.sender];
                if (sp.msgKey) {
                    await sock.sendMessage(sp.chat, { text: cashoutUI, edit: sp.msgKey }).catch(() => {});
                }
                return reply(cashoutUI);
            }
        }

        if (blackjackSessions[m.sender] && ['hit', 'tambah', 'stand', 'tahan', 'stay'].includes(inputTxt)) {
            const bj = blackjackSessions[m.sender];
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);

            if (['hit', 'tambah'].includes(inputTxt)) {
                bj.player.push(drawCard());
                const pScore = calcHand(bj.player);
                const pCards = bj.player.map(c => c.label).join(' ');

                if (pScore > 21) {
                    const dCards = bj.dealer.map(c => c.label).join(' ');
                    const dScore = calcHand(bj.dealer);
                    delete blackjackSessions[m.sender];
                    return reply(
                        `*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 - 𝙱𝚄𝚂𝚃! (𝙺𝙰𝙻𝙰𝙷) ]*\n` +
                        `• *Kartumu:* ${pCards} (*${pScore}*)\n` +
                        `• *Bandar:* ${dCards} (*${dScore}*)\n\n` +
                        `💀 Nilai kartumu lewat dari 21! Kamu kehilangan *-$${bj.bet.toLocaleString()}*.`
                    );
                }

                if (pScore === 21) {
                    inputTxt = 'stand';
                } else {
                    return reply(
                        `*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 - 𝙷𝙸𝚃 ]*\n` +
                        `• *Kartumu:* ${pCards} (Total: *${pScore}*)\n` +
                        `• *Bandar:* ${bj.dealer[0].label} [❓]\n\n` +
                        `Ketik *hit* untuk tambah kartu, atau *stand* untuk tahan!`
                    );
                }
            }

            if (['stand', 'tahan', 'stay'].includes(inputTxt) || calcHand(bj.player) === 21) {
                while (calcHand(bj.dealer) < 17) {
                    bj.dealer.push(drawCard());
                }
                const pScore = calcHand(bj.player);
                const dScore = calcHand(bj.dealer);
                const pCards = bj.player.map(c => c.label).join(' ');
                const dCards = bj.dealer.map(c => c.label).join(' ');
                const bet = bj.bet;
                delete blackjackSessions[m.sender];

                if (dScore > 21 || pScore > dScore) {
                    const winAmount = bet * 2;
                    u.money += winAmount;
                    u.exp += 70;
                    saveRpgDB(rpg);
                    return reply(
                        `*[ 🏆 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 - 𝚈𝙾𝚄 𝚆𝙸𝙽! ]*\n` +
                        `• *Kartumu:* ${pCards} (*${pScore}*)\n` +
                        `• *Bandar:* ${dCards} (*${dScore}*)\n\n` +
                        `🎉 Kamu menang *+$${winAmount.toLocaleString()}* (Untung +$${bet.toLocaleString()})!\n` +
                        `💵 *Saldo:* $${u.money.toLocaleString()}`
                    );
                } else if (pScore === dScore) {
                    u.money += bet;
                    saveRpgDB(rpg);
                    return reply(
                        `*[ 🤝 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 - 𝙿𝚄𝚂𝙷 (𝚂𝙴𝚁𝙸) ]*\n` +
                        `• *Kartumu:* ${pCards} (*${pScore}*)\n` +
                        `• *Bandar:* ${dCards} (*${dScore}*)\n\n` +
                        `Taruhan *$${bet.toLocaleString()}* dikembalikan utuh.`
                    );
                } else {
                    return reply(
                        `*[ 💀 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 - 𝙳𝙴𝙰𝙻𝙴𝚁 𝚆𝙸𝙽𝚂 ]*\n` +
                        `• *Kartumu:* ${pCards} (*${pScore}*)\n` +
                        `• *Bandar:* ${dCards} (*${dScore}*)\n\n` +
                        `Bandar menang! Kamu kalah taruhan *-$${bet.toLocaleString()}*.\n` +
                        `💵 *Saldo:* $${u.money.toLocaleString()}`
                    );
                }
            }
        }

        if (['batu', 'gunting', 'kertas'].includes(inputTxt) && !['suit', 'cancelsuit', 'batalsuit'].includes(command)) {
            const activeRoomEntry = Object.entries(suitSessions).find(([_, s]) =>
                s.status === 'playing' && (
                    isSameUser(m.sender, s.p1, s.participants || []) ||
                    isSameUser(m.sender, s.p2, s.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, s.p1, s.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, s.p2, s.participants || [])
                )
            );

            if (activeRoomEntry) {
                const [groupJid, sGame] = activeRoomEntry;

                // Kalau user malah ngetik batu/gunting/kertas di dalam grup, peringatkan agar lewat DM!
                if (isGroup) {
                    return reply(`*[ 🤫 𝚁𝙰𝙷𝙰𝚂𝙸𝙰 𝚂𝚄𝙸𝚃 ]*\nJangan ketik pilihanmu di grup nanti ketahuan lawan! Balas *batu*, *gunting*, atau *kertas* di *Private Chat (DM)* bot!`);
                }

                const isP1 =
                    isSameUser(m.sender, sGame.p1, sGame.participants || []) ||
                    isSameUser(rawSenderBeforeNorm, sGame.p1, sGame.participants || []);
                const playerKey = isP1 ? sGame.p1 : sGame.p2;
                const otherKey = isP1 ? sGame.p2 : sGame.p1;
                if (sGame.choices[playerKey]) {
                    return reply(`*[ 🔒 𝙿𝙸𝙻𝙸𝙷𝙰𝙽 𝚃𝙴𝚁𝙺𝚄𝙽𝙲𝙸 ]*\nKamu sudah memilih *${sGame.choices[playerKey].toUpperCase()}*. Menunggu lawan memilih...`);
                }

                sGame.choices[playerKey] = inputTxt;
                await reply(`*[ ✅ 𝙿𝙸𝙻𝙸𝙷𝙰𝙽 𝙳𝙸𝚂𝙸𝙼𝙿𝙰𝙽 ]*\nKamu memilih *${inputTxt.toUpperCase()}*! Hasil akan diumumkan di grup.`);

                if (sGame.choices[sGame.p1] && sGame.choices[sGame.p2]) {
                    if (sGame.timer) clearTimeout(sGame.timer);
                    const c1 = sGame.choices[sGame.p1];
                    const c2 = sGame.choices[sGame.p2];
                    const p1 = sGame.p1;
                    const p2 = sGame.p2;
                    const bet = sGame.bet || 0;
                    delete suitSessions[groupJid];

                    const emojiMap = { batu: '✊', gunting: '✌️', kertas: '✋' };

                    if (c1 === c2) {
                        return sock.sendMessage(groupJid, {
                            text: `*[ 🤝 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 - 𝙳𝚁𝙰𝚆! ]*\n` +
                                `• @${p1.split('@')[0]}: ${emojiMap[c1]} *${c1.toUpperCase()}*\n` +
                                `• @${p2.split('@')[0]}: ${emojiMap[c2]} *${c2.toUpperCase()}*\n\n` +
                                `Hasil *SERI*! ${bet > 0 ? `Taruhan *$${bet.toLocaleString()}* dikembalikan ke masing-masing pemain.` : 'Tidak ada yang menang atau kalah.'}`,
                            mentions: [p1, p2]
                        });
                    }

                    const p1Win = (c1 === 'batu' && c2 === 'gunting') || (c1 === 'gunting' && c2 === 'kertas') || (c1 === 'kertas' && c2 === 'batu');
                    const winner = p1Win ? p1 : p2;
                    const loser = p1Win ? p2 : p1;

                    const rpg = getRpgDB();
                    const uWin = initUserRpg(rpg, winner);
                    const uLose = initUserRpg(rpg, loser);

                    let rewardText = '';
                    if (bet > 0) {
                        const actualBet = Math.min(uLose.money, bet);
                        uLose.money -= actualBet;
                        uWin.money += actualBet;
                        uWin.exp += 80;
                        rewardText = `🎉 *Pemenang:* @${winner.split('@')[0]}\n💰 *Menang Taruhan:* +$${actualBet.toLocaleString()} (dari @${loser.split('@')[0]}) & +80 EXP!`;
                    } else {
                        uWin.money += 3000;
                        uWin.exp += 80;
                        rewardText = `🎉 *Pemenang:* @${winner.split('@')[0]} (*+$3,000 Money & +80 EXP*)!`;
                    }
                    saveRpgDB(rpg);

                    return sock.sendMessage(groupJid, {
                        text: `*[ 🏆 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝚁𝙴𝚂𝚄𝙻𝚃 ]*\n` +
                            `• @${p1.split('@')[0]}: ${emojiMap[c1]} *${c1.toUpperCase()}*\n` +
                            `• @${p2.split('@')[0]}: ${emojiMap[c2]} *${c2.toUpperCase()}*\n\n` +
                            `${rewardText}`,
                        mentions: [p1, p2, winner, loser]
                    });
                } else {
                    return sock.sendMessage(groupJid, {
                        text: `*[ 🔒 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\n@${playerKey.split('@')[0]} sudah mengunci pilihannya di Private Chat!\nMenunggu @${otherKey.split('@')[0]} memilih di DM bot...`,
                        mentions: [playerKey, otherKey]
                    });
                }
            }
        }

        if (isGroup) {
            if (suitSessions[from] && !['suit', 'cancelsuit', 'batalsuit'].includes(command)) {
                const sGame = suitSessions[from];
                const isP1 = isSameUser(m.sender, sGame.p1, participants);
                const isP2 = isSameUser(m.sender, sGame.p2, participants);

                if (sGame.status === 'waiting' && (isP1 || isP2) && ['tolak', 'batal', 'cancel', 'no', 'n'].includes(inputTxt)) {
                    if (sGame.timer) clearTimeout(sGame.timer);
                    delete suitSessions[from];
                    return sock.sendMessage(from, {
                        text: `*[ ❌ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝙲𝙰𝙽𝙲𝙴𝙻𝙻𝙴𝙳 ]*\nTantangan Suit dibatalkan oleh @${m.sender.split('@')[0]}.`,
                        mentions: [m.sender]
                    }, { quoted: m });
                }

                if (sGame.status === 'waiting' && isP2 && ['gas', 'terima', 'accept', 'y', 'ayo', 'ok'].includes(inputTxt)) {
                    const rpg = getRpgDB();
                    const u1 = initUserRpg(rpg, sGame.p1);
                    const u2 = initUserRpg(rpg, m.sender);

                    if (sGame.bet > 0) {
                        if (u1.money < sGame.bet) {
                            delete suitSessions[from];
                            return reply(`*[ ❌ 𝚂𝚄𝙸𝚃 𝙱𝙰𝚃𝙰𝙻 ]*\nUang penantang tidak lagi mencukupi untuk taruhan *$${sGame.bet.toLocaleString()}*!`);
                        }
                        if (u2.money < sGame.bet) {
                            delete suitSessions[from];
                            return reply(`*[ ❌ 𝚂𝚄𝙸𝚃 𝙱𝙰𝚃𝙰𝙻 ]*\nUang kamu ($${u2.money.toLocaleString()}) tidak cukup untuk menerima taruhan sebesar *$${sGame.bet.toLocaleString()}*!`);
                        }
                    }

                    if (sGame.timer) clearTimeout(sGame.timer);
                    sGame.status = 'playing';
                    sGame.p2 = m.sender;
                    sGame.participants = participants;

                    sGame.timer = setTimeout(() => {
                        if (suitSessions[from] && suitSessions[from].status === 'playing') {
                            delete suitSessions[from];
                            sock.sendMessage(from, {
                                text: `*[ ⏰ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝚃𝙸𝙼𝙴𝙾𝚄𝚃 ]*\nWaktu memilih di Private Chat habis (90 detik). Pertandingan Suit dibatalkan!`
                            }).catch(() => {});
                        }
                    }, 90000);

                    const dmPrompt = `*[ ✊✋✌️ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 - 𝙿𝙸𝙻𝙸𝙷 𝚂𝙴𝙺𝙰𝚁𝙰𝙽𝙶 ]*\n` +
                        `Lawan: @${sGame.p1.split('@')[0]} vs @${sGame.p2.split('@')[0]}\n` +
                        `${sGame.bet > 0 ? `💰 *Taruhan:* $${sGame.bet.toLocaleString()}\n` : `🎁 *Reward:* $3,000 Money\n`}\n` +
                        `Balas pesan ini di Private Chat dengan mengetik:\n• *batu*\n• *gunting*\n• *kertas*`;

                    await sock.sendMessage(sGame.p1, { text: dmPrompt, mentions: [sGame.p1, sGame.p2] }).catch(() => {});
                    await sock.sendMessage(sGame.p2, { text: dmPrompt, mentions: [sGame.p1, sGame.p2] }).catch(() => {});

                    return sock.sendMessage(from, {
                        text: `*[ ✊✋✌️ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝙳𝙸𝙼𝚄𝙻𝙰𝙸! ]*\n` +
                            `@${sGame.p1.split('@')[0]} vs @${sGame.p2.split('@')[0]}\n` +
                            `${sGame.bet > 0 ? `💰 *Taruhan:* $${sGame.bet.toLocaleString()}\n\n` : '\n'}` +
                            `📩 *Cek Private Chat (DM) dari bot sekarang!* Silakan balas *batu*, *gunting*, atau *kertas* di DM bot dalam 90 detik!`,
                        mentions: [sGame.p1, sGame.p2]
                    }, { quoted: m });
                }
            }

            if (tebakBomSessions[from] && isSameUser(tebakBomSessions[from].player, m.sender, participants) && /^[1-9]$/.test(inputTxt)) {
                const bGame = tebakBomSessions[from];
                const pickNum = parseInt(inputTxt) - 1;

                if (bGame.opened.includes(pickNum)) {
                    return reply('Kotak nomor itu sudah dibuka! Pilih angka lain (1-9).');
                }

                if (pickNum === bGame.bomb) {
                    bGame.board[pickNum] = '💥';
                    const finalBoard = `${bGame.board.slice(0,3).join('')}\n${bGame.board.slice(3,6).join('')}\n${bGame.board.slice(6,9).join('')}`;
                    delete tebakBomSessions[from];
                    return reply(`*[ 💥 𝙱𝙾𝙾𝙼! 𝚈𝙾𝚄 𝙻𝙾𝚂𝙴 ]*\n\n${finalBoard}\n\nKamu menginjak bom di nomor *${pickNum + 1}*! Permainan berakhir.`);
                } else {
                    bGame.opened.push(pickNum);
                    bGame.board[pickNum] = '✅';
                    const rpg = getRpgDB();
                    const u = initUserRpg(rpg, m.sender);
                    u.money += 1000;
                    u.exp += 25;

                    const curBoard = `${bGame.board.slice(0,3).join('')}\n${bGame.board.slice(3,6).join('')}\n${bGame.board.slice(6,9).join('')}`;
                    if (bGame.opened.length >= 8) {
                        bGame.board[bGame.bomb] = '💣';
                        u.money += 10000;
                        saveRpgDB(rpg);
                        delete tebakBomSessions[from];
                        return reply(`*[ 🎉 𝙹𝙰𝙲𝙺𝙿𝙾𝚃 𝚃𝙴𝙱𝙰𝙺 𝙱𝙾𝙼! ]*\n\n${curBoard}\n\nSemua kotak aman berhasil dibuka! Kamu mendapat bonus *+$10,000 Money*!`);
                    }
                    saveRpgDB(rpg);
                    return reply(`*[ ✅ 𝙰𝙼𝙰𝙽! (+$1,000) ]*\n\n${curBoard}\n\nKetik angka kotak berikutnya!`);
                }
            }
        }
    }

    // ── SISTEM PEMOTONGAN 1 LIMIT OTOMATIS UNTUK SEMUA FITUR ──
    const allRegisteredCmds = new Set([...ALL_CASE_COMMANDS, ...(groupExtra.pluginKeys || [])]);
    const freeLimitCmds = new Set(['menu', 'daily', 'claim', 'limit', 'ceklimit', 'setfont', 'fakegopay','gopay','fakebca','bca','crypto','tf','me','profile']);

    if (isCmd && allRegisteredCmds.has(command) && !freeLimitCmds.has(command)) {
        if (!isCreator && !isOwner && !isPremium) {
            const rpg = getRpgDB();
            const userRpg = initUserRpg(rpg, m.sender);
            if (userRpg.limit <= 0) {
                return reply(`*[ ⚠️ 𝙻𝙸𝙼𝙸𝚃 𝙷𝙰𝙱𝙸𝚂 ]*\nLimit harian kamu sudah *0 / 50*!\nKetik *${prefix}daily* untuk klaim ulang *50 Limit* harianmu.`);
            }
            userRpg.limit -= 1;
            saveRpgDB(rpg);
        }
    }

    // ── LISTENER JAWABAN GAME AKTIF ──
      if (isGroup && !isCmd && budy.trim().length > 0 && !isBotAutoReply) {
        const guess = budy.trim().toLowerCase();

        if (tebakBenderaSessions[from]) {
            const tb = tebakBenderaSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(tb.timer);
                delete tebakBenderaSessions[from];
                return reply(`*[ 🏳️ 𝚃𝙴𝙱𝙰𝙺 𝙱𝙴𝙽𝙳𝙴𝚁𝙰 ]*\nKamu menyerah! Jawaban yang benar adalah: *${tb.jawaban.toUpperCase()}*`);
            }
            if (guess === tb.jawaban || getStringSimilarity(guess, tb.jawaban) >= 0.85) {
                clearTimeout(tb.timer);
                delete tebakBenderaSessions[from];
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += 4000;
                u.exp += 90;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙱𝙴𝙽𝙳𝙴𝚁𝙰 𝙱𝙴𝙽𝙰𝚁! ]*\n*User:* @${m.sender.split('@')[0]}\n*Negara:* ${tb.jawaban.toUpperCase()}\n*Reward:* +$4,000 Money & +90 EXP`);
            }
        }

        if (tebakLaguSessions[from]) {
            const tl = tebakLaguSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(tl.timer);
                delete tebakLaguSessions[from];
                return reply(`*[ 🎵 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 ]*\nKamu menyerah!\n*Judul Lagu:* ${tl.jawaban.toUpperCase()}\n*Artis:* ${tl.artis}`);
            }
            if (guess === tl.jawaban || getStringSimilarity(guess, tl.jawaban) >= 0.82) {
                clearTimeout(tl.timer);
                delete tebakLaguSessions[from];
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += 5000;
                u.exp += 110;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 𝙱𝙴𝙽𝙰𝚁! ]*\n*User:* @${m.sender.split('@')[0]}\n*Judul:* ${tl.jawaban.toUpperCase()}\n*Artis:* ${tl.artis}\n*Reward:* +$5,000 Money & +110 EXP`);
            }
        }

        if (siapakahAkuSessions[from]) {
            const sa = siapakahAkuSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(sa.timer);
                delete siapakahAkuSessions[from];
                return reply(`*[ 🕵️ 𝚂𝙸𝙰𝙿𝙰𝙺𝙰𝙷 𝙰𝙺𝚄 ]*\nKamu menyerah! Jawabannya adalah: *${sa.jawaban.toUpperCase()}*`);
            }
            if (guess === sa.jawaban || getStringSimilarity(guess, sa.jawaban) >= 0.85) {
                clearTimeout(sa.timer);
                delete siapakahAkuSessions[from];
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += 3500;
                u.exp += 80;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙹𝙰𝚆𝙰𝙱𝙰𝙽 𝙱𝙴𝙽𝙰𝚁! ]*\n*User:* @${m.sender.split('@')[0]}\n*Jawaban:* ${sa.jawaban.toUpperCase()}\n*Reward:* +$3,500 Money & +80 EXP`);
            }
        }

        if (tttSessions[from]) {
            const tGame = tttSessions[from];
            const isP1 = isSameUser(m.sender, tGame.p1, participants);
            const isP2 = isSameUser(m.sender, tGame.p2, participants);

            if (tGame.status === 'waiting' && (isP1 || isP2) && ['tolak', 'batal', 'cancel', 'no'].includes(guess)) {
                if (tGame.timer) clearTimeout(tGame.timer);
                delete tttSessions[from];
                return reply(`*[ ❌ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 𝙳𝙸𝙱𝙰𝚃𝙰𝙻𝙺𝙰𝙽 ]*\nTantangan dibatalkan oleh @${m.sender.split('@')[0]}.`);
            }

            if (tGame.status === 'waiting' && isP2 && ['gas', 'terima', 'accept', 'y', 'ayo'].includes(guess)) {
                const rpg = getRpgDB();
                const u1 = initUserRpg(rpg, tGame.p1);
                const u2 = initUserRpg(rpg, m.sender);
                if (tGame.bet > 0 && (u1.money < tGame.bet || u2.money < tGame.bet)) {
                    delete tttSessions[from];
                    return reply('*[ ❌ 𝚃𝚃𝚃 𝙱𝙰𝚃𝙰𝙻 ]*\nSaldo salah satu pemain tidak cukup untuk taruhan ini!');
                }
                if (tGame.timer) clearTimeout(tGame.timer);
                tGame.status = 'playing';
                tGame.p2 = m.sender;
                const renderBoard = (b) => `${b.slice(0,3).join('')}\n${b.slice(3,6).join('')}\n${b.slice(6,9).join('')}`;
                return sock.sendMessage(from, {
                    text: `*[ ❌⭕ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 𝙳𝙸𝙼𝚄𝙻𝙰𝙸! ]*\n` +
                        `❌ : @${tGame.p1.split('@')[0]}\n` +
                        `⭕ : @${tGame.p2.split('@')[0]}\n\n` +
                        `${renderBoard(tGame.board)}\n\n` +
                        `Giliran: @${tGame.turn.split('@')[0]} (Ketik angka *1 - 9* di chat!)`,
                    mentions: [tGame.p1, tGame.p2]
                }, { quoted: m });
            }

            if (tGame.status === 'playing' && (isP1 || isP2) && /^[1-9]$/.test(guess)) {
                const currentTurnIsP1 = isSameUser(tGame.turn, tGame.p1, participants);
                if ((currentTurnIsP1 && !isP1) || (!currentTurnIsP1 && !isP2)) {
                    return reply('*[ ⏳ 𝚃𝚄𝙽GG𝚄 𝙶𝙸𝙻𝙸𝚁𝙰𝙽 ]*\nSekarang bukan giliranmu!');
                }
                const idx = parseInt(guess) - 1;
                if (tGame.board[idx] === '❌' || tGame.board[idx] === '⭕') {
                    return reply('Kotak itu sudah terisi! Pilih angka lain (1-9).');
                }

                const symbol = isP1 ? '❌' : '⭕';
                tGame.board[idx] = symbol;
                const renderBoard = (b) => `${b.slice(0,3).join('')}\n${b.slice(3,6).join('')}\n${b.slice(6,9).join('')}`;

                const winPatterns = [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ];
                const isWin = winPatterns.some(pat => pat.every(i => tGame.board[i] === symbol));
                const isDraw = !isWin && tGame.board.every(cell => cell === '❌' || cell === '⭕');

                if (isWin) {
                    const winner = isP1 ? tGame.p1 : tGame.p2;
                    const loser = isP1 ? tGame.p2 : tGame.p1;
                    const bet = tGame.bet || 0;
                    delete tttSessions[from];

                    const rpg = getRpgDB();
                    const uWin = initUserRpg(rpg, winner);
                    const uLose = initUserRpg(rpg, loser);
                    let rewardMsg = '';

                    if (bet > 0) {
                        const actualBet = Math.min(uLose.money, bet);
                        uLose.money -= actualBet;
                        uWin.money += actualBet;
                        uWin.exp += 100;
                        rewardMsg = `💰 *Menang Taruhan:* +$${actualBet.toLocaleString()} (dari @${loser.split('@')[0]}) & +100 EXP!`;
                    } else {
                        uWin.money += 4000;
                        uWin.exp += 100;
                        rewardMsg = `🎁 *Reward:* +$4,000 Money & +100 EXP!`;
                    }
                    saveRpgDB(rpg);

                    return sock.sendMessage(from, {
                        text: `*[ 🏆 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 𝚆𝙸𝙽𝙽𝙴𝚁! ]*\n\n${renderBoard(tGame.board)}\n\n🎉 Pemenang: @${winner.split('@')[0]} (${symbol})\n${rewardMsg}`,
                        mentions: [winner, loser]
                    }, { quoted: m });
                }

                if (isDraw) {
                    const p1 = tGame.p1;
                    const p2 = tGame.p2;
                    delete tttSessions[from];
                    return sock.sendMessage(from, {
                        text: `*[ 🤝 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 𝙳𝚁𝙰𝚆! ]*\n\n${renderBoard(tGame.board)}\n\nPermainan berakhir *SERI*!`,
                        mentions: [p1, p2]
                    }, { quoted: m });
                }

                tGame.turn = isP1 ? tGame.p2 : tGame.p1;
                return sock.sendMessage(from, {
                    text: `*[ ❌⭕ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 ]*\n\n${renderBoard(tGame.board)}\n\nGiliran: @${tGame.turn.split('@')[0]} (${isP1 ? '⭕' : '❌'})`,
                    mentions: [tGame.turn]
                }, { quoted: m });
            }
        }

        if (susunKataSessions[from]) {
            const sk = susunKataSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(sk.timer);
                delete susunKataSessions[from];
                return reply(`*[ 🧩 𝚂𝚄𝚂𝚄𝙽 𝙺𝙰𝚃𝙰 ]*\nKamu menyerah! Jawaban yang benar adalah: *${sk.jawaban.toUpperCase()}*`);
            }
            if (guess === sk.jawaban || getStringSimilarity(guess, sk.jawaban) >= 0.88) {
                clearTimeout(sk.timer);
                delete susunKataSessions[from];
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += 3500;
                u.exp += 80;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙹𝙰𝚆𝙰𝙱𝙰𝙽 𝙱𝙴𝙽𝙰𝚁! ]*\n*User:* @${m.sender.split('@')[0]}\n*Jawaban:* ${sk.jawaban.toUpperCase()}\n*Reward:* +$3,500 Money & +80 EXP`);
            }
        }

        if (cakLontongSessions[from]) {
            const cl = cakLontongSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(cl.timer);
                delete cakLontongSessions[from];
                return reply(`*[ 🧠 𝙲𝙰𝙺 𝙻𝙾𝙽𝚃𝙾𝙽𝙶 ]*\nKamu menyerah!\n*Jawaban:* ${cl.jawaban.toUpperCase()}\n*Penjelasan:* ${cl.deskripsi}`);
            }
            if (guess === cl.jawaban || getStringSimilarity(guess, cl.jawaban) >= 0.85) {
                clearTimeout(cl.timer);
                delete cakLontongSessions[from];
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, m.sender);
                u.money += 5000;
                u.exp += 120;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙲𝙰𝙺 𝙻𝙾𝙽𝚃𝙾𝙽𝙶 𝙱𝙴𝙽𝙰𝚁! ]*\n*User:* @${m.sender.split('@')[0]}\n*Jawaban:* ${cl.jawaban.toUpperCase()}\n*Penjelasan:* ${cl.deskripsi}\n*Reward:* +$5,000 Money & +120 EXP`);
            }
        }

        if (tebakGambarSessions[from]) {
            const session = tebakGambarSessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                clearTimeout(session.timer);
                const ans = session.jawaban;
                delete tebakGambarSessions[from];
                return reply(`*[ 𝚃𝙴𝙱𝙰𝙺 𝙶𝙰𝙼𝙱𝙰𝚁 ]*\n𝚈𝚘𝚞 gave up! The correct answer was: *${ans.toUpperCase()}*`);
            }
            if (guess === session.jawaban || getStringSimilarity(guess, session.jawaban) >= 0.85) {
                clearTimeout(session.timer);
                delete tebakGambarSessions[from];
                const rpg = getRpgDB();
                const userRpg = initUserRpg(rpg, m.sender);
                userRpg.money += 5000;
                userRpg.exp += 100;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙲𝙾𝚁𝚁𝙴𝙲𝚃 𝙰𝙽𝚂𝚆𝙴𝚁! ]*\n*𝚄𝚜𝚎𝚛:* @${m.sender.split('@')[0]}\n*𝙰𝚗𝚜𝚠𝚎𝚛:* ${session.jawaban.toUpperCase()}\n*𝚁𝚎𝚠𝚊𝚛𝚍:* +5000 Money & +100 EXP`);
            }
        }

        if (family100Sessions[from]) {
            const fSession = family100Sessions[from];
            if (guess === 'nyerah' || guess === 'menyerah') {
                const unanswered = fSession.jawaban.map((j, i) => `${i + 1}. ${j.toUpperCase()} ${fSession.terjawab[i] ? `(@${fSession.terjawab[i].split('@')[0]})` : '(❌)'}`).join('\n');
                delete family100Sessions[from];
                return sock.sendMessage(from, {
                    text: `*[ 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 𝙴𝙽𝙳𝙴𝙳 ]*\n*𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗:* ${fSession.soal}\n\n*𝙰𝚗𝚜𝚠𝚎𝚛𝚜:*\n${unanswered}`,
                    mentions: fSession.terjawab.filter(Boolean)
                }, { quoted: m });
            }

            const matchIdx = fSession.jawaban.findIndex((j, idx) => !fSession.terjawab[idx] && (j === guess || getStringSimilarity(guess, j) >= 0.85));
            if (matchIdx !== -1) {
                fSession.terjawab[matchIdx] = m.sender;
                const rpg = getRpgDB();
                const userRpg = initUserRpg(rpg, m.sender);
                userRpg.money += 2500;
                userRpg.exp += 50;
                saveRpgDB(rpg);

                const isAllDone = fSession.terjawab.every(Boolean);
                const board = fSession.jawaban.map((j, i) => fSession.terjawab[i] ? `${i + 1}. *${j.toUpperCase()}* ✓ (@${fSession.terjawab[i].split('@')[0]})` : `${i + 1}. _____`).join('\n');

                if (isAllDone) {
                    const mentions = [...new Set(fSession.terjawab.filter(Boolean))];
                    delete family100Sessions[from];
                    return sock.sendMessage(from, {
                        text: `*[ 🎉 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳! ]*\n*𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗:* ${fSession.soal}\n\n${board}\n\nAll answers have been found!`,
                        mentions
                    }, { quoted: m });
                } else {
                    const mentions = [...new Set(fSession.terjawab.filter(Boolean))];
                    return sock.sendMessage(from, {
                        text: `*[ ✅ 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 ]*\n*𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗:* ${fSession.soal}\n\n${board}\n\n*+2500 Money* for @${m.sender.split('@')[0]}! (Type *nyerah* to end)`,
                        mentions
                    }, { quoted: m });
                }
            }
        }
    }

    const date = tanggal(Date.now());
    let thumb = Buffer.alloc(0);
    try {
        thumb = await sharp('./lib/media/thumb.jpg').resize(300, 300).jpeg({ quality: 80 }).toBuffer();
    } catch(e) {}

    switch (command) {
        // ── RVO ──
        case "rvo":
        case "readviewonce": {
            try {
                const stanzaId = m.msg?.contextInfo?.stanzaId || m.quoted?.key?.id || m.quoted?.id;
                let fullMsg = null;

                if (stanzaId && store) {
                    fullMsg = await store.loadMessage(m.chat, stanzaId);
                }

                const rawTarget = fullMsg?.message || m.quoted?.message || m.msg?.contextInfo?.quotedMessage || m.message;
                if (!rawTarget) return reply('*[ 𝚁𝚅𝙾 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚟𝚒𝚎𝚠-𝚘𝚗𝚌𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎.');

                function extractMedia(obj) {
                    if (!obj || typeof obj !== 'object') return null;
                    if (obj.imageMessage) return { type: 'image', node: obj.imageMessage };
                    if (obj.videoMessage) return { type: 'video', node: obj.videoMessage };
                    if (obj.audioMessage) return { type: 'audio', node: obj.audioMessage };
                    for (const k of Object.keys(obj)) {
                        if (k === 'contextInfo') continue;
                        const res = extractMedia(obj[k]);
                        if (res) return res;
                    }
                    return null;
                }

                let media = extractMedia(rawTarget);

                if ((!media || (!media.node.mediaKey && !media.node.directPath)) && m.quoted) {
                    const qMime = String(m.quoted.mimetype || m.quoted.mtype || '').toLowerCase();
                    const qType = qMime.includes('video') ? 'video' : qMime.includes('audio') ? 'audio' : 'image';
                    if (m.quoted.mediaKey || m.quoted.directPath || m.quoted.url) {
                        media = { type: qType, node: m.quoted };
                    }
                }

                if (!media || (!media.node.mediaKey && !media.node.directPath && !media.node.url)) {
                    return reply('*[ 𝚁𝚅𝙾 𝙴𝚁𝚁𝙾𝚁 ]*\n𝙼𝚎𝚍𝚒𝚊 𝚍𝚊𝚝𝚊 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍 𝚒𝚗 𝚌𝚊𝚌𝚑𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚜𝚎𝚗𝚍 𝚊 𝚗𝚎𝚠 𝚟𝚒𝚎𝚠-𝚘𝚗𝚌𝚎 𝚖𝚎𝚍𝚒𝚊.');
                }

                const stream = await downloadContentFromMessage(media.node, media.type);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }

                if (!buffer || buffer.length === 0) {
                    return reply('*[ 𝚁𝚅𝙾 𝙴𝚁𝚁𝙾𝚁 ]*\n𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚍𝚎𝚌𝚛𝚢𝚙𝚝 𝚟𝚒𝚎𝚠-𝚘𝚗𝚌𝚎 𝚖𝚎𝚍𝚒𝚊.');
                }

                const cap = `*[ 𝚁𝙴𝙰𝙳 𝚅𝙸𝙴𝚆𝙾𝙽𝙲𝙴 ]*${media.node.caption ? `\n*𝙲𝚊𝚙𝚝𝚒𝚘𝚗:* ${media.node.caption}` : ''}`;
                if (media.type === 'video') {
                    await sock.sendMessage(m.chat, { video: buffer, caption: cap }, { quoted: m });
                } else if (media.type === 'audio') {
                    await sock.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
                } else {
                    await sock.sendMessage(m.chat, { image: buffer, caption: cap }, { quoted: m });
                }
            } catch (e) {
                console.error('[RVO ERROR]:', e);
                reply(`*[ 𝚁𝚅𝙾 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── HIDETAG, TAGALL (SILENT MENTION), & TOTAG ──
        case "hidetag":
        case "h":
        case "tagall": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');

            const allJids = participants.map(p => p.id).filter(Boolean);
            const pesanTag = text || m.quoted?.text || 'woyyy';

            await sock.sendMessage(m.chat, {
                text: pesanTag,
                mentions: allJids
            }, { quoted: m });
        }
        break;

        case "totag": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!m.quoted) return reply(`*[ 𝚃𝙾𝚃𝙰𝙶 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎, 𝚒𝚖𝚊𝚐𝚎, 𝚟𝚒𝚍𝚎𝚘, 𝚘𝚛 𝚜𝚝𝚒𝚌𝚔𝚎𝚛 𝚠𝚒𝚝𝚑 *${prefix}totag*`);

            const allJids = participants.map(p => p.id).filter(Boolean);
            const qType = m.quoted.mtype || '';

            try {
                if (/image|video|sticker|audio|document/.test(qType)) {
                    const mediaType = qType.replace('Message', '');
                    const stream = await downloadContentFromMessage(m.quoted, mediaType);
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                    if (mediaType === 'sticker') {
                        await sock.sendMessage(m.chat, { sticker: buffer, mentions: allJids }, { quoted: m });
                    } else if (mediaType === 'audio') {
                        await sock.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mp4', ptt: true, mentions: allJids }, { quoted: m });
                    } else {
                        await sock.sendMessage(m.chat, {
                            [mediaType]: buffer,
                            caption: text || m.quoted.text || '',
                            mentions: allJids
                        }, { quoted: m });
                    }
                } else {
                    await sock.sendMessage(m.chat, {
                        text: m.quoted.text || text || 'woyyy',
                        mentions: allJids
                    }, { quoted: m });
                }
            } catch (e) {
                reply(`*[ 𝚃𝙾𝚃𝙰𝙶 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── KICK, PROMOTE, DEMOTE / ODEM, GC OPEN/CLOSE, LINKGC, DELETE ──
        case "kick":
        case "dor": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const target = getTargetUser(m, args, participants);
            if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚁𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚞𝚜𝚎𝚛'𝚜 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚘𝚛 𝚝𝚊𝚐 𝚝𝚑𝚎𝚖: *${prefix}kick @user*`);

            await sock.groupParticipantsUpdate(m.chat, [target], 'remove');
            return sock.sendMessage(m.chat, {
                text: `*[ 𝙼𝙴𝙼𝙱𝙴𝚁 𝙺𝙸𝙲𝙺𝙴𝙳 ]*\n𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚛𝚎𝚖𝚘𝚟𝚎𝚍 @${target.split('@')[0]} 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "promote":
        case "pm": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const target = getTargetUser(m, args, participants);
            if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚁𝚎𝚙𝚕𝚢 𝚘𝚛 𝚝𝚊𝚐 𝚝𝚑𝚎 𝚞𝚜𝚎𝚛: *${prefix}promote @user*`);

            await sock.groupParticipantsUpdate(m.chat, [target], 'promote');
            return sock.sendMessage(m.chat, {
                text: `*[ 𝙰𝙳𝙼𝙸𝙽 𝙿𝚁𝙾𝙼𝙾𝚃𝙴𝙳 ]*\n@${target.split('@')[0]} 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚙𝚛𝚘𝚖𝚘𝚝𝚎𝚍 𝚝𝚘 𝙶𝚛𝚘𝚞𝚙 𝙰𝚍𝚖𝚒𝚗.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "demote":
        case "dm":
        case "odem": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const target = getTargetUser(m, args, participants);
            if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚁𝚎𝚙𝚕𝚢 𝚘𝚛 𝚝𝚊𝚐 𝚝𝚑𝚎 𝚞𝚜𝚎𝚛: *${prefix}${command} @user*`);

            await sock.groupParticipantsUpdate(m.chat, [target], 'demote');
            return sock.sendMessage(m.chat, {
                text: `*[ 𝙰𝙳𝙼𝙸𝙽 𝙳𝙴𝙼𝙾𝚃𝙴𝙳 ]*\n@${target.split('@')[0]} 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚍𝚎𝚖𝚘𝚝𝚎𝚍 𝚏𝚛𝚘𝚖 𝙶𝚛𝚘𝚞𝚙 𝙰𝚍𝚖𝚒𝚗.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "gc":
        case "group":
        case "open":
        case "buka":
        case "close":
        case "tutup": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const sub = (command === 'gc' || command === 'group') ? (args[0] || '').toLowerCase() : command;
            if (['open', 'buka', 'unlock'].includes(sub)) {
                await sock.groupSettingUpdate(m.chat, 'not_announcement');
                return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙿𝙴𝙽𝙴𝙳 ]*\n𝙰𝚕𝚕 𝚙𝚊𝚛𝚝𝚒𝚌𝚒𝚙𝚊𝚗𝚝𝚜 𝚌𝚊𝚗 𝚗𝚘𝚠 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎𝚜 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙.');
            } else if (['close', 'tutup', 'lock'].includes(sub)) {
                await sock.groupSettingUpdate(m.chat, 'announcement');
                return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙲𝙻𝙾𝚂𝙴𝙳 ]*\n𝙾𝚗𝚕𝚢 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚗𝚘𝚠 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎𝚜 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙.');
            } else {
                return reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝚂𝙴𝚃𝚃𝙸𝙽𝙶 ]*\n𝚄𝚜𝚊𝚐𝚎:\n• *${prefix}gc open* (Buka grup)\n• *${prefix}gc close* (Tutup grup)`);
            }
        }
        break;

        case "linkgc":
        case "linkgroup": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const code = await sock.groupInviteCode(m.chat);
            return reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝙸𝙽𝚅𝙸𝚃𝙴 𝙻𝙸𝙽𝙺 ]*\nhttps://chat.whatsapp.com/${code}`);
        }
        break;

        case "revoke":
        case "resetlink": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');

            const code = await sock.groupRevokeInvite(m.chat);
            return reply(`*[ 𝙻𝙸𝙽𝙺 𝚁𝙴𝚅𝙾𝙺𝙴𝙳 ]*\n𝙶𝚛𝚘𝚞𝚙 𝚒𝚗𝚟𝚒𝚝𝚎 𝚕𝚒𝚗𝚔 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚜𝚎𝚝.\n*𝙽𝚎𝚠 𝙻𝚒𝚗𝚔:* https://chat.whatsapp.com/${code}`);
        }
        break;

        case "delete":
        case "del":
        case "d": {
            if (!m.quoted) return reply(`*[ 𝙳𝙴𝙻𝙴𝚃𝙴 𝙼𝙴𝚂𝚂𝙰𝙶𝙴 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚝𝚑𝚎 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚍𝚎𝚕𝚎𝚝𝚎.`);
            const qKey = m.quoted.key || {
                remoteJid: m.chat,
                fromMe: Boolean(m.quoted.fromMe),
                id: m.msg?.contextInfo?.stanzaId,
                participant: m.msg?.contextInfo?.participant || m.quoted.sender
            };
            await sock.sendMessage(m.chat, { delete: qKey });
        }
        break;

        // ── STICKER ──
        case "s":
        case "sticker":
        case "stiker": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';

            if (!/image|video|webp/.test(targetMime)) {
                return reply(`*[ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙼𝙰𝙺𝙴𝚁 ]*\n𝚂𝚎𝚗𝚍 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎/𝚟𝚒𝚍𝚎𝚘 𝚠𝚒𝚝𝚑 *${prefix}s*`);
            }

            try {
                const isVid = /video/.test(targetMime);
                if (isVid && (targetNode.seconds || 0) > 10) {
                    return reply('*[ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙴𝚁𝚁𝙾𝚁 ]*\nMaximum video duration for a sticker is 10 seconds.');
                }

                const mType = isVid ? 'video' : 'image';
                const stream = await downloadContentFromMessage(targetNode, mType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                if (!isVid) {
                    const webpBuf = await sharp(buffer)
                        .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                        .webp({ quality: 80 })
                        .toBuffer();
                    const finalSticker = addStickerExif(webpBuf, global.botname, global.namaown);
                    await sock.sendMessage(m.chat, { sticker: finalSticker }, { quoted: m });
                } else {
                    const tmpIn = `./tmp_${Date.now()}.mp4`;
                    const tmpOut = `./tmp_${Date.now()}.webp`;
                    fs.writeFileSync(tmpIn, buffer);
                    execSync(`ffmpeg -y -i "${tmpIn}" -vcodec libwebp -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" -loop 0 -ss 00:00:00 -t 00:00:08 -preset default -an -vsync 0 "${tmpOut}"`);
                    const webpBuf = fs.readFileSync(tmpOut);
                    fs.unlinkSync(tmpIn);
                    fs.unlinkSync(tmpOut);
                    const finalSticker = addStickerExif(webpBuf, global.botname, global.namaown);
                    await sock.sendMessage(m.chat, { sticker: finalSticker }, { quoted: m });
                }
            } catch (e) {
                console.error('[STICKER ERROR]:', e);
                reply(`*[ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

              // ── SCREENSHOT WEBSITE MULTI-DEVICE ──
        case "ssweb":
        case "ss": {
            const devList = Object.keys(SS_DEVICES);
            if (!text || ['help', 'list', 'device', 'devices'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ 🌐 𝚂𝙲𝚁𝙴𝙴𝙽𝚂𝙷𝙾𝚃 𝚆𝙴𝙱𝚂𝙸𝚃𝙴 ]*\n` +
                    `Usage:\n` +
                    `• *${prefix}${command} <url>* (Default: Desktop)\n` +
                    `• *${prefix}${command} <url> <device>*\n` +
                    `• *${prefix}${command} <url> <device> full*\n\n` +
                    `*Contoh:*\n` +
                    `• *${prefix}${command} https://guts-chess-gate.vercel.app*\n` +
                    `• *${prefix}${command} https://google.com iphone16*\n` +
                    `• *${prefix}${command} https://github.com desktop_fhd full*\n\n` +
                    `*Daftar Device Tersedia:*\n` +
                    devList.map(d => `• \`${d}\` (${SS_DEVICES[d].width}x${SS_DEVICES[d].height})`).join('\n')
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                let targetUrl = null;
                let device = 'desktop';
                let full = false;
                let apiKey = null;

                for (let i = 0; i < args.length; i++) {
                    const a = args[i];
                    const low = a.toLowerCase();
                    if (low === '--device' && args[i + 1]) {
                        device = args[++i].toLowerCase();
                    } else if (low === '--key' && args[i + 1]) {
                        apiKey = args[++i];
                    } else if (low === '--full' || low === 'full') {
                        full = true;
                    } else if (SS_DEVICES[low]) {
                        device = low;
                    } else if (!targetUrl && !low.startsWith('-')) {
                        targetUrl = a;
                    }
                }

                if (!targetUrl) {
                    return reply(`*[ ❌ 𝚄𝚁𝙻 𝙺𝙾𝚂𝙾𝙽𝙶 ]*\nMasukkan URL website yang ingin di-screenshot! Contoh: *${prefix}${command} https://google.com iphone16*`);
                }

                const res = await ssweb({
                    url: targetUrl,
                    device,
                    full,
                    key: apiKey
                });

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: res.buffer,
                    caption:
                        `*[ 🌐 𝚆𝙴𝙱 𝚂𝙲𝚁𝙴𝙴𝙽𝚂𝙷𝙾𝚃 ]*\n` +
                        `• *URL:* ${res.url}\n` +
                        `• *Device:* ${res.device} (${res.spec.width}x${res.spec.height})\n` +
                        `• *Mode:* ${res.full ? 'Full Page' : ' Standard Viewport'}`
                }, { quoted: m });
            } catch (e) {
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝚂𝚂𝚆𝙴𝙱 𝙴𝚁𝚁𝙾𝚁 ]*\nGagal mengambil screenshot: ${e.message}`);
            }
        }
        break;

        case "toimg":
        case "toimage": {
            if (!m.quoted || !/webp|sticker/.test(m.quoted.mimetype || m.quoted.mtype || '')) {
                return reply(`*[ 𝚃𝙾 𝙸𝙼𝙰𝙶𝙴 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚜𝚝𝚒𝚌𝚔𝚎𝚛 𝚠𝚒𝚝𝚑 *${prefix}toimg*`);
            }
            try {
                const stream = await downloadContentFromMessage(m.quoted, 'sticker');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                const pngBuffer = await sharp(buffer).png().toBuffer();
                await sock.sendMessage(m.chat, { image: pngBuffer, caption: '*[ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝚃𝙾 𝙸𝙼𝙰𝙶𝙴 ]*' }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝚃𝙾𝙸𝙼𝙶 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "tomp3":
        case "tovn": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            if (!/video|audio/.test(targetMime)) {
                return reply(`*[ 𝙰𝚄𝙳𝙸𝙾 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚟𝚒𝚍𝚎𝚘 𝚘𝚛 𝚊𝚞𝚍𝚒𝚘 𝚠𝚒𝚝𝚑 *${prefix}${command}*`);
            }
            try {
                const mType = /video/.test(targetMime) ? 'video' : 'audio';
                const stream = await downloadContentFromMessage(targetNode, mType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                const isVn = command === 'tovn';
                const tmpIn = `./tmp_in_${Date.now()}`;
                const tmpOut = `./tmp_out_${Date.now()}.${isVn ? 'ogg' : 'mp3'}`;
                fs.writeFileSync(tmpIn, buffer);

                if (isVn) {
                    // Konversi ke OGG Opus Mono 48kHz (Standar wajib Voice Note WhatsApp)
                    execSync(`"${ffmpegPath}" -y -i "${tmpIn}" -vn -c:a libopus -b:a 64k -vbr on -ac 1 -ar 48000 -f ogg "${tmpOut}"`);
                } else {
                    execSync(`"${ffmpegPath}" -y -i "${tmpIn}" -vn -c:a libmp3lame -q:a 4 "${tmpOut}"`);
                }

                const audioBuf = fs.readFileSync(tmpOut);
                if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
                if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);

                await sock.sendMessage(m.chat, {
                    audio: audioBuf,
                    mimetype: isVn ? 'audio/ogg; codecs=opus' : 'audio/mpeg',
                    ptt: isVn
                }, { quoted: m });
            } catch (e) {
                console.error('[AUDIO CONVERT ERROR]:', e);
                reply(`*[ 𝙰𝚄𝙳𝙸𝙾 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "iqc": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            const hasImageOrSticker = /image|webp|sticker/.test(targetMime);
            const iqcText = text || m.quoted?.text || m.quoted?.caption || '';

            if (!iqcText && !hasImageOrSticker) {
                return reply(
                    `*[ 📱 𝙸𝙿𝙷𝙾𝙽𝙴 𝚀𝚄𝙾𝚃𝙴 𝙲𝙷𝙰𝚃 (.𝙸𝚀𝙲) ]*\n` +
                    `Usage:\n` +
                    `• *Teks:* ${prefix}iqc <teks / emoji>\n` +
                    `• *Reply Pesan:* Reply chat atau stiker/gambar dengan *${prefix}iqc [caption]*`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                let imgBuf = null;
                if (hasImageOrSticker) {
                    const mType = /webp|sticker/.test(targetMime) ? 'sticker' : 'image';
                    const stream = await downloadContentFromMessage(targetNode, mType);
                    let rawBuf = Buffer.from([]);
                    for await (const chunk of stream) rawBuf = Buffer.concat([rawBuf, chunk]);
                    // Konversi via sharp ke PNG agar stiker WebP maupun foto JPEG 100% terbaca oleh @napi-rs/canvas
                    imgBuf = await sharp(rawBuf).png().toBuffer();
                }

                const outPng = await generateIqc({
                    text: iqcText,
                    imageBuffer: imgBuf
                });

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: outPng,
                    caption: '*[ 📱 𝙸𝙿𝙷𝙾𝙽𝙴 𝚀𝚄𝙾𝚃𝙴 𝙲𝙷𝙰𝚃 ]*'
                }, { quoted: m });
            } catch (e) {
                console.error('[IQC ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙸𝚀𝙲 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "qc": {
            const qcText = text || m.quoted?.text;
            if (!qcText) return reply(`*[ 𝚀𝚄𝙾𝚃𝙴 𝙲𝙷𝙰𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: *${prefix}qc <text>* 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎.`);
            if (qcText.length > 250) return reply('*[ 𝚀𝙲 𝙴𝚁𝚁𝙾𝚁 ]*\nText is too long (maximum 250 characters).');

            try {
                const targetSender = m.quoted?.sender || m.sender;
                const targetName = m.quoted ? (m.quoted.pushName || targetSender.split('@')[0]) : pushname;
                let ppUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                try {
                    ppUrl = await sock.profilePictureUrl(targetSender, 'image');
                } catch (_) {}

                const payload = {
                    type: "quote",
                    format: "png",
                    backgroundColor: "#1b1429",
                    width: 512,
                    height: 768,
                    scale: 2,
                    messages: [{
                        entities: [],
                        avatar: true,
                        from: {
                            id: 1,
                            name: targetName,
                            photo: { url: ppUrl }
                        },
                        text: qcText,
                        replyMessage: {}
                    }]
                };

                const res = await axios.post('https://bot.lyo.su/quote/generate', payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const imgBuf = Buffer.from(res.data.result.image, 'base64');
                const webpBuf = await sharp(imgBuf)
                    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                    .webp({ quality: 85 })
                    .toBuffer();

                const finalSticker = addStickerExif(webpBuf, global.botname, global.namaown);
                await sock.sendMessage(m.chat, { sticker: finalSticker }, { quoted: m });
            } catch (e) {
                console.error('[QC ERROR]:', e);
                reply(`*[ 𝚀𝙲 𝙴𝚁𝚁𝙾𝚁 ]*\nFailed to generate quote sticker.`);
            }
        }
        break;

         case "brat": {
            const rawBrat = text || m.quoted?.text || '';
            const { text: bratText, theme, blur } = parseBratInput(rawBrat);

            if (!bratText) {
                return reply(
                    `*[ ⬜ 𝙱𝚁𝙰𝚃 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 ]*\n` +
                    `Usage: *${prefix}brat <teks/emoji>*\n\n` +
                    `*Opsi Tambahan (Opsional):*\n` +
                    `• Tema Hijau: *${prefix}brat <teks> --green*\n` +
                    `• Tema Hitam: *${prefix}brat <teks> --black*\n` +
                    `• Efek Blur (0-3): *${prefix}brat <teks> --blur 2*`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const pngBuffer = await generateBrat({
                    text: bratText,
                    theme,
                    blur
                });

                const webpBuf = await sharp(pngBuffer)
                    .resize(512, 512)
                    .webp({ quality: 88 })
                    .toBuffer();

                const finalSticker = addStickerExif(webpBuf, global.botname, global.namaown);
                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, { sticker: finalSticker }, { quoted: m });
            } catch (e) {
                console.error('[BRAT ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙱𝚁𝙰𝚃 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

                // ── DOWNLOADER & SEARCH ──
        case "pin":
        case "pinterest": {
            if (!text) {
                return reply(`*[ 𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃 𝚂𝙴𝙰𝚁𝙲𝙷 ]*\n𝚄𝚜𝚊𝚐𝚎: *${prefix}${command} <query> [limit]*\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎:\n• *${prefix}${command} Amanda Azahra* (Otomatis 5 foto Album)\n• *${prefix}${command} Amanda Azahra 2*`);
            }

            try {
                const parts = text.trim().split(/\s+/);
                let limit = 5;
                let query = text.trim();

                if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
                    limit = Math.min(Math.max(parseInt(parts.pop()), 1), 10);
                    query = parts.join(' ');
                }

                const pins = await scrapePinterest(query);
                if (!Array.isArray(pins) || pins.length === 0) {
                    return reply('*[ 𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃 ]*\n𝙽𝚘 𝚒𝚖𝚊𝚐𝚎𝚜 𝚏𝚘𝚞𝚗𝚍 𝚏𝚘𝚛 𝚝𝚑𝚊𝚝 𝚚𝚞𝚎𝚛𝚢.');
                }

                // Acak urutan hasil agar setiap pencarian gambarnya selalu segar
                const itemsToSend = pins.sort(() => Math.random() - 0.5).slice(0, limit);

                const validAlbum = [];
                for (let i = 0; i < itemsToSend.length; i++) {
                    const item = itemsToSend[i];
                    if (!item.image) continue;

                    try {
                        const imgRes = await axios.get(item.image, {
                            responseType: 'arraybuffer',
                            timeout: 15000,
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0',
                                'Referer': 'https://id.pinterest.com/'
                            }
                        });

                        const cleanImgBuffer = await sharp(Buffer.from(imgRes.data))
                            .jpeg({ quality: 90 })
                            .toBuffer();

                        const cap = applyUserFont(
                            `*[ 𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃 𝚂𝙴𝙰𝚁𝙲𝙷 (${i + 1}/${itemsToSend.length}) ]*\n` +
                            `*𝚃𝚒𝚝𝚕𝚎:* ${item.title}\n` +
                            `*𝙿𝚒𝚗𝚗𝚎𝚛:* ${item.pinner} (@${item.username})\n` +
                            `*𝙻𝚒𝚔𝚎𝚜:* ❤️ ${item.likes}\n` +
                            `*𝚄𝚁𝙻:* https://id.pinterest.com/pin/${item.id}`,
                            m.sender
                        );

                        validAlbum.push({
                            image: cleanImgBuffer,
                            caption: cap
                        });
                    } catch (imgErr) {
                        console.error(`[PIN IMAGE SKIP #${i + 1}]:`, imgErr.message);
                    }
                }

                if (validAlbum.length === 0) {
                    return reply('*[ 𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃 𝙴𝚁𝚁𝙾𝚁 ]*\nGagal mengunduh gambar dari server Pinterest.');
                }

                if (validAlbum.length > 1) {
                    await sock.sendMessage(m.chat, {
                        album: validAlbum
                    }, { quoted: m });
                } else {
                    await sock.sendMessage(m.chat, {
                        image: validAlbum[0].image,
                        caption: validAlbum[0].caption
                    }, { quoted: m });
                }
            } catch (e) {
                console.error('[PINTEREST ERROR]:', e);
                reply(`*[ 𝙿𝙸𝙽𝚃𝙴𝚁𝙴𝚂𝚃 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "mf":
        case "mediafire": {
            if (!text || !text.includes('mediafire.com')) {
                return reply(`*[ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 ]*\n𝚄𝚜𝚊𝚐𝚎: *${prefix}${command} <mediafire_url>*`);
            }
            try {
                const res = await axios.get(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(text)}`);
                const data = res.data?.data;
                if (!data || !data.downloadLink) {
                    return reply('*[ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 𝙴𝚁𝚁𝙾𝚁 ]*\n𝙵𝚊𝚒𝚕𝚎𝚍 𝚝𝚘 𝚎𝚡𝚝𝚛𝚊𝚌𝚝 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝚕𝚒𝚗𝚔.');
                }
                await sock.sendMessage(m.chat, {
                    document: { url: data.downloadLink },
                    fileName: data.fileName || `mediafire_${Date.now()}.zip`,
                    mimetype: data.fileType || 'application/octet-stream',
                    caption: `*[ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ]*\n*𝙵𝚒𝚕𝚎:* ${data.fileName || '-'}\n*𝚂𝚒𝚣𝚎:* ${data.fileSize || '-'}`
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝙼𝙴𝙳𝙸𝙰𝙵𝙸𝚁𝙴 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── FUN & MINI GAMES ──
        case "cekkhodam": {
            const targetName = text || m.quoted?.pushName || pushname;
            const khodamList = [
                "Macan Putih Sumbing", "Naga Indosiar", "Kulkas 2 Pintu", "Tutup Panci Gosong",
                "Kucing Oren Barbar", "Rawa Rontek", "Sendal Swallow Putus", "Tuyul Skripsi",
                "kipas Angin Cosmos", "biawak Salto", "Kuntilanak Dasteran", "Harimau Sumatera",
                "Garuda Pancasila", "rice Cooker Miyako", "Galon Aqua Kosong", "Cacing Kremi"
            ];
            const pick = khodamList[Math.floor(Math.random() * khodamList.length)];
            return reply(`*[ 🔮 𝙲𝙴𝙺 𝙺𝙷𝙾𝙳𝙰𝙼 ]*\n*𝙽𝚊𝚖𝚎:* ${targetName}\n*𝙺𝚑𝚘𝚍𝚊𝚖:* ${pick}`);
        }
        break;

        case "tebakgambar": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚐𝚊𝚖𝚎 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚙𝚕𝚊𝚢𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (tebakGambarSessions[from]) {
                return reply('*[ 𝚃𝙴𝙱𝙰𝙺 𝙶𝙰𝙼𝙱𝙰𝚁 ]*\n𝙰 𝚐𝚊𝚖𝚎 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚛𝚞𝚗𝚗𝚒𝚗𝚐 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙! 𝚁𝚎𝚙𝚕𝚢 𝚠𝚒𝚝𝚑 𝚢𝚘𝚞𝚛 𝚊𝚗𝚜𝚠𝚎𝚛 𝚘𝚛 𝚝𝚢𝚙𝚎 *nyerah*.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json');
                const list = res.data;
                const item = list[Math.floor(Math.random() * list.length)];
                const answer = item.jawaban.toLowerCase().trim();

                const timer = setTimeout(() => {
                    if (tebakGambarSessions[from]) {
                        sock.sendMessage(from, {
                            text: `*[ ⏰ 𝚃𝙸𝙼𝙴'𝚂 𝚄𝙿! ]*\nNo one guessed correctly.\n*𝙰𝚗𝚜𝚠𝚎𝚛:* ${item.jawaban.toUpperCase()}`
                        });
                        delete tebakGambarSessions[from];
                    }
                }, 60000);

                tebakGambarSessions[from] = {
                    jawaban: answer,
                    clue: item.deskripsi,
                    timer
                };

                await sock.sendMessage(from, {
                    image: { url: item.img },
                    caption: `*[ 🎮 𝚃𝙴𝙱𝙰𝙺 𝙶𝙰𝙼𝙱𝙰𝚁 ]*\n*𝙲𝚕𝚞𝚎:* ${item.deskripsi}\n*𝚃𝚒𝚖𝚎:* 60 seconds\n*𝚁𝚎𝚠𝚊𝚛𝚍:* +5000 Money & +100 EXP\n\n_Type your answer directly in chat (or type *nyerah* to give up)!_`
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝚃𝙴𝙱𝙰𝙺 𝙶𝙰𝙼𝙱𝙰𝚁 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "family100": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚐𝚊𝚖𝚎 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚙𝚕𝚊𝚢𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');
            if (family100Sessions[from]) {
                return reply('*[ 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 ]*\n𝙰 𝚜𝚎𝚜𝚜𝚒𝚘𝚗 𝚒𝚜 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚊𝚌𝚝𝚒𝚟𝚎! 𝚃𝚢𝚙𝚎 *nyerah* 𝚝𝚘 𝚎𝚗𝚍 𝚒𝚝.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json');
                const list = res.data;
                const item = list[Math.floor(Math.random() * list.length)];

                family100Sessions[from] = {
                    soal: item.soal,
                    jawaban: item.jawaban.map(j => j.toLowerCase().trim()),
                    terjawab: Array(item.jawaban.length).fill(false)
                };

                const slots = item.jawaban.map((_, i) => `${i + 1}. _____`).join('\n');
                await reply(`*[ 🎮 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 ]*\n*𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗:* ${item.soal}\n*𝚃𝚘𝚝𝚊𝚕 𝙰𝚗𝚜𝚠𝚎𝚛𝚜:* ${item.jawaban.length}\n\n${slots}\n\n_Type your answers directly in chat (or type *nyerah* to end)!_`);
            } catch (e) {
                reply(`*[ 𝙵𝙰𝙼𝙸𝙻𝚈 𝟷𝟶𝟶 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "aki":
        case "akinator": {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'stop' || sub === 'end') {
                if (!akinatorSessions[m.sender]) return reply('*[ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 ]*\nYou do not have an active Akinator session.');
                delete akinatorSessions[m.sender];
                return reply('*[ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 𝚂𝚃𝙾𝙿𝙿𝙴𝙳 ]*\nYour Akinator session has been ended.');
            }
            if (!akinatorSessions[m.sender] || sub === 'start') {
                akinatorSessions[m.sender] = { step: 1, Question: 'Apakah karakter ini berasal dari dunia nyata?' };
                return reply(`*[ 🧞‍♂️ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 𝚂𝚃𝙰𝚁𝚃𝙴𝙳 ]*\n*Step 1:* Apakah karakter yang kamu pikirkan berasal dari dunia nyata?\n\nKetik *${prefix}aki <ya/tidak/mungkin>* atau *${prefix}aki stop* untuk berhenti.`);
            }
            const ans = sub;
            if (!['ya', 'tidak', 'mungkin', 'yes', 'no'].includes(ans)) {
                return reply(`*[ 🧞‍♂️ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 ]*\nJawab dengan: *${prefix}aki ya* / *${prefix}aki tidak* / *${prefix}aki mungkin* / *${prefix}aki stop*`);
            }
            akinatorSessions[m.sender].step += 1;
            const st = akinatorSessions[m.sender].step;
            const sampleQuestions = [
                'Apakah karakter ini seorang laki-laki?',
                'Apakah karakter ini berasal dari Jepang / Anime?',
                'Apakah karakter ini memiliki kekuatan super / bertarung?',
                'Apakah karakter ini tokoh utama dalam ceritanya?'
            ];
            if (st <= sampleQuestions.length + 1) {
                return reply(`*[ 🧞‍♂️ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 - 𝚂𝚃𝙴𝙿 ${st} ]*\n${sampleQuestions[st - 2]}\n\nJawab: *${prefix}aki ya / tidak / mungkin*`);
            } else {
                delete akinatorSessions[m.sender];
                return reply(`*[ 🧞‍♂️ 𝙰𝙺𝙸𝙽𝙰𝚃𝙾𝚁 RESULT ]*\nAku menebak karakter yang kamu pikirkan adalah tokoh populer favoritmu! 🎉\nKetik *${prefix}aki start* untuk bermain lagi.`);
            }
        }
        break;

        // ── WEREWOLF GAME (.ww, .werewolf, .wwpc) - INTEGRASI WEREWOLF.JS ──
        case "ww":
        case "werewolf": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nWerewolf can only be played in groups.');
            const sub = (args[0] || '').toLowerCase();

            if (sub === 'create' || sub === 'buat') {
                if (ww.sesi(from, wwRooms)) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nA room already exists in this group! Type *.ww join* to join.');
                wwRooms[from] = {
                    room: from,
                    owner: m.sender,
                    status: false,
                    iswin: null,
                    cooldown: null,
                    day: 0,
                    time: "malem",
                    player: [{
                        id: m.sender,
                        number: 1,
                        sesi: from,
                        status: false,
                        role: false,
                        effect: [],
                        vote: 0,
                        isdead: false,
                        isvote: false
                    }],
                    dead: [],
                    voting: false,
                    seer: false,
                    guardian: []
                };
                return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝚁𝙾𝙾𝙼 𝙲𝚁𝙴𝙰𝚃𝙴𝙳 ]*\nRoom created by @${m.sender.split('@')[0]}!\nType *${prefix}ww join* to join the game (Minimum 4 players).`);
            }

            if (sub === 'join' || sub === 'ikut') {
                const room = ww.sesi(from, wwRooms);
                if (!room) return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nNo active room! Type *${prefix}ww create* first.`);
                if (room.status) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nThe game has already started!');
                if (ww.playerOnGame(m.sender, wwRooms)) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou have already joined a Werewolf room!');

                room.player.push({
                    id: m.sender,
                    number: room.player.length + 1,
                    sesi: from,
                    status: false,
                    role: false,
                    effect: [],
                    vote: 0,
                    isdead: false,
                    isvote: false
                });
                const pList = room.player.map((p, i) => `${i + 1}. @${p.id.split('@')[0]}`).join('\n');
                return sock.sendMessage(from, {
                    text: `*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙹𝙾𝙸𝙽𝙴𝙳 ]*\n@${m.sender.split('@')[0]} joined the game!\n\n*𝙿𝚕𝚊𝚢𝚎𝚛𝚜 (${room.player.length}):*\n${pList}`,
                    mentions: room.player.map(p => p.id)
                }, { quoted: m });
            }

            if (sub === 'start' || sub === 'mulai') {
                const room = ww.sesi(from, wwRooms);
                if (!room) return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nNo active room! Type *${prefix}ww create* first.`);
                if (room.status) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nThe game is already running!');
                if (room.player.length < 4) return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nMinimum 4 players required to start (Current: ${room.player.length} players).`);

                ww.startGame(from, wwRooms);
                ww.roleGenerator(from, wwRooms);
                await sock.sendMessage(from, {
                    text: `*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝚂𝚃𝙰𝚁𝚃𝙴𝙳 ]*\nThe game has begun with ${room.player.length} players! Check your Private Chat (PC) from the bot to see your secret role.`,
                    mentions: room.player.map(p => p.id)
                }, { quoted: m });
                ww.run_malam(sock, from, wwRooms);
                return;
            }

            if (sub === 'vote') {
                const room = ww.sesi(from, wwRooms);
                if (!room || !room.voting) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nVoting session is not active right now!');
                const targetNum = parseInt(args[1]);
                if (!targetNum) return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nUsage: *${prefix}ww vote <player_number>*`);
                const pData = ww.dataPlayer(m.sender, wwRooms);
                if (!pData || pData.isdead) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou are not in the game or already dead!');
                if (pData.isvote) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou have already voted in this round!');

                const targetP = ww.dataPlayerById(targetNum, wwRooms);
                if (!targetP || targetP.isdead) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nInvalid player number or player is already dead!');

                ww.vote(from, targetNum, m.sender, wwRooms);
                return reply(`*[ 🗳️ 𝚅𝙾𝚃𝙴 𝚁𝙴𝙲𝙾𝚁𝙳𝙴𝙳 ]*\n@${m.sender.split('@')[0]} voted for player #${targetNum}.`);
            }

            if (sub === 'player' || sub === 'list') {
                const room = ww.sesi(from, wwRooms);
                if (!room) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nNo active Werewolf session in this group.');
                const pList = room.player.map(p => `(${p.number}) @${p.id.split('@')[0]} ${p.isdead ? '☠️ (Dead)' : '❤️ (Alive)'}`).join('\n');
                return sock.sendMessage(from, {
                    text: `*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙻𝙰𝚈𝙴𝚁𝚂 ]*\n\n${pList}`,
                    mentions: room.player.map(p => p.id)
                }, { quoted: m });
            }

            if (sub === 'exit' || sub === 'keluar') {
                if (!ww.playerOnRoom(m.sender, from, wwRooms)) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou are not in this room.');
                const room = ww.sesi(from, wwRooms);
                if (room.status) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nCannot exit while the game is running!');
                ww.playerExit(from, m.sender, wwRooms);
                return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou have left the room.');
            }

            if (sub === 'delete' || sub === 'hapus') {
                if (!ww.sesi(from, wwRooms)) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nNo room to delete.');
                if (!isAdmins && !isCreator && wwRooms[from].owner !== m.sender) {
                    return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nOnly the room creator or group admin can delete the room.');
                }
                delete wwRooms[from];
                return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nWerewolf room has been deleted.');
            }

            return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙼𝙴𝙽𝚄 ]*\n• *${prefix}ww create* - Create a room\n• *${prefix}ww join* - Join the room\n• *${prefix}ww start* - Start the game (Min. 4 players)\n• *${prefix}ww vote <num>* - Vote a player\n• *${prefix}ww player* - View player list\n• *${prefix}ww exit* - Leave room\n• *${prefix}ww delete* - Delete room`);
        }
        break;

        case "wwpc": {
            const pData = ww.dataPlayer(m.sender, wwRooms);
            if (!pData || pData.isdead) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙲 ]*\nYou are not in an active Werewolf game or you are already dead.');
            if (pData.status === true) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙲 ]*\nYou have already used your skill tonight!');

            const sub = (args[0] || '').toLowerCase();
            const targetNum = parseInt(args[1]);
            if (!sub || !targetNum) {
                return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙲 ]*\nUsage: *${prefix}wwpc <kill/dreamy/deff/sorcerer> <player_number>*`);
            }

            const targetObj = ww.getPlayerById2(m.sender, targetNum, wwRooms);
            if (!targetObj || targetObj.db.isdead) return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙲 ]*\nTarget player not found or already dead.');

            if (sub === 'kill' && pData.role === 'werewolf') {
                if (targetObj.db.role === 'werewolf') return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou cannot kill a fellow Werewolf!');
                pData.status = true;
                ww.killWerewolf(m.sender, targetNum, wwRooms);
                return reply(`*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 ]*\nYou chose to attack player #${targetNum} tonight.`);
            }
            if (sub === 'dreamy' && pData.role === 'seer') {
                pData.status = true;
                const roleTarget = ww.dreamySeer(m.sender, targetNum, wwRooms);
                return reply(`*[ 👳 𝚂𝙴𝙴𝚁 𝚅𝙸𝚂𝙸𝙾𝙽 ]*\nPlayer #${targetNum}'s role is: *${roleTarget}* ${ww.emoji_role(roleTarget)}`);
            }
            if (sub === 'deff' && pData.role === 'guardian') {
                pData.status = true;
                ww.protectGuardian(m.sender, targetNum, wwRooms);
                return reply(`*[ 👼 𝙶𝚄𝙰𝚁𝙳𝙸𝙰𝙽 ]*\nYou are protecting player #${targetNum} tonight.`);
            }
            if (sub === 'sorcerer' && pData.role === 'sorcerer') {
                pData.status = true;
                const roleTarget = ww.sorcerer(m.sender, targetNum, wwRooms);
                return reply(`*[ 🔮 𝚂𝙾𝚁𝙲𝙴𝚁𝙴𝚁 ]*\nPlayer #${targetNum}'s role is: *${roleTarget}* ${ww.emoji_role(roleTarget)}`);
            }
            return reply('*[ 🐺 𝚆𝙴𝚁𝙴𝚆𝙾𝙻𝙵 𝙿𝙲 ]*\nInvalid skill command for your role!');
        }
        break;

        // ── LIMIT, DAILY CLAIM, INV, TRANSFER, & LEADERBOARD ──
                case "inv":
        case "inventory":
        case "limit":
        case "ceklimit": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            await pullWebCryptoIfNewer(m.sender, rpg, u);
            
            let baseCap = u.limitCapacity || 50;
            let maxLimit = baseCap + ((u.rebirth || 0) * 50);
            if (!isCreator && !isOwner && !isPremium && u.limit > maxLimit) {
                u.limit = maxLimit;
                saveRpgDB(rpg);
            }
            const limitStr = (isCreator || isOwner || isPremium) ? '∞ (Unlimited)' : `${u.limit} / ${maxLimit}`;

            const RODS = [ "Tidak Ada", "🪵 Kayu Lapuk", "🎋 Bambu Lentur", "🎣 Fiber Standar", "🖤 Karbon Elit", "⚙️ Titanium Alloy", "🦴 Leviathan Bone", "🌋 Magma Forged", "🌌 Astral Quantum" ];
const curRod = RODS[u.activeRod || u.pancingan || 1];

            const FISH_PATH = "./lib/database/fish.json";
            let fishData = [];
            if (fs.existsSync(FISH_PATH)) fishData = JSON.parse(fs.readFileSync(FISH_PATH, 'utf-8'));
            
            let fishTxt = '';
            let totalIkan = 0;
            if (u.fishes) {
                for (const [fId, qty] of Object.entries(u.fishes)) {
                    if (qty > 0) {
                        totalIkan += qty;
                        const obj = fishData.find(f => f.id === fId);
                        fishTxt += `  └ ${obj ? obj.name : fId}: ${qty}\n`;
                    }
                }
            }
            if (totalIkan === 0) fishTxt = `  └ (Belum ada ikan di kolam)\n`;

            const invText = `*[ 🎒 𝚁𝙿𝙶 𝙸𝙽𝚅𝙴𝙽𝚃𝙾𝚁𝚈 & 𝙻𝙸𝙼𝙸𝚃 ]*\n` +
                `*𝚄𝚜𝚎𝚛:* @${m.sender.split('@')[0]}\n` +
                `*🎟️ 𝙻𝚒𝚖𝚒𝚝:* ${limitStr}\n` +
                `*𝙻𝚎𝚟𝚎𝚕:* ${u.level} (✨ ${u.exp} EXP)\n` +
                `*💵 𝙼𝚘𝚗𝚎𝚢:* $${u.money.toLocaleString()}\n` +
                `*💎 𝙳𝚒𝚊𝚖𝚘𝚗𝚍:* ${u.diamond}\n` +
                `*🧪 𝙿𝚘𝚝𝚒𝚘𝚗:* ${u.potion}\n` +
                `*🪱 𝚄𝚖𝚙𝚊𝚗:* ${u.umpan}\n` +
                `*🎣 𝙿𝚊𝚗𝚌𝚒𝚗𝚐𝚊𝚗:* ${curRod}\n\n` +
                `*🐟 𝙷𝚊𝚜𝚒𝚕 𝚃𝚊𝚗𝚐𝚔𝚊𝚙𝚊𝚗:*\n${fishTxt}\n` +
                `*🪨 𝙱𝚊𝚝𝚞:* ${u.batu} | *⛓️ 𝙱𝚎𝚜𝚒:* ${u.besi} | *🪙 𝙴𝚖𝚊𝚜:* ${u.emas}`;
            
            return sock.sendMessage(m.chat, { text: invText, mentions: [m.sender] }, { quoted: m });
        }
        break;

        case "shop":
        case "toko": {
            const FISH_PATH = "./lib/database/fish.json";
            const fishData = fs.existsSync(FISH_PATH) ? JSON.parse(fs.readFileSync(FISH_PATH, 'utf-8')) : [];
            const RODS = [
                { level: 1, name: "🪵 Kayu Lapuk", basePrice: 0 },
                { level: 2, name: "🎋 Bambu Lentur", basePrice: 50000 },
                { level: 3, name: "🎣 Fiber Standar", basePrice: 250000 },
                { level: 4, name: "🖤 Karbon Elit", basePrice: 1000000 },
                { level: 5, name: "⚙️ Titanium Alloy", basePrice: 5000000 },
                { level: 6, name: "🦴 Leviathan Bone", basePrice: 25000000 },
                { level: 7, name: "🌋 Magma Forged", basePrice: 150000000 },
                { level: 8, name: "🌌 Astral Quantum", basePrice: 1000000000 }
            ];

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const action = (args[0] || '').toLowerCase();
            const item = (args[1] || '').toLowerCase();
            const count = Math.max(1, parseInt(args[2]) || 1);

            if (action === 'buy' || action === 'beli') {
                const prices = { umpan: 5000, potion: 500, diamond: 2000 };
                
                if (item === 'pancingan') {
                    const curLvl = u.pancingan || 1;
                    if (curLvl >= 8) return reply("*[ 🏪 𝚂𝙷𝙾𝙿 ]*\nPancinganmu sudah level MAX (Astral Quantum)!");
                    
                    const nextRod = RODS[curLvl];
                    // Sistem Dynamic Pricing (Pajak Sultan 1% dari total duit)
                    const dynamicPrice = Math.floor(nextRod.basePrice + (u.money * 0.01)); 
                    
                    if (u.money < dynamicPrice) {
                        return reply(`*[ 🏪 𝚂𝙷𝙾𝙿 ]*\nUangmu tidak cukup! Harga ${nextRod.name} adalah *$${dynamicPrice.toLocaleString()}* (Harga Dasar + Pajak Sultan 1%).`);
                    }
                    
                    u.money -= dynamicPrice;
                    u.pancingan = curLvl + 1;
                    saveRpgDB(rpg);
                    return reply(`*[ 🎉 𝚄𝙿𝙶𝚁𝙰𝙳𝙴 𝙿𝙰𝙽𝙲𝙸𝙽𝙶𝙰𝙽 ]*\nBerhasil membeli ${nextRod.name} seharga *$${dynamicPrice.toLocaleString()}*!\nWaktu tarikan memancingmu kini semakin cepat.`);
                }

                if (!prices[item]) return reply(`*[ 🏪 𝚁𝙿𝙶 𝚂𝙷𝙾𝙿 ]*\nBarang tersedia:\n• *umpan* ($5,000)\n• *pancingan* (Ketik .shop buy pancingan)\n• *potion* ($500)\n• *diamond* ($2,000)`);
                
                const totalCost = prices[item] * count;
                if (u.money < totalCost) return reply(`*[ 🏪 𝚂𝙷𝙾𝙿 ]*\nUang tidak cukup! Butuh *$${totalCost.toLocaleString()}* untuk ${count} ${item}.`);
                
                u.money -= totalCost;
                u[item] = (u[item] || 0) + count;
                saveRpgDB(rpg);
                return reply(`*[ 🏪 𝙿𝚄𝚁𝙲𝙷𝙰𝚂𝙴 𝚂𝚄𝙲𝙲𝙴𝚂𝚂 ]*\nBerhasil membeli *${count}x ${item.toUpperCase()}* seharga *$${totalCost.toLocaleString()}*!`);
            }

            if (action === 'sell' || action === 'jual') {
                if (item === 'ikan' || item === 'all') {
                    if (!u.fishes || Object.keys(u.fishes).length === 0) return reply('*[ 🏪 𝚂𝙷𝙾𝙿 ]*\nKamu tidak punya ikan satupun di inventory!');
                    
                    let totalGain = 0;
                    let soldTxt = '';
                    
                    for (const [fId, qty] of Object.entries(u.fishes)) {
                        if (qty > 0) {
                            const fObj = fishData.find(f => f.id === fId);
                            const price = fObj ? fObj.price : 100;
                            totalGain += price * qty;
                            soldTxt += `• ${fObj ? fObj.name : fId} (x${qty}) = $${(price * qty).toLocaleString()}\n`;
                            u.fishes[fId] = 0;
                        }
                    }
                    
                    if (totalGain === 0) return reply('*[ 🏪 𝚂𝙷𝙾𝙿 ]*\nTidak ada ikan yang bisa dijual.');
                    
                    u.money += totalGain;
                    u.ikan = 0; // Reset legacy stat ikan
                    saveRpgDB(rpg);
                    
                    return reply(`*[ 🏪 𝚂𝙾𝙻𝙳 𝙰𝙻𝙻 𝙵𝙸𝚂𝙷𝙴𝚂 ]*\n\n${soldTxt}\n💰 *Total Diterima:* +$${totalGain.toLocaleString()}`);
                }
            }

            return reply(`*[ 🏪 𝙶𝚄𝚃𝚂 𝚁𝙿𝙶 𝚂𝙷𝙾𝙿 ]*\n\n*🛒 𝙱𝚄𝚈 𝙸𝚃𝙴𝙼𝚂:*\n• *${prefix}shop buy umpan <jml>* ($5,000 fixed)\n• *${prefix}shop buy pancingan* (Upgrade Tier)\n\n*💰 𝚂𝙴𝙻𝙻 𝙸𝚃𝙴𝙼𝚂:*\n• *${prefix}shop sell ikan* (Jual semua hasil tangkapan)`);
        }
        break;

        case "fishing":
        case "mancing": {
            const FISH_PATH = "./lib/database/fish.json";
            if (!fs.existsSync(FISH_PATH)) return reply(`*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\nFile \`fish.json\` belum dibuat di folder ./lib/database/!`);
            const fishData = JSON.parse(fs.readFileSync(FISH_PATH, 'utf-8'));

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
                        // CEK STATUS TRAVEL / BERLAYAR
            if (u.isTraveling) {
                if (Date.now() < u.travelEnd) {
                    const remMs = u.travelEnd - Date.now();
                    const jam = Math.floor(remMs / 3600000);
                    const menit = Math.floor((remMs % 3600000) / 60000);
                    const detik = Math.floor((remMs % 60000) / 1000);
                    return reply(`*[ ⛵ 𝚂𝙴𝙳𝙰𝙽𝙶 𝙱𝙴𝚁𝙻𝙰𝚈𝙰𝚁 ]*\nKamu masih di tengah laut menuju *${u.travelTarget}*!\nSisa waktu tempuh: *${jam > 0 ? jam + 'j ' : ''}${menit}m ${detik}s*.`);
                } else {
                    // Waktu habis, mendarat di pulau
                    u.isTraveling = false;
                    u.island = u.travelTarget;
                    saveRpgDB(rpg);
                    return reply(`*[ ⚓ 𝚃𝚁𝙰𝚅𝙴𝙻 𝚂𝙴𝙻𝙴𝚂𝙰𝙸 ]*\nKapalmu telah berlabuh di *${u.island}*! Kamu sudah bisa memancing lagi di perairan ini.`);
                }
            }
            if (!u.island) u.island = "Danau Rivera"; 
            
            // Inisialisasi awal pulau kalau belum ada
            if (!u.island) u.island = "Danau Rivera"; 
            
            const now = Date.now();
            const cd = 30000;
            if (now - (u.lastFishing || 0) < cd) {
                const rem = Math.ceil((cd - (now - u.lastFishing)) / 1000);
                return reply(`*[ 🎣 𝙵𝙸𝚂𝙷𝙸𝙽𝙶 𝙲𝙾𝙾𝙻𝙳𝙾𝚆𝙽 ]*\nTunggu *${rem}s* lagi sebelum memancing.`);
            }
            
            if ((u.umpan || 0) <= 0) {
                return reply(`*[ 🎣 𝙽𝙾 𝙱𝙰𝙸𝚃 ]*\nUmpanmu habis! Beli di *.shop buy umpan* seharga $5,000.`);
            }

            u.umpan -= 1;
            u.lastFishing = now;
            saveRpgDB(rpg); 

            // Filter ikan khusus untuk pulau saat ini
            let availableFishes = fishData.filter(f => f.island === u.island);
            if (availableFishes.length === 0) availableFishes = fishData; 

            // Gacha Ikan
            let totalWeight = availableFishes.reduce((acc, f) => acc + f.chance, 0);
            let randomNum = Math.random() * totalWeight;
            let caughtFish = availableFishes[0];
            
            for (const fish of availableFishes) {
                if (randomNum <= fish.chance) {
                    caughtFish = fish;
                    break;
                }
                randomNum -= fish.chance;
            }

            // Hitung kecepatan tarikan (Base Pancingan vs Berat Ikan)
            const curRod = u.activeRod || u.pancingan || 1;
            let baseTime = 12000 - (curRod * 1000); 
            let weightPenalty = (caughtFish.weight / 1000) * 500; 
            
            let pullTimeMs = baseTime + weightPenalty;
            if (pullTimeMs > 15000) pullTimeMs = 15000; 
            if (pullTimeMs < 1500) pullTimeMs = 1500;   

            const frames = [
                `🎣 [██░░░░░░░░] Umpan dimakan! Menggulung senar di perairan ${u.island}...`,
                `🎣 [█████░░░░░] Ikan meronta keras! Pancingan melengkung tajam...`,
                `🎣 [█████████░] Sedikit lagi terlihat permukaannya...`
            ];

            const msg = await sock.sendMessage(m.chat, { text: frames[0] }, { quoted: m });
            
            const stepTime = Math.floor(pullTimeMs / 3);
            await sleep(stepTime);
            await sock.sendMessage(m.chat, { text: frames[1], edit: msg.key });
            
            await sleep(stepTime);
            await sock.sendMessage(m.chat, { text: frames[2], edit: msg.key });
            
            await sleep(stepTime);

            // Simpan Ikan ke Inventory
            if (!u.fishes) u.fishes = {};
            u.fishes[caughtFish.id] = (u.fishes[caughtFish.id] || 0) + 1;
            u.ikan = (u.ikan || 0) + 1; 

            const expGot = Math.max(20, Math.floor(caughtFish.price / 100));
            u.exp += expGot;
            if (u.exp >= u.level * 250) u.level += 1;
            saveRpgDB(rpg);

            const resultText = `*🎉 STRIKEE!!*\nKamu berhasil menangkap ikan/hewan dari *${u.island}*!\n\n` +
                               `🐟 *${caughtFish.name}* (${caughtFish.tier})\n` +
                               `⚖️️ *Berat:* ${caughtFish.weight.toLocaleString()} Kg\n` +
                               `💰 *Harga Jual:* $${caughtFish.price.toLocaleString()}\n\n` +
                               `✨ *+${expGot} EXP* | 🪱 *Sisa Umpan:* ${u.umpan}\n\n` +
                               `💡 _Ketik *.quest* untuk menyelesaikan misi pulau, atau *.sandy* untuk beli kapal!_`;

            if (caughtFish.img) {
                await sock.sendMessage(m.chat, { text: "🎣 *Tangkapan berhasil ditarik ke darat!*", edit: msg.key });
                await sock.sendMessage(m.chat, { image: { url: caughtFish.img }, caption: resultText }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: resultText, edit: msg.key });
            }
            return;
        }
        break;
        
        case "travel":
        case "berlayar": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (!u.island) u.island = "Danau Rivera";
            if (!u.unlocked) u.unlocked = ["Danau Rivera"];

            // Master data urutan pulau untuk hitung jarak
            const ISLANDS = ["Danau Rivera", "GutS Island", "Middle Island", "Purba Island", "Magma Island", "Cosmic Island"];
            
            // Kalau lagi berlayar, cek apakah sudah sampai
            if (u.isTraveling) {
                if (Date.now() >= u.travelEnd) {
                    u.isTraveling = false;
                    u.island = u.travelTarget;
                    saveRpgDB(rpg);
                    return reply(`*[ ⚓ 𝚃𝚁𝙰𝚅𝙴𝙻 𝚂𝙴𝙻𝙴𝚂𝙰𝙸 ]*\nKapalmu telah berlabuh di *${u.island}*!`);
                } else {
                    const remMs = u.travelEnd - Date.now();
                    const jam = Math.floor(remMs / 3600000);
                    const menit = Math.floor((remMs % 3600000) / 60000);
                    const detik = Math.floor((remMs % 60000) / 1000);
                    return reply(`*[ ⛵ 𝚂𝙴𝙳𝙰𝙽𝙶 𝙱𝙴𝚁𝙻𝙰𝚈𝙰𝚁 ]*\nKamu sedang dalam perjalanan menuju *${u.travelTarget}*.\nSisa waktu: *${jam > 0 ? jam + 'j ' : ''}${menit}m ${detik}s*`);
                }
            }

            const action = (args[0] || '').toLowerCase();
            
            if (action === 'ke' || action === 'go') {
                const destIdx = parseInt(args[1]) - 1;
                if (isNaN(destIdx) || destIdx < 0 || destIdx >= u.unlocked.length) {
                    return reply(`*[ 🗺️ 𝙴𝚁𝚁𝙾𝚁 𝚃𝚁𝙰𝚅𝙴𝙻 ]*\nPilih nomor pulau yang valid dari daftar .travel!`);
                }
                
                const targetIsland = u.unlocked[destIdx];
                if (targetIsland === u.island) {
                    return reply(`*[ 🗺️ 𝙴𝚁𝚁𝙾𝚁 𝚃𝚁𝙰𝚅𝙴𝙻 ]*\nKamu sudah berada di *${u.island}*! Silakan pilih pulau lain.`);
                }
                
                // Hitung Jarak (Perbedaan Index Pulau)
                const curIdx = ISLANDS.indexOf(u.island);
                const targetDbIdx = ISLANDS.indexOf(targetIsland);
                const distance = Math.abs(targetDbIdx - curIdx) || 1;
                
                // Base Waktu per 1 Jarak (Lompat 1 Pulau) dalam milidetik
                const KAPAL_TIME = [
                    1800000, // Rakit Bambu: 30 Menit per jarak
                    900000,  // Perahu Mesin: 15 Menit
                    300000,  // Speedboat: 5 Menit
                    60000,   // Kapal Pesiar: 1 Menit
                    0        // Astral Cruiser: Instan
                ]; 
                
                const myShip = u.kapal || 0;
                const timeMs = KAPAL_TIME[myShip] * distance;
                
                if (timeMs === 0) {
                    u.island = targetIsland;
                    saveRpgDB(rpg);
                    return reply(`*[ 🛸 𝙸𝙽𝚂𝚃𝙰𝙽𝚃 𝚃𝚁𝙰𝚅𝙴𝙻 ]*\nMenggunakan Astral Cruiser, kamu melintasi dimensi dan langsung tiba di *${targetIsland}*!`);
                }
                
                u.isTraveling = true;
                u.travelTarget = targetIsland;
                u.travelEnd = Date.now() + timeMs;
                saveRpgDB(rpg);
                
                const jam = Math.floor(timeMs / 3600000);
                const menit = Math.floor((timeMs % 3600000) / 60000);
                return reply(`*[ ⛵ 𝙼𝚄𝙻𝙰𝙸 𝙱𝙴𝚁𝙻𝙰𝚈𝙰𝚁 ]*\nJangkar diangkat! Kapal berangkat dari ${u.island} menuju *${targetIsland}*!\n\n🕒 *Estimasi Tiba:* ${jam > 0 ? jam + ' jam ' : ''}${menit} menit.\n\n_Selama berlayar, kamu tidak bisa memancing. Ketik .travel untuk mengecek sisa waktu._`);
            }

            let txt = `*[ 🗺️ 𝙿𝙴𝚃𝙰 𝙳𝚄𝙽𝙸𝙰 & 𝚃𝚁𝙰𝚅𝙴𝙻 ]*\n*Lokasi Saat Ini:* ${u.island}\n\n*Pulau yang Terbuka:*\n`;
            u.unlocked.forEach((isl, i) => {
                const status = isl === u.island ? "📍 (Di Sini)" : "";
                txt += `*${i + 1}.* ${isl} ${status}\n`;
            });
            
            txt += `\n*Cara Perjalanan:*\nKetik *${prefix}travel ke <nomor>* (Contoh: *${prefix}travel ke 2*)`;
            return reply(txt);
        }
        break;

        case "quest":
        case "misi": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (!u.island) u.island = "Danau Rivera";
            if (!u.fishes) u.fishes = {};

            const quests = {
                "Danau Rivera": { npc: "Datuk", req: { lele: 15, gurame: 2 }, next: "GutS Island" },
                "GutS Island": { npc: "Kapten Barong", req: { kerapu: 20, salmon: 5 }, next: "Middle Island" },
                "Middle Island": { npc: "Ahab", req: { shark: 10, orca: 3 }, next: "Purba Island" },
                "Purba Island": { npc: "Prof. Darwin", req: { megalodon: 1 }, next: "Magma Island" },
                "Magma Island": { npc: "Ignis", req: { magmashark: 5 }, next: "Cosmic Island" },
                "Cosmic Island": { npc: "Orion", req: { cosmicwhale: 1, manta: 1 }, next: "MAX" }
            };

            const q = quests[u.island];
            if (!q) return reply("*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\nPulau tidak diketahui!");
            
            if (q.next === "MAX") {
                return reply(`*[ 🌌 𝚀𝚄𝙴𝚂𝚃 𝙲𝙾𝚂𝙼𝙸𝙲 ]*\nNPC Orion: "Kamu telah menaklukkan seluruh lautan dan dimensi. Tidak ada misi lagi untukmu, Lord of the Sea!"`);
            }

            const action = (args[0] || '').toLowerCase();
            
               if (action === 'finish' || action === 'selesai') {
                let cukup = true;
                let kurangTxt = '';
                
                for (const [fId, qty] of Object.entries(q.req)) {
                    const myQty = u.fishes[fId] || 0;
                    if (myQty < qty) {
                        cukup = false;
                        kurangTxt += `• ${fId.toUpperCase()} (Kurang ${qty - myQty})\n`;
                    }
                }
                
                if (!cukup) {
                    return reply(`*[ 📜 𝚀𝚄𝙴𝚂𝚃 𝙱𝙴𝙻𝚄𝙼 𝚂𝙴𝙻𝙴𝚂𝙰𝙸 ]*\nNPC ${q.npc} berkata: "Ikan tangkapanmu belum cukup anak muda!"\n\n*Kekurangan:*\n${kurangTxt}`);
                }
                
                // Ambil ikannya
                for (const [fId, qty] of Object.entries(q.req)) {
                    u.fishes[fId] -= qty;
                }
                
                // TAMBAHAN: Masukkan pulau ke daftar Unlocked
                if (!u.unlocked) u.unlocked = ["Danau Rivera"];
                if (!u.unlocked.includes(q.next)) u.unlocked.push(q.next);

                u.island = q.next;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝚀𝚄𝙴𝚂𝚃 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳! ]*\nNPC ${q.npc} mengambil ikanmu dan memberimu peta baru!\n\n🗺️ *Pulau Terbuka:* ${q.next}\n\nSekarang ikan yang kamu tangkap akan berubah. Ketik *.sandy* jika kamu butuh kapal yang lebih cepat untuk menjelajah, atau *.travel* untuk mengecek peta!`);
            }

            let reqTxt = '';
            for (const [fId, qty] of Object.entries(q.req)) {
                const myQty = u.fishes[fId] || 0;
                reqTxt += `• ${fId.toUpperCase()}: ${myQty} / ${qty}\n`;
            }

            return reply(
                `*[ 📜 𝚀𝚄𝙴𝚂𝚃 ${u.island.toUpperCase()} ]*\n` +
                `*NPC:* ${q.npc}\n\n` +
                `"Kumpulkan monster air ini untuk mendapatkan akses ke lautan berikutnya!"\n\n` +
                `*Progress Misi:*\n${reqTxt}\n` +
                `_Ketik *.quest finish* jika semua ikan di atas sudah terkumpul._`
            );
        }
        break;

        case "sandy":
        case "kapal":
        case "perahu": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const action = (args[0] || '').toLowerCase();
            
            const KAPAL = [
                { id: 0, name: "🛶 Rakit Bambu", price: 0, speed: "60 Menit" },
                { id: 1, name: "🚤 Perahu Mesin", price: 500000, speed: "30 Menit" },
                { id: 2, name: "🛥️ Speedboat", price: 5000000, speed: "15 Menit" },
                { id: 3, name: "🛳️ Kapal Pesiar", price: 50000000, speed: "5 Menit" },
                { id: 4, name: "🛸 Astral Cruiser", price: 1000000000, speed: "Instan (0 Detik)" }
            ];

            const currentKapal = u.kapal || 0;

            if (action === 'buy' || action === 'beli') {
                if (currentKapal >= 4) return reply("*[ ⛵ 𝚃𝙾𝙺𝙾 𝚂𝙰𝙽𝙳𝚈 ]*\nSandy: 'Kapalmu sudah mentok bos! Astral Cruiser adalah yang tercepat di galaksi.'");
                
                const nextK = KAPAL[currentKapal + 1];
                // Pajak Sultan: Harga Asli + 1% Total Duit Player (Dynamic Pricing)
                const dynPrice = Math.floor(nextK.price + (u.money * 0.01)); 
                
                if (u.money < dynPrice) {
                    return reply(`*[ ⛵ 𝚃𝙾𝙺𝙾 𝚂𝙰𝙽𝙳𝚈 ]*\nSandy: 'Uangmu kurang bos! Harga ${nextK.name} itu *$${dynPrice.toLocaleString()}* (Sudah termasuk pajak kekayaanmu)!'`);
                }
                
                u.money -= dynPrice;
                u.kapal = currentKapal + 1;
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙺𝙰𝙿𝙰𝙻 𝙱𝙰𝚁𝚄 ]*\nSandy: 'Makasih banyak bos! Sekarang kamu resmi memiliki *${nextK.name}*. Perjalanan antar pulau bakal jauh lebih cepat!'`);
            }

            let listTxt = `*[ ⛵ 𝚃𝙾𝙺𝙾 𝙺𝙰𝙿𝙰𝙻 𝚂𝙰𝙽𝙳𝚈 ]*\n"Halo pelaut! Mau upgrade kapal biar nyebrang pulau makin instan?"\n\n*Kapalmu Saat Ini:* ${KAPAL[currentKapal].name}\n\n*Daftar Kapal:*\n`;
            
            KAPAL.forEach((k, i) => {
                let stat = "";
                if (currentKapal >= i) {
                    stat = "✅ Dimiliki";
                } else if (currentKapal + 1 === i) {
                    const dynPrice = Math.floor(k.price + (u.money * 0.01));
                    stat = `Harga: $${dynPrice.toLocaleString()}`;
                } else {
                    stat = "🔒 Terkunci";
                }
                listTxt += `• *${k.name}*\n  Kecepatan: ${k.speed} | Status: ${stat}\n`;
            });
            
            listTxt += `\nKetik *.sandy buy* untuk meng-upgrade ke kapal berikutnya!`;
            return reply(listTxt);
        }
        break;
        
               case "road": // Typo handler wkwk
        case "rod":
        case "pancingan": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            
            const RODS = [
                "Tidak Ada", 
                "🪵 Kayu Lapuk", 
                "🎋 Bambu Lentur", 
                "🎣 Fiber Standar", 
                "🖤 Karbon Elit", 
                "⚙️️ Titanium Alloy", 
                "🦴 Leviathan Bone", 
                "🌋 Magma Forged", 
                "🌌 Astral Quantum"
            ];

            const maxRod = u.pancingan || 1;
            let activeRod = u.activeRod || maxRod;

            const action = (args[0] || '').toLowerCase();
            
            if (action === 'equip' || action === 'pakai') {
                const rodIdx = parseInt(args[1]);
                if (isNaN(rodIdx) || rodIdx < 1 || rodIdx > maxRod) {
                    return reply(`*[ 🎣 𝙴𝚁𝚁𝙾𝚁 ]*\nPilih pancingan dari 1 sampai ${maxRod} yang kamu miliki!`);
                }
                u.activeRod = rodIdx;
                saveRpgDB(rpg);
                return reply(`*[ 🎣 𝙿𝙰𝙽𝙲𝙸𝙽𝙶𝙰𝙽 𝙳𝙸𝙿𝙰𝙺𝙰𝙸 ]*\nSekarang kamu memancing menggunakan: *${RODS[rodIdx]}*!`);
            }

            let listTxt = `*[ 🎣 𝙺𝙾𝙻𝙴𝙺𝚂𝙸 𝙿𝙰𝙽𝙲𝙸𝙽𝙶𝙰𝙽 ]*\n"Pilih joran andalanmu untuk turun ke laut, Pelaut!"\n\n`;
            
            const rows = [];
            for (let i = 1; i <= maxRod; i++) {
                const isEquipped = i === activeRod ? "✅ (Sedang Dipakai)" : "";
                listTxt += `• *${i}. ${RODS[i]}* ${isEquipped}\n`;
                
                if (i !== activeRod) {
                    rows.push({
                        header: "",
                        title: `Pakai ${RODS[i].split(" ")[1] || "Pancingan"}`,
                        description: `Gunakan pancingan tier ${i}`,
                        id: `${prefix}rod equip ${i}`
                    });
                }
            }
            
            listTxt += `\n_Gunakan tombol di bawah untuk mengganti pancingan!_`;

            if (rows.length > 0) {
                try {
                    const interactiveMsg = {
                        body: { text: listTxt },
                        footer: { text: "GutS | MD Fishing System" },
                        header: { hasMediaAttachment: false },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "🎣 Pilih Pancingan",
                                        sections: [
                                            {
                                                title: "Daftar Koleksimu",
                                                rows: rows
                                            }
                                        ]
                                    })
                                }
                            ],
                            messageParamsJson: "{}"
                        }
                    };

                    const genMsg = generateWAMessageFromContent(m.chat, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                interactiveMessage: interactiveMsg
                            }
                        }
                    }, { userJid: m.chat, quoted: m });

                    return await sock.relayMessage(m.chat, genMsg.message, { messageId: genMsg.key.id });
                } catch (e) {
                    // Fallback kalau WA-nya nggak dukung tombol interaktif
                    return reply(listTxt + `\n\n*Ketik:* \`${prefix}rod equip <nomor>\` untuk memilih.`);
                }
            } else {
                return reply(listTxt);
            }
        }
        break;

        case "daily":
        case "claim": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const now = Date.now();
            const oneDay = 86400000;

            let baseCap = u.limitCapacity || 50;
            let maxLimit = baseCap + ((u.rebirth || 0) * 50);

            if (now - (u.lastDaily || 0) < oneDay) {
                const remMs = oneDay - (now - u.lastDaily);
                const jam = Math.floor(remMs / 3600000);
                const menit = Math.floor((remMs % 3600000) / 60000);
                return reply(`*[ ⏳ 𝙳𝙰𝙸𝙻𝚈 𝙲𝙻𝙰𝙸𝙼 ]*\nKamu sudah klaim hari ini! Tunggu *${jam} jam ${menit} menit* lagi.\n*Sisa Limit Saat Ini:* 🎟️ ${u.limit} / ${maxLimit}`);
            }

            u.lastDaily = now;
            u.limit = maxLimit; // Isi full sesuai kapasitas maksimalnya
            u.money += 5000;
            u.exp += 200;
            saveRpgDB(rpg);

            return reply(`*[ 🎁 𝙳𝙰𝙸𝙻𝚈 𝙲𝙻𝙰𝙸𝙼 𝚂𝚄𝙲𝙲𝙴𝚂𝚂 ]*\nSelamat @${m.sender.split('@')[0]}, kamu berhasil klaim harian:\n• 🎟️ *Limit:* Diisi ulang menjadi *50 Limit*\n• 💵 *Money:* +$5,000\n• ✨ *EXP:* +200 EXP`);
        }
        break;

        case "tf":
        case "transfer": {
            const target = getTargetUser(m, args, participants, sock, botNumber);
            const nonTagArgs = args.filter(a => !a.includes('@') && !(a.replace(/[^0-9]/g, '').length >= 10 && /^(62|08)/.test(a.replace(/[^0-9]/g, ''))));
            const amount = parseInt(nonTagArgs[nonTagArgs.length - 1]);

            if (!target || isSameUser(target, m.sender, participants) || !amount || amount <= 0) {
                return reply(`*[ 💸 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 𝙼𝙾𝙽𝙴𝚈 ]*\n𝚄𝚜𝚊𝚐𝚎: *${prefix}tf @user <jumlah>*\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: *${prefix}tf @user 1000000*`);
            }
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const t = initUserRpg(rpg, target);

            // Tarik saldo terbaru dari Web terlebih dahulu agar tidak tertimpa
            await pullWebCryptoIfNewer(m.sender, rpg, u);
            await pullWebCryptoIfNewer(target, rpg, t);

            if (u.money < amount) {
                return reply(`*[ 💸 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 𝙵𝙰𝙸𝙻𝙴𝙳 ]*\nUang kamu tidak cukup! (Money kamu: *$${u.money.toLocaleString()}*)`);
            }
            u.money -= amount;
            t.money += amount;
            saveRpgDB(rpg);

            await syncUserToFirebase(m.sender, u, { username: pushname });
            await syncUserToFirebase(target, t);

            return sock.sendMessage(m.chat, {
                text: `*[ 💸 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 𝚂𝚄𝙲𝙲𝙴𝚂𝚂 ]*\n• *Pengirim:* @${m.sender.split('@')[0]}\n• *Penerima:* @${target.split('@')[0]}\n• *Nominal:* $${amount.toLocaleString()}`,
                mentions: [m.sender, target]
            }, { quoted: m });
        }
        break;

        case "topglobal":
        case "leaderboard": {
            const rpg = getRpgDB();
            const sorted = Object.entries(rpg)
                .map(([jid, data]) => ({ jid, ...data }))
                .sort((a, b) => (b.money || 0) - (a.money || 0))
                .slice(0, 10);

            if (sorted.length === 0) return reply('*[ 🏆 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 ]*\nBelum ada data pemain RPG.');

            try {
                const rows = [["Rank", "User", "Level", "Money ($)"]];
                sorted.forEach((u, i) => {
                    rows.push([`#${i + 1}`, u.jid.split('@')[0], `Lv.${u.level || 1}`, `$${(u.money || 0).toLocaleString()}`]);
                });

                await sock.sendMessage(m.chat, {
                    disclaimerText: applyUserFont("GutS RPG Leaderboard", m.sender),
                    headerText: applyUserFont("## 🏆 TOP 10 GLOBAL SULTAN", m.sender),
                    contentText: "---",
                    title: applyUserFont("Global Wealth Ranking", m.sender),
                    table: rows,
                    footerText: applyUserFont("GutS | MD Economy System", m.sender)
                }, { quoted: m });
            } catch (e) {
                const txt = sorted.map((u, i) => `${i + 1}. @${u.jid.split('@')[0]} — *$${(u.money || 0).toLocaleString()}* (Lv.${u.level || 1})`).join('\n');
                await sock.sendMessage(m.chat, {
                    text: `*[ 🏆 𝚃𝙾𝙿 𝟷𝟶 𝚁𝙸𝙲𝙷𝙴𝚂𝚃 ]*\n\n${txt}`,
                    mentions: sorted.map(u => u.jid)
                }, { quoted: m });
            }
        }
        break;

        case "ffstalk":
        case "stalkff": {
            const uid = args[0]?.replace(/[^0-9]/g, '');
            if (!uid) {
                return reply(`*[ 𝙵𝚁𝙴𝙴 𝙵𝙸𝚁𝙴 𝚂𝚃𝙰𝙻𝙺 ]*\nUsage: *${prefix}${command} <UID Free Fire>*\nContoh: *${prefix}${command} 1531107934*`);
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
                const res = await ffstalk(uid);
                const p = res.player;

                const fmtTime = (ts) => {
                    if (!ts) return '-';
                    const ms = Number(ts) < 1e12 ? Number(ts) * 1000 : Number(ts);
                    return isNaN(ms) ? String(ts) : new Date(ms).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
                };

                const caption =
                    `*[ 𝙵𝚁𝙴𝙴 𝙵𝙸𝚁𝙴 𝙿𝙻𝙰𝚈𝙴𝚁 𝚂𝚃𝙰𝙻𝙺 ]*\n\n` +
                    `╭─〔 *👤 𝙸𝙽𝙵𝙾 𝙰𝙺𝚄𝙽* 〕\n` +
                    `│ • *Nickname:* ${p.nickname || '-'}\n` +
                    `│ • *UID:* \`${p.uid || uid}\`\n` +
                    `│ • *Region:* ${p.region || '-'}\n` +
                    `│ • *Level:* ${p.level ?? '-'} (✨ ${(p.exp || 0).toLocaleString()} EXP)\n` +
                    `│ • *Likes:* ❤️ ${(p.liked || 0).toLocaleString()}\n` +
                    `│ • *Prime Level:* ${p.primeLevel ?? '-'}\n` +
                    `│ • *Booyah Pass:* ${p.hasElitePass ? '✅ Aktif' : '❌ Tidak'}\n` +
                    `│ • *Dibuat:* ${fmtTime(p.createdAt)}\n` +
                    `│ • *Login Terakhir:* ${fmtTime(p.lastLoginAt)}\n` +
                    `╰──────────────\n` +
                    `╭─〔 *🏆 𝚁𝙰𝙽𝙺 & 𝙴𝚀𝚄𝙸𝙿𝙼𝙴𝙽𝚃* 〕\n` +
                    `│ • *BR Rank:* ${p.rank ?? '-'} (${(p.rankingPoints || 0).toLocaleString()} Pts)\n` +
                    `│ • *CS Rank:* ${p.csRank ?? '-'}\n` +
                    `│ • *Karakter:* ${p.character?.name || '-'}\n` +
                    `│ • *Avatar:* ${p.avatar_item?.name || '-'}\n` +
                    `│ • *Banner:* ${p.banner?.name || '-'}\n` +
                    `╰──────────────\n` +
                    (p.pet ?
                    `╭─〔 *🐾 𝙿𝙴𝚃 𝙸𝙽𝙵𝙾* 〕\n` +
                    `│ • *Nama Pet:* ${p.pet.name || p.pet.species || '-'} (Lv.${p.pet.level ?? '-'})\n` +
                    `│ • *Skin:* ${p.pet.skinName || '-'}\n` +
                    `│ • *Skill:* ${p.pet.skillName || '-'}\n` +
                    `╰──────────────\n` : '') +
                    `╭─〔 *🛡️ 𝚂𝚃𝙰𝚃𝚄𝚂 & 𝙱𝙸𝙾* 〕\n` +
                    `│ • *Status Ban:* ${p.ban?.isBanned ? `🚫 BANNED (${p.ban.status || ''})` : '🟢 Safe (Clean)'}\n` +
                    `│ • *Signature:* ${p.signature || '-'}\n` +
                    `╰──────────────`;

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

                if (p.avatar && p.avatar.startsWith('http')) {
                    await sock.sendMessage(m.chat, {
                        image: { url: p.avatar },
                        caption
                    }, { quoted: m }).catch(async () => {
                        await reply(caption);
                    });
                } else {
                    await reply(caption);
                }
            } catch (e) {
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙵𝚂𝚃𝙰𝙻𝙺 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── EKSKLUSIF @ITSLIAAA/BAILEYS ──
        case "upch":
        case "swgrup": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nFitur Group Status hanya bisa digunakan di dalam grup!');
            if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\nKhusus Admin Grup!');

            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            if (!/image|video/.test(targetMime)) {
                return reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝚂𝚃𝙰𝚃𝚄𝚂 ]*\nKirim atau reply gambar/video dengan caption *${prefix}${command} [teks]*`);
            }

            try {
                const isVid = /video/.test(targetMime);
                const stream = await downloadContentFromMessage(targetNode, isVid ? 'video' : 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                await sock.sendMessage(m.chat, {
                    [isVid ? 'video' : 'image']: buffer,
                    caption: text || targetNode.caption || 'TURUNKAN PRABOWO',
                    groupStatus: true
                });
                return reply('*[ ✅ 𝙶𝚁𝙾𝚄𝙿 𝚂𝚃𝙰𝚃𝚄𝚂 𝚄𝙿𝙻𝙾𝙰𝙳𝙴𝙳 ]*\nMedia berhasil diunggah ke Status Grup!');
            } catch (e) {
                reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝚂𝚃𝙰𝚃𝚄𝚂 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "stickerpack":
        case "spack": {
            const packQuery = text || 'anime meme';
            try {
                const pins = await scrapePinterest(packQuery);
                if (!Array.isArray(pins) || pins.length === 0) {
                    return reply('*[ 📦 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙿𝙰𝙲𝙺 ]*\nGambar untuk stiker pack tidak ditemukan.');
                }

                const webpBuffers = [];
                const selected = pins.sort(() => Math.random() - 0.5).slice(0, 6);
                for (const item of selected) {
                    if (!item.image) continue;
                    try {
                        const imgRes = await axios.get(item.image, {
                            responseType: 'arraybuffer',
                            timeout: 12000,
                            headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://id.pinterest.com/' }
                        });
                        const webp = await sharp(Buffer.from(imgRes.data))
                            .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                            .webp({ quality: 80 })
                            .toBuffer();
                        webpBuffers.push(webp);
                    } catch (_) {}
                }

                if (webpBuffers.length === 0) return reply('*[ 📦 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙿𝙰𝙲𝙺 ]*\nGagal merender stiker pack.');

                await sock.sendMessage(m.chat, {
                    cover: webpBuffers[0],
                    stickers: webpBuffers.map(buf => ({ data: buf })),
                    name: `📦 ${packQuery.toUpperCase()} PACK`,
                    publisher: global.botname || '𝔊𝔲𝔱𝔖 | 𝙼𝙳',
                    description: 'Generated by GutS | MD'
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙿𝙰𝙲𝙺 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "spoiler": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';

            if (/image|video/.test(targetMime)) {
                try {
                    const isVid = /video/.test(targetMime);
                    const stream = await downloadContentFromMessage(targetNode, isVid ? 'video' : 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                    return await sock.sendMessage(m.chat, {
                        [isVid ? 'video' : 'image']: buffer,
                        caption: text || targetNode.caption || '❔ Spoiler Media',
                        spoiler: true
                    }, { quoted: m });
                } catch (e) {
                    return reply(`*[ 𝚂𝙿𝙾𝙸𝙻𝙴𝚁 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
                }
            }
            return reply(`*[ 📑 𝚂𝙿𝙾𝙸𝙻𝙴𝚁 ]*\nKirim atau reply gambar/video dengan *${prefix}spoiler [caption]*`);
        }
        break;

        case "cekid":
        case "findid": {
            const target = getTargetUser(m, args, participants) || m.sender;
            try {
                const ids = await sock.findUserId(target);
                return reply(`*[ 🏷️ 𝚄𝚂𝙴𝚁 𝙸𝙳 𝙸𝙽𝙵𝙾 ]*\n• *Target:* @${target.split('@')[0]}\n• *Phone JID:* ${ids?.phoneNumber || target}\n• *LID:* ${ids?.lid || 'Tidak terdeteksi'}`);
            } catch (e) {
                return reply(`*[ 🏷️ 𝚄𝚂𝙴𝚁 𝙸𝙳 𝙸𝙽𝙵𝙾 ]*\n• *JID:* ${target}`);
            }
        }
        break;

          case "tourl": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            if (!/image|video|audio|webp/.test(targetMime)) {
                return reply(`*[ 🌐 𝚃𝙾 𝚄𝚁𝙻 ]*\nReply gambar, stiker, video, atau audio dengan *${prefix}tourl*`);
            }
            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
                const mType = /video/.test(targetMime) ? 'video' : /audio/.test(targetMime) ? 'audio' : /webp/.test(targetMime) ? 'sticker' : 'image';
                const stream = await downloadContentFromMessage(targetNode, mType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                const ext = /video/.test(targetMime) ? 'mp4' : /audio/.test(targetMime) ? 'mp3' : /webp/.test(targetMime) ? 'webp' : 'jpg';
                const fileName = `guts_${Date.now()}.${ext}`;
                const mimeType = targetMime || 'application/octet-stream';
                const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

                let uploadedUrl = null;

                try {
                    const boundary = '----GutSUploadBoundary' + Date.now();
                    const header = `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
                    const footer = `\r\n--${boundary}--\r\n`;
                    const bodyBuf = Buffer.concat([Buffer.from(header, 'utf-8'), buffer, Buffer.from(footer, 'utf-8')]);

                    const res = await axios.post('https://catbox.moe/user/api.php', bodyBuf, {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${boundary}`,
                            'Content-Length': bodyBuf.length,
                            'User-Agent': ua
                        },
                        maxBodyLength: Infinity,
                        maxContentLength: Infinity,
                        timeout: 20000
                    });
                    if (res.data && String(res.data).startsWith('http')) {
                        uploadedUrl = String(res.data).trim();
                    }
                } catch (_) {}

                if (!uploadedUrl) {
                    try {
                        const boundary = '----GutSUguuBoundary' + Date.now();
                        const header = `--${boundary}\r\nContent-Disposition: form-data; name="files[]"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
                        const footer = `\r\n--${boundary}--\r\n`;
                        const bodyBuf = Buffer.concat([Buffer.from(header, 'utf-8'), buffer, Buffer.from(footer, 'utf-8')]);

                        const resUguu = await axios.post('https://uguu.se/upload', bodyBuf, {
                            headers: {
                                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                                'Content-Length': bodyBuf.length,
                                'User-Agent': ua
                            },
                            timeout: 20000
                        });
                        const uguuUrl = resUguu.data?.files?.[0]?.url;
                        if (uguuUrl) uploadedUrl = uguuUrl.trim();
                    } catch (_) {}
                }

                if (!uploadedUrl) {
                    const boundary = '----GutSTmpBoundary' + Date.now();
                    const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
                    const footer = `\r\n--${boundary}--\r\n`;
                    const bodyBuf = Buffer.concat([Buffer.from(header, 'utf-8'), buffer, Buffer.from(footer, 'utf-8')]);

                    const resTmp = await axios.post('https://tmpfiles.org/api/v1/upload', bodyBuf, {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${boundary}`,
                            'Content-Length': bodyBuf.length,
                            'User-Agent': ua
                        },
                        timeout: 20000
                    });
                    const rawTmpUrl = resTmp.data?.data?.url;
                    if (rawTmpUrl) {
                        uploadedUrl = rawTmpUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
                    }
                }

                if (!uploadedUrl) {
                    return reply('*[ 𝚃𝙾𝚄𝚁𝙻 𝙴𝚁𝚁𝙾𝚁 ]*\nGagal mengunggah media ke server uploader.');
                }

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                return reply(`*[ 🌐 𝙼𝙴𝙳𝙸𝙰 𝚃𝙾 𝚄𝚁𝙻 ]*\n• *URL:* ${uploadedUrl}\n• *Size:* ${(buffer.length / 1024).toFixed(2)} KB`);
            } catch (e) {
                reply(`*[ 𝚃𝙾𝚄𝚁𝙻 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

            // ── MOBILE LEGENDS BUILD & META STATS ──
        case "mlbuild":
        case "buildml": {
            if (!text) {
                return reply(
                    `*[ ⚔️ 𝙼𝙻𝙱𝙱 𝙱𝚄𝙸𝙻𝙳 & 𝙼𝙴𝚃𝙰 ]*\n` +
                    `Usage: *${prefix}${command} <nama hero>*\n` +
                    `Contoh:\n` +
                    `• *${prefix}${command} Ling*\n` +
                    `• *${prefix}${command} Fanny*`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
                const data = await mlbuild(text, 3);
                const h = data.hero;
                const t = h.tier;

                const rolesStr = Array.isArray(h.roles) ? h.roles.join(', ') : (h.roles || '-');
                const countersStr = data.counters.length > 0 ? data.counters.slice(0, 6).join(', ') : '-';
                const synergiesStr = data.synergies.length > 0 ? data.synergies.slice(0, 6).join(', ') : '-';

                let caption =
                    `*[ ⚔️ 𝙼𝙻𝙱𝙱 𝙷𝙴𝚁𝙾 𝙱𝚄𝙸𝙻𝙳 & 𝙼𝙴𝚃𝙰 ]*\n\n` +
                    `╭─〔 *𝙷𝙴𝚁𝙾 𝙸𝙽𝙵𝙾* 〕\n` +
                    `│ • *Hero:* ${h.name} ${h.title ? `(${h.title})` : ''}\n` +
                    `│ • *Role:* ${rolesStr}\n`;

                if (t) {
                    caption +=
                        `│ • *Meta Tier:* *${t.tier || '-'}* (Rank #${t.rank_position ?? '-'})\n` +
                        `│ • *Win Rate:* ${t.win_rate ?? '-'}%\n` +
                        `│ • *Pick Rate:* ${t.pick_rate ?? '-'}%\n` +
                        `│ • *Ban Rate:* ${t.ban_rate ?? '-'}%\n`;
                }

                caption +=
                    `│ • *Counter:* ${countersStr}\n` +
                    `│ • *Sinergi:* ${synergiesStr}\n` +
                    `╰──────────────\n\n`;

                if (data.builds.length === 0) {
                    caption += `_Belum ada rekomendasi build publik untuk hero ini._`;
                } else {
                    data.builds.forEach((b) => {
                        const itemNames = b.items.map(x => x.name).join(' ➔ ') || '-';
                        const condNames = b.conditional_items.map(x => x.name).join(', ') || '-';
                        const talentNames = b.emblem_attrs.map(x => x.name).join(', ') || '-';

                        caption +=
                            `╭─〔 *🛠️ 𝙱𝚄𝙸𝙻𝙳 #${b.rank}: ${b.title || 'Top Build'}* 〕\n` +
                            `│ ❤️ *Likes:* ${b.likes ?? 0} ${b.patch ? `| *Patch:* ${b.patch}` : ''}\n` +
                            `│ 🗡️ *Items:* ${itemNames}\n` +
                            (b.conditional_items.length > 0 ? `│ 🔄 *Situasional:* ${condNames}\n` : '') +
                            `│ ⚡ *Spell:* ${b.battle_spell?.name || '-'}\n` +
                            `│ 🛡️ *Emblem:* ${b.emblem?.name || '-'}\n` +
                            `│ ✨ *Talents:* ${talentNames}\n` +
                            `╰──────────────\n\n`;
                    });
                }

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

                if (h.image && h.image.startsWith('http')) {
                    await sock.sendMessage(m.chat, {
                        image: { url: h.image },
                        caption: caption.trim()
                    }, { quoted: m }).catch(async () => {
                        await reply(caption.trim());
                    });
                } else {
                    await reply(caption.trim());
                }
            } catch (e) {
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙼𝙻𝙱𝚄𝙸𝙻𝙳 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

                // ── SLOT, COINFLIP, & BELI LIMIT ──
        
        case "stop":
        case "cashout": {
            return reply(`*[ 👨‍🚀 𝚂𝙿𝙰𝙲𝙴𝙼𝙰𝙽 ]*\nKamu tidak sedang menerbangkan roket! Ketik *${prefix}spaceman <taruhan>* untuk mulai.`);
        }
        break;

        case "gutsrocket":
        case "spaceman":
        case "crash": {
            if (spacemanSessions[m.sender]?.active) {
                return reply(`*[ 🚀 𝙶𝚄𝚃𝚂 𝚁𝙾𝙲𝙺𝙴𝚃 ]*\nRoketmu sedang terbang! Cepat ketik *${prefix}stop* atau *stop* untuk mencairkan uangmu!`);
            }

            const bet = parseInt(args[0]);
            if (!bet || bet < 200) {
                const helpText = `*[ 🚀 𝙶𝚄𝚃𝚂 𝚁𝙾𝙲𝙺𝙴𝚃 𝙲𝚁𝙰𝚂𝙷 𝙶𝙰𝙼𝙴 ]*\n` +
                    `Usage: *${prefix}gutsrocket <taruhan>* (Min. $200)\n` +
                    `Contoh: *${prefix}gutsrocket 10000*\n\n` +
                    `*Cara Main:*\n` +
                    `1. Roket akan meluncur dari *1.00x* dan terus naik.\n` +
                    `2. Ketik *${prefix}stop* atau *stop* kapan saja sebelum roket meledak!\n` +
                    `3. Jika telat ketik stop saat roket meledak, taruhanmu hangus!\n\n` +
                    `_Ingin main dengan lebih stabil dan seru? Mainkan versi Webnya lewat tombol di bawah!_`;

                try {
                    const interactiveMsg = {
                        body: { text: helpText },
                        footer: { text: "GutS | MD" },
                        header: { hasMediaAttachment: false },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "🌐 Visit Website",
                                        url: "https://guts-rocket-17.vercel.app",
                                        merchant_url: "https://guts-rocket-17.vercel.app"
                                    })
                                }
                            ],
                            messageParamsJson: "{}"
                        }
                    };

                    const genMsg = generateWAMessageFromContent(m.chat, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                interactiveMessage: interactiveMsg
                            }
                        }
                    }, { userJid: m.chat, quoted: m });

                    return await sock.relayMessage(m.chat, genMsg.message, { messageId: genMsg.key.id });
                } catch (e) {
                    // Fallback jika WA user belum support tombol interaktif
                    return reply(helpText + '\n\n🌐 *Website:* https://guts-rocket-17.vercel.app');
                }
            }

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) {
                return reply(`*[ 🚀 𝙶𝚄𝚃𝚂 𝚁𝙾𝙲𝙺𝙴𝚃 ]*\nUangmu tidak cukup untuk taruhan *$${bet.toLocaleString()}*! (Saldo: *$${u.money.toLocaleString()}*)`);
            }

            u.money -= bet;
            saveRpgDB(rpg);

            const roll = Math.random();
            let crashPoint = 1.05;
            if (roll < 0.12) {
                crashPoint = Number((1.00 + Math.random() * 0.15).toFixed(2));
            } else if (roll < 0.65) {
                crashPoint = Number((1.20 + Math.random() * 1.40).toFixed(2));
            } else if (roll < 0.90) {
                crashPoint = Number((2.65 + Math.random() * 2.85).toFixed(2));
            } else {
                crashPoint = Number((5.60 + Math.random() * 9.40).toFixed(2));
            }

            const buildSpacemanUI = (mult, step) => {
                const trails = '░'.repeat(Math.min(10, step));
                const potential = Math.floor(bet * mult);
                return (
                    `*[ 🚀 𝙶𝚄𝚃𝚂 𝚁𝙾𝙲𝙺𝙴𝚃 𝙻𝙸𝚅𝙴 𝙵𝙻𝙸𝙶𝙷𝚃 ]*\n` +
                    `╭────────────────────╮\n` +
                    `│  🌌  ✨     🪐      │\n` +
                    `│  ${trails}🚀 *${mult.toFixed(2)}x*  │\n` +
                    `│  💵 *$${potential.toLocaleString()}*       │\n` +
                    `╰────────────────────╯\n` +
                    `• *Pilot:* @${m.sender.split('@')[0]}\n` +
                    `• *Taruhan:* $${bet.toLocaleString()}\n\n` +
                    `⚡ *Ketik \`${prefix}stop\` atau \`stop\` SEKARANG sebelum meledak!*`
                );
            };

            const sentMsg = await sock.sendMessage(m.chat, {
                text: buildSpacemanUI(1.00, 1),
                mentions: [m.sender]
            }, { quoted: m });

            spacemanSessions[m.sender] = {
                active: true,
                cashedOut: false,
                bet,
                currentMult: 1.00,
                crashPoint,
                chat: m.chat,
                msgKey: sentMsg.key,
                step: 1,
                interval: null
            };

            const spSession = spacemanSessions[m.sender];
            spSession.interval = setInterval(async () => {
                if (!spacemanSessions[m.sender] || !spSession.active || spSession.cashedOut) {
                    clearInterval(spSession.interval);
                    return;
                }

                const increment = spSession.currentMult < 2 ? 0.22 : spSession.currentMult < 4 ? 0.45 : 0.85;
                const nextMult = Number((spSession.currentMult + increment + (Math.random() * 0.08)).toFixed(2));
                spSession.step += 1;

                if (nextMult >= spSession.crashPoint) {
                    clearInterval(spSession.interval);
                    spSession.active = false;
                    const finalCrash = spSession.crashPoint;
                    delete spacemanSessions[m.sender];

                    const crashUI =
                        `*[ 💥 𝙶𝚄𝚃𝚂 𝚁𝙾𝙲𝙺𝙴𝚃 𝙲𝚁𝙰𝚂𝙷𝙴𝙳! ]*\n` +
                        `╭────────────────────╮\n` +
                        `│  🌌  ✨     🪐      │\n` +
                        `│     💥🔥 *${finalCrash.toFixed(2)}x*     │\n` +
                        `│  💀 *TARUHAN HANGUS* │\n` +
                        `╰────────────────────╯\n` +
                        `• *Pilot:* @${m.sender.split('@')[0]}\n` +
                        `• *Meledak di:* *${finalCrash.toFixed(2)}x*\n` +
                        `• *Kerugian:* -$${bet.toLocaleString()}\n\n` +
                        `_Kamu terlambat mengetik stop! Roket keburu meledak._`;

                    await sock.sendMessage(m.chat, { text: crashUI, edit: sentMsg.key, mentions: [m.sender] }).catch(async () => {
                        await sock.sendMessage(m.chat, { text: crashUI, mentions: [m.sender] }, { quoted: m });
                    });
                } else {
                    spSession.currentMult = nextMult;
                    await sock.sendMessage(m.chat, {
                        text: buildSpacemanUI(spSession.currentMult, spSession.step),
                        edit: sentMsg.key,
                        mentions: [m.sender]
                    }).catch(() => {});
                }
            }, 1600);
        }
        break;

        case "bj":
        case "blackjack": {
            if (blackjackSessions[m.sender]) {
                return reply(`*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 ]*\nKamu masih punya sesi kartu yang belum selesai! Ketik *hit* (tambah kartu) atau *stand* (tahan).`);
            }
            const bet = parseInt(args[0]);
            if (!bet || bet < 200) {
                return reply(`*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 𝟸𝟷 ]*\nUsage: *${prefix}bj <taruhan>* (Min. $200)\nContoh: *${prefix}bj 5000*`);
            }

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) {
                return reply(`*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 ]*\nUangmu tidak cukup untuk taruhan *$${bet.toLocaleString()}*! (Saldo: *$${u.money.toLocaleString()}*)`);
            }

            u.money -= bet;
            const playerHand = [drawCard(), drawCard()];
            const dealerHand = [drawCard(), drawCard()];
            const pScore = calcHand(playerHand);

            if (pScore === 21) {
                const winBJ = Math.floor(bet * 2.5);
                u.money += winBJ;
                u.exp += 100;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🃏 NATURAL BLACKJACK 21! ]*\n` +
                    `• *Kartumu:* ${playerHand.map(c => c.label).join(' ')} (*21*)\n` +
                    `• *Bandar:* ${dealerHand.map(c => c.label).join(' ')} (*${calcHand(dealerHand)}*)\n\n` +
                    `🎉 *JACKPOT 2.5x!* Kamu langsung menang *+$${winBJ.toLocaleString()}*!`
                );
            }

            saveRpgDB(rpg);
            blackjackSessions[m.sender] = { player: playerHand, dealer: dealerHand, bet };

            return reply(
                `*[ 🃏 𝙱𝙻𝙰𝙲𝙺𝙹𝙰𝙲𝙺 𝟸𝟷 𝙳𝙸𝙼𝚄𝙻𝙰𝙸 ]*\n` +
                `• *Kartumu:* ${playerHand.map(c => c.label).join(' ')} (Total: *${pScore}*)\n` +
                `• *Bandar:* ${dealerHand[0].label} [❓]\n` +
                `• *Taruhan:* $${bet.toLocaleString()}\n\n` +
                `Ketik *hit* untuk tambah kartu, atau *stand* untuk tahan!`
            );
        }
        break;

        case "rolet":
        case "roulette": {
            const pick = (args[0] || '').toLowerCase();
            const bet = parseInt(args[1]);
            const validColors = ['merah', 'hitam', 'hijau', 'ganjil', 'genap', 'red', 'black', 'green'];
            const isNumberPick = /^\d+$/.test(pick) && parseInt(pick) >= 0 && parseInt(pick) <= 36;

            if ((!validColors.includes(pick) && !isNumberPick) || !bet || bet < 200) {
                return reply(
                    `*[ 🎡 𝙲𝙰𝚂𝙸𝙽𝙾 𝚁𝙾𝚄𝙻𝙴𝚃𝚃𝙴 ]*\n` +
                    `Usage: *${prefix}rolet <pilihan> <taruhan>*\n\n` +
                    `*Pilihan & Hadiah:*\n` +
                    `• *merah / hitam* (2x Lipat)\n` +
                    `• *ganjil / genap* (2x Lipat)\n` +
                    `• *hijau / 0* (15x Lipat)\n` +
                    `• *angka 1-36* (15x Lipat)\n\n` +
                    `Contoh: *${prefix}rolet merah 5000*`
                );
            }

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) return reply(`*[ 🎡 𝚁𝙾𝚄𝙻𝙴𝚃𝚃𝙴 ]*\nUangmu tidak cukup untuk taruhan *$${bet.toLocaleString()}*!`);

            const redNums = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
            const rolledNum = Math.floor(Math.random() * 37);
            const rolledColor = rolledNum === 0 ? 'hijau' : redNums.includes(rolledNum) ? 'merah' : 'hitam';
            const colorEmoji = rolledColor === 'hijau' ? '🟢' : rolledColor === 'merah' ? '🔴' : '⚫';

            let winMult = 0;
            if (isNumberPick && parseInt(pick) === rolledNum) winMult = 15;
            else if ((pick === 'hijau' || pick === 'green') && rolledColor === 'hijau') winMult = 15;
            else if ((pick === 'merah' || pick === 'red') && rolledColor === 'merah') winMult = 2;
            else if ((pick === 'hitam' || pick === 'black') && rolledColor === 'hitam') winMult = 2;
            else if (pick === 'genap' && rolledNum !== 0 && rolledNum % 2 === 0) winMult = 2;
            else if (pick === 'ganjil' && rolledNum % 2 === 1) winMult = 2;

            if (winMult > 0) {
                const profit = bet * (winMult - 1);
                u.money += profit;
                u.exp += 60;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🎡 𝚁𝙾𝚄𝙻𝙴𝚃𝚃𝙴 𝚆𝙸𝙽! (${winMult}x) ]*\n` +
                    `• *Bola Berhenti:* ${colorEmoji} *${rolledNum} (${rolledColor.toUpperCase()})*\n` +
                    `• *Pilihanmu:* ${pick.toUpperCase()}\n\n` +
                    `🎉 Kamu menang *+$${(bet * winMult).toLocaleString()}* (Untung +$${profit.toLocaleString()})!\n` +
                    `💵 *Saldo:* $${u.money.toLocaleString()}`
                );
            } else {
                u.money -= bet;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🎡 𝚁𝙾𝚄𝙻𝙴𝚃𝚃𝙴 𝙻𝙾𝚂𝙴 ]*\n` +
                    `• *Bola Berhenti:* ${colorEmoji} *${rolledNum} (${rolledColor.toUpperCase()})*\n` +
                    `• *Pilihanmu:* ${pick.toUpperCase()}\n\n` +
                    `💀 Kamu kalah taruhan *-$${bet.toLocaleString()}*!\n` +
                    `💵 *Saldo:* $${u.money.toLocaleString()}`
                );
            }
        }
        break;

        case "dadu":
        case "sicbo": {
            const pick = (args[0] || '').toLowerCase();
            const bet = parseInt(args[1]);
            if (!['kecil', 'besar', 'tujuh', '7', 'kembar'].includes(pick) || !bet || bet < 200) {
                return reply(
                    `*[ 🎲 𝙺𝙾𝙿𝚈𝙾𝙺 𝟸 𝙳𝙰𝙳𝚄 (𝚂𝙸𝙲𝙱𝙾) ]*\n` +
                    `Usage: *${prefix}dadu <pilihan> <taruhan>*\n\n` +
                    `• *kecil* (Total 2–6) ➔ Menang 2x\n` +
                    `• *besar* (Total 8–12) ➔ Menang 2x\n` +
                    `• *tujuh* (Total pas 7) ➔ Menang 4x\n` +
                    `• *kembar* (Mata dadu sama) ➔ Menang 6x\n\n` +
                    `Contoh: *${prefix}dadu besar 5000*`
                );
            }

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) return reply(`*[ 🎲 𝙳𝙰𝙳𝚄 ]*\nUangmu tidak cukup untuk taruhan *$${bet.toLocaleString()}*!`);

            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            const total = d1 + d2;
            const diceFaces = ['⚀','⚁','⚂','⚃','⚄','⚅'];

            let winMult = 0;
            if (pick === 'kecil' && total >= 2 && total <= 6) winMult = 2;
            else if (pick === 'besar' && total >= 8 && total <= 12) winMult = 2;
            else if ((pick === 'tujuh' || pick === '7') && total === 7) winMult = 4;
            else if (pick === 'kembar' && d1 === d2) winMult = 6;

            if (winMult > 0) {
                const profit = bet * (winMult - 1);
                u.money += profit;
                u.exp += 50;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🎲 𝚂𝙸𝙲𝙱𝙾 𝙳𝙰𝙳𝚄 - 𝚆𝙸𝙽! (${winMult}x) ]*\n` +
                    `• *Dadu:* ${diceFaces[d1 - 1]} [${d1}] + ${diceFaces[d2 - 1]} [${d2}] = *${total}*\n` +
                    `• *Pilihanmu:* ${pick.toUpperCase()}\n\n` +
                    `🎉 Kamu menang *+$${(bet * winMult).toLocaleString()}* (Untung +$${profit.toLocaleString()})!\n` +
                    `💵 *Saldo:* $${u.money.toLocaleString()}`
                );
            } else {
                u.money -= bet;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🎲 𝚂𝙸𝙲𝙱𝙾 𝙳𝙰𝙳𝚄 - 𝙻𝙾𝚂𝙴 ]*\n` +
                    `• *Dadu:* ${diceFaces[d1 - 1]} [${d1}] + ${diceFaces[d2 - 1]} [${d2}] = *${total}*\n` +
                    `• *Pilihanmu:* ${pick.toUpperCase()}\n\n` +
                    `💀 Kamu kalah *-$${bet.toLocaleString()}*!\n` +
                    `💵 *Saldo:* $${u.money.toLocaleString()}`
                );
            }
        }
        break;

        case "slot": {
            const bet = parseInt(args[0]);
            if (!bet || bet < 100) {
                return reply(`*[ 🎰 𝙲𝙰𝚂𝙸𝙽𝙾 𝚂𝙻𝙾𝚃 ]*\nMasukkan jumlah taruhan (Minimal $100)!\nContoh: *${prefix}slot 1000*`);
            }
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) {
                return reply(`*[ 🎰 𝚂𝙻𝙾𝚃 ]*\nUang kamu tidak cukup untuk bertaruh *$${bet.toLocaleString()}*! (Uangmu: *$${u.money.toLocaleString()}*)`);
            }

            const emojis = ['🍒', '🍋', '🍇', '🔔', '💎', '7️⃣'];
            const r1 = emojis[Math.floor(Math.random() * emojis.length)];
            const r2 = emojis[Math.floor(Math.random() * emojis.length)];
            const r3 = emojis[Math.floor(Math.random() * emojis.length)];

            let statusTxt = '';
            if (r1 === r2 && r2 === r3) {
                const winAmount = bet * 4;
                u.money += winAmount;
                u.exp += 100;
                statusTxt = `🎉 *JACKPOT 3X!* Kamu menang *+$${winAmount.toLocaleString()}* & +100 EXP!`;
            } else if (r1 === r2 || r2 === r3 || r1 === r3) {
                const winAmount = Math.floor(bet * 1.5);
                u.money += winAmount;
                u.exp += 40;
                statusTxt = `✨ *DOUBLE MATCH!* Kamu menang *+$${winAmount.toLocaleString()}* & +40 EXP!`;
            } else {
                u.money -= bet;
                statusTxt = `💀 *ZONK!* Kamu kalah taruhan *-$${bet.toLocaleString()}*!`;
            }
            saveRpgDB(rpg);

            return reply(
                `*[ 🎰 𝙶𝚄𝚃𝚂 𝙲𝙰𝚂𝙸𝙽𝙾 𝚂𝙻𝙾𝚃 ]*\n` +
                `╭───────────────╮\n` +
                `│   [ ${r1} | ${r2} | ${r3} ]   │\n` +
                `╰───────────────╯\n` +
                `${statusTxt}\n` +
                `💵 *Saldo Money:* $${u.money.toLocaleString()}`
            );
        }
        break;

        case "coinflip":
        case "cf": {
            const side = (args[0] || '').toLowerCase();
            const bet = parseInt(args[1]);
            if (!['atas', 'bawah', 'head', 'tail', 'garuda', 'angka'].includes(side) || !bet || bet < 100) {
                return reply(`*[ 🪙 𝙲𝙾𝙸𝙽𝙵𝙻𝙸𝙿 ]*\nUsage: *${prefix}cf <atas/bawah> <taruhan>*\nContoh: *${prefix}cf atas 2000*`);
            }

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (u.money < bet) {
                return reply(`*[ 🪙 𝙲𝙾𝙸𝙽𝙵𝙻𝙸𝙿 ]*\nUangmu tidak cukup untuk taruhan *$${bet.toLocaleString()}*!`);
            }

            const playerPick = ['atas', 'head', 'garuda'].includes(side) ? 'atas' : 'bawah';
            const resultCoin = Math.random() < 0.5 ? 'atas' : 'bawah';

            if (playerPick === resultCoin) {
                u.money += bet;
                u.exp += 35;
                saveRpgDB(rpg);
                return reply(`*[ 🪙 𝙲𝙾𝙸𝙽𝙵𝙻𝙸𝙿 𝚆𝙸𝙽! ]*\n• *Koin Jatuh:* ${resultCoin.toUpperCase()}\n• *Pilihanmu:* ${playerPick.toUpperCase()}\n\n🎉 Kamu menang *+$${bet.toLocaleString()}*!\n💵 *Saldo:* $${u.money.toLocaleString()}`);
            } else {
                u.money -= bet;
                saveRpgDB(rpg);
                return reply(`*[ 🪙 𝙲𝙾𝙸𝙽𝙵𝙻𝙸𝙿 𝙻𝙾𝚂𝙴 ]*\n• *Koin Jatuh:* ${resultCoin.toUpperCase()}\n• *Pilihanmu:* ${playerPick.toUpperCase()}\n\n💀 Kamu kalah *-$${bet.toLocaleString()}*!\n💵 *Saldo:* $${u.money.toLocaleString()}`);
            }
        }
        break;

                // ── SECRET KEY WEB CATUR & TANTANGAN CHESS MULTIPLAYER ──
        case "secretkey":
        case "mykey": {
            if (isGroup) {
                return reply(`*[ 🔒 𝙿𝚁𝙸𝚅𝙰𝚃𝙴 𝙲𝙷𝙰𝚃 𝙾𝙽𝙻𝚈 ]*\nDemi keamanan akunmu, pembuatan *Secret Key* hanya bisa dilakukan lewat *Private Chat (PC/DM)* bot!\n\nSilakan chat bot secara pribadi lalu ketik *${prefix}secretkey*.`);
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                // Normalisasi JID pengirim agar selalu berformat 628xxx@s.whatsapp.net
                let senderJid = m.sender;
                if (m.key.fromMe) {
                    senderJid = botNumber;
                } else if (senderJid.endsWith('@lid') && typeof sock.findUserId === 'function') {
                    const resolved = await sock.findUserId(senderJid).catch(() => null);
                    if (resolved?.phoneNumber) senderJid = resolved.phoneNumber;
                }
                senderJid = senderJid.split(':')[0].split('@')[0] + '@s.whatsapp.net';

                const rpg = getRpgDB();
                const u = initUserRpg(rpg, senderJid);
                const isReset = (args[0] || '').toLowerCase() === 'reset';

                let ppUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                try {
                    ppUrl = await sock.profilePictureUrl(senderJid, 'image');
                } catch (_) {}

                if (!u.secretKey || isReset) {
                    const oldKey = u.secretKey;
                    if (oldKey) {
                        await axios.delete(`${FIREBASE_DB_URL}/secret_keys/${oldKey}.json`).catch(() => {});
                    }
                    const randPart1 = crypto.randomBytes(2).toString('hex').toUpperCase();
                    const randPart2 = crypto.randomBytes(2).toString('hex').toUpperCase();
                    u.secretKey = `GUTS-${randPart1}-${randPart2}`;
                }

                u.username = pushname;
                u.ppUrl = ppUrl;
                saveRpgDB(rpg);

                await syncUserToFirebase(senderJid, u, { username: pushname, ppUrl });
                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

                return reply(
                    `*[ 🔑 𝙶𝚄𝚃𝚂 𝚄𝚂𝙴𝚁 𝚂𝙴𝙲𝚁𝙴𝚃 𝙺𝙴𝚈 ]*\n\n` +
                    `• *Username:* ${pushname}\n` +
                    `• *Nomor WA:* ${senderJid.split('@')[0]}\n` +
                    `• *Money:* $${u.money.toLocaleString()}\n` +
                    `• *Limit:* ${u.limit} / 50\n` +
                    `• *Secret Key:* \`${u.secretKey}\`\n\n` +
                    `*Cara Pakai:*\n` +
                    `1. Buka Web Catur: ${CHESS_WEB_URL}\n` +
                    `2. Pilih menu *Login pakai Secret Key* dan masukkan kode di atas.\n` +
                    `3. Untuk menantang teman di grup, ketik *${prefix}chess @user 5000*.\n` +
                    `_(Ketik *${prefix}secretkey reset* jika ingin mengganti kode rahasia)_`
                );
            } catch (e) {
                reply(`*[ 𝚂𝙴𝙲𝚁𝙴𝚃𝙺𝙴𝚈 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "chess":
        case "catur": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nTantangan Catur PvP hanya bisa dibuat di dalam grup!');

            // Helper untuk mengubah @lid grup menjadi nomor @s.whatsapp.net asli
            const resolvePhoneJid = async (rawJid) => {
                if (!rawJid) return null;
                const clean = rawJid.split('@')[0].split(':')[0].toLowerCase();
                const botLid = (sock.user?.lid || '').split('@')[0].split(':')[0].toLowerCase();
                const botPhone = botNumber.split('@')[0].split(':')[0].toLowerCase();
                if (clean === botLid || clean === botPhone) return botPhone + '@s.whatsapp.net';

                const foundP = participants.find(p =>
                    [p.id, p.jid, p.lid, p.phoneNumber].filter(Boolean).some(x => x.split('@')[0].split(':')[0].toLowerCase() === clean)
                );
                if (foundP) {
                    const pJid = [foundP.jid, foundP.phoneNumber, foundP.id].find(x => x && x.endsWith('@s.whatsapp.net'));
                    if (pJid) return pJid.split(':')[0].split('@')[0] + '@s.whatsapp.net';
                }
                if (rawJid.endsWith('@lid') && typeof sock.findUserId === 'function') {
                    const resId = await sock.findUserId(rawJid).catch(() => null);
                    if (resId?.phoneNumber && resId.phoneNumber.endsWith('@s.whatsapp.net')) {
                        return resId.phoneNumber.split(':')[0].split('@')[0] + '@s.whatsapp.net';
                    }
                }
                if (rawJid.endsWith('@s.whatsapp.net')) return clean + '@s.whatsapp.net';
                return rawJid;
            };

            const rawTarget = getTargetUser(m, args, participants, sock, botNumber);
            const senderPhoneJid = await resolvePhoneJid(m.key.fromMe ? botNumber : m.sender);
            const targetPhoneJid = await resolvePhoneJid(rawTarget);

            if (!targetPhoneJid || isSameUser(targetPhoneJid, senderPhoneJid, participants)) {
                return reply(
                    `*[ ♟️ 𝙶𝚄𝚃𝚂 𝙲𝙷𝙴𝚂𝚂 𝙾𝙽𝙻𝙸𝙽𝙴 ]*\n` +
                    `Tag atau reply lawan yang ingin kamu tantang!\n\n` +
                    `• *Main + Taruhan:* ${prefix}chess @user 5000\n` +
                    `• *Fair Playing:* ${prefix}chess @user\n\n` +
                    `⚠️ *Syarat Wajib:* Kedua pemain harus sudah membuat *${prefix}secretkey* di Private Chat bot!`
                );
            }

            const betArg = args.find(a => /^\d+$/.test(a) && a.length <= 9 && !a.startsWith('628') && !a.startsWith('08'));
            const betAmount = betArg ? Math.max(0, parseInt(betArg)) : 0;

            const rpg = getRpgDB();
            const u1 = initUserRpg(rpg, senderPhoneJid);
            const u2 = initUserRpg(rpg, targetPhoneJid);

            // Jika di sesi lama sempat tersimpan di key m.sender / rawTarget (@lid), salin secretKey-nya ke JID nomor HP
            if (!u1.secretKey && rpg[m.sender]?.secretKey) {
                u1.secretKey = rpg[m.sender].secretKey;
                saveRpgDB(rpg);
            }
            if (!u2.secretKey && rawTarget && rpg[rawTarget]?.secretKey) {
                u2.secretKey = rpg[rawTarget].secretKey;
                saveRpgDB(rpg);
            }

            if (!u1.secretKey && !u2.secretKey) {
                return sock.sendMessage(from, {
                    text: `*[ ❌ 𝙶𝙰𝙶𝙰𝙻 𝙼𝙴𝙼𝙱𝚄𝙰𝚃 𝚁𝙾𝙾𝙼 𝙲𝙰𝚃𝚄𝚁 ]*\n@${senderPhoneJid.split('@')[0]} dan @${targetPhoneJid.split('@')[0]} sama-sama belum memiliki *Secret Key*!\n\nSilakan chat bot secara pribadi (PC/DM) lalu ketik *${prefix}secretkey* terlebih dahulu.`,
                    mentions: [senderPhoneJid, targetPhoneJid]
                }, { quoted: m });
            }
            if (!u1.secretKey) {
                return sock.sendMessage(from, {
                    text: `*[ ❌ 𝚂𝙴𝙲𝚁𝙴𝚃 𝙺𝙴𝚈 𝙱𝙴𝙻𝚄𝙼 𝙰𝙳𝙰 ]*\nKamu (@${senderPhoneJid.split('@')[0]}) belum membuat *Secret Key*!\nSilakan ketik *${prefix}secretkey* di *Private Chat (DM)* bot terlebih dahulu.`,
                    mentions: [senderPhoneJid]
                }, { quoted: m });
            }
            if (!u2.secretKey) {
                return sock.sendMessage(from, {
                    text: `*[ ❌ 𝚂𝙴𝙲𝚁𝙴𝚃 𝙺𝙴𝚈 𝙻𝙰𝚆𝙰𝙽 𝙱𝙴𝙻𝚄𝙼 𝙰𝙳𝙰 ]*\nLawan yang kamu tantang (@${targetPhoneJid.split('@')[0]}) belum memiliki *Secret Key*!\nSuruh @${targetPhoneJid.split('@')[0]} mengetik *${prefix}secretkey* di *Private Chat (DM)* bot terlebih dahulu.`,
                    mentions: [targetPhoneJid]
                }, { quoted: m });
            }

            if (betAmount > 0) {
                if (u1.money < betAmount) {
                    return reply(`*[ 💸 𝚂𝙰𝙻𝙳𝙾 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nUangmu ($${u1.money.toLocaleString()}) tidak cukup untuk taruhan *$${betAmount.toLocaleString()}*!`);
                }
                if (u2.money < betAmount) {
                    return reply(`*[ 💸 𝚂𝙰𝙻𝙳𝙾 𝙻𝙰𝚆𝙰𝙽 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nUang @${targetPhoneJid.split('@')[0]} ($${u2.money.toLocaleString()}) tidak cukup untuk taruhan *$${betAmount.toLocaleString()}*!`);
                }
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "♟️", key: m.key } });

                if (betAmount > 0) {
                    u1.money -= betAmount;
                    u2.money -= betAmount;
                    saveRpgDB(rpg);
                }

                const p1Clean = senderPhoneJid.split('@')[0].split(':')[0];
                const p2Clean = targetPhoneJid.split('@')[0].split(':')[0];

                const p1Sync = await syncUserToFirebase(senderPhoneJid, u1, { username: u1.username || pushname });
                const p2Sync = await syncUserToFirebase(targetPhoneJid, u2, { username: u2.username || p2Clean });

                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                let roomCode = '';
                for (let i = 0; i < 6; i++) roomCode += chars.charAt(Math.floor(Math.random() * chars.length));

                const roomData = {
                    status: 'playing',
                    createdAt: Date.now(),
                    fromWa: true,
                    groupChat: from,
                    bet: betAmount,
                    waPayoutStatus: 'active',
                    white: {
                        uid: `wa_${p1Clean}`,
                        jid: senderPhoneJid,
                        number: p1Clean,
                        secretKey: u1.secretKey,
                        name: p1Sync?.username || pushname,
                        ppUrl: p1Sync?.ppUrl || ''
                    },
                    black: {
                        uid: `wa_${p2Clean}`,
                        jid: targetPhoneJid,
                        number: p2Clean,
                        secretKey: u2.secretKey,
                        name: p2Sync?.username || p2Clean,
                        ppUrl: p2Sync?.ppUrl || ''
                    },
                    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                    history: [],
                    lastMove: null,
                    manualGameOver: null,
                    drawOffer: null
                };

                await axios.put(`${FIREBASE_DB_URL}/rooms/${roomCode}.json`, roomData, { timeout: 12000 });

                const roomUrl = `${CHESS_WEB_URL}/game.html?room=${roomCode}`;
                return sock.sendMessage(from, {
                    text:
                        `*[ ♟️ 𝙲𝙷𝙴𝚂𝚂 𝙼𝙰𝚃𝙲𝙷 𝚁𝙾𝙾𝙼 𝙲𝚁𝙴𝙰𝚃𝙴𝙳! ]*\n\n` +
                        `• *Kode Room:* \`${roomCode}\`\n` +
                        `• *♔ Putih:* @${p1Clean} (${roomData.white.name})\n` +
                        `• *♚ Hitam:* @${p2Clean} (${roomData.black.name})\n` +
                        `${betAmount > 0 ? `• *💰 Taruhan:* $${betAmount.toLocaleString()} (Total Pot: *$${(betAmount * 2).toLocaleString()}*)\n` : `• *🎁 Hadiah:* +$5,000 Money & +150 EXP\n`}\n` +
                        `🌐 *Link Pertandingan:*\n${roomUrl}\n\n` +
                        `_Silakan login memakai Secret Key kalian di web, lalu langsung mainkan! Hasil & uang taruhan otomatis masuk ke WA begitu pertandingan selesai._`,
                    mentions: [senderPhoneJid, targetPhoneJid]
                }, { quoted: m });
            } catch (e) {
                if (betAmount > 0) {
                    u1.money += betAmount;
                    u2.money += betAmount;
                    saveRpgDB(rpg);
                }
                reply(`*[ 𝙲𝙷𝙴𝚂𝚂 𝙴𝚁𝚁𝙾𝚁 ]*\nGagal membuat room di server: ${e.message}`);
            }
        }
        break;

        // ── TIC-TAC-TOE MULTIPLAYER, SUSUN KATA, & CAK LONTONG ──
        case "cancelttt":
        case "delttt": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (!tttSessions[from]) return reply('*[ ❌⭕ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 ]*\nTidak ada sesi Tic-Tac-Toe yang aktif di grup ini.');
            const tGame = tttSessions[from];
            const isParticipant = isSameUser(m.sender, tGame.p1, participants) || isSameUser(m.sender, tGame.p2, participants);
            if (!isParticipant && !isAdmins && !isCreator) {
                return reply('*[ ❌ 𝙰𝙺𝚂𝙴𝚂 𝙳𝙸𝚃𝙾𝙻𝙰𝙺 ]*\nHanya pemain atau Admin yang bisa membatalkan sesi ini!');
            }
            if (tGame.timer) clearTimeout(tGame.timer);
            delete tttSessions[from];
            return reply('*[ 🛑 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 𝙳𝙸𝙱𝙰𝚃𝙰𝙻𝙺𝙰𝙽 ]*\nSesi permainan berhasil dihapus.');
        }
        break;

        case "ttt":
        case "tictactoe": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nMainkan Tic-Tac-Toe di dalam grup!');
            const target = getTargetUser(m, args, participants);
            if (!target || isSameUser(target, m.sender, participants)) {
                return reply(`*[ ❌⭕ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 ]*\nTag atau reply teman yang ingin kamu tantang!\n• *Main:* ${prefix}ttt @user [taruhan]\n• *Contoh:* ${prefix}ttt @user 5000\n• *Batal:* ${prefix}cancelttt`);
            }
            if (tttSessions[from]) {
                return reply(`*[ ❌⭕ 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 ]*\nMasih ada permainan yang berlangsung! Ketik *${prefix}cancelttt* untuk mereset.`);
            }

            const betArg = args.find(a => /^\d+$/.test(a) && a.length <= 9 && !a.startsWith('628') && !a.startsWith('08'));
            const betAmount = betArg ? Math.max(0, parseInt(betArg)) : 0;

            if (betAmount > 0) {
                const rpg = getRpgDB();
                const u1 = initUserRpg(rpg, m.sender);
                const u2 = initUserRpg(rpg, target);
                if (u1.money < betAmount) return reply(`*[ 💸 𝚄𝙰𝙽𝙶 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nUangmu tidak cukup untuk taruhan *$${betAmount.toLocaleString()}*!`);
                if (u2.money < betAmount) return reply(`*[ 💸 𝚄𝙰𝙽𝙶 𝙻𝙰𝚆𝙰𝙽 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nUang lawan tidak cukup untuk taruhan *$${betAmount.toLocaleString()}*!`);
            }

            const waitTimer = setTimeout(() => {
                if (tttSessions[from] && tttSessions[from].status === 'waiting') {
                    delete tttSessions[from];
                }
            }, 60000);

            tttSessions[from] = {
                p1: m.sender,
                p2: target,
                turn: m.sender,
                bet: betAmount,
                status: 'waiting',
                board: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'],
                timer: waitTimer
            };

            return sock.sendMessage(from, {
                text: `*[ ❌⭕ 𝚃𝙰𝙽𝚃𝙰𝙽𝙶𝙰𝙽 𝚃𝙸𝙲-𝚃𝙰𝙲-𝚃𝙾𝙴 ]*\n` +
                    `@${m.sender.split('@')[0]} (❌) menantang @${target.split('@')[0]} (⭕)!\n` +
                    `${betAmount > 0 ? `💰 *Taruhan:* $${betAmount.toLocaleString()}\n` : `🎁 *Reward:* $4,000 Money & +100 EXP\n`}\n` +
                    `• Ketik *terima* / *gas* dalam 60 detik untuk memulai.\n` +
                    `• Ketik *tolak* atau *${prefix}cancelttt* untuk membatalkan.`,
                mentions: [m.sender, target]
            }, { quoted: m });
        }
        break;

        case "susunkata": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (susunKataSessions[from]) {
                return reply('*[ 🧩 𝚂𝚄𝚂𝚄𝙽 𝙺𝙰𝚃𝙰 ]*\nMasih ada soal aktif di grup ini! Jawab atau ketik *nyerah*.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json');
                const item = res.data[Math.floor(Math.random() * res.data.length)];
                const ans = item.jawaban.toLowerCase().trim();

                const timer = setTimeout(() => {
                    if (susunKataSessions[from]) {
                        sock.sendMessage(from, { text: `*[ ⏰ 𝚆𝙰𝙺𝚃𝚄 𝙷𝙰𝙱𝙸𝚂! ]*\nJawaban Susun Kata: *${item.jawaban.toUpperCase()}*` });
                        delete susunKataSessions[from];
                    }
                }, 60000);

                susunKataSessions[from] = { jawaban: ans, timer };
                return reply(`*[ 🧩 𝚂𝚄𝚂𝚄𝙽 𝙺𝙰𝚃𝙰 ]*\n*Soal:* ${item.soal}\n*Tipe:* ${item.tipe}\n*Waktu:* 60 Detik\n*Reward:* +$3,500 Money & +80 EXP\n\n_Ketik jawabanmu langsung di chat (atau ketik *nyerah*)!_`);
            } catch (e) {
                reply(`*[ 𝚂𝚄𝚂𝚄𝙽 𝙺𝙰𝚃𝙰 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "caklontong": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (cakLontongSessions[from]) {
                return reply('*[ 🧠 𝙲𝙰𝙺 𝙻𝙾𝙽𝚃𝙾𝙽𝙶 ]*\nMasih ada soal Cak Lontong aktif! Jawab atau ketik *nyerah*.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json');
                const item = res.data[Math.floor(Math.random() * res.data.length)];
                const ans = item.jawaban.toLowerCase().trim();

                const timer = setTimeout(() => {
                    if (cakLontongSessions[from]) {
                        sock.sendMessage(from, { text: `*[ ⏰ 𝚆𝙰𝙺𝚃𝚄 𝙷𝙰𝙱𝙸𝚂! ]*\n*Jawaban:* ${item.jawaban.toUpperCase()}\n*Penjelasan:* ${item.deskripsi}` });
                        delete cakLontongSessions[from];
                    }
                }, 60000);

                cakLontongSessions[from] = { jawaban: ans, deskripsi: item.deskripsi, timer };
                return reply(`*[ 🧠 KUIS CAK LONTONG ]*\n*Soal:* ${item.soal}\n*Clue:* ${item.jawaban.length} Huruf\n*Waktu:* 60 Detik\n*Reward:* +$5,000 Money & +120 EXP\n\n_Ketik jawabanmu langsung di chat (atau ketik *nyerah*)!_`);
            } catch (e) {
                reply(`*[ 𝙲𝙰𝙺 𝙻𝙾𝙽𝚃𝙾𝙽𝙶 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── EKSKLUSIF @ITSLIAAA/BAILEYS: EVENT, POLL, & CODE BLOCK ──
        case "event": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            const parts = text.split('|').map(s => s.trim()).filter(Boolean);
            if (parts.length === 0) {
                return reply(`*[ 🗓️ 𝙲𝚁𝙴𝙰𝚃𝙴 𝙴𝚅𝙴𝙽𝚃 ]*\nUsage: *${prefix}event Nama Acara | Deskripsi | Lokasi*\nContoh: *${prefix}event Mabar MLBB | Kumpul jam 8 malam | Discord*`);
            }
            const evName = parts[0];
            const evDesc = parts[1] || 'Acara Grup GutS | MD';
            const evLoc = parts[2] || 'Group Chat';

            await sock.sendMessage(m.chat, {
                event: {
                    name: evName,
                    description: evDesc,
                    startDate: new Date(Date.now() + 3600000),
                    endDate: new Date(Date.now() + 10800000),
                    extraGuestsAllowed: true,
                    location: {
                        name: evLoc,
                        degreesLatitude: -6.2,
                        degreesLongitude: 106.8
                    }
                }
            }, { quoted: m });
        }
        break;

        case "poll": {
            const parts = text.split('|').map(s => s.trim()).filter(Boolean);
            if (parts.length < 3) {
                return reply(`*[ 📊 𝙲𝚁𝙴𝙰𝚃𝙴 𝙿𝙾𝙻𝙻 ]*\nUsage: *${prefix}poll Pertanyaan | Opsi 1 | Opsi 2 | ...*\nContoh: *${prefix}poll Malam ini mabar apa? | Mobile Legends | Free Fire | Roblox*`);
            }
            const pollName = parts[0];
            const pollOptions = parts.slice(1, 13);

            await sock.sendMessage(m.chat, {
                poll: {
                    name: pollName,
                    values: pollOptions,
                    selectableCount: 1,
                    toAnnouncementGroup: false
                }
            }, { quoted: m });
        }
        break;

        case "code": {
            const rawCodeInput = text || m.quoted?.text;
            if (!rawCodeInput) {
                return reply(`*[ 🧾 𝙲𝙾𝙳𝙴 𝙱𝙻𝙾𝙲𝙺 ]*\nUsage: *${prefix}code <bahasa> | <kode>*\nContoh: *${prefix}code javascript | console.log("GutS MD");*\n\n_Atau reply pesan berisi kode dengan *${prefix}code javascript*_`);
            }

            let lang = 'javascript';
            let codeContent = rawCodeInput;

            if (text.includes('|')) {
                const splitIdx = text.indexOf('|');
                lang = text.slice(0, splitIdx).trim().toLowerCase() || 'javascript';
                codeContent = text.slice(splitIdx + 1).trim();
            } else if (m.quoted?.text && args[0]) {
                lang = args[0].toLowerCase();
                codeContent = m.quoted.text;
            }

            await sock.sendMessage(m.chat, {
                disclaimerText: applyUserFont(`GutS Code Viewer (${lang})`, m.sender),
                headerText: applyUserFont(`## 💻 SNIPPET: ${lang.toUpperCase()}`, m.sender),
                contentText: '---',
                code: codeContent,
                language: lang,
                footerText: applyUserFont('GutS | MD Syntax Highlighter', m.sender)
            }, { quoted: m });
        }
        break;

                // ── MUSIK & AUDIO FX ──
                case "play":
        case "song": {
            if (!text) return reply(`*[ 🎧 𝙶𝚄𝚃𝚂 𝙼𝚄𝚂𝙸𝙲 𝙿𝙻𝙰𝚈𝙴𝚁 ]*\nUsage: *${prefix}${command} <judul lagu / penyanyi>*\nContoh: *${prefix}${command} Blue Yung Kai*`);
            try {
                const res = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(text)}&entity=song&limit=5`, { timeout: 12000 });
                const tracks = (res.data?.results || []).filter(t => t.previewUrl);

                if (tracks.length === 0) {
                    return reply('*[ 🎧 𝙼𝚄𝚂𝙸𝙲 𝙿𝙻𝙰𝚈𝙴𝚁 ]*\nLagu tidak ditemukan! Coba gunakan kata kunci judul dan nama penyanyi yang lebih jelas.');
                }

                const song = tracks[0];
                const highResCover = (song.artworkUrl100 || '').replace('100x100bb', '600x600bb');
                const caption = `*[ 🎧 𝙶𝚄𝚃𝚂 𝙼𝚄𝚂𝙸𝙲 𝙿𝙻𝙰𝚈𝙴𝚁 ]*\n` +
                    `• *Judul:* ${song.trackName}\n` +
                    `• *Artis:* ${song.artistName}\n` +
                    `• *Album:* ${song.collectionName || '-'}\n` +
                    `• *Genre:* ${song.primaryGenreName || '-'}\n` +
                    `• *Rilis:* ${(song.releaseDate || '').slice(0, 10)}\n\n` +
                    `_⏳ Sedang memproses audio MP3, mohon tunggu..._`;

                await sock.sendMessage(m.chat, {
                    image: { url: highResCover },
                    caption
                }, { quoted: m });

                let rawAudioBuf = null;
                try {
                    const searchQ = `${song.trackName} ${song.artistName} audio`;
                    const ytSearch = await axios.get(`https://api.agatz.xyz/api/ytsearch?message=${encodeURIComponent(searchQ)}`, { timeout: 8000 });
                    const videoUrl = ytSearch.data?.data?.[0]?.url;

                    if (videoUrl) {
                        const ytmp3 = await axios.get(`https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(videoUrl)}`, { timeout: 12000 });
                        const dlUrl = ytmp3.data?.data?.downloadUrl || ytmp3.data?.data?.url;
                        if (dlUrl) {
                            const dlStream = await axios.get(dlUrl, { responseType: 'arraybuffer', timeout: 15000 });
                            if (dlStream.data && dlStream.data.byteLength > 50000) {
                                rawAudioBuf = Buffer.from(dlStream.data);
                            }
                        }
                    }
                } catch (_) {}

                // Jika API YouTube penuh/limit, gunakan stream langsung dari Apple iTunes (100% selalu hidup)
                if (!rawAudioBuf) {
                    const itunesStream = await axios.get(song.previewUrl, {
                        responseType: 'arraybuffer',
                        timeout: 15000,
                        headers: { 'User-Agent': 'Mozilla/5.0' }
                    });
                    rawAudioBuf = Buffer.from(itunesStream.data);
                }

                const tmpIn = `./tmp_play_in_${Date.now()}`;
                const tmpOut = `./tmp_play_out_${Date.now()}.mp3`;
                fs.writeFileSync(tmpIn, rawAudioBuf);

                execSync(`"${ffmpegPath}" -y -i "${tmpIn}" -vn -c:a libmp3lame -b:a 128k "${tmpOut}"`);
                const finalMp3Buf = fs.readFileSync(tmpOut);

                if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
                if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);

                await sock.sendMessage(m.chat, {
                    audio: finalMp3Buf,
                    mimetype: 'audio/mpeg',
                    fileName: `${song.trackName} - ${song.artistName}.mp3`,
                    ptt: false
                }, { quoted: m });
            } catch (e) {
                console.error('[PLAY ERROR]:', e);
                reply(`*[ 𝙿𝙻𝙰𝚈 𝙴𝚁𝚁𝙾𝚁 ]*\nGagal mengirim audio: ${e.message}`);
            }
        }
        break;

        case "whatmusic":
        case "shazam": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            if (!/audio|video/.test(targetMime)) {
                return reply(`*[ 🎵 𝚆𝙷𝙰𝚃 𝙼𝚄𝚂𝙸𝙲 / 𝚂𝙷𝙰𝚉𝙰𝙼 ]*\nReply ke potongan audio, voice note, atau video yang ingin dicari judul lagunya dengan *${prefix}${command}*!`);
            }
            try {
                const mType = /video/.test(targetMime) ? 'video' : 'audio';
                const stream = await downloadContentFromMessage(targetNode, mType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                // Potong 12 detik pertama menjadi MP3 ringan via FFmpeg agar mudah dikenali
                const tmpIn = `./tmp_shz_in_${Date.now()}`;
                const tmpOut = `./tmp_shz_out_${Date.now()}.mp3`;
                fs.writeFileSync(tmpIn, buffer);
                execSync(`"${ffmpegPath}" -y -i "${tmpIn}" -t 12 -vn -c:a libmp3lame -b:a 128k "${tmpOut}"`);
                const sampleBuf = fs.readFileSync(tmpOut);
                if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
                if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);

                const boundary = '----GutSShazam' + Date.now();
                const header = `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="sample.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n`;
                const footer = `\r\n--${boundary}--\r\n`;
                const bodyBuf = Buffer.concat([Buffer.from(header, 'utf-8'), sampleBuf, Buffer.from(footer, 'utf-8')]);
                const upRes = await axios.post('https://catbox.moe/user/api.php', bodyBuf, {
                    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` }
                });
                const audioUrl = String(upRes.data).trim();

                const audRes = await axios.get(`https://api.audd.io/?url=${encodeURIComponent(audioUrl)}&return=apple_music,spotify`, { timeout: 15000 });
                const resMusic = audRes.data?.result;

                if (!resMusic) {
                    return reply('*[ 🎵 𝚆𝙷𝙰𝚃 𝙼𝚄𝚂𝙸𝙲 ]*\nLagu tidak terdeteksi! Pastikan suara musik di dalam audio/video terdengar jelas dan tidak tertutup suara berisik.');
                }

                return reply(
                    `*[ 🎵 𝙼𝚄𝚂𝙸𝙲 𝙸𝙳𝙴𝙽𝚃𝙸𝙵𝙸𝙴𝙳! ]*\n` +
                    `• *Judul:* ${resMusic.title || '-'}\n` +
                    `• *Artis:* ${resMusic.artist || '-'}\n` +
                    `• *Album:* ${resMusic.album || '-'}\n` +
                    `• *Rilis:* ${resMusic.release_date || '-'}\n` +
                    `• *Link:* ${resMusic.song_link || '-'}`
                );
            } catch (e) {
                reply(`*[ 𝚆𝙷𝙰𝚃𝙼𝚄𝚂𝙸𝙲 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "bass":
        case "nightcore":
        case "slowed": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            if (!/audio|video/.test(targetMime)) {
                return reply(`*[ 🎚️ 𝙰𝚄𝙳𝙸𝙾 𝙵𝚇 (${command.toUpperCase()}) ]*\nReply audio, voice note, atau video dengan *${prefix}${command}*!`);
            }
            try {
                const mType = /video/.test(targetMime) ? 'video' : 'audio';
                const stream = await downloadContentFromMessage(targetNode, mType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                const tmpIn = `./tmp_fx_in_${Date.now()}`;
                const tmpOut = `./tmp_fx_out_${Date.now()}.mp3`;
                fs.writeFileSync(tmpIn, buffer);

                let afFilter = '';
                if (command === 'bass') {
                    afFilter = 'equalizer=f=54:width_type=o:width=2:g=18,acompressor';
                } else if (command === 'nightcore') {
                    afFilter = 'asetrate=44100*1.25,aresample=44100,atempo=1.05';
                } else if (command === 'slowed') {
                    afFilter = 'asetrate=44100*0.85,aresample=44100,aecho=0.8:0.88:60:0.4';
                }

                execSync(`"${ffmpegPath}" -y -i "${tmpIn}" -vn -af "${afFilter}" -c:a libmp3lame -q:a 3 "${tmpOut}"`);
                const outBuf = fs.readFileSync(tmpOut);
                if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
                if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);

                await sock.sendMessage(m.chat, {
                    audio: outBuf,
                    mimetype: 'audio/mpeg',
                    ptt: false
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝙰𝚄𝙳𝙸𝙾 𝙵𝚇 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        // ── VISUAL CANVAS LOKAL ──
        case "getpp":
        case "stealpp": {
            const target = getTargetUser(m, args, participants) || m.sender;
            try {
                const ppUrl = await sock.profilePictureUrl(target, 'image');
                await sock.sendMessage(m.chat, {
                    image: { url: ppUrl },
                    caption: `*[ 🖼️ 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝙿𝙸𝙲𝚃𝚄𝚁𝙴 𝙷𝙳 ]*\n• *User:* @${target.split('@')[0]}`,
                    mentions: [target]
                }, { quoted: m });
            } catch (e) {
                reply(`*[ ❌ 𝙶𝙰𝙶𝙰𝙻 ]*\nFoto profil @${target.split('@')[0]} disembunyikan (private) atau pengguna tidak memasang foto profil.`);
            }
        }
        break;

        case "fakeff":
        case "fflobby": {
            if (!text || ['help', 'list', 'info'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ 𝙵𝙰𝙺𝙴 𝙵𝚁𝙴𝙴 𝙵𝙸𝚁𝙴 𝙻𝙾𝙱𝙱𝚈 ]*\n` +
                    `Usage:\n` +
                    `• *${prefix}${command} <username> | <nomor_lobby>*\n` +
                    `• *${prefix}${command} <username>* (Lobby acak 1–30)\n\n` +
                    `*Contoh:*\n` +
                    `• *${prefix}${command} 7Tyn | 5*\n` +
                    `• *${prefix}${command} GutS*\n\n` +
                    `*Pilihan Lobby:* Angka \`1\` sampai \`30\` (Kosongkan untuk acak)`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                let rawName = text.trim();
                let lobbyNum = undefined;

                if (text.includes('|')) {
                    const parts = text.split('|').map(s => s.trim());
                    rawName = parts[0] || pushname || 'Player';
                    const parsedLobby = parseInt(parts[1]);
                    if (!isNaN(parsedLobby) && parsedLobby >= 1 && parsedLobby <= 30) {
                        lobbyNum = parsedLobby;
                    }
                }

                const username = rawName.slice(0, 20);
                const payload = { username };
                if (lobbyNum) payload.lobby = lobbyNum;

                const res = await generateFFCard(payload);

                if (!res || !res.result) {
                    throw new Error('Gagal merender gambar lobby Free Fire.');
                }

                const imgBuffer = Buffer.isBuffer(res.result)
                    ? res.result
                    : fs.readFileSync(res.result);

                // Hapus file hasil render setelah dibaca ke buffer agar disk server tidak penuh
                if (typeof res.result === 'string' && fs.existsSync(res.result)) {
                    fs.unlinkSync(res.result);
                }

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: imgBuffer,
                    caption:
                        `*[ 𝙵𝙰𝙺𝙴 𝙵𝚁𝙴𝙴 𝙵𝙸𝚁𝙴 𝙻𝙾𝙱𝙱𝚈 ]*\n` +
                        `• *Nickname:* ${res.username || username}\n` +
                        `• *Lobby:* #${res.lobby || lobbyNum || 'Random'}`
                }, { quoted: m });
            } catch (e) {
                console.error('[FAKEFF ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙰𝙺𝙴𝙵𝙵 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "fakeroblox":
        case "robloxcard": {
            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            const hasImage = /image/.test(targetMime);

            if ((args[0] || '').toLowerCase() === 'setbg' || (args[0] || '').toLowerCase() === 'settemplate') {
                if (!hasImage) {
                    return reply(`*[ 𝚂𝙴𝚃 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝚁𝙾𝙱𝙻𝙾𝚇 ]*\nReply foto template Roblox yang sudah dikosongkan teksnya dengan *${prefix}${command} setbg*!`);
                }
                try {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    await saveRobloxTemplate(buffer);
                    return reply(`*[ ✅ 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝚃𝙴𝚁𝚂𝙸𝙼𝙿𝙰𝙽 ]*\nFoto template Fake Roblox berhasil disimpan secara permanen! Sekarang semua user bisa langsung memakai *${prefix}fakeroblox* tanpa perlu kirim gambar lagi.`);
                } catch (e) {
                    return reply(`*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
                }
            }

            if (!text || ['help', 'list', 'info'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ 𝙵𝙰𝙺𝙴 𝚁𝙾𝙱𝙻𝙾𝚇 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 ]*\n` +
                    `Usage:\n` +
                    `*${prefix}${command} DisplayName | @username | Friends | Follower | Following | [Bio]*\n\n` +
                    `*Contoh:*\n` +
                    `• *${prefix}${command} GutS | GutS_MD | 7 | 7 | 7*\n` +
                    `• *${prefix}${command} GutS | GutS_MD | 7 | 7 | 7 | halah jmbd*\n\n` +
                    `💡 _Tips Owner: Reply foto template kosong dengan *${prefix}${command} setbg* (cukup 1x) untuk menyimpan template default._`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const parts = text.split('|').map(s => s.trim());
                const displayName = parts[0] || pushname || 'Schevenko';
                const username = parts[1] || displayName.toLowerCase().replace(/\s+/g, '_');
                const friends = parts[2] ?? '253';
                const followers = parts[3] ?? '1';
                const following = parts[4] ?? '18';
                const bio = parts[5] || '';

                let customBgBuf = null;
                if (hasImage) {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    customBgBuf = buffer;
                }

                const outJpg = await generateFakeRoblox({
                    displayName,
                    username,
                    friends,
                    followers,
                    following,
                    bio,
                    templateBuffer: customBgBuf
                });

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: outJpg,
                    caption:
                        `*[ 𝙵𝙰𝙺𝙴 𝚁𝙾𝙱𝙻𝙾𝚇 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 ]*\n` +
                        `• *Display Name:* ${displayName}\n` +
                        `• *Username:* @${username.replace(/^@+/, '')}\n` +
                        `• *Stats:* ${friends} Friends · ${followers} Follower · ${following} Following`
                }, { quoted: m });
            } catch (e) {
                console.error('[FAKE ROBLOX ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙰𝙺𝙴 𝚁𝙾𝙱𝙻𝙾𝚇 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "fakeml":
        case "mlcard": {
            const validRanks = ['epic', 'glory', 'gm', 'honor', 'imo', 'legend', 'mawi'];

            if (['help', 'list', 'info'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ F𝙰𝙺𝙴 𝙼𝙻𝙱𝙱 𝙻𝙾𝙱𝙱𝚈 ]*\n` +
                    `Usage: *${prefix}${command} <username> | <rank> | <border>*\n\n` +
                    `*Contoh:*\n` +
                    `• *${prefix}${command} 7Tyn | imo | 5*\n` +
                    `• *${prefix}${command} GutS* (Otomatis Rank Immortal & Border 1)\n` +
                    `• Reply foto/PP orang dengan *${prefix}${command} Nama | glory | 12*\n\n` +
                    `*Pilihan Rank:* \`epic\`, \`gm\`, \`legend\`, \`honor\`, \`glory\`, \`imo\`, \`mawi\`\n` +
                    `*Pilihan Border:* Angka \`0\` sampai \`16\``
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const parts = text.split('|').map(s => s.trim());
                const rawName = parts[0] || (m.quoted ? (m.quoted.pushName || 'Player') : pushname) || 'Player';
                const username = rawName.slice(0, 15);

                const rankInput = (parts[1] || 'imo').toLowerCase();
                const rank = validRanks.includes(rankInput) ? rankInput : 'imo';

                let border = parts[2] !== undefined ? parseInt(parts[2]) : 1;
                if (isNaN(border) || border < 0 || border > 16) border = 1;

                let avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                const targetNode = m.quoted ? m.quoted : m.msg;
                const targetMime = targetNode?.mimetype || m.mtype || '';

                if (/image|webp|sticker/.test(targetMime)) {
                    const mType = /webp|sticker/.test(targetMime) ? 'sticker' : 'image';
                    const stream = await downloadContentFromMessage(targetNode, mType);
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

                    const jpgBuf = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
                    const boundary = '----GutSFakeML' + Date.now();
                    const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="avatar.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`;
                    const footer = `\r\n--${boundary}--\r\n`;
                    const bodyBuf = Buffer.concat([Buffer.from(header, 'utf-8'), jpgBuf, Buffer.from(footer, 'utf-8')]);

                    const resTmp = await axios.post('https://tmpfiles.org/api/v1/upload', bodyBuf, {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${boundary}`,
                            'Content-Length': bodyBuf.length,
                            'User-Agent': 'Mozilla/5.0'
                        },
                        timeout: 15000
                    });
                    const rawTmpUrl = resTmp.data?.data?.url;
                    if (rawTmpUrl) avatarUrl = rawTmpUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
                } else {
                    const targetUser = getTargetUser(m, args, participants, sock, botNumber) || m.sender;
                    try {
                        avatarUrl = await sock.profilePictureUrl(targetUser, 'image');
                    } catch (_) {}
                }

                const res = await generateMlCard({
                    avatar: avatarUrl,
                    username,
                    rank,
                    border
                });

                if (!res || !res.result) {
                    throw new Error('Gagal merender kartu lobby Mobile Legends.');
                }

                const imgBuffer = Buffer.isBuffer(res.result)
                    ? res.result
                    : fs.readFileSync(res.result);

                // Hapus file sementara hasil generate fake-ml agar penyimpanan tidak penuh
                if (typeof res.result === 'string' && fs.existsSync(res.result)) {
                    fs.unlinkSync(res.result);
                }

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: imgBuffer,
                    caption:
                        `*[ 𝙵𝙰𝙺𝙴 𝙼𝙻𝙱𝙱 𝙻𝙾𝙱𝙱𝚈 ]*\n` +
                        `• *Username:* ${username}\n` +
                        `• *Rank:* ${rank.toUpperCase()}\n` +
                        `• *Border:* #${border}`
                }, { quoted: m });
            } catch (e) {
                console.error('[FAKEML ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙰𝙺𝙴𝙼𝙻 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "fakebca":
        case "bca": {
            // Khusus User Premium, Owner, atau Creator
            const isPremUser =
                isPremium ||
                isOwner ||
                isCreator ||
                premium.some(p => isSameUser(p, m.sender, participants));

            if (!isPremUser) {
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                return reply(
                    `*[ ⭐ 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝙾𝙽𝙻𝚈 ]*\n` +
                    `Fitur *${prefix}${command}* khusus untuk *User Premium*!\n` +
                    `Silakan hubungi Owner untuk upgrade ke akun Premium.`
                );
            }

            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            const hasImage = /image/.test(targetMime);

            // Simpan foto template BCA kosong (Khusus Owner/Creator, cukup 1x)
            if ((args[0] || '').toLowerCase() === 'setbg' || (args[0] || '').toLowerCase() === 'settemplate') {
                if (!isCreator && !isOwner) {
                    return reply(`*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*\nHanya Owner yang bisa menyimpan template utama BCA!`);
                }
                if (!hasImage) {
                    return reply(`*[ 🏦 𝚂𝙴𝚃 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝙱𝙲𝙰 ]*\nReply foto template BCA kosong dengan *${prefix}${command} setbg*!`);
                }
                try {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    await saveBcaTemplate(buffer);
                    return reply(`*[ ✅ 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝙱𝙲𝙰 𝚃𝙴𝚁𝚂𝙸𝙼𝙿𝙰𝙽 ]*\nTemplate bukti transfer BCA berhasil disimpan secara permanen! Sekarang user Premium bisa langsung memakai *${prefix}fakebca*.`);
                } catch (e) {
                    return reply(`*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
                }
            }

            if (!text || ['help', 'list', 'info'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ 🏦 𝙵𝙰𝙺𝙴 𝙱𝙲𝙰 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 𝚁𝙴𝙲𝙴𝙸𝙿𝚃 ]*\n` +
                    `Usage:\n` +
                    `*${prefix}${command} Nama Penerima | Nominal | [No. Rek Tujuan] | [Remarks/Berita] | [Rek Sumber] | [Tanggal]*\n\n` +
                    `*Contoh Cepat (Otomatis):*\n` +
                    `• *${prefix}${command} S. TYN | 5000000*\n\n` +
                    `*Contoh Lengkap:*\n` +
                    `• *${prefix}${command} S. TYN | 5000000 | 121 - 130 - 4001 | Kas adit 15/5 | 898 - 0** - **66*\n\n` +
                    `💡 _No. Rekening, Source of Fund, & Reference No. otomatis di-generate acak jika dikosongkan._`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const parts = text.split('|').map(s => s.trim());
                const name = parts[0] || 'S. TYN';
                const nominal = parts[1] || '5000000';
                const account = parts[2] || '';
                const remarks = parts[3] || '';
                const sourceFund = parts[4] || '';
                const dateStr = parts[5] || '';

                let customBgBuf = null;
                if (hasImage) {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    customBgBuf = buffer;
                }

                const outJpg = await generateFakeBca({
                    name,
                    nominal,
                    account,
                    remarks,
                    sourceFund,
                    dateStr,
                    templateBuffer: customBgBuf
                });

                const cleanNum = String(nominal).replace(/[^0-9]/g, '') || '5000000';
                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: outJpg,
                    caption:
                        `*[ 🏦 𝙵𝙰𝙺𝙴 𝙱𝙲𝙰 𝚁𝙴𝙲𝙴𝙸𝙿𝚃 ]*\n` +
                        `• *Beneficiary:* ${name.toUpperCase()}\n` +
                        `• *Amount:* IDR ${Number(cleanNum).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                }, { quoted: m });
            } catch (e) {
                console.error('[FAKEBCA ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙰𝙺𝙴𝙱𝙲𝙰 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "fakegopay":
        case "gopay": {
            // Cek apakah pengirim adalah Premium, Owner, atau Creator (mendukung resolusi @lid di grup)
            const isPremUser =
                isPremium ||
                isOwner ||
                isCreator ||
                premium.some(p => isSameUser(p, m.sender, participants));

            if (!isPremUser) {
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                return reply(
                    `*[ ⭐ 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝙾𝙽𝙻𝚈 ]*\n` +
                    `Fitur *${prefix}${command}* khusus untuk *User Premium*!\n` +
                    `Silakan hubungi Owner untuk upgrade ke akun Premium.`
                );
            }

            const targetNode = m.quoted ? m.quoted : m.msg;
            const targetMime = targetNode?.mimetype || m.mtype || '';
            const hasImage = /image/.test(targetMime);

            // Simpan foto template GoPay kosong (Khusus Owner/Creator)
            if ((args[0] || '').toLowerCase() === 'setbg' || (args[0] || '').toLowerCase() === 'settemplate') {
                if (!isCreator && !isOwner) {
                    return reply(`*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*\nHanya Owner yang bisa mengganti template utama GoPay!`);
                }
                if (!hasImage) {
                    return reply(`*[ 💳 𝚂𝙴𝚃 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝙶𝙾𝙿𝙰𝚈 ]*\nReply foto template GoPay kosong dengan *${prefix}${command} setbg*!`);
                }
                try {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    await saveGoPayTemplate(buffer);
                    return reply(`*[ ✅ 𝚃𝙴𝙼𝙿𝙻𝙰𝚃𝙴 𝙶𝙾𝙿𝙰𝚈 𝚃𝙴𝚁𝚂𝙸𝙼𝙿𝙰𝙽 ]*\nTemplate struk GoPay berhasil disimpan! Sekarang semua user Premium bisa langsung memakai *${prefix}fakegopay*.`);
                } catch (e) {
                    return reply(`*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
                }
            }

            if (!text || ['help', 'list', 'info'].includes((args[0] || '').toLowerCase())) {
                return reply(
                    `*[ 💳 𝙵𝙰𝙺𝙴 𝙶𝙾𝙿𝙰𝚈 𝚀𝚁𝙸𝚂 𝚁𝙴𝙲𝙴𝙸𝙿𝚃 ]*\n` +
                    `Usage:\n` +
                    `*${prefix}${command} Merchant | Nominal | [Kota] | [Alamat Lengkap] | [Terminal ID] | [Waktu] | [Tanggal]*\n\n` +
                    `*Contoh Cepat (Otomatis):*\n` +
                    `• *${prefix}${command} toko dewa warung madura | 6000*\n\n` +
                    `*Contoh Lengkap:*\n` +
                    `• *${prefix}${command} toko dewa warung madura | 6000 | BEKASI | Karangsatria, Tambun Utara, Bekasi, Jawa Barat, Indonesia | A02*\n\n` +
                    `💡 _ID Transaksi & Merchant PAN otomatis di-generate acak setiap pembuatan._`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const parts = text.split('|').map(s => s.trim());
                const merchant = parts[0] || 'toko dewa warung madura';
                const nominal = parts[1] || '6000';
                const location = parts[2] || 'BEKASI';
                const address = parts[3] || 'Karangsatria, Tambun Utara, Bekasi, Jawa Barat, Indonesia';
                const terminalId = parts[4] || 'A02';
                const waktu = parts[5] || '';
                const tanggal = parts[6] || '';

                let customBgBuf = null;
                if (hasImage) {
                    const stream = await downloadContentFromMessage(targetNode, 'image');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
                    customBgBuf = buffer;
                }

                const outJpg = await generateFakeGoPay({
                    merchant,
                    nominal,
                    location,
                    address,
                    terminalId,
                    waktu,
                    tanggal,
                    templateBuffer: customBgBuf
                });

                const cleanNum = String(nominal).replace(/[^0-9]/g, '') || '6000';
                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, {
                    image: outJpg,
                    caption:
                        `*[ 💳 𝙵𝙰𝙺𝙴 𝙶𝙾𝙿𝙰𝚈 𝚁𝙴𝙲𝙴𝙸𝙿𝚃 ]*\n` +
                        `• *Merchant:* ${merchant}\n` +
                        `• *Total:* Rp${Number(cleanNum).toLocaleString('id-ID')}\n` +
                        `• *Lokasi:* ${location.toUpperCase()}`
                }, { quoted: m });
            } catch (e) {
                console.error('[FAKEGOPAY ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙵𝙰𝙺𝙴𝙶𝙾𝙿𝙰𝚈 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "fakedana":
        case "faketransfer": {
            const parts = text.split('|').map(s => s.trim());
            if (!parts[0]) {
                return reply(`*[ 💸 𝙵𝙰𝙺𝙴 𝙳𝙰𝙽𝙰 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 ]*\nUsage: *${prefix}${command} <nominal> | <nama penerima> | <catatan>*\nContoh: *${prefix}${command} 1.500.000 | Budi Santoso | Bayar Utang*`);
            }
            try {
                const rawNom = parts[0].replace(/[^0-9]/g, '') || '500000';
                const nominalStr = 'Rp' + Number(rawNom).toLocaleString('id-ID');
                const receiver = (parts[1] || pushname || 'Penerima').replace(/[<>&"']/g, '').slice(0, 28);
                const note = (parts[2] || 'Kirim Uang').replace(/[<>&"']/g, '').slice(0, 35);
                const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
                const trxId = '2026' + Math.floor(100000000000 + Math.random() * 900000000000);

                const svgDana = `<svg width="650" height="920" xmlns="http://www.w3.org/2000/svg">
                    <rect width="650" height="920" fill="#f1f5f9"/>
                    <rect width="650" height="260" fill="#108ee9"/>
                    <text x="325" y="65" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">DANA</text>
                    <rect x="45" y="110" width="560" height="750" rx="24" fill="#ffffff"/>
                    <circle cx="325" cy="185" r="42" fill="#22c55e"/>
                    <path d="M307 185 L320 198 L345 172" stroke="#ffffff" stroke-width="7" fill="none" stroke-linecap="round"/>
                    <text x="325" y="265" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="#0f172a" text-anchor="middle">Transaksi Berhasil!</text>
                    <text x="325" y="300" font-family="Arial, sans-serif" font-size="17" fill="#64748b" text-anchor="middle">${dateStr} WIB</text>
                    <text x="325" y="375" font-family="Arial, sans-serif" font-size="46" font-weight="bold" fill="#0f172a" text-anchor="middle">${nominalStr}</text>
                    <line x1="85" y1="425" x2="565" y2="425" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6,6"/>
                    <text x="85" y="480" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Dikirim Kepada</text>
                    <text x="565" y="480" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="end">${receiver}</text>
                    <text x="85" y="535" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Metode Pembayaran</text>
                    <text x="565" y="535" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#108ee9" text-anchor="end">Saldo DANA</text>
                    <text x="85" y="590" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Biaya Admin</text>
                    <text x="565" y="590" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#22c55e" text-anchor="end">GRATIS</text>
                    <text x="85" y="645" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Catatan</text>
                    <text x="565" y="645" font-family="Arial, sans-serif" font-size="19" fill="#0f172a" text-anchor="end">${note}</text>
                    <line x1="85" y1="690" x2="565" y2="690" stroke="#e2e8f0" stroke-width="2"/>
                    <text x="85" y="740" font-family="Arial, sans-serif" font-size="17" fill="#94a3b8">ID Transaksi</text>
                    <text x="565" y="740" font-family="Arial, sans-serif" font-size="17" fill="#64748b" text-anchor="end">${trxId}</text>
                    <rect x="85" y="780" width="480" height="50" rx="12" fill="#eff6ff"/>
                    <text x="325" y="812" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#108ee9" text-anchor="middle">DANA Protection • 100% Aman</text>
                </svg>`;

                const imgBuf = await sharp(Buffer.from(svgDana)).jpeg({ quality: 92 }).toBuffer();
                await sock.sendMessage(m.chat, { image: imgBuf, caption: '*[ 💸 𝙵𝙰𝙺𝙴 𝙳𝙰𝙽𝙰 𝚁𝙴𝙲𝙴𝙸𝙿𝚃 ]*' }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝙵𝙰𝙺𝙴𝙳𝙰𝙽𝙰 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "tweet":
        case "fakeig": {
            const content = text || m.quoted?.text;
            if (!content) return reply(`*[ 🖌 ${command.toUpperCase()} MAKER ]*\nUsage: *${prefix}${command} <teks>* atau reply pesan seseorang!`);
            try {
                const targetSender = m.quoted?.sender || m.sender;
                const displayName = (m.quoted ? (m.quoted.pushName || targetSender.split('@')[0]) : pushname).replace(/[<>&"']/g, '').slice(0, 22);
                const username = '@' + displayName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15) || '@guts_user';
                const cleanTxt = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 220);

                const words = cleanTxt.split(/\s+/);
                const lines = [];
                let cur = '';
                for (const w of words) {
                    if ((cur + ' ' + w).trim().length <= 46) cur = (cur + ' ' + w).trim();
                    else { if (cur) lines.push(cur); cur = w; }
                }
                if (cur) lines.push(cur);

                const height = Math.max(320, 220 + lines.length * 38);
                const textSvg = lines.map((ln, i) => `<text x="45" y="${165 + i * 38}" font-family="Arial, sans-serif" font-size="26" fill="#f8fafc">${ln}</text>`).join('');

                const svgTweet = `<svg width="760" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="${height}" rx="28" fill="#0f172a"/>
                    <text x="135" y="72" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">${displayName}</text>
                    <circle cx="${150 + displayName.length * 13}" cy="64" r="11" fill="#38bdf8"/>
                    <path d="M${145 + displayName.length * 13} 64 L${149 + displayName.length * 13} 68 L${156 + displayName.length * 13} 60" stroke="#0f172a" stroke-width="3" fill="none"/>
                    <text x="135" y="100" font-family="Arial, sans-serif" font-size="18" fill="#64748b">${username}</text>
                    ${textSvg}
                    <line x1="45" y1="${height - 70}" x2="715" y2="${height - 70}" stroke="#1e293b" stroke-width="2"/>
                    <text x="45" y="${height - 30}" font-family="Arial, sans-serif" font-size="18" fill="#38bdf8">💬 1.2K   🔁 4.8K   ❤️ 29.5K   📊 412K Views</text>
                </svg>`;

                let baseImg = sharp(Buffer.from(svgTweet));
                try {
                    const ppUrl = await sock.profilePictureUrl(targetSender, 'image');
                    const ppRes = await axios.get(ppUrl, { responseType: 'arraybuffer', timeout: 8000 });
                    const mask = Buffer.from(`<svg width="72" height="72"><circle cx="36" cy="36" r="36" fill="#fff"/></svg>`);
                    const avatar = await sharp(Buffer.from(ppRes.data)).resize(72, 72).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
                    baseImg = baseImg.composite([{ input: avatar, left: 45, top: 42 }]);
                } catch (_) {
                    const fallbackCircle = Buffer.from(`<svg width="72" height="72"><circle cx="36" cy="36" r="36" fill="#38bdf8"/></svg>`);
                    baseImg = baseImg.composite([{ input: fallbackCircle, left: 45, top: 42 }]);
                }

                const outBuf = await baseImg.png().toBuffer();
                await sock.sendMessage(m.chat, { image: outBuf, caption: `*[ 🐦 ${command.toUpperCase()} POST ]*` }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝚃𝚆𝙴𝙴𝚃 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "carbon": {
            const rawCode = text || m.quoted?.text;
            if (!rawCode) return reply(`*[ 💻 𝙲𝙰𝚁𝙱𝙾𝙽 𝙲𝙾𝙳𝙴 𝙸𝙼𝙰𝙶𝙴 ]*\nUsage: *${prefix}carbon <kode/teks>* atau reply pesan berisi kode!`);
            try {
                const rawLines = rawCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').split('\n').slice(0, 18);
                const imgH = Math.max(260, 130 + rawLines.length * 32);
                const codeLinesSvg = rawLines.map((ln, i) =>
                    `<text x="45" y="${115 + i * 32}" font-family="Courier New, monospace" font-size="20" fill="#64748b">${i + 1}</text>` +
                    `<text x="90" y="${115 + i * 32}" font-family="Courier New, monospace" font-size="20" fill="#38bdf8">${ln.slice(0, 58)}</text>`
                ).join('');

                const svgCarbon = `<svg width="860" height="${imgH}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="860" height="${imgH}" rx="22" fill="#0f172a"/>
                    <rect x="18" y="18" width="824" height="${imgH - 36}" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
                    <circle cx="50" cy="50" r="9" fill="#ef4444"/>
                    <circle cx="78" cy="50" r="9" fill="#f59e0b"/>
                    <circle cx="106" cy="50" r="9" fill="#22c55e"/>
                    <text x="430" y="56" font-family="Courier New, monospace" font-size="16" fill="#94a3b8" text-anchor="middle">guts_snippet.js — GutS | MD</text>
                    ${codeLinesSvg}
                </svg>`;

                const outBuf = await sharp(Buffer.from(svgCarbon)).png().toBuffer();
                await sock.sendMessage(m.chat, { image: outBuf, caption: '*[ 💻 𝙲𝙰𝚁𝙱𝙾𝙽 𝚂𝙽𝙸𝙿𝙿𝙴𝚃 ]*' }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝙲𝙰𝚁𝙱𝙾𝙽 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

         case "bratvid": {
            const rawBrat = text || m.quoted?.text || '';
            const { text: bratText, theme, blur } = parseBratInput(rawBrat);

            if (!bratText) {
                return reply(
                    `*[ 🎬 𝙱𝚁𝙰𝚃 𝚅𝙸𝙳𝙴𝙾 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 ]*\n` +
                    `Usage: *${prefix}bratvid <teks/emoji>*\n\n` +
                    `*Opsi Tambahan (Opsional):*\n` +
                    `• Tema Hijau: *${prefix}bratvid <teks> --green*\n` +
                    `• Tema Hitam: *${prefix}bratvid <teks> --black*\n` +
                    `• Efek Blur (0-3): *${prefix}bratvid <teks> --blur 2*`
                );
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

                const webpBuf = await generateBratVideo({
                    text: bratText,
                    theme,
                    blur,
                    format: 'webp',
                    frameDuration: 0.4,
                    holdDuration: 1.2,
                    maxWordPerLayer: 1,
                    maxWordBeforeReset: [7, 8],
                    fastProgress: true
                });

                const finalSticker = addStickerExif(webpBuf, global.botname, global.namaown);
                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                await sock.sendMessage(m.chat, { sticker: finalSticker }, { quoted: m });
            } catch (e) {
                console.error('[BRATVID ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ 𝙱𝚁𝙰𝚃𝚅𝙸𝙳 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

              case "forex":
        case "fx": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (!Array.isArray(u.forexPositions)) u.forexPositions = [];

            const updatedFromWeb = await pullWebCryptoIfNewer(m.sender, rpg, u);
            if (!updatedFromWeb) {
                syncUserToFirebase(m.sender, u, { username: pushname }).catch(() => {});
            }

            const fxMarket = getForexPrices();
            const sub = (args[0] || '').toLowerCase();

            if (['open', 'buy', 'sell', 'long', 'short'].includes(sub)) {
                let pairKey = (args[1] || '').toLowerCase();
                let sideInput = (args[2] || '').toUpperCase();
                let marginAmt = parseInt(args[3]);
                let levAmt = parseInt(args[4]) || 10;
                let tpVal = parseFloat(args[5]) || 0;
                let slVal = parseFloat(args[6]) || 0;

                if (['long', 'short', 'buy', 'sell'].includes(sub) && fxMarket[pairKey]) {
                    sideInput = (sub === 'buy' || sub === 'long') ? 'LONG' : 'SHORT';
                    marginAmt = parseInt(args[2]);
                    levAmt = parseInt(args[3]) || 10;
                    tpVal = parseFloat(args[4]) || 0;
                    slVal = parseFloat(args[5]) || 0;
                } else {
                    if (sideInput === 'BUY') sideInput = 'LONG';
                    if (sideInput === 'SELL') sideInput = 'SHORT';
                }

                if (!fxMarket[pairKey] || !['LONG', 'SHORT'].includes(sideInput) || !marginAmt || marginAmt < 10000) {
                    return reply(
                        `*[ 📈📉 𝙵𝙾𝚁𝙴𝚇 𝙼𝙰𝚁𝙶𝙸𝙽 𝚃𝚁𝙰𝙳𝙸𝙽𝙶 ]*\n` +
                        `Format Buka Posisi:\n` +
                        `• *${prefix}forex open <pair> <long/short> <modal> <leverage>*\n\n` +
                        `*Contoh:*\n` +
                        `• *${prefix}forex open xau long 5000000 50*\n` +
                        `• *${prefix}forex open gbp short 10000000 100*\n\n` +
                        `*Pair Tersedia:* \`xau\` (Gold), \`eur\` (EUR/USD), \`gbp\` (GBP/JPY), \`idr\` (USD/IDR)\n` +
                        `*Leverage:* \`5\` s/d \`100\` (Min. Modal $10,000)`
                    );
                }

                if (u.forexPositions.length >= 5) {
                    return reply('*[ ⚠️ 𝙼𝙰𝙺𝚂𝙸𝙼𝙰𝙻 𝙿𝙾𝚂𝙸𝚂𝙸 ]*\nKamu maksimal membuka 5 posisi Forex sekaligus! Tutup posisi lama dengan *.forex close <nomor>*.');
                }

                levAmt = Math.min(100, Math.max(2, levAmt));
                if (u.money < marginAmt) {
                    return reply(`*[ ❌ 𝙼𝙰𝚁𝙶𝙸𝙽 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nUangmu ($${u.money.toLocaleString()}) tidak cukup untuk membuka posisi sebesar *$${marginAmt.toLocaleString()}*!`);
                }

                const fx = fxMarket[pairKey];
                const entryPrice = fx.price;
                const liqPrice = sideInput === 'LONG'
                    ? Number((entryPrice * (1 - (0.95 / levAmt))).toFixed(fx.dec))
                    : Number((entryPrice * (1 + (0.95 / levAmt))).toFixed(fx.dec));

                u.money -= marginAmt;
                const newPos = {
                    id: 'FX' + Date.now().toString(36).toUpperCase(),
                    pairKey,
                    pair: fx.pair,
                    side: sideInput,
                    margin: marginAmt,
                    leverage: levAmt,
                    entryPrice,
                    liqPrice,
                    tp: tpVal > 0 ? tpVal : null,
                    sl: slVal > 0 ? slVal : null,
                    openedAt: Date.now()
                };

                u.forexPositions.push(newPos);
                saveRpgDB(rpg);
                await syncUserToFirebase(m.sender, u, { username: pushname });

                return reply(
                    `*[ ⚡ 𝙵𝙾𝚁𝙴𝚇 𝙿𝙾𝚂𝙸𝚃𝙸𝙾𝙽 𝙾𝙿𝙴𝙽𝙴𝙳! ]*\n\n` +
                    `• *ID:* \`${newPos.id}\`\n` +
                    `• *Instrumen:* ${fx.pair} (${fx.name})\n` +
                    `• *Posisi:* ${sideInput === 'LONG' ? '🟢 LONG (BUY)' : '🔴 SHORT (SELL)'} **${levAmt}x**\n` +
                    `• *Margin Modal:* $${marginAmt.toLocaleString()}\n` +
                    `• *Ukuran Kontrak:* $${(marginAmt * levAmt).toLocaleString()}\n` +
                    `• *Harga Entry:* ${entryPrice}\n` +
                    `• *💀 Harga Margin Call (MC):* **${liqPrice}**\n\n` +
                    `_Pantau grafik live & tutup posisi kapan saja lewat *.forex close <no>* atau di Web GutS Exchange!_`
                );
            }

            if (['close', 'tutup', 'cair'].includes(sub)) {
                if (u.forexPositions.length === 0) {
                    return reply('*[ 📊 𝙵𝙾𝚁𝙴𝚇 ]*\nKamu tidak memiliki posisi Forex yang sedang terbuka.');
                }

                const targetArg = (args[1] || '1').toLowerCase();
                if (targetArg === 'all' || targetArg === 'semua') {
                    let totalReturned = 0;
                    let totalPnl = 0;
                    for (const pos of u.forexPositions) {
                        const fx = fxMarket[pos.pairKey];
                        const st = calcForexPosition(pos, fx ? fx.price : pos.entryPrice);
                        totalReturned += st.equity;
                        totalPnl += st.pnlUsd;
                    }
                    const count = u.forexPositions.length;
                    u.forexPositions = [];
                    u.money += totalReturned;
                    saveRpgDB(rpg);
                    await syncUserToFirebase(m.sender, u, { username: pushname });

                    return reply(
                        `*[ 💰 𝙲𝙻𝙾𝚂𝙴𝙳 𝙰𝙻𝙻 𝙵𝙾𝚁𝙴𝚇 𝙿𝙾𝚂𝙸𝚃𝙸𝙾𝙽𝚂 (${count}) ]*\n` +
                        `• *Total PnL Bersih:* ${totalPnl >= 0 ? `🟢 +$${totalPnl.toLocaleString()}` : `🔴 -$${Math.abs(totalPnl).toLocaleString()}`}\n` +
                        `• *Total Cair ke Dompet:* *$${totalReturned.toLocaleString()}*\n` +
                        `• *Saldo Money Sekarang:* $${u.money.toLocaleString()}`
                    );
                }

                const idx = parseInt(targetArg) - 1;
                if (isNaN(idx) || idx < 0 || idx >= u.forexPositions.length) {
                    return reply(`*[ ❌ 𝙽𝙾𝙼𝙾𝚁 𝙿𝙾𝚂𝙸𝚂𝙸 𝚂𝙰𝙻𝙰𝙷 ]*\nKetik *${prefix}forex close 1* (sesuai nomor urut di *.forex*) atau *${prefix}forex close all*.`);
                }

                const pos = u.forexPositions[idx];
                const fx = fxMarket[pos.pairKey];
                const curP = fx ? fx.price : pos.entryPrice;
                const st = calcForexPosition(pos, curP);

                u.forexPositions.splice(idx, 1);
                u.money += st.equity;
                saveRpgDB(rpg);
                await syncUserToFirebase(m.sender, u, { username: pushname });

                return reply(
                    `*[ ✅ 𝙵𝙾𝚁𝙴𝚇 𝙿𝙾𝚂𝙸𝚃𝙸𝙾𝙽 𝙲𝙻𝙾𝚂𝙴𝙳 ]*\n\n` +
                    `• *Pair:* ${pos.pair} (${pos.side} ${pos.leverage}x)\n` +
                    `• *Harga Entry ➔ Close:* ${pos.entryPrice} ➔ ${curP}\n` +
                    `• *Modal Awal:* $${Number(pos.margin).toLocaleString()}\n` +
                    `• *PnL (ROE):* ${st.pnlUsd >= 0 ? `🟢 +$${st.pnlUsd.toLocaleString()} (+${st.roePct}%)` : `🔴 -$${Math.abs(st.pnlUsd).toLocaleString()} (${st.roePct}%)`}\n` +
                    `• *Total Cair:* *$${st.equity.toLocaleString()}*\n` +
                    `• *Saldo Money:* $${u.money.toLocaleString()}`
                );
            }

            let txt = `*[ 💱📊 𝙶𝚄𝚃𝚂 𝙵𝙾𝚁𝙴𝚇 & 𝙶𝙾𝙻𝙳 DERIVATIVES ]*\n_Harga bergerak cepat setiap 1 menit!_\n\n`;
            for (const [k, v] of Object.entries(fxMarket)) {
                const up = Number(v.change) >= 0;
                txt += `• *${v.pair}* — ${v.name}\n  Harga: *${v.price}* (${up ? '🟢 +' : '🔴 '}${v.change}%) | Kode: \`${k}\`\n`;
            }

            txt += `\n*╭─〔 📂 POSISI AKTIF KAMU (${u.forexPositions.length}/5) 〕*\n`;
            if (u.forexPositions.length === 0) {
                txt += `│ _Belum ada posisi terbuka._\n`;
            } else {
                u.forexPositions.forEach((pos, i) => {
                    const fx = fxMarket[pos.pairKey];
                    const curP = fx ? fx.price : pos.entryPrice;
                    const st = calcForexPosition(pos, curP);
                    const pnlStr = st.pnlUsd >= 0 ? `🟢 +$${st.pnlUsd.toLocaleString()} (+${st.roePct}%)` : `🔴 -$${Math.abs(st.pnlUsd).toLocaleString()} (${st.roePct}%)`;
                    txt +=
                        `│ *${i + 1}. ${pos.pair}* [${pos.side} ${pos.leverage}x]\n` +
                        `│    • Modal: $${Number(pos.margin).toLocaleString()} | Entry: ${pos.entryPrice}\n` +
                        `│    •Sekarang: ${curP} | 💀 MC: ${Number(st.liqPrice).toFixed(fx?.dec ?? 2)}\n` +
                        `│    • Floating PnL: *${pnlStr}*\n`;
                });
            }
            txt += `*╰────────────────────────*\n\n`;
            txt += `*Cara Trading Forex:*\n`;
            txt += `• *${prefix}forex open <kode> <long/short> <modal> <lev>*\n`;
            txt += `• *${prefix}forex close <nomor/all>*`;
            return reply(txt);
        }
        break;

                // ── RPG CRYPTO MARKET ──
        case "crypto":
        case "saham": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const updatedFromWeb = await pullWebCryptoIfNewer(m.sender, rpg, u);
            if (!updatedFromWeb) {
                syncUserToFirebase(m.sender, u, { username: pushname }).catch(() => {});
            }
            const market = getCryptoPrices();
            const sub = (args[0] || '').toLowerCase();
            const coin = (args[1] || '').toLowerCase();
            const amount = parseFloat(args[2]);

            if (sub === 'buy' || sub === 'beli') {
                if (!market[coin] || !amount || amount <= 0) {
                    return reply(`*[ 📈 𝙲𝚁𝚈𝙿𝚃𝙾 𝙱𝚄𝚈 ]*\nKoin tersedia: *guts, btc, eth, sol*\nContoh: *${prefix}crypto buy guts 5*`);
                }
                const totalCost = Math.ceil(market[coin].price * amount);
                if (u.money < totalCost) {
                    return reply(`*[ ❌ 𝚂𝙰𝙻𝙳𝙾 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nHarga ${amount} ${coin.toUpperCase()} adalah *$${totalCost.toLocaleString()}*, sedangkan uangmu *$${u.money.toLocaleString()}*!`);
                }
                u.money -= totalCost;
                u.crypto[coin] = Number(((u.crypto[coin] || 0) + amount).toFixed(4));
                saveRpgDB(rpg);
                await syncUserToFirebase(m.sender, u, { username: pushname });

                return reply(`*[ ✅ 𝙱𝚄𝚈 𝙲𝚁𝚈𝙿𝚃𝙾 𝚂𝚄𝙲𝙲𝙴𝚂𝚂 ]*\n• *Koin:* ${market[coin].name}\n• *Jumlah:* +${amount} ${coin.toUpperCase()}\n• *Total Beli:* $${totalCost.toLocaleString()}\n• *Sisa Money:* $${u.money.toLocaleString()}`);
            }

            if (sub === 'sell' || sub === 'jual') {
                if (!market[coin] || !amount || amount <= 0) {
                    return reply(`*[ 📉 𝙲𝚁𝚈𝙿𝚃𝙾 𝚂𝙴𝙻𝙻 ]*\nContoh: *${prefix}crypto sell guts 5*`);
                }
                if ((u.crypto[coin] || 0) < amount) {
                    return reply(`*[ ❌ 𝙺𝙾𝙸𝙽 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nKamu hanya punya *${u.crypto[coin] || 0} ${coin.toUpperCase()}* di portofoliomu!`);
                }
                const totalGain = Math.floor(market[coin].price * amount);
                u.crypto[coin] = Number((u.crypto[coin] - amount).toFixed(4));
                u.money += totalGain;
                saveRpgDB(rpg);
                await syncUserToFirebase(m.sender, u, { username: pushname });
                return reply(`*[ 💰 𝚂𝙴𝙻𝙻 𝙲𝚁𝚈𝙿𝚃𝙾 𝚂𝚄𝙲𝙲𝙴𝚂𝚂 ]*\n• *Terjual:* ${amount} ${coin.toUpperCase()}\n• *Diterima:* +$${totalGain.toLocaleString()}\n• *Total Money:* $${u.money.toLocaleString()}`);
            }

            let listTxt = `*[ 📊 𝙶𝚄𝚃𝚂 𝙲𝚁𝚈𝙿𝚃𝙾 𝙴𝚇𝙲𝙷𝙰𝙽𝙶𝙴 ]*\n_Harga berubah otomatis setiap 5 menit!_\n\n`;
            for (const [k, v] of Object.entries(market)) {
                const arrow = Number(v.change) >= 0 ? '🟢 +' : '🔴 ';
                listTxt += `• *${v.name} (${k.toUpperCase()})*\n  Harga: *$${v.price.toLocaleString()}* (${arrow}${v.change}%)\n  Milikmu: *${u.crypto[k] || 0} ${k.toUpperCase()}*\n\n`;
            }
            listTxt += `*Cara Trading (Via WA):*\n• *${prefix}crypto buy <koin> <jml>*\n• *${prefix}crypto sell <koin> <jml>*\n\n_Atau pantau grafik live & trading lebih mudah lewat Web Exchange kita!_`;

            try {
                const interactiveMsg = {
                    body: { text: listTxt },
                    footer: { text: "GutS | MD Crypto Exchange" },
                    header: { hasMediaAttachment: false },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🌐 Buka GutS Exchange",
                                    url: "https://guts-exchange-nine.vercel.app",
                                    merchant_url: "https://guts-exchange-nine.vercel.app"
                                })
                            }
                        ],
                        messageParamsJson: "{}"
                    }
                };

                const genMsg = generateWAMessageFromContent(m.chat, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: interactiveMsg
                        }
                    }
                }, { userJid: m.chat, quoted: m });

                return await sock.relayMessage(m.chat, genMsg.message, { messageId: genMsg.key.id });
            } catch (e) {
                // Fallback kalau WA-nya nggak dukung tombol interaktif
                return reply(listTxt + '\n\n🌐 *Website:* https://guts-exchange-nine.vercel.app');
            }
        }
        break;

        case "pet":
        case "adopt": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const sub = (args[0] || '').toLowerCase();

            const petCatalog = {
                kucing: { name: '🐱 Kucing Oren', cost: 10000, bonus: 1500 },
                anjing: { name: '🐶 Anjing Husky', cost: 25000, bonus: 3500 },
                serigala: { name: '🐺 Serigala Perak', cost: 50000, bonus: 7500 },
                naga: { name: '🐉 Naga Kosmik', cost: 120000, bonus: 18000 }
            };

            if (command === 'adopt' || sub === 'adopt' || sub === 'beli') {
                const choice = command === 'adopt' ? sub : (args[1] || '').toLowerCase();
                if (!petCatalog[choice]) {
                    return reply(
                        `*[ 🐾 𝙰𝙳𝙾𝙿𝚃 𝙿𝙴𝚃 𝚂𝙷𝙾𝙿 ]*\n` +
                        `• *kucing* — $10,000 (+Bonus $1,500/feed)\n` +
                        `• *anjing* — $25,000 (+Bonus $3,500/feed)\n` +
                        `• *serigala* — $50,000 (+Bonus $7,500/feed)\n` +
                        `• *naga* — $120,000 (+Bonus $18,000/feed)\n\n` +
                        `Ketik: *${prefix}adopt <nama_pet>*`
                    );
                }
                if (u.money < petCatalog[choice].cost) {
                    return reply(`*[ 🐾 𝙰𝙳𝙾𝙿𝚃 ]*\nUangmu tidak cukup! Butuh *$${petCatalog[choice].cost.toLocaleString()}*.`);
                }
                u.money -= petCatalog[choice].cost;
                u.pet = { type: choice, level: 1, exp: 0, lastFeed: 0 };
                saveRpgDB(rpg);
                return reply(`*[ 🎉 𝙿𝙴𝚃 𝙰𝙳𝙾𝙿𝚃𝙴𝙳! ]*\nSelamat! Kamu telah mengadopsi *${petCatalog[choice].name}*!\nKetik *${prefix}pet feed* untuk memberi makan & mengambil hasil buruan petmu!`);
            }

            if (!u.pet?.type) {
                return reply(`*[ 🐾 𝚈𝙾𝚄𝚁 𝙿𝙴𝚃 ]*\nKamu belum punya peliharaan! Ketik *${prefix}adopt* untuk melihat daftar Pet.`);
            }

            const myPet = petCatalog[u.pet.type];
            if (sub === 'feed' || sub === 'makan') {
                const now = Date.now();
                const cd = 180000;
                if (now - (u.pet.lastFeed || 0) < cd) {
                    const rem = Math.ceil((cd - (now - u.pet.lastFeed)) / 1000);
                    return reply(`*[ 🐾 𝙿𝙴𝚃 𝙺𝙴𝙽𝚈𝙰𝙽𝙶 ]*\n${myPet.name} masih kenyang! Tunggu *${rem} detik* lagi.`);
                }
                if (u.ikan < 1) {
                    return reply(`*[ 🐟 𝙱𝚄𝚃𝚄𝙷 𝙸𝙺𝙰𝙽 ]*\nKamu butuh minimal *1 Ikan* hasil *.mancing* untuk memberi makan Pet!`);
                }
                u.ikan -= 1;
                u.pet.lastFeed = now;
                u.pet.exp += 50;
                if (u.pet.exp >= u.pet.level * 150) u.pet.level += 1;

                const moneyFound = myPet.bonus * u.pet.level;
                u.money += moneyFound;
                saveRpgDB(rpg);
                return reply(`*[ 🍖 𝙿𝙴𝚃 𝙵𝙴𝙳 & 𝚃𝚁𝙴𝙰𝚂𝚄𝚁𝙴! ]*\nKamu memberi makan 1 Ikan ke *${myPet.name} (Lv.${u.pet.level})*!\nPetmu kembali membawa harta karun sebesar *+$${moneyFound.toLocaleString()} Money*!`);
            }

            return reply(
                `*[ 🐾 𝙿𝙴𝚃 𝚂𝚃𝙰𝚃𝚄𝚂 ]*\n` +
                `• *Pet:* ${myPet.name}\n` +
                `• *Level:* ${u.pet.level} (✨ ${u.pet.exp}/${u.pet.level * 150} EXP)\n` +
                `• *Income/Feed:* +$${(myPet.bonus * u.pet.level).toLocaleString()}\n\n` +
                `Ketik *${prefix}pet feed* untuk memberi makan (1 Ikan) & klaim uang dari Pet!`
            );
        }
        break;

        // ── GAME TEBAK BOM & SUIT PVP ──
        case "tebakbom": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nMainkan Tebak Bom di dalam grup!');
            if (tebakBomSessions[from]) return reply('*[ 💣 𝚃𝙴𝙱𝙰𝙺 𝙱𝙾𝙼 ]*\nMasih ada sesi Tebak Bom yang aktif di grup ini!');

            const bombIdx = Math.floor(Math.random() * 9);
            const board = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
            tebakBomSessions[from] = {
                player: m.sender,
                bomb: bombIdx,
                board,
                opened: []
            };

            const viewBoard = `${board.slice(0,3).join('')}\n${board.slice(3,6).join('')}\n${board.slice(6,9).join('')}`;
            return reply(`*[ 💣 𝚃𝙴𝙱𝙰𝙺 𝙱𝙾𝙼  dimulai! ]*\n*Player:* @${m.sender.split('@')[0]}\n\n${viewBoard}\n\nKetik angka *1 - 9* secara langsung di chat (tanpa titik) untuk membuka kotak yang aman!`);
        }
        break;

        case "rebirth":
        case "rb": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            
            const currentR = u.rebirth || 0;
            // Harga: 1 Kuintiliun, 100 Kuintiliun, 10 Sekstiliun, 1 Septiliun
            const costs = [1e18, 1e20, 1e22, 1e24];
            const rbTitles = ["Free User", "Vanguard of Wealth", "Cosmic Emperor", "Omniscient Being", "Astral Overlord"];
            
            if (currentR >= costs.length) {
                return reply(`*[ 🌌 𝚁𝙴𝙱𝙸𝚁𝚃𝙷 𝙼𝙰𝚇 ]*\nKamu sudah mencapai tingkat dewa tertinggi! Tidak ada alam semesta lagi yang bisa kamu beli.`);
            }
            
            const nextCost = costs[currentR];
            
            if (u.money < nextCost) {
                return reply(
                    `*[ 🌌 𝚁𝙴𝙱𝙸𝚁𝚃𝙷 𝚂𝚈𝚂𝚃𝙴𝙼 (𝚃𝙸𝙴𝚁 ${currentR + 1}) ]*\n` +
                    `Syarat mutlak untuk naik tahta:\n` +
                    `• *Biaya Pengorbanan:* $${nextCost.toLocaleString('en-US')}\n` +
                    `• *Uangmu Saat Ini:* $${u.money.toLocaleString('en-US')}\n\n` +
                    `_Kumpulkan lebih banyak uang untuk mencapai pencerahan!_`
                );
            }
            
            // Eksekusi Rebirth: Reset semua harta menjadi 0
            u.money = 0;
            u.exp = 0;
            u.level = 1;
            u.ikan = 0; u.batu = 0; u.besi = 0; u.emas = 0;
            u.crypto = { guts: 0, btc: 0, eth: 0, sol: 0 };
            u.forexPositions = [];
            
            // Berikan Buff & Status
            u.rebirth = currentR + 1;
            u.limit = 50 + (u.rebirth * 50); // Limit Harian nambah +50 tiap tier
            const newTitle = rbTitles[u.rebirth];
            
            saveRpgDB(rpg);
            await syncUserToFirebase(m.sender, u, { username: pushname });
            
            const txt = `*[ 🌌 𝚁𝙴𝙱𝙸𝚁𝚃𝙷 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻! ]*\n\n` +
                `@${m.sender.split('@')[0]} telah membakar $${nextCost.toLocaleString('en-US')} miliknya demi mencapai pencerahan abadi!\n\n` +
                `🎉 *Status Baru:* ${newTitle} (Rebirth ${u.rebirth})\n` +
                `🎁 *Buff Permanen Aktif:*\n` +
                `• Semua Income RPG dikali *x${Math.pow(2, u.rebirth)}*\n` +
                `• Kapasitas Harian menjadi *${u.limit} Limit*\n` +
                `• 🌟 Kartu *.profile* berubah menjadi Animasi Eksklusif!\n\n` +
                `_Seluruh aset duniawi telah di-reset. Selamat memulai era baru sebagai Dewa!_`;
                
            return sock.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m });
        }
        break;

                // ── PROFILE CARD (.profile / .me) DENGAN RENDER SHARP ──
        
        case "profile":
        case "me": {
            try {
                const target = getTargetUser(m, args, participants, sock, botNumber) || m.sender;
                const rpg = getRpgDB();
                const u = initUserRpg(rpg, target);
                
                pullWebCryptoIfNewer(target, rpg, u).catch(() => {});

                const sortedLb = Object.entries(rpg)
                    .map(([jid, data]) => ({ jid, money: data.money || 0 }))
                    .sort((a, b) => b.money - a.money);
                const rankIdx = sortedLb.findIndex(x => x.jid === target);
                const rankStr = rankIdx !== -1 ? "#" + (rankIdx + 1) + " / " + sortedLb.length : "-";

                const rbLvl = u.rebirth || 0;
                const rbTitles = ["Free User", "Vanguard of Wealth", "Cosmic Emperor", "Omniscient Being", "Astral Overlord"];
                
                const isTargetCreator = [botNumber, ...(global.owner || []), ...(typeof ownerbot !== 'undefined' ? ownerbot : [])]
                    .map(v => String(v).replace(/[^0-9]/g, '') + '@s.whatsapp.net')
                    .includes(target);
                const isTargetOwner = (typeof ownerbot !== 'undefined' ? ownerbot : []).includes(target);
                const isTargetPrem = (typeof premium !== 'undefined' ? premium : []).includes(target);
                
           let roleStatus = isTargetCreator ? 'Creator' : isTargetOwner ? 'Owner' : isTargetPrem ? 'Premium' : rbTitles[rbLvl] || 'Free User';
                if (rbLvl > 0 && !isTargetCreator && !isTargetOwner) {
                    roleStatus = rbTitles[rbLvl] || "Rebirth " + rbLvl;
                }

                // Kalkulasi batas limit & Auto-Koreksi
                let baseCap = u.limitCapacity || 50;
                let maxLimit = baseCap + (rbLvl * 50);
                
                if (!isTargetCreator && !isTargetOwner && !isTargetPrem && u.limit > maxLimit) {
                    u.limit = maxLimit; // Pangkas limit yang kelebihan (Bug Fix)
                    saveRpgDB(rpg);
                }

                const limitStr = (isTargetCreator || isTargetOwner || isTargetPrem) ? 'Unlimited' : (rbLvl > 0 ? `${u.limit} / ${maxLimit} (VIP)` : `${u.limit} / ${maxLimit}`);

                const compact = n => {
                    let num = Number(n) || 0;
                    if (num >= 1e18) return (num / 1e18).toFixed(2).replace(/\.?0+$/, '') + ' Knt';
                    if (num >= 1e15) return (num / 1e15).toFixed(2).replace(/\.?0+$/, '') + ' Kdr';
                    if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.?0+$/, '') + ' T';
                    if (num >= 1e9)  return (num / 1e9).toFixed(2).replace(/\.?0+$/, '') + ' B';
                    if (num >= 1e6)  return (num / 1e6).toFixed(2).replace(/\.?0+$/, '') + ' M';
                    if (num >= 1e3)  return (num / 1e3).toFixed(1).replace(/\.?0+$/, '') + ' K';
                    return String(num);
                };


                const targetName = String(target === m.sender ? pushname : target.split('@')[0]).replace(/[<>&"']/g, '');
                
                let safeLevel = u.level || 1;
                if (safeLevel < 1) safeLevel = 1;
                const nextLevelExp = safeLevel * 250;
                let expPct = (u.exp || 0) / nextLevelExp;
                if (isNaN(expPct) || expPct < 0) expPct = 0;
                if (expPct > 1) expPct = 1;
                const barW = Math.max(expPct > 0 ? 14 : 0, Math.round(570 * expPct));

                const AV = 180;
                let avatarBuf = null;
                try {
                    const ppUrl = await sock.profilePictureUrl(target, 'image');
                    const ppRes = await axios.get(ppUrl, { responseType: 'arraybuffer', timeout: 5000 });
                    avatarBuf = await sharp(Buffer.from(ppRes.data)).resize(AV, AV, { fit: 'cover' }).png().toBuffer();
                } catch (_) {
                    try {
                        avatarBuf = await sharp('./lib/media/thumb.jpg').resize(AV, AV, { fit: 'cover' }).png().toBuffer();
                    } catch (__) {}
                }

                const W = 900, H = 380;
                
                // CORE SVG SESUAI DESAIN HTML LU
                const getSvgFrame = (px1, py1, px2, py2, fOp1, fOp2, fOp3, coreOp, shineX, rbShineX, embersSvg) => `
                <svg width="${W}" height="${H}" viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stop-color="#0b1020"/><stop offset=".55" stop-color="#111a35"/><stop offset="1" stop-color="#1b1442"/>
                        </linearGradient>
                        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#facc15"/><stop offset="1" stop-color="#b45309"/>
                        </linearGradient>
                        <linearGradient id="ppSpin" x1="${px1}\%" y1="${py1}%" x2="${px2}\%" y2="${py2}%">
                            <stop offset="0" stop-color="#facc15"/><stop offset=".25" stop-color="#ea580c"/>
                            <stop offset=".5" stop-color="#fff"/><stop offset=".75" stop-color="#ea580c"/><stop offset="1" stop-color="#facc15"/>
                        </linearGradient>
                        <linearGradient id="nameGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stop-color="#fff7d6"/><stop offset=".6" stop-color="#fde68a"/><stop offset="1" stop-color="#facc15"/>
                        </linearGradient>
                        <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#a78bfa"/>
                        </linearGradient>
                        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
                        </linearGradient>
                        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".06"/>
                        </pattern>
                        <clipPath id="clip"><rect width="900" height="380" rx="28"/></clipPath>
                        <clipPath id="barClip"><rect x="280" y="168" width="570" height="14" rx="7"/></clipPath>
                        <clipPath id="rbClip"><rect x="690" y="100" width="170" height="32" rx="16"/></clipPath>
                        
                        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="8"/></filter>
                    </defs>

                    <g clip-path="url(#clip)">
                        <rect width="900" height="380" fill="url(#bg)"/>
                        <rect width="900" height="380" fill="url(#dots)"/>

                        <!-- 4 LAPIS API MENARI (Dikalkulasi dari Node.js karena sharp buta CSS) -->
                        <rect width="900" height="380" rx="28" fill="none" stroke="#c2410c" stroke-width="36" filter="url(#soft)" opacity="${fOp1}"/>
                        <rect width="900" height="380" rx="28" fill="none" stroke="#ea580c" stroke-width="26" filter="url(#soft)" opacity="${fOp2}"/>
                        <rect width="900" height="380" rx="28" fill="none" stroke="#facc15" stroke-width="14" filter="url(#soft)" opacity="${fOp3}"/>
                        <rect width="900" height="380" rx="28" fill="none" stroke="#fef9c3" stroke-width="5" opacity="${coreOp}"/>

                        <!-- Percikan Bara -->
                        ${embersSvg}

                        <rect x="0" y="0" width="8" height="380" fill="url(#accent)"/>
                    </g>

                    <rect x="2" y="2" width="896" height="376" rx="26" fill="none" stroke="#fef08a" stroke-width="2" opacity="${coreOp}"/>

                    <!-- Cincin PP -->
                    <circle cx="140" cy="150" r="108" fill="#f97316" opacity=".25" filter="url(#soft)"/>
                    <circle cx="140" cy="150" r="102" fill="none" stroke="url(#ppSpin)" stroke-width="7"/>
                    <circle cx="140" cy="150" r="98" fill="none" stroke="#fff" stroke-width="1.5" stroke-opacity=".85"/>

                    <rect x="50" y="272" width="180" height="34" rx="17" fill="url(#accent)"/>
                    <rect x="50" y="272" width="180" height="34" rx="17" fill="none" stroke="#fff" stroke-opacity=".5"/>
                    <text x="140" y="294" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="13" font-weight="800" letter-spacing="1.8" fill="#0b1020">${roleStatus.toUpperCase()}</text>

                    <text x="280" y="82" font-family="Segoe UI, sans-serif" font-size="38" font-weight="800" fill="url(#nameGold)">${targetName.slice(0, 20)}</text>
                    <text x="280" y="110" font-family="Segoe UI, sans-serif" font-size="15" fill="#94a3b8">@${target.split('@')[0]}</text>

                    <rect x="690" y="40" width="170" height="52" rx="14" fill="#fff" fill-opacity=".06" stroke="#facc15" stroke-opacity=".45"/>
                    <text x="775" y="60" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#94a3b8">GLOBAL RANK</text>
                    <text x="775" y="82" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="18" font-weight="800" fill="#facc15">${rankStr}</text>

                    ${rbLvl > 0 ? `
                    <g>
                        <rect x="690" y="100" width="170" height="32" rx="16" fill="#2a1505" fill-opacity=".85" stroke="url(#accent)" stroke-width="1.5"/>
                        <g clip-path="url(#rbClip)">
                            <rect x="${rbShineX}" y="100" width="50" height="32" fill="url(#shine)" opacity=".5"/>
                        </g>
                        <g transform="translate(702 107) scale(.75)" fill="#f97316" stroke="#fde68a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="${fOp3}">
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                        </g>
                        <g transform="translate(822 107) scale(.75)" fill="#f97316" stroke="#fde68a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="${fOp2}">
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                        </g>
                        <text x="775" y="121.5" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="14" font-weight="900" letter-spacing="3.5" fill="url(#nameGold)">REBIRTH ${rbLvl}</text>
                    </g>
                    ` : ''}

                    <text x="280" y="156" font-family="Segoe UI, sans-serif" font-size="15" font-weight="700" letter-spacing="2" fill="#e2e8f0">LEVEL ${safeLevel}</text>
                    <text x="850" y="156" text-anchor="end" font-family="Segoe UI, sans-serif" font-size="14" fill="#94a3b8">${u.exp || 0} / ${nextLevelExp} EXP  •  ${Math.round(expPct * 100)}%</text>
                    <rect x="280" y="168" width="570" height="14" rx="7" fill="#fff" fill-opacity=".08"/>
                    <rect x="280" y="168" width="${barW}" height="14" rx="7" fill="url(#bar)"/>
                    
                    <g clip-path="url(#barClip)">
                        <rect x="${shineX}" y="168" width="120" height="14" fill="url(#shine)"/>
                    </g>

                    <g font-family="Segoe UI, sans-serif">
                        <rect x="280" y="215" width="132" height="82" rx="16" fill="#fff" fill-opacity=".05" stroke="#4ade80" stroke-opacity=".3"/>
                        <rect x="296" y="231" width="22" height="3" rx="1.5" fill="#4ade80"/>
                        <text x="296" y="256" font-size="11" font-weight="600" letter-spacing="2" fill="#94a3b8">MONEY</text>
                        <text x="296" y="284" font-size="${compact(u.money).length > 6 ? 20 : 22}" font-weight="700" fill="#4ade80">$${compact(u.money)}</text>
                        
                        <rect x="426" y="215" width="132" height="82" rx="16" fill="#fff" fill-opacity=".05" stroke="#22d3ee" stroke-opacity=".3"/>
                        <rect x="442" y="231" width="22" height="3" rx="1.5" fill="#22d3ee"/>
                        <text x="442" y="256" font-size="11" font-weight="600" letter-spacing="2" fill="#94a3b8">DIAMOND</text>
                        <text x="442" y="284" font-size="26" font-weight="700" fill="#22d3ee">${compact(u.diamond)}</text>
                        
                        <rect x="572" y="215" width="132" height="82" rx="16" fill="#fff" fill-opacity=".05" stroke="#facc15" stroke-opacity=".35"/>
                        <rect x="588" y="231" width="22" height="3" rx="1.5" fill="#facc15"/>
                        <text x="588" y="256" font-size="11" font-weight="600" letter-spacing="2" fill="#94a3b8">LIMIT</text>
                        <text x="588" y="284" font-size="18" font-weight="700" fill="#facc15">${typeof u.limit === 'number' ? String(u.limit) : limitStr}</text>
                        
                        <rect x="718" y="215" width="132" height="82" rx="16" fill="#fff" fill-opacity=".05" stroke="#f472b6" stroke-opacity=".3"/>
                        <rect x="734" y="231" width="22" height="3" rx="1.5" fill="#f472b6"/>
                        <text x="734" y="256" font-size="11" font-weight="600" letter-spacing="2" fill="#94a3b8">POTION</text>
                        <text x="734" y="284" font-size="26" font-weight="700" fill="#f472b6">${compact(u.potion)}</text>
                    </g>

                    <text x="280" y="336" font-family="Segoe UI, sans-serif" font-size="13" fill="#94a3b8">Fish ${u.ikan}   •   Stone ${u.batu}   •   Iron ${u.besi}   •   Gold ${u.emas}   •   Bait ${u.umpan}</text>
                </svg>`;

                  const captionText = `*[ 👤 𝚄𝚂𝙴𝚁 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝙲𝙰𝚁𝙳 ]*\n` +
                    `╭─〔 *𝙱𝙸𝙾 & 𝚂𝚃𝙰𝚃𝚄𝚂* 〕\n` +
                    `│ • *𝚄𝚜𝚎𝚛:* @${target.split('@')[0]}\n` +
                    `│ • *𝚁𝚘𝚕𝚎:* ${roleStatus}\n` +
                    `│ • *𝙻𝚒𝚖𝚒𝚝:* 🎟️️ ${limitStr}\n` +
                    `│ • *𝚁𝚊𝚗𝚔:* 🏆 ${rankStr}\n` +
                    `╰──────────────\n` +
                    `╭─〔 *𝚁𝙿𝙶 STATS & 𝚆𝙴𝙰𝙻𝚃𝙷* 〕\n` +
                    `│ • *𝙻𝚎𝚟𝚎𝚕:* ${safeLevel} (✨ ${u.exp || 0}/${nextLevelExp} EXP)\n` +
                    `│ • *𝙼𝚘𝚗𝚎𝚢:* 💵 $${u.money.toLocaleString('en-US')}\n` +
                    `│ • *𝙳𝚒𝚊𝚖𝚘𝚗𝚍:* 💎 ${u.diamond}\n` +
                    `│ • *𝙿𝚘𝚝𝚒𝚘𝚗:* 🧪 ${u.potion} | *𝚄𝚖𝚙𝚊𝚗:* 🪱 ${u.umpan}\n` +
                    `│ • *𝙷𝚊𝚜𝚒𝚕 𝙰𝚕𝚊𝚖:* 🐟${u.ikan} | 🪨${u.batu} | ⛓️${u.besi} | 🪙${u.emas}\n` +
                    `╰──────────────`;

                if (rbLvl >= 1) {
                    const totalFrames = 22; // Nambah frame dikit biar api lebih mulus
                    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'profile_rb_'));
                    
                    try {
                        await sock.sendMessage(m.chat, { react: { text: "🔥", key: m.key } });

                        await Promise.all(Array.from({ length: totalFrames }).map(async (_, i) => {
                            const progress = i / totalFrames;
                            const rad = progress * Math.PI * 2;
                            
                            // Cincin PP Berputar
                            const px1 = 50 - Math.cos(rad) * 50;
                            const py1 = 50 - Math.sin(rad) * 50;
                            const px2 = 50 + Math.cos(rad) * 50;
                            const py2 = 50 + Math.sin(rad) * 50;

                            // Kalkulasi Gelombang Api (Menyimulasikan CSS Animation lu)
                            const fOp1 = (0.45 + Math.sin(rad * 2) * 0.15).toFixed(2); // Bara Dasar (naik turun)
                            const fOp2 = (0.65 + Math.cos(rad) * 0.1).toFixed(2);     // Lidah Oranye
                            const fOp3 = (0.80 + Math.sin(rad * 1.5) * 0.1).toFixed(2); // Lidah Emas
                            const coreOp = (0.75 + Math.cos(rad * 2) * 0.25).toFixed(2); // Inti Panas (kedip cepat)

                            const shineX = 160 + (progress * 700);
                            const rbShineX = 640 + (progress * 220);

                            let embersSvg = '';
                            for (let j = 0; j < 14; j++) {
                                const speed = 1 + (j % 3);
                                const startX = 20 + ((j * 87) % 860);
                                const rawY = 380 - (((progress * 100 * speed) + (j * 30)) % 160);
                                const emberOp = (Math.sin((progress * speed + j) * Math.PI * 2) * 0.45 + 0.45).toFixed(2);
                                const color = j % 2 === 0 ? '#facc15' : '#fb923c';
                                embersSvg += `<circle cx="${startX}" cy="${rawY}" r="${1 + (j%2)}" fill="${color}" opacity="${emberOp}"/>`;
                            }

                            const frameSvg = getSvgFrame(px1, py1, px2, py2, fOp1, fOp2, fOp3, coreOp, shineX, rbShineX, embersSvg);
                            let cardImg = sharp(Buffer.from(frameSvg));

                            if (avatarBuf) {
                                const mask = Buffer.from(`<svg width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`);
                                const rAvatar = await sharp(avatarBuf).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
                                cardImg = cardImg.composite([{ input: rAvatar, left: 50, top: 60 }]);
                            }

                            const fp = path.join(tmpDir, `frame_${String(i).padStart(3, '0')}.jpg`);
                            await cardImg.jpeg({ quality: 85 }).toFile(fp);
                        }));
          
                        const outMp4 = path.join(tmpDir, `final_${Date.now()}.mp4`);
execSync(`"${ffmpegPath}" -y -framerate 14 -i "${tmpDir}/frame_%03d.jpg" -c:v libx264 -pix_fmt yuv420p -preset ultrafast "${outMp4}"`, { stdio: 'ignore' });

                        const mp4Buf = fs.readFileSync(outMp4);
                        fs.rmSync(tmpDir, { recursive: true, force: true });

                        await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                        return await sock.sendMessage(m.chat, {
                            video: mp4Buf,
                            gifPlayback: true,
                            caption: captionText,
                            mentions: [target]
                        }, { quoted: m });

                    } catch (e) {
                        if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
                        throw new Error(`Render Animasi Gagal: ${e.message}`);
                    }
                } else {
                    const fallbackSvg = getSvgFrame(0, 0, 100, 100, 0.55, 0.75, 0.9, 0.8, 850, 860, ''); 
                    let cardImage = sharp(Buffer.from(fallbackSvg));
                    
                    if (avatarBuf) {
                        const circleMask = Buffer.from(`<svg width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`);
                        const roundedAvatar = await sharp(avatarBuf).composite([{ input: circleMask, blend: 'dest-in' }]).png().toBuffer();
                        cardImage = cardImage.composite([{ input: roundedAvatar, left: 50, top: 60 }]);
                    }
                    
                    const finalCardBuf = await cardImage.jpeg({ quality: 92 }).toBuffer();
                    return await sock.sendMessage(m.chat, {
                        image: finalCardBuf,
                        caption: captionText,
                        mentions: [target]
                    }, { quoted: m });
                }
            } catch (err) {
                console.error("[PROFILE ERROR]:", err);
                return reply(`*[ ❌ 𝙴𝚁𝚁𝙾𝚁 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 ]*\n\`${err.message}\``);
            }
        }
        break;                           

        case "tebakbendera": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (tebakBenderaSessions[from]) {
                return reply('*[ 🏳️ 𝚃𝙴𝙱𝙰𝙺 𝙱𝙴𝙽𝙳𝙴𝚁𝙰 ]*\nMasih ada soal Tebak Bendera yang aktif! Jawab atau ketik *nyerah*.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json');
                const item = res.data[Math.floor(Math.random() * res.data.length)];
                const ans = item.name.toLowerCase().trim();

                const timer = setTimeout(() => {
                    if (tebakBenderaSessions[from]) {
                        sock.sendMessage(from, { text: `*[ ⏰ 𝚆𝙰𝙺𝚃𝚄 𝙷𝙰𝙱𝙸𝚂! ]*\nJawaban Tebak Bendera: *${item.name.toUpperCase()}*` });
                        delete tebakBenderaSessions[from];
                    }
                }, 60000);

                tebakBenderaSessions[from] = { jawaban: ans, timer };

                await sock.sendMessage(from, {
                    image: { url: item.img },
                    caption: `*[ 🏳️ 𝚃𝙴𝙱𝙰𝙺 𝙱𝙴𝙽𝙳𝙴𝚁𝙰 ]*\nBendera negara manakah ini?\n*Clue:* ${item.name.replace(/[aiueoAIUEO]/g, '_')}\n*Waktu:* 60 Detik\n*Reward:* +$4,000 Money & +90 EXP\n\n_Ketik jawabanmu langsung di chat (atau ketik *nyerah*)!_`
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝚃𝙴𝙱𝙰𝙺 𝙱𝙴𝙽𝙳𝙴𝚁𝙰 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

                case "tebaklagu": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (tebakLaguSessions[from]) {
                return reply('*[ 🎵 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 ]*\nMasih ada sesi Tebak Lagu di grup ini! Jawab atau ketik *nyerah*.');
            }
            try {
                const artists = [
                    'Tulus', 'Sheila On 7', 'Dewa 19', 'Hindia', 'Mahalini', 'Lyodra',
                    'Bernadya', 'Juicy Luicy', 'Tiara Andini', 'Nadin Amizah', 'Pamungkas',
                    'Noah', 'Bruno Mars', 'Coldplay', 'Taylor Swift', 'Alan Walker', 'Yoasobi'
                ];
                const pickArtist = artists[Math.floor(Math.random() * artists.length)];

                const res = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(pickArtist)}&entity=song&country=ID&limit=25`, {
                    timeout: 12000
                });

                const tracks = (res.data?.results || []).filter(t => t.previewUrl && t.trackName);
                if (tracks.length === 0) {
                    return reply('*[ 🎵 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 ]*\nGagal memuat daftar lagu, silakan coba lagi.');
                }

                const item = tracks[Math.floor(Math.random() * tracks.length)];
                // Bersihkan judul dari embel-embel "(feat. ...)" atau "- Single" agar mudah ditebak
                const cleanTitle = item.trackName.replace(/\s*[\(\[].*?[\)\]]/g, '').replace(/\s*-\s*.*$/, '').trim();
                const ans = cleanTitle.toLowerCase();

                // Unduh audio preview ke Buffer agar 100% tidak 404 saat dikirim ke WA
                const audioRes = await axios.get(item.previewUrl, {
                    responseType: 'arraybuffer',
                    timeout: 15000
                });
                const audioBuffer = Buffer.from(audioRes.data);

                const timer = setTimeout(() => {
                    if (tebakLaguSessions[from]) {
                        sock.sendMessage(from, {
                            text: `*[ ⏰ 𝚆𝙰𝙺𝚃𝚄 𝙷𝙰𝙱𝙸𝚂! ]*\n*Judul Lagu:* ${cleanTitle.toUpperCase()}\n*Artis:* ${item.artistName}`
                        });
                        delete tebakLaguSessions[from];
                    }
                }, 60000);

                tebakLaguSessions[from] = { jawaban: ans, artis: item.artistName, timer };

                const clueStr = cleanTitle.replace(/[aiueoAIUEO]/g, '_');
                await reply(
                    `*[ 🎵 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 ]*\n` +
                    `*Artis:* ${item.artistName}\n` +
                    `*Clue Judul:* ${clueStr}\n` +
                    `*Waktu:* 60 Detik\n` +
                    `*Reward:* +$5,000 Money & +110 EXP\n\n` +
                    `_Dengarkan potongan audio berikut dan ketik judul lagunya di chat (atau ketik *nyerah*)!_`
                );

                await sock.sendMessage(from, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: false
                }, { quoted: m });
            } catch (e) {
                console.error('[TEBAKLAGU ERROR]:', e);
                reply(`*[ 𝚃𝙴𝙱𝙰𝙺 𝙻𝙰𝙶𝚄 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "siapakahaku": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*');
            if (siapakahAkuSessions[from]) {
                return reply('*[ 🕵️ 𝚂𝙸𝙰𝙿𝙰𝙺𝙰𝙷 𝙰𝙺𝚄 ]*\nMasih ada soal aktif di grup ini! Jawab atau ketik *nyerah*.');
            }
            try {
                const res = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json');
                const item = res.data[Math.floor(Math.random() * res.data.length)];
                const ans = item.jawaban.toLowerCase().trim();

                const timer = setTimeout(() => {
                    if (siapakahAkuSessions[from]) {
                        sock.sendMessage(from, { text: `*[ ⏰ 𝚆𝙰𝙺𝚃𝚄 𝙷𝙰𝙱𝙸𝚂! ]*\nJawaban Siapakah Aku: *${item.jawaban.toUpperCase()}*` });
                        delete siapakahAkuSessions[from];
                    }
                }, 60000);

                siapakahAkuSessions[from] = { jawaban: ans, timer };
                return reply(`*[ 🕵️ 𝚂𝙸𝙰𝙿𝙰𝙺𝙰𝙷 𝙰𝙺𝚄 ]*\n*Soal:* ${item.soal}\n*Clue:* ${item.jawaban.length} Huruf\n*Waktu:* 60 Detik\n*Reward:* +$3,500 Money & +80 EXP\n\n_Ketik jawabanmu langsung di chat (atau ketik *nyerah*)!_`);
            } catch (e) {
                reply(`*[ 𝚂𝙸𝙰𝙿𝙰𝙺𝙰𝙷 𝙰𝙺𝚄 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "cancelsuit":
        case "batalsuit": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nPerintah ini hanya untuk di dalam grup!');
            if (!suitSessions[from]) {
                return reply('*[ ✊✋✌️ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\nTidak ada sesi Suit PvP yang aktif di grup ini.');
            }
            const sGame = suitSessions[from];
            const isParticipant = isSameUser(m.sender, sGame.p1, participants) || isSameUser(m.sender, sGame.p2, participants);

            if (!isParticipant && !isAdmins && !isCreator) {
                return reply('*[ ❌ 𝙰𝙺𝚂𝙴𝚂 𝙳𝙸𝚃𝙾𝙻𝙰𝙺 ]*\nHanya penantang, lawan yang ditantang, atau Admin Grup yang bisa membatalkan sesi Suit ini!');
            }

            if (sGame.timer) clearTimeout(sGame.timer);
            delete suitSessions[from];
            return sock.sendMessage(from, {
                text: `*[ 🛑 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝙳𝙸𝙱𝙰𝚃𝙰𝙻𝙺𝙰𝙽 ]*\nSesi Suit antara @${sGame.p1.split('@')[0]} dan @${sGame.p2.split('@')[0]} telah dibatalkan.`,
                mentions: [sGame.p1, sGame.p2]
            }, { quoted: m });
        }
        break;

        case "suit": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nMainkan Suit PvP di dalam grup!');

            if (['cancel', 'batal', 'stop', 'hapus'].includes((args[0] || '').toLowerCase())) {
                if (!suitSessions[from]) return reply('*[ ✊✋✌️ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\nTidak ada sesi Suit yang aktif di grup ini.');
                const sGame = suitSessions[from];
                const isParticipant = isSameUser(m.sender, sGame.p1, participants) || isSameUser(m.sender, sGame.p2, participants);
                if (!isParticipant && !isAdmins && !isCreator) {
                    return reply('*[ ❌ 𝙰𝙺𝚂𝙴𝚂 𝙳𝙸𝚃𝙾𝙻𝙰𝙺 ]*\nHanya pemain yang bersangkutan atau Admin yang bisa membatalkan Suit!');
                }
                if (sGame.timer) clearTimeout(sGame.timer);
                delete suitSessions[from];
                return reply('*[ 🛑 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 𝙳𝙸𝙱𝙰𝚃𝙰𝙻𝙺𝙰𝙽 ]*\nTantangan Suit berhasil dibatalkan.');
            }

            const target = getTargetUser(m, args, participants);
            if (!target || isSameUser(target, m.sender, participants)) {
                return reply(
                    `*[ ✊✋✌️ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\n` +
                    `Tag atau reply teman yang ingin kamu tantang!\n\n` +
                    `• *Suit Biasa:* ${prefix}suit @user\n` +
                    `• *Suit Taruhan:* ${prefix}suit @user 5000\n` +
                    `• *Batalkan:* ${prefix}cancelsuit`
                );
            }
            if (suitSessions[from]) {
                return reply(`*[ 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\nMasih ada tantangan Suit yang berlangsung di grup ini! Ketik *${prefix}cancelsuit* untuk membatalkannya.`);
            }

            const betArg = args.find(a => /^\d+$/.test(a) && a.length <= 9 && !a.startsWith('628') && !a.startsWith('08'));
            const betAmount = betArg ? Math.max(0, parseInt(betArg)) : 0;

            if (betAmount > 0) {
                const rpg = getRpgDB();
                const u1 = initUserRpg(rpg, m.sender);
                const u2 = initUserRpg(rpg, target);
                if (u1.money < betAmount) {
                    return reply(`*[ 💸 𝚄𝙰𝙽𝙶 𝚃𝙸𝙳𝙰𝙺 𝙲𝚄𝙺𝚄𝙿 ]*\nUang kamu ($${u1.money.toLocaleString()}) tidak cukup untuk membuat taruhan sebesar *$${betAmount.toLocaleString()}*!`);
                }
                if (u2.money < betAmount) {
                    return reply(`*[ 💸 𝚄𝙰𝙽𝙶 𝙻𝙰𝚆𝙰𝙽 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nLawan yang kamu tantang tidak punya cukup uang untuk taruhan *$${betAmount.toLocaleString()}* (Uang lawan: $${u2.money.toLocaleString()})!`);
                }
            }

            const waitTimer = setTimeout(() => {
                if (suitSessions[from] && suitSessions[from].status === 'waiting') {
                    delete suitSessions[from];
                }
            }, 60000);

            suitSessions[from] = {
                p1: m.sender,
                p2: target,
                bet: betAmount,
                status: 'waiting',
                choices: {},
                participants,
                timer: waitTimer
            };

            return sock.sendMessage(from, {
                text: `*[ ✊✋✌️ 𝚃𝙰𝙽𝚃𝙰𝙽𝙶𝙰𝙽 𝚂𝚄𝙸𝚃 𝙿𝚅𝙿 ]*\n` +
                    `@${m.sender.split('@')[0]} menantang @${target.split('@')[0]} bermain Suit!\n` +
                    `${betAmount > 0 ? `💰 *Taruhan:* $${betAmount.toLocaleString()}\n` : `🎁 *Hadiah:* $3,000 Money & +80 EXP\n`}\n` +
                    `• Ketik *terima* / *gas* dalam 60 detik untuk memulai.\n` +
                    `• Ketik *tolak* atau *${prefix}cancelsuit* untuk membatalkan.`,
                mentions: [m.sender, target]
            }, { quoted: m });
        }
        break;

        case "mining":
        case "nambang": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const now = Date.now();
            const cd = 45000;
            if (now - (u.lastMining || 0) < cd) {
                const rem = Math.ceil((cd - (now - u.lastMining)) / 1000);
                return reply(`*[ ⛏️ 𝙼𝙸𝙽𝙸𝙽𝙶 𝙲𝙾𝙾𝙻𝙳𝙾𝚆𝙽 ]*\nPlease wait *${rem}s* before mining again.`);
            }
            u.lastMining = now;
            const batu = Math.floor(Math.random() * 5) + 1;
            const besi = Math.floor(Math.random() * 3);
            const emas = Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0;
            const dm = Math.random() > 0.85 ? 1 : 0;

            u.batu += batu;
            u.besi += besi;
            u.emas += emas;
            u.diamond += dm;
            u.exp += 40;
            if (u.exp >= u.level * 250) { u.level += 1; }
            saveRpgDB(rpg);

            return reply(`*[ ⛏️ 𝙼𝙸𝙽𝙸𝙽𝙶 𝚁𝙴𝚂𝚄𝙻𝚃 ]*\nYou mined the cave and found:\n• 🪨 Batu: +${batu}\n• ⛓️ Besi: +${besi}\n• 🪙 Emas: +${emas}${dm ? `\n• 💎 Diamond: +${dm}` : ''}\n• ✨ EXP: +40`);
        }
        break;

        case "learnskill":
        case "cyber":
        case "myskill": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            if (!u.cyberSkills) {
                u.cyberSkills = { bruteforce: 0, zero_day: 0, ghost_vpn: 0, encryption: 0, ice_wall: 0, ai_ids: 0 };
            }

            const SKILL_CATALOG = {
                bruteforce: {
                    name: "🗡️ Brute-Force Mastery",
                    type: "OFFENSE (Hacker)",
                    costs: [50000, 150000, 450000, 1200000, 2500000],
                    desc: "Mempermudah kode breach & menambah jumlah koin kripto yang disedot (+2%/Lv)"
                },
                zero_day: {
                    name: "🗡️ Zero-Day Exploit",
                    type: "OFFENSE (Hacker)",
                    costs: [85000, 250000, 750000, 1800000, 3500000],
                    desc: "Meningkatkan peluang jebol (+6%/Lv) & menghancurkan 2 Firewall sekaligus di Lv.3+"
                },
                ghost_vpn: {
                    name: "🗡️ Ghost Proxy VPN",
                    type: "OFFENSE (Hacker)",
                    costs: [45000, 125000, 350000, 950000, 2000000],
                    desc: "Mengurangi denda saat gagal (-15%/Lv) & mempercepat cooldown .hack (-20 dtk/Lv)"
                },
                encryption: {
                    name: "🛡️ AES-256 Encryption",
                    type: "DEFENSE (Defender)",
                    costs: [60000, 180000, 500000, 1350000, 2800000],
                    desc: "Membuat puzzle hacker makin panjang/sulit & mengurangi koin yang bisa dicuri"
                },
                ice_wall: {
                    name: "🛡️ ICE Counter-Shock",
                    type: "DEFENSE (Defender)",
                    costs: [75000, 220000, 600000, 1500000, 3000000],
                    desc: "Menambah denda sengatan balik (+$140K-$200K/Lv) yang disita dari hacker saat gagal"
                },
                ai_ids: {
                    name: "🛡️ AI Intrusion Detection",
                    type: "DEFENSE (Defender)",
                    costs: [95000, 300000, 850000, 2100000, 4000000],
                    desc: "Peluang Auto-Block serangan (+11%/Lv) & menambah waktu ketik patch (+2 dtk/Lv)"
                }
            };

            const subKey = (args[0] || '').toLowerCase();

            if (SKILL_CATALOG[subKey]) {
                const sk = SKILL_CATALOG[subKey];
                const curLvl = u.cyberSkills[subKey] || 0;
                if (curLvl >= 5) {
                    return reply(`*[ 🎓 𝙼𝙰𝚇 𝙻𝙴𝚅𝙴𝙻 ]*\nIlmu *${sk.name}* kamu sudah mencapai **Level 5 (MAX)**!`);
                }

                const nextLvl = curLvl + 1;
                const upgradeCost = sk.costs[curLvl];

                if (u.money < upgradeCost) {
                    return reply(
                        `*[ ❌ 𝙱𝙸𝙰𝚈𝙰 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\n` +
                        `Untuk mempelajari *${sk.name} (Lv.${nextLvl})*, kamu butuh *$${upgradeCost.toLocaleString()} Money*.\n` +
                        `• *Saldo Kamu:* $${u.money.toLocaleString()}`
                    );
                }

                u.money -= upgradeCost;
                u.cyberSkills[subKey] = nextLvl;
                u.exp += 150 * nextLvl;
                saveRpgDB(rpg);

                return reply(
                    `*[ 🎓⚡ 𝙲𝚈𝙱𝙴𝚁 𝚂𝙺𝙸𝙻𝙻 𝚄𝙿𝙶𝚁𝙰𝙳𝙴𝙳! ]*\n\n` +
                    `• *Ilmu:* ${sk.name}\n` +
                    `• *Kategori:* ${sk.type}\n` +
                    `• *Level Baru:* ⭐ **Level ${nextLvl} / 5**\n` +
                    `• *Efek:* ${sk.desc}\n` +
                    `• *Biaya Latihan:* -$${upgradeCost.toLocaleString()}\n` +
                    `• *Sisa Money:* $${u.money.toLocaleString()}`
                );
            }

            let bodyTxt =
                `*[ 🧠💻 𝙶𝚄𝚃𝚂 𝙲𝚈𝙱𝙴𝚁 𝙰𝙲𝙰𝙳𝙴𝙼𝚈 & 𝚂𝙺𝙸𝙻𝙻 𝚃𝚁𝙴𝙴 ]*\n` +
                `*User:* @${m.sender.split('@')[0]} | *Money:* $${u.money.toLocaleString()}\n` +
                `*Firewall Shield:* 🛡️ ${u.firewall || 0}x Lapis\n\n` +
                `*╭─〔 🗡️ BLACK-HAT OFFENSE (HACKER) 〕*\n`;

            const rows = [];
            for (const [k, v] of Object.entries(SKILL_CATALOG)) {
                const lvl = u.cyberSkills[k] || 0;
                const stars = '★'.repeat(lvl) + '☆'.repeat(5 - lvl);
                const nextCost = lvl >= 5 ? 'MAX' : `$${v.costs[lvl].toLocaleString()}`;

                if (k === 'encryption') {
                    bodyTxt += `*╰────────────────────*\n\n*╭─〔 🛡️ WHITE-HAT DEFENSE (DEFENDER) 〕*\n`;
                }
                bodyTxt += `│ • *${v.name}* [${stars}] (Lv.${lvl}/5)\n`;
                bodyTxt += `│   └ _Upgrade:_ *${nextCost}* — \`${prefix}learnskill${k}\`\n`;

                if (lvl < 5) {
                    rows.push({
                        header: v.type,
                        title: applyUserFont(`${v.name} ➔ Lv.${lvl + 1} (${nextCost})`, m.sender),
                        description: applyUserFont(v.desc, m.sender),
                        id: `${prefix}learnskill ${k}`
                    });
                }
            }
            bodyTxt += `*╰────────────────────*\n\n💡 _Pilih tombol di bawah untuk latihan & upgrade ilmumu!_`;

            try {
                const interactiveSkill = {
                    body: { text: applyUserFont(bodyTxt, m.sender) },
                    footer: { text: applyUserFont("GutS | MD Cyber Warfare System", m.sender) },
                    header: { hasMediaAttachment: false },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: applyUserFont("🎓 Pilih Ilmu Cyber (Upgrade)", m.sender),
                                    sections: [
                                        {
                                            title: applyUserFont("Daftar Ilmu Black-Hat & White-Hat", m.sender),
                                            rows
                                        }
                                    ]
                                })
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: applyUserFont("🛡️ Beli 1x Firewall ($150,000)", m.sender),
                                    id: `${prefix}firewall buy 1`
                                })
                            }
                        ],
                        messageParamsJson: "{}"
                    }
                };

                const genMsg = generateWAMessageFromContent(from, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: interactiveSkill
                        }
                    }
                }, { userJid: from });

                return await sock.relayMessage(from, genMsg.message, { messageId: genMsg.key.id });
            } catch (_) {
                return sock.sendMessage(m.chat, { text: bodyTxt, mentions: [m.sender] }, { quoted: m });
            }
        }
        break;

        case "firewall": {
            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const sub = (args[0] || '').toLowerCase();
            const fwPrice = 150000;

            if (sub === 'buy' || sub === 'beli') {
                const count = Math.max(1, parseInt(args[1]) || 1);
                const totalCost = count * fwPrice;
                if (u.money < totalCost) {
                    return reply(
                        `*[ 🛡️ 𝙲𝚈𝙱𝙴𝚁 𝙵𝙸𝚁𝙴𝚆𝙰𝙻𝙻 ]*\n` +
                        `Uangmu tidak cukup! Harga *1x Shield Firewall = $${fwPrice.toLocaleString()}*.\n` +
                        `Untuk membeli *${count}x Shield*, kamu butuh *$${totalCost.toLocaleString()}* (Uangmu: *$${u.money.toLocaleString()}*).`
                    );
                }
                u.money -= totalCost;
                u.firewall = (u.firewall || 0) + count;
                saveRpgDB(rpg);
                return reply(
                    `*[ 🛡️ 𝙵𝙸𝚁𝙴𝚆𝙰𝙻𝙻 𝚄𝙿𝙶𝚁𝙰𝙳𝙴𝙳 ]*\n` +
                    `• *Dibeli:* +${count} Lapisan Firewall\n` +
                    `• *Total Harga:* -$${totalCost.toLocaleString()}\n` +
                    `• *Total Shield Aktif:* 🛡️ ${u.firewall}x Proteksi Otomatis\n` +
                    `• *Sisa Money:* $${u.money.toLocaleString()}`
                );
            }

            return reply(
                `*[ 🛡️ 𝙲𝚈𝙱𝙴𝚁 𝙵𝙸𝚁𝙴𝚆𝙰𝙻𝙻 𝚂𝚃𝙰𝚃𝚄𝚂 ]*\n` +
                `• *User:* @${m.sender.split('@')[0]}\n` +
                `• *Shield Aktif:* 🛡️ ${u.firewall || 0}x Lapisan\n` +
                `• *Harga:* $${fwPrice.toLocaleString()} / Lapis\n\n` +
                `Ketik *${prefix}firewall buy <jumlah>* (Contoh: *${prefix}firewall buy 5* = $750,000) atau tingkatkan ilmu pertahananmu di *${prefix}learnskill*!`
            );
        }
        break;

        case "hack":
        case "bobol": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nAksi Cyber Hacking hanya bisa dilakukan di dalam grup!');
            if (hackSessions[from]?.active) {
                return reply('*[ 💻 𝙲𝚈𝙱𝙴𝚁 𝙷𝙴𝙸𝚂𝚃 ]*\nMasih ada peretasan aktif di grup ini! Tunggu sampai selesai.');
            }

            const target = getTargetUser(m, args, participants, sock, botNumber);
            if (!target || isSameUser(target, m.sender, participants)) {
                return reply(
                    `*[ 💻 𝙲𝚈𝙱𝙴𝚁 𝙲𝚁𝚈𝙿𝚃𝙾 𝙷𝙴𝙸𝚂𝚃 (.𝙷𝙰𝙲𝙺) ]*\n` +
                    `Tag atau reply member yang ingin kamu bobol dompet Crypto-nya!\n\n` +
                    `• *Mulai Meretas:* ${prefix}hack @user\n` +
                    `• *Latihan Ilmu Cyber:* ${prefix}learnskill\n` +
                    `• *Beli Firewall ($150K):* ${prefix}firewall buy 1\n\n` +
                    `⚠️ _Syarat: Kamu wajib menguasai minimal **Lv.1 Brute-Force Mastery ($50,000)** di **${prefix}learnskill** untuk bisa meretas!_`
                );
            }

            const rpg = getRpgDB();
            const uHacker = initUserRpg(rpg, m.sender);
            const uTarget = initUserRpg(rpg, target);

            const bfLvl = uHacker.cyberSkills?.bruteforce || 0;
            const zdLvl = uHacker.cyberSkills?.zero_day || 0;
            const vpnLvl = uHacker.cyberSkills?.ghost_vpn || 0;
            const encLvl = uTarget.cyberSkills?.encryption || 0;
            const iceLvl = uTarget.cyberSkills?.ice_wall || 0;

            if (bfLvl < 1) {
                return reply(
                    `*[ 🔒 𝚂𝙺𝙸𝙻𝙻 𝙱𝙴𝙻𝚄𝙼 𝙲𝚄𝙺𝚄𝙿! ]*\n` +
                    `Kamu belum mengerti cara mengoperasikan terminal peretasan!\n` +
                    `Pelajari minimal **🗡️ Brute-Force Mastery Lv.1 ($50,000)** terlebih dahulu dengan mengetik *${prefix}learnskill*.`
                );
            }

            const now = Date.now();
            const cd = Math.max(60000, (180 - vpnLvl * 20) * 1000);
            if (now - (uHacker.lastHack || 0) < cd) {
                const rem = Math.ceil((cd - (now - uHacker.lastHack)) / 1000);
                return reply(`*[ 💻 𝙾𝚅𝙴𝚁𝙷𝙴𝙰𝚃 𝙲𝙾𝙾𝙻𝙳𝙾𝚆𝙽 ]*\nRig peretasanmu sedang mendinginkan prosesor & menyamarkan IP! Tunggu *${rem} detik* lagi.`);
            }

            if (uHacker.money < 75000) {
                return reply('*[ 💻 𝙼𝙾𝙳𝙰𝙻 𝙺𝚄𝚁𝙰𝙽𝙶 ]*\nKamu butuh minimal *$75,000 Money* di dompet untuk jaminan operasional Rig peretasan!');
            }

            const ownedCoins = ['guts', 'btc', 'eth', 'sol'].filter(c => (uTarget.crypto?.[c] || 0) >= 0.05);
            if (ownedCoins.length === 0) {
                return sock.sendMessage(from, {
                    text: `*[ 💻 𝚆𝙰𝙻𝙻𝙴𝚃 𝙺𝙾𝚂𝙾𝙽𝙶 ]*\nDompet Crypto @${target.split('@')[0]} kosong melompong! Cari target sultan lain.`,
                    mentions: [target]
                }, { quoted: m });
            }

            uHacker.lastHack = now;
            saveRpgDB(rpg);

            if ((uTarget.firewall || 0) > 0) {
                const dmg = zdLvl >= 3 ? 2 : 1;
                uTarget.firewall = Math.max(0, uTarget.firewall - dmg);
                const basePenalty = 50000 + (iceLvl * 100000);
                const penalty = Math.min(uHacker.money, Math.floor(basePenalty * (1 - vpnLvl * 0.15)));
                uHacker.money -= penalty;
                uTarget.money += penalty;
                saveRpgDB(rpg);

                return sock.sendMessage(from, {
                    text:
                        `*[ 🛡️💥 𝙵𝙸𝚁𝙴𝚆𝙰𝙻𝙻 𝚂𝙷𝙸𝙴𝙻𝙳 𝙸𝙼𝙿𝙰𝙲𝚃! ]*\n` +
                        `╭────────────────────────────╮\n` +
                        `│  🔒 *FIREWALL DAMAGED: -${dmg}x*   │\n` +
                        `│  🛡️ *SHIELD REMAINING: ${uTarget.firewall}x*   │\n` +
                        `╰────────────────────────────╯\n` +
                        `Serangan @${m.sender.split('@')[0]} tertahan oleh **Cyber Firewall** milik @${target.split('@')[0]}!\n` +
                        `• *Sengatan ICE Lv.${iceLvl}:* -$${penalty.toLocaleString()} disita dari hacker!`,
                    mentions: [m.sender, target]
                }, { quoted: m });
            }

           const difficulty = Math.max(1, 2 + encLvl - Math.floor(bfLvl / 2));
            const breachPuzzle = generateCyberPuzzle(difficulty, 'breach');
            const defendPuzzle = generateCyberPuzzle(difficulty, 'defend');
            const breachTimeSec = 35 + (bfLvl * 3); // 35 detik + bonus BruteForce karena soal multi-layer

            const dmChallengeMsg =
                `*[ 💻🔥 𝙲𝚈𝙱𝙴𝚁 𝙱𝚁𝙴𝙰𝙲𝙷 — 𝙿𝙷𝙰𝚂𝙴 𝟷 (𝙳𝙼 𝚃𝙴𝚁𝙼𝙸𝙽𝙰𝙻) ]*\n` +
                `╭────────────────────────────╮\n` +
                `│  📡 *TARGET:* @${target.split('@')[0]}\n` +
                `│  🔐 *SECURITY:* AES-256 (Lv.${encLvl})\n` +
                `│  🧩 *MODUL:* ${breachPuzzle.title}\n` +
                `│  ⏱️ *WAKTU:* ${breachTimeSec} Detik\n` +
                `╰────────────────────────────╯\n` +
                `🧠 *PECAHKAN LOGIKA BERLAPIS INI DI DM:*\n` +
                `${breachPuzzle.question}\n\n` +
                `⌨️ Balas di DM ini dengan format:\n` +
                `👉 *\`breach <jawaban>\`*\n` +
                `_(Jangan asal tebak! Salah jawab 1x langsung gagal & tersetrum ICE Wall lawan!)_`;

            await sock.sendMessage(m.sender, {
                text: dmChallengeMsg,
                mentions: [m.sender, target]
            }).catch(() => {});

            await sock.sendMessage(from, {
                text:
                    `*[ 💻🕵️ 𝙲𝚈𝙱𝙴𝚁 𝙷𝙴𝙸𝚂𝚃 𝙸𝙽𝙸𝚃𝙸𝙰𝚃𝙴𝙳! ]*\n` +
                    `@${m.sender.split('@')[0]} sedang berusaha membobol enkripsi dompet Crypto milik @${target.split('@')[0]}!\n\n` +
                    `📩 *Hacker (@${m.sender.split('@')[0]}):* Cek **Private Chat (DM)** bot sekarang dan selesaikan puzzle logika dalam **${breachTimeSec} detik**!\n` +
                    `🛡️ *Target (@${target.split('@')[0]}):* Bersiaplah di DM bot jika enkripsi tahap 1 berhasil ditembus!`,
                mentions: [m.sender, target]
            }, { quoted: m });

            const phase1Timer = setTimeout(async () => {
                if (!hackSessions[from] || hackSessions[from].phase !== 'breach') return;
                delete hackSessions[from];

                const freshRpg = getRpgDB();
                const fHacker = initUserRpg(freshRpg, m.sender);
                const fTarget = initUserRpg(freshRpg, target);
                const fine = Math.min(fHacker.money, Math.floor((60000 + iceLvl * 120000) * (1 - vpnLvl * 0.15)));
                fHacker.money -= fine;
                fTarget.money += fine;
                saveRpgDB(freshRpg);

                await sock.sendMessage(m.sender, {
                    text: `*[ ⏰💥 𝚃𝙸𝙼𝙴𝙾𝚄𝚃! ]*\nWaktu habis! Jawaban yang benar adalah: \`${breachPuzzle.answer}\`. Kamu terkena denda *-$${fine.toLocaleString()}*!`
                }).catch(() => {});

                await sock.sendMessage(from, {
                    text:
                        `*[ ⏰💥 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙸𝙾𝙽 𝚃𝙸𝙼𝙴𝙾𝚄𝚃! ]*\n` +
                        `@${m.sender.split('@')[0]} kehabisan waktu saat memecahkan logika enkripsi di DM!\n` +
                        `Sistem *ICE Wall Lv.${iceLvl}* milik @${target.split('@')[0]} menyetrum balik koneksi hacker.\n` +
                        `💸 *Denda Sitaan:* -$${fine.toLocaleString()} (Masuk ke saldo korban)`,
                    mentions: [m.sender, target]
                });
            }, breachTimeSec * 1000);

            hackSessions[from] = {
                active: true,
                phase: 'breach',
                hacker: m.sender,
                target,
                participants,
                breachCode: breachPuzzle.answer,
                defendCode: defendPuzzle.answer,
                defendPuzzle,
                timer: phase1Timer
            };
        }
        break;

        case "rob":
        case "rampok": {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\nYou can only rob players in a group!');
            const target = getTargetUser(m, args, participants);
            if (!target || target === m.sender) return reply(`*[ 🥷 𝚁𝙾𝙱𝙱𝙴𝚁𝚈 ]*\nTag or reply to a user you want to rob: *${prefix}rob @user*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, m.sender);
            const t = initUserRpg(rpg, target);
            const now = Date.now();
            const cd = 120000;

            if (now - (u.lastRob || 0) < cd) {
                const rem = Math.ceil((cd - (now - u.lastRob)) / 1000);
                return reply(`*[ 🥷 𝙲𝙾𝙾𝙻𝙳𝙾𝚆𝙽 ]*\nYou are still hiding from the police! Wait *${rem}s*.`);
            }
            if (t.money < 250) return reply('*[ 🥷 𝚁𝙾𝙱𝙱𝙴𝚁𝚈 ]*\nTarget is too broke to be robbed (Less than $250)!');

            u.lastRob = now;
            if (Math.random() < 0.55) {
                const stolen = Math.min(t.money, Math.floor(Math.random() * 400) + 100);
                t.money -= stolen;
                u.money += stolen;
                saveRpgDB(rpg);
                return sock.sendMessage(m.chat, {
                    text: `*[ 🥷 𝚁𝙾𝙱𝙱𝙴𝚁𝚈 𝚂𝚄𝙲𝙲𝙴𝚂𝚂! ]*\n@${m.sender.split('@')[0]} successfully robbed *$${stolen}* from @${target.split('@')[0]}!`,
                    mentions: [m.sender, target]
                }, { quoted: m });
            } else {
                const fine = Math.min(u.money, 250);
                u.money -= fine;
                saveRpgDB(rpg);
                return reply(`*[ 🚓 𝙱𝚄𝚂𝚃𝙴𝙳! ]*\nYou were caught attempting to rob and paid a fine of *$${fine}*!`);
            }
        }
        break;

        case "setfont": {
            const choice = args[0];
            if (!['1', '2', '3'].includes(choice)) {
                return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝙽𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}setfont 1 / 2 / 3`);
            }
            let userFonts = fs.existsSync(FONT_PATH) ? JSON.parse(fs.readFileSync(FONT_PATH)) : {};
            userFonts[m.sender] = choice;
            if (!fs.existsSync('./lib/database')) fs.mkdirSync('./lib/database', { recursive: true });
            fs.writeFileSync(FONT_PATH, JSON.stringify(userFonts, null, 2));

            const fontNames = { '1': '𝙵𝚘𝚗𝚝 1 (𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎)', '2': 'Font 2 (Normal)', '3': '𝐅𝐨𝐧𝐭 𝟑 (𝐁𝐨𝐥𝐝)' };
            reply(`*[ 𝙵𝙾𝙽𝚃 𝚄𝙿𝙳𝙰𝚃𝙴𝙳 ]*\n𝚈𝚘𝚞𝚛 𝚏𝚘𝚗𝚝 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚜𝚎𝚝 𝚝𝚘: *${fontNames[choice]}*`);
        }
        break;

        case "menu": {
            const platform = os.platform() === 'win32' ? 'Windows' : os.platform() === 'linux' ? 'Linux' : os.platform();
            const botName = global.botname || global.namaown || "GutS Bot";
            const rpg = getRpgDB();
            const uRpg = initUserRpg(rpg, m.sender);
            const sortedLb = Object.entries(rpg)
                .map(([jid, data]) => ({ jid, money: data.money || 0 }))
                .sort((a, b) => b.money - a.money);
            const userRankIdx = sortedLb.findIndex(x => x.jid === m.sender);
            const rankStr = userRankIdx !== -1 ? `#${userRankIdx + 1} of ${sortedLb.length}` : '-';
            const limitMenuStr = (isCreator || isOwner || isPremium) ? "∞ (Unlimited)" : `${uRpg.limit} / 50`;

            const rawMsg = `*𝚆𝚊𝚜𝚜𝚞𝚙, ${pushname}*\n\n` +
                `╭─〔 *𝙸𝙽𝙵𝙾 𝚄𝚂𝙴𝚁* 〕\n` +
                `│ *𝙽𝚊𝚖𝚎* : ${pushname}\n` +
                `│ *𝚂𝚝𝚊𝚝𝚞𝚜* : ${isCreator ? "Creator" : isOwner ? "Owner" : isPremium ? "Premium" : "Free User"}\n` +
                `│ *𝙻𝚒𝚖𝚒𝚝* : ${limitMenuStr}\n` +
                `│ *𝙼𝚘𝚗𝚎𝚢* : $${(uRpg.money || 0).toLocaleString()}\n` +
                `│ *𝚁𝚊𝚗𝚔* : ${rankStr}\n` +
                `╰──────────────\n\n` +
                `╭─〔 *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃* 〕\n` +
                `│ *𝙱𝚘𝚝 𝙽𝚊𝚖𝚎* : ${botName}\n` +
                `│ *𝙼𝚘𝚍𝚎* : ${sock.public ? 'Public' : 'Self'}\n` +
                `│ *𝚁𝚞𝚗𝚝𝚒𝚖𝚎* : ${runtime(process.uptime())}\n` +
                `│ *𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖* : ${platform}\n` +
                `╰──────────────`;

            const finalMenuText = applyUserFont(rawMsg, m.sender);

            try {
                const menuPath = './lib/menu.json';
                if (!fs.existsSync(menuPath)) {
                    fs.writeFileSync(menuPath, JSON.stringify({ features: [], group: [], game: [], owner: [] }, null, 2));
                }
                const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

                const dynamicSections = Object.entries(menuData)
                    .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                    .map(([categoryName, items]) => {
                        const formattedTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
                        return {
                            title: applyUserFont(formattedTitle, m.sender),
                            rows: items.map(item => ({
                                header: "",
                                title: applyUserFont(item.title, m.sender),
                                description: applyUserFont(item.description, m.sender),
                                id: prefix + item.id
                            }))
                        };
                    });

                const media = await prepareWAMessageMedia(
                    { image: { url: './lib/media/thumb.jpg' } },
                    { upload: sock.waUploadToServer }
                );

                const interactiveMsg = {
                    body: { text: finalMenuText },
                    footer: { text: applyUserFont("𝙶𝚞𝚝𝚂 v1", m.sender) },
                    header: {
                        hasMediaAttachment: true,
                        imageMessage: media.imageMessage
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: applyUserFont("𝚂𝚎𝚕𝚎𝚌𝚝 𝙼𝚎𝚗𝚞", m.sender),
                                    sections: dynamicSections
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: applyUserFont("𝚂𝚎𝚕𝚎𝚌𝚝 𝙵𝚘𝚗𝚝", m.sender),
                                    sections: [
                                        {
                                            title: "Choose Bot Font Style",
                                            rows: [
                                                { header: "", title: "𝙵𝚘𝚗𝚝 1", description: "Default Mathematical Monospace", id: `${prefix}setfont 1` },
                                                { header: "", title: "Font 2", description: "Standard Normal Text (Safe for all devices)", id: `${prefix}setfont 2` },
                                                { header: "", title: "𝐅𝐨𝐧𝐭 𝟑", description: "Mathematical Bold Text", id: `${prefix}setfont 3` }
                                            ]
                                        }
                                    ]
                                })
                            }
                        ],
                        messageParamsJson: "{}"
                    }
                };

                const generatedMsg = generateWAMessageFromContent(from, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: interactiveMsg
                        }
                    }
                }, { userJid: from, upload: sock.waUploadToServer });

                await sock.relayMessage(from, generatedMsg.message, { messageId: generatedMsg.key.id });
            } catch (e) {
                console.error(e);
                reply("Failed to send the menu.");
            }
        }
        break;

        // ── 28 COMMAND MENU GROUP ──
        case 'cekidgroup':
        case 'absen':
        case 'cekabsen':
        case 'add':
        case 'addalarm':
        case 'addbadword':
        case 'addlist':
        case 'updatelist':
        case 'uplist':
        case 'addpoin':
        case 'addreminder':
        case 'afk':
        case 'antibadword':
        case 'antibadwordnokick':
        case 'antibot':
        case 'antidelete':
        case 'antilink':
        case 'antilinkchannel':
        case 'antilinknokick':
        case 'antiluar':
        case 'antimentionsw':
        case 'antiviewonce':
        case 'antiwame':
        case 'antiwamenokick':
        case 'banmember':
        case 'blacklist':
        case 'delblacklist':
        case 'listblacklist':
        case 'resetblacklist': {
            if (!isGroup) return reply('*[ 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈 ]*\n𝚃𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚌𝚊𝚗 𝚘𝚗𝚕𝚢 𝚋𝚎 𝚞𝚜𝚎𝚍 𝚒𝚗 𝚐𝚛𝚘𝚞𝚙𝚜.');

            const db = getGroupDB();
            const gData = initGroupData(db, m.chat);

            const adminCommands = [
                'add', 'addalarm', 'addbadword', 'addlist', 'updatelist', 'uplist',
                'addpoin', 'addreminder', 'antibadword', 'antibadwordnokick', 'antibot',
                'antidelete', 'antilink', 'antilinkchannel', 'antilinknokick', 'antiluar',
                'antimentionsw', 'antiviewonce', 'antiwame', 'antiwamenokick', 'banmember',
                'blacklist', 'delblacklist', 'resetblacklist'
            ];

            if (adminCommands.includes(command) && !isAdmins && !isCreator) {
                return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚋𝚎 𝚊 𝚐𝚛𝚘𝚞𝚙 𝚊𝚍𝚖𝚒𝚗 𝚝𝚘 𝚞𝚜𝚎 𝚝𝚑𝚒𝚜 𝚌𝚘𝚖𝚖𝚊𝚗𝚍.');
            }

            if (command === 'cekidgroup') {
                return reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝙸𝙳 ]*\n${m.chat}`);
            }

            if (command === 'afk') {
                const reason = text || '𝙽𝚘 𝚛𝚎𝚊𝚜𝚘𝚗 𝚙𝚛𝚘𝚟𝚒𝚍𝚎𝚍';
                db.afk[m.sender] = { reason, time: Date.now() };
                saveGroupDB(db);
                return reply(`*[ 𝙰𝙵𝙺 𝙼𝙾𝙳𝙴 𝙰𝙲𝚃𝙸𝚅𝙴 ]*\n*𝚄𝚜𝚎𝚛:* @${m.sender.split('@')[0]}\n*𝚁𝚎𝚊𝚜𝚘𝚗:* ${reason}`);
            }

            if (command === 'absen') {
                if (args[0]?.toLowerCase() === 'start') {
                    if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*\n𝙾𝚗𝚕𝚢 𝚊𝚍𝚖𝚒𝚗𝚜 𝚌𝚊𝚗 𝚜𝚝𝚊𝚛𝚝 𝚊𝚗 𝚊𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎 𝚜𝚎𝚜𝚜𝚒𝚘𝚗.');
                    gData.absen = { active: true, title: args.slice(1).join(' ') || '𝙳𝚊𝚒𝚕𝚢 𝙰𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎', participants: [] };
                    saveGroupDB(db);
                    return reply(`*[ 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 𝚂𝚃𝙰𝚁𝚃𝙴𝙳 ]*\n*𝚃𝚒𝚝𝚕𝚎:* ${gData.absen.title}\n\n𝚃𝚢𝚙𝚎 *${prefix}absen* 𝚝𝚘 𝚖𝚊𝚛𝚔 𝚢𝚘𝚞𝚛 𝚊𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎.`);
                }
                if (args[0]?.toLowerCase() === 'stop' || args[0]?.toLowerCase() === 'reset') {
                    if (!isAdmins && !isCreator) return reply('*[ 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈 ]*');
                    gData.absen = { active: false, title: '', participants: [] };
                    saveGroupDB(db);
                    return reply('*[ 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 𝙲𝙻𝙾𝚂𝙴𝙳 ]*\n𝚃𝚑𝚎 𝚊𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎 𝚜𝚎𝚜𝚜𝚒𝚘𝚗 𝚑𝚊𝚜 𝚎𝚗𝚍𝚎𝚍.');
                }
                if (!gData.absen.active) {
                    gData.absen = { active: true, title: text || '𝙳𝚊𝚒𝚕𝚢 𝙰𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎', participants: [m.sender] };
                    saveGroupDB(db);
                    return reply(`*[ 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 𝚂𝚃𝙰𝚁𝚃𝙴𝙳 & 𝚁𝙴𝙲𝙾𝚁𝙳𝙴𝙳 ]*\n*𝚃𝚒𝚝𝚕𝚎:* ${gData.absen.title}\n*𝚃𝚘𝚝𝚊𝚕:* 1 𝚞𝚜𝚎𝚛\n\n𝚄𝚜𝚎 *${prefix}cekabsen* 𝚝𝚘 𝚟𝚒𝚎𝚠 𝚝𝚑𝚎 𝚕𝚒𝚜𝚝.`);
                }
                if (gData.absen.participants.includes(m.sender)) {
                    return reply('*[ 𝙰𝙻𝚁𝙴𝙰𝙳𝚈 𝚁𝙴𝙲𝙾𝚁𝙳𝙴𝙳 ]*\n𝚈𝚘𝚞 𝚑𝚊𝚟𝚎 𝚊𝚕𝚛𝚎𝚊𝚍𝚢 𝚖𝚊𝚛𝚔𝚎𝚍 𝚢𝚘𝚞𝚛 𝚊𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎.');
                }
                gData.absen.participants.push(m.sender);
                saveGroupDB(db);
                return reply(`*[ 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 𝚁𝙴𝙲𝙾𝚁𝙳𝙴𝙳 ]*\n*𝚄𝚜𝚎𝚛:* @${m.sender.split('@')[0]}\n*𝙿𝚘𝚜𝚒𝚝𝚒𝚘𝚗:* #${gData.absen.participants.length}`);
            }

            if (command === 'cekabsen') {
                if (!gData.absen.active || gData.absen.participants.length === 0) {
                    return reply('*[ 𝙽𝙾 𝙰𝙲𝚃𝙸𝚅𝙴 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 ]*\n𝚃𝚑𝚎𝚛𝚎 𝚒𝚜 𝚗𝚘 𝚊𝚌𝚝𝚒𝚟𝚎 𝚊𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎 𝚜𝚎𝚜𝚜𝚒𝚘𝚗 𝚛𝚒𝚐𝚑𝚝 𝚗𝚘𝚠.');
                }
                const list = gData.absen.participants.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙰𝚃𝚃𝙴𝙽𝙳𝙰𝙽𝙲𝙴 𝙻𝙸𝚂𝚃 ]*\n*𝚃𝚒𝚝𝚕𝚎:* ${gData.absen.title}\n*𝚃𝚘𝚝𝚊𝚕:* ${gData.absen.participants.length}\n\n${list}`,
                    mentions: gData.absen.participants
                }, { quoted: m });
            }

            if (command === 'add') {
                if (!isBotAdmins) return reply('*[ 𝙱𝙾𝚃 𝙽𝙾𝚃 𝙰𝙳𝙼𝙸𝙽 ]*\n𝙿𝚕𝚎𝚊𝚜𝚎 𝚖𝚊𝚔𝚎 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗 𝚏𝚒𝚛𝚜𝚝.');
                const target = getTargetUser(m, args, participants);
                if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚄𝚂𝙴𝚁 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}add 628xxxxxx 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚞𝚜𝚎𝚛.`);
                try {
                    await sock.groupParticipantsUpdate(m.chat, [target], 'add');
                    return reply(`*[ 𝙼𝙴𝙼𝙱𝙴𝚁 𝙰𝙳𝙳𝙴𝙳 ]*\n𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚊𝚍𝚍𝚎𝚍 @${target.split('@')[0]}`);
                } catch (e) {
                    return reply('*[ 𝙵𝙰𝙸𝙻𝙴𝙳 𝚃𝙾 𝙰𝙳𝙳 ]*\n𝙲𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚊𝚍𝚍 𝚞𝚜𝚎𝚛 𝚍𝚞𝚎 𝚝𝚘 𝚙𝚛𝚒𝚟𝚊𝚌𝚢 𝚜𝚎𝚝𝚝𝚒𝚗𝚐𝚜.');
                }
            }

            if (command === 'addbadword') {
                if (!text) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙸𝙽𝙿𝚄𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}addbadword <word>`);
                const word = text.trim().toLowerCase();
                if (!gData.badwords.includes(word)) {
                    gData.badwords.push(word);
                    saveGroupDB(db);
                }
                return reply(`*[ 𝙱𝙰𝙳𝚆𝙾𝚁𝙳 𝙰𝙳𝙳𝙴𝙳 ]*\n𝚆𝚘𝚛𝚍 *"${word}"* 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚊𝚍𝚍𝚎𝚍 𝚝𝚘 𝚝𝚑𝚎 𝚏𝚒𝚕𝚝𝚎𝚛 𝚕𝚒𝚜𝚝.`);
            }

            if (command === 'addlist') {
                const parts = text.split('|').map(s => s.trim());
                if (parts.length < 2 || !parts[0] || !parts[1]) {
                    return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝚁𝙼𝙰𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}addlist key | response`);
                }
                gData.list[parts[0].toLowerCase()] = parts.slice(1).join(' | ');
                saveGroupDB(db);
                return reply(`*[ 𝙻𝙸𝚂𝚃 𝙰𝙳𝙳𝙴𝙳 ]*\n𝙺𝚎𝚢 *"${parts[0].toLowerCase()}"* 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚜𝚊𝚟𝚎𝚍.`);
            }

            if (command === 'updatelist' || command === 'uplist') {
                const parts = text.split('|').map(s => s.trim());
                if (parts.length < 2 || !parts[0] || !parts[1]) {
                    return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝚁𝙼𝙰𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}${command} key | new_response`);
                }
                const key = parts[0].toLowerCase();
                if (!gData.list[key]) {
                    return reply(`*[ 𝙺𝙴𝚈 𝙽𝙾𝚃 𝙵𝙾𝚄𝙽𝙳 ]*\n𝙺𝚎𝚢 *"${key}"* 𝚍𝚘𝚎𝚜 𝚗𝚘𝚝 𝚎𝚡𝚒𝚜𝚝. 𝚄𝚜𝚎 ${prefix}addlist 𝚏𝚒𝚛𝚜𝚝.`);
                }
                gData.list[key] = parts.slice(1).join(' | ');
                saveGroupDB(db);
                return reply(`*[ 𝙻𝙸𝚂𝚃 𝚄𝙿𝙳𝙰𝚃𝙴𝙳 ]*\n𝙺𝚎𝚢 *"${key}"* 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚞𝚙𝚍𝚊𝚝𝚎𝚍.`);
            }

            if (command === 'addpoin') {
                const target = getTargetUser(m, args, participants);
                const amount = parseInt(args.find(a => /^\d+$/.test(a))) || 10;
                if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}addpoin @user <amount>`);
                gData.points[target] = (gData.points[target] || 0) + amount;
                saveGroupDB(db);
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙿𝙾𝙸𝙽𝚃𝚂 𝙰𝙳𝙳𝙴𝙳 ]*\n*𝚄𝚜𝚎𝚛:* @${target.split('@')[0]}\n*𝙰𝚍𝚍𝚎𝚍:* +${amount}\n*𝚃𝚘𝚝𝚊𝚕 𝙿𝚘𝚒𝚗𝚝𝚜:* ${gData.points[target]}`,
                    mentions: [target]
                }, { quoted: m });
            }

            if (command === 'addalarm') {
                const parts = text.split('|').map(s => s.trim());
                if (parts.length < 2 || !/^\d{2}:\d{2}$/.test(parts[0])) {
                    return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝚁𝙼𝙰𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}addalarm HH:MM | message\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: ${prefix}addalarm 07:30 | Morning meeting`);
                }
                db.alarms.push({ chatId: m.chat, time: parts[0], text: parts.slice(1).join(' | '), lastTriggered: '' });
                saveGroupDB(db);
                return reply(`*[ 𝙰𝙻𝙰𝚁𝙼 𝚂𝙴𝚃 ]*\n*𝚃𝚒𝚖𝚎:* ${parts[0]}\n*𝙼𝚎𝚜𝚜𝚊𝚐𝚎:* ${parts.slice(1).join(' | ')}`);
            }

            if (command === 'addreminder') {
                const parts = text.split('|').map(s => s.trim());
                const durationMs = parts[0] ? parseDuration(parts[0]) : null;
                if (parts.length < 2 || !durationMs) {
                    return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝙵𝙾𝚁𝙼𝙰𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}addreminder <duration> | <message>\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: ${prefix}addreminder 10m | Turn off the stove`);
                }
                db.reminders.push({ chatId: m.chat, time: Date.now() + durationMs, text: parts.slice(1).join(' | ') });
                saveGroupDB(db);
                return reply(`*[ 𝚁𝙴𝙼𝙸𝙽𝙳𝙴𝚁 𝚂𝙴𝚃 ]*\n𝙱𝚘𝚝 𝚠𝚒𝚕𝚕 𝚛𝚎𝚖𝚒𝚗𝚍 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙 𝚒𝚗 *${parts[0]}*.`);
            }

            if (command === 'banmember') {
                const target = getTargetUser(m, args, participants);
                if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}banmember @user`);
                if (!gData.banned.includes(target)) {
                    gData.banned.push(target);
                    saveGroupDB(db);
                }
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙼𝙴𝙼𝙱𝙴𝚁 𝙱𝙰𝙽𝙽𝙴𝙳 ]*\n@${target.split('@')[0]} 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚖𝚞𝚝𝚎𝚍 𝚏𝚛𝚘𝚖 𝚞𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚋𝚘𝚝 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙.`,
                    mentions: [target]
                }, { quoted: m });
            }

            if (command === 'blacklist') {
                const target = getTargetUser(m, args, participants);
                if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}blacklist @user`);
                if (!gData.blacklist.includes(target)) {
                    gData.blacklist.push(target);
                    saveGroupDB(db);
                }
                if (isBotAdmins) await sock.groupParticipantsUpdate(m.chat, [target], 'remove').catch(()=>{});
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙱𝙻𝙰𝙲𝙺𝙻𝙸𝚂𝚃 𝙰𝙳𝙳𝙴𝙳 ]*\n@${target.split('@')[0]} 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚋𝚕𝚊𝚌𝚔𝚕𝚒𝚜𝚝𝚎𝚍 𝚏𝚛𝚘𝚖 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙.`,
                    mentions: [target]
                }, { quoted: m });
            }

            if (command === 'delblacklist') {
                const target = getTargetUser(m, args, participants);
                if (!target) return reply(`*[ 𝙸𝙽𝚅𝙰𝙻𝙸𝙳 𝚃𝙰𝚁𝙶𝙴𝚃 ]*\n𝚄𝚜𝚊𝚐𝚎: ${prefix}delblacklist @user`);
                gData.blacklist = gData.blacklist.filter(jid => jid !== target);
                saveGroupDB(db);
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙱𝙻𝙰𝙲𝙺𝙻𝙸𝚂𝚃 𝚁𝙴𝙼𝙾𝚅𝙴𝙳 ]*\n@${target.split('@')[0]} 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚛𝚎𝚖𝚘𝚟𝚎𝚍 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚋𝚕𝚊𝚌𝚔𝚕𝚒𝚜𝚝.`,
                    mentions: [target]
                }, { quoted: m });
            }

            if (command === 'listblacklist') {
                if (gData.blacklist.length === 0) return reply('*[ 𝙱𝙻𝙰𝙲𝙺𝙻𝙸𝚂𝚃 𝙴𝙼𝙿𝚃𝚈 ]*\n𝙽𝚘 𝚞𝚜𝚎𝚛𝚜 𝚊𝚛𝚎 𝚌𝚞𝚛𝚛𝚎𝚗𝚝𝚕𝚢 𝚋𝚕𝚊𝚌𝚔𝚕𝚒𝚜𝚝𝚎𝚍.');
                const list = gData.blacklist.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
                return sock.sendMessage(m.chat, {
                    text: `*[ 𝙱𝙻𝙰𝙲𝙺𝙻𝙸𝚂𝚃𝙴𝙳 𝚄𝚂𝙴𝚁𝚂 ]*\n\n${list}`,
                    mentions: gData.blacklist
                }, { quoted: m });
            }

            if (command === 'resetblacklist') {
                gData.blacklist = [];
                saveGroupDB(db);
                return reply('*[ 𝙱𝙻𝙰𝙲𝙺𝙻𝙸𝚂𝚃 𝚁𝙴𝚂𝙴𝚃 ]*\n𝙰𝚕𝚕 𝚋𝚕𝚊𝚌𝚔𝚕𝚒𝚜𝚝𝚎𝚍 𝚞𝚜𝚎𝚛𝚜 𝚑𝚊𝚟𝚎 𝚋𝚎𝚎𝚗 𝚌𝚕𝚎𝚊𝚛𝚎𝚍.');
            }

            const mode = args[0]?.toLowerCase();
            if (mode === 'on' || mode === 'enable' || mode === '1') {
                gData[command] = true;
            } else if (mode === 'off' || mode === 'disable' || mode === '0') {
                gData[command] = false;
            } else {
                gData[command] = !gData[command];
            }
            saveGroupDB(db);
            const statusStr = gData[command] ? '𝙴𝙽𝙰𝙱𝙻𝙴𝙳 (𝙾𝙽)' : '𝙳𝙸𝚂𝙰𝙱𝙻𝙴𝙳 (𝙾𝙵𝙵)';
            return reply(`*[ 𝙶𝚁𝙾𝚄𝙿 𝚂𝙴𝚃𝚃𝙸𝙽𝙶 𝚄𝙿𝙳𝙰𝚃𝙴𝙳 ]*\n*𝙵𝚎𝚊𝚝𝚞𝚛𝚎:* ${command.toUpperCase()}\n*𝚂𝚝𝚊𝚝𝚞𝚜:* ${statusStr}`);
        }
        break;

        case "jadwalpelajaran":
        case "jadwal": {
            const dbPath = './lib/database/jadwalpel.json';
            if (!fs.existsSync(dbPath)) return reply('*[ ❌ 𝙴𝚁𝚁𝙾𝚁 ]*\nDatabase jadwal belum dibuat!');
            
            const dbJadwal = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            
            // Tentukan hari. Kalau tidak diisi, ambil hari ini
            let reqHari = (args[0] || '').toLowerCase();
            
            if (!reqHari) {
                const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
                const now = new Date();
                reqHari = days[now.getDay()];
            }

            const validDays = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];

            if (!validDays.includes(reqHari)) {
                return reply(`*[ 📅 𝙹𝙰𝙳𝚆𝙰𝙻 𝙿𝙴𝙻𝙰𝙹𝙰𝚁𝙰𝙽 ]*\nHari *${reqHari.toUpperCase()}* libur cuy! Mabar aja kita.\n\n_Atau cek hari lain:_ .jadwal <senin-jumat>`);
            }

            const jadwalHariIni = dbJadwal[reqHari];
            
            if (!jadwalHariIni || jadwalHariIni.length === 0) {
                return reply(`*[ 📅 𝙹𝙰𝙳𝚆𝙰𝙻 𝙿𝙴𝙻𝙰𝙹𝙰𝚁𝙰𝙽 ]*\nJadwal untuk hari *${reqHari.toUpperCase()}* belum disetting di database.`);
            }

            let txt = `*[ 📅 𝙹𝙰𝙳𝚆𝙰𝙻 𝙿𝙴𝙻𝙰𝙹𝙰𝚁𝙰𝙽 ]*\n*Hari:* ${reqHari.toUpperCase()}\n\n`;
            
            jadwalHariIni.forEach(j => {
                txt += `*${j.waktu}*\n📚 Mapel : ${j.mapel}\n👨‍🏫 Guru  : ${j.guru}\n\n`;
            });

            return reply(txt.trim());
        }
        break;

        case "addlimit": {
            if (!isCreator && !isOwner) return reply('*[ KHUSUS OWNER ]*');
            const target = getTargetUser(m, args, participants);
            const numArg = args.filter(a => !a.includes('@')).find(a => /^\d+$/.test(a) && a.length <= 7);
            const num = numArg ? parseInt(numArg) : 10;
            if (!target) return reply(`*[ 🎟️ ADD LIMIT ]*\nUsage: *${prefix}addlimit @user <jumlah>*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, target);
            u.limit = (u.limit || 0) + num;
            saveRpgDB(rpg);
            return sock.sendMessage(m.chat, {
                text: `*[ SUCCESS ]*\nBerhasil menambahkan *+${num} Limit* ke @${target.split('@')[0]}.\nTotal Limit Sekarang: *${u.limit}*`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "setlimitcapacity":
        case "setlimitcap": {
            if (!isCreator && !isOwner) return reply('*[ KHUSUS OWNER ]*');
            const target = getTargetUser(m, args, participants);
            const numArg = args.filter(a => !a.includes('@')).find(a => /^\d+$/.test(a) && a.length <= 7);
            const num = numArg !== undefined ? parseInt(numArg) : NaN;
            if (!target || isNaN(num)) return reply(`*[ ⚙️ SET LIMIT CAPACITY ]*\nUsage: *${prefix}setlimitcapacity @user <jumlah>*\nContoh: *${prefix}setlimitcapacity @user 100*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, target);
            u.limitCapacity = num;
            saveRpgDB(rpg);
            return sock.sendMessage(m.chat, {
                text: `*[ ✅ SUCCESS ]*\nKapasitas limit maksimal untuk @${target.split('@')[0]} berhasil dilonggarkan menjadi *${num} Limit*.\nSekarang profilnya akan menampilkan /${num}.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;
        
        case "setlimit": {
            if (!isCreator && !isOwner) return reply('*[ KHUSUS OWNER ]*');
            const target = getTargetUser(m, args, participants);
            const numArg = args.filter(a => !a.includes('@')).find(a => /^\d+$/.test(a) && a.length <= 7);
            const num = numArg !== undefined ? parseInt(numArg) : NaN;
            if (!target || isNaN(num)) return reply(`*[ 🎟️ SET LIMIT ]*\nUsage: *${prefix}setlimit @user <jumlah>*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, target);
            u.limit = num;
            saveRpgDB(rpg);
            return sock.sendMessage(m.chat, {
                text: `*[ SUCCESS ]*\nBerhasil mengatur limit @${target.split('@')[0]} menjadi *${num} Limit*.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

         case "addmoney": {
            if (!isCreator && !isOwner) return reply('*[ KHUSUS OWNER ]*');
            const target = getTargetUser(m, args, participants);
            const nonTagArgs = args.filter(a => !a.includes('@') && !(a.replace(/[^0-9]/g, '').length >= 10 && /^(62|08)/.test(a.replace(/[^0-9]/g, ''))));
            const num = parseInt(nonTagArgs[nonTagArgs.length - 1]) || 10000;
            if (!target) return reply(`*[ 💵 ADD MONEY ]*\nUsage: *${prefix}addmoney @user <jumlah>*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, target);
            u.money = (u.money || 0) + num;
            saveRpgDB(rpg);
            return sock.sendMessage(m.chat, {
                text: `*[ SUCCESS ]*\nBerhasil menambahkan *$${num.toLocaleString()}* ke @${target.split('@')[0]}.\nTotal Money: *$${u.money.toLocaleString()}*`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "setmoney": {
            if (!isCreator && !isOwner) return reply('*[ KHUSUS OWNER ]*');
            const target = getTargetUser(m, args, participants);
            const nonTagArgs = args.filter(a => !a.includes('@') && !(a.replace(/[^0-9]/g, '').length >= 10 && /^(62|08)/.test(a.replace(/[^0-9]/g, ''))));
            const num = parseInt(nonTagArgs[nonTagArgs.length - 1]);
            if (!target || isNaN(num)) return reply(`*[ 💵 SET MONEY ]*\nUsage: *${prefix}setmoney @user <jumlah>*`);

            const rpg = getRpgDB();
            const u = initUserRpg(rpg, target);
            u.money = num;
            saveRpgDB(rpg);
            return sock.sendMessage(m.chat, {
                text: `*[ SUCCESS ]*\nBerhasil mengatur saldo money @${target.split('@')[0]} menjadi *$${num.toLocaleString()}*.`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "whitegroup":
        case "addwhitegroup": {
            if (!isCreator && !isOwner) return reply('*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*\nPerintah ini hanya bisa digunakan oleh Owner Bot!');

            let targetGroupId = null;
            let targetGroupName = 'Grup WhatsApp';

            const linkMatch = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i);
            if (linkMatch) {
                try {
                    const inviteCode = linkMatch[1];
                    const info = await sock.groupGetInviteInfo(inviteCode);
                    targetGroupId = info.id;
                    targetGroupName = info.subject || targetGroupName;

                    await sock.groupAcceptInvite(inviteCode).catch(() => {});
                } catch (e) {
                    return reply(`*[ ❌ 𝙻𝙸𝙽𝙺 𝚃𝙸𝙳𝙰𝙺 𝚅𝙰𝙻𝙸𝙳 ]*\nGagal mengambil info grup dari link tersebut. Pastikan link undangan grup masih aktif!\n*Error:* ${e.message}`);
                }
            } else if (args[0] && args[0].endsWith('@g.us')) {
                targetGroupId = args[0].trim();
            } else if (isGroup && !text) {
                targetGroupId = from;
                targetGroupName = groupExtra.groupMetadata?.subject || 'Grup Ini';
            } else {
                return reply(
                    `*[ 🛡️ 𝚆𝙷𝙸𝚃𝙴𝙻𝙸𝚂𝚃 𝙶𝚁𝙾𝚄𝙿 ]*\n` +
                    `Masukkan link grup untuk mendaftarkan grup ke Whitelist:\n\n` +
                    `• *Via Link:* ${prefix}whitegroup https://chat.whatsapp.com/xxxx\n` +
                    `• *Di Grup Langsung:* Ketik *${prefix}whitegroup* di dalam grup\n` +
                    `• *Hapus Grup:* ${prefix}delwhitegroup <link/id>\n` +
                    `• *Lihat Daftar:* ${prefix}listwhitegroup`
                );
            }

            if (whitegroups.includes(targetGroupId)) {
                return reply(`*[ ℹ️ 𝚂𝚄𝙳𝙰𝙷 𝚃𝙴𝚁𝙳𝙰𝙵𝚃𝙰𝚁 ]*\nGrup *${targetGroupName}* (\`${targetGroupId}\`) sudah ada di dalam Whitelist!`);
            }

            whitegroups.push(targetGroupId);
            saveWhiteGroups(whitegroups);

            return reply(
                `*[ 𝚆𝙷𝙸𝚃𝙴𝙶𝚁𝙾𝚄𝙿 𝙰𝙳𝙳𝙴𝙳 ]*\n` +
                `Berhasil memasukkan grup ke dalam Whitelist!\n\n` +
                `• *Nama Grup:* ${targetGroupName}\n` +
                `• *ID Grup:* ${targetGroupId}\n` +
                `• *Total Whitelist:* ${whitegroups.length} Grup\n\n` +
                `_Bot sekarang hanya merespons di grup Whitelist & Private Chat._`
            );
        }
        break;

        case "delwhitegroup": {
            if (!isCreator && !isOwner) return reply('*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*');

            let targetGroupId = null;
            const linkMatch = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i);

            if (linkMatch) {
                try {
                    const info = await sock.groupGetInviteInfo(linkMatch[1]);
                    targetGroupId = info.id;
                } catch (e) {
                    return reply('*[ ❌ 𝙶𝙰𝙶𝙰𝙻 ]*\nLink grup tidak valid atau sudah kedaluwarsa.');
                }
            } else if (args[0] && args[0].endsWith('@g.us')) {
                targetGroupId = args[0].trim();
            } else if (isGroup && !text) {
                targetGroupId = from;
            } else {
                return reply(`*[ 🛡️ 𝙳𝙴𝙻 𝚆𝙷𝙸𝚃𝙴𝙶𝚁𝙾𝚄𝙿 ]*\nUsage: *${prefix}delwhitegroup <link grup / ID grup>* atau ketik langsung di dalam grup.`);
            }

            if (!whitegroups.includes(targetGroupId)) {
                return reply(`*[ ❌ 𝚃𝙸𝙳𝙰𝙺 𝙳𝙸𝚃𝙴𝙼𝚄𝙺𝙰𝙽 ]*\nGrup \`${targetGroupId}\` tidak ada di dalam daftar Whitelist.`);
            }

            whitegroups = whitegroups.filter(id => id !== targetGroupId);
            saveWhiteGroups(whitegroups);

            return reply(`*[ 🗑️ 𝚆𝙷𝙸𝚃𝙴𝙶𝚁𝙾𝚄𝙿 𝚁𝙴𝙼𝙾𝚅𝙴𝙳 ]*\nGrup \`${targetGroupId}\` telah dihapus dari Whitelist.\n*Sisa Whitelist:* ${whitegroups.length} Grup.`);
        }
        break;

        case "listwhitegroup": {
            if (!isCreator && !isOwner) return reply('*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*');
            if (whitegroups.length === 0) {
                return reply('*[ 🛡️ 𝚆𝙷𝙸𝚃𝙴𝙻𝙸𝚂𝚃 𝙶𝚁𝙾𝚄𝙿 ]*\nBelum ada grup di dalam Whitelist (Semua grup saat ini diblokir kecuali Private Chat).');
            }

            let listTxt = `*[ 🛡️ 𝙳𝙰𝙵𝚃𝙰𝚁 𝚆𝙷𝙸𝚃𝙴𝙻𝙸𝚂𝚃 𝙶𝚁𝙾𝚄𝙿 (${whitegroups.length}) ]*\n\n`;
            for (let i = 0; i < whitegroups.length; i++) {
                const gid = whitegroups[i];
                let gName = 'Unknown Group';
                try {
                    const meta = await sock.groupMetadata(gid);
                    if (meta?.subject) gName = meta.subject;
                } catch (_) {}
                listTxt += `${i + 1}. *${gName}*\n   └ \`${gid}\`\n`;
            }
            return reply(listTxt.trim());
        }
        break;

        case "addowner":
        case "addown": {
            if (!isCreator) return reply(`*khusus owner!*`);
            if (!args[0]) return reply(`*example: ${prefix}addowner 628xxx*`);
            const target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            if (ownerbot.includes(target)) return reply(`*${target} sudah jadi owner*`);
            ownerbot.push(target);
            fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2));
            reply(`*✅ ${target} TELAH MENJADI OWNER*`);
        }
        break;

        case "delowner":
        case "delown": {
            if (!isCreator) return reply(`*khusus owner!!*`);
            if (!args[0]) return reply(`*example: ${prefix}delowner 628xxx*`);
            const target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
            const unp = ownerbot.indexOf(target);
            if (unp === -1) return reply(`*${target} BUKAN OWNER*`);
            ownerbot.splice(unp, 1);
            fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2));
            reply(`*✅ ${target} SUDAH BUKAN OWNER*`);
        }
        break;

        case "addprem": {
            if (!isCreator) return reply("*❗ AKSES DI TOLAK!!*");
            const target = getTargetUser(m, args, participants, sock, botNumber);
            if (!target) return reply(`❌ BUKAN GITU \n*GINI CARA NYA ✅*\n example: ${prefix}addprem @user atau ${prefix}addprem 628xxx`);
            if (premium.includes(target)) return reply(`*${target} sudah premium*`);
            premium.push(target);
            fs.writeFileSync(PREM_PATH, JSON.stringify(premium, null, 2));
            return sock.sendMessage(m.chat, {
                text: `*✅ @${target.split('@')[0]} TELAH MENJADI PREMIUM*`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case "delprem": {
            if (!isCreator) return reply("*❗ AKSES DI TOLAK!!*");
            const target = getTargetUser(m, args, participants, sock, botNumber);
            if (!target) return reply(`❌ BUKAN GITU \n*GINI CARA NYA ✅*\n ${prefix}delprem @user atau ${prefix}delprem 628xxx`);
            const unp = premium.indexOf(target);
            if (unp === -1) return reply(`*${target} BUKAN PREMIUM*`);
            premium.splice(unp, 1);
            fs.writeFileSync(PREM_PATH, JSON.stringify(premium, null, 2));
            return sock.sendMessage(m.chat, {
                text: `*✅ @${target.split('@')[0]} SUDAH BUKAN PREMIUM*`,
                mentions: [target]
            }, { quoted: m });
        }
        break;

        case 'public': {
            if (!isCreator) return reply("*Khusus Owner*");
            sock.public = true;
            reply("Success To Public Mode");
        }
        break;

        case 'self': {
            if (!isCreator) return reply("*Khusus Owner*");
            sock.public = false;
            reply("Success To Self Mode");
        }
        break;

        case 'jadibot':
            await jadibot(sock, m, smsg, store);
            break;

        case 'stopjadibot':
        case 'stopclone':
            await stopjadibot(sock, m);
            break;

        case 'listjadibot':
        case 'listclone':
            await listjadibot(sock, m);
            break;

        case "backup": {
            if (!isCreator && !isOwner) {
                return reply('*[ ❌ 𝙺𝙷𝚄𝚂𝚄𝚂 𝙾𝚆𝙽𝙴𝚁 ]*\nFitur backup hanya bisa digunakan oleh Owner Bot!');
            }

            const targetOpt = (args[0] || '').toLowerCase();

            const BACKUP_TARGETS = {
                all: {
                    label: "📦 Full Backup (Semua File Penting)",
                    desc: "Backup Core + lib + scrape + plugins + control + assets",
                    paths: ['index.js', 'handler.js', 'case.js', 'package.json', 'lib', 'scrape', 'plugins', 'control', 'assets']
                },
                db: {
                    label: "🗄️ Database Only (lib/database)",
                    desc: "Backup cepat rpg.json, premium, owner, group_data, dll.",
                    paths: ['lib/database', 'lib/menu.json']
                },
                core: {
                    label: "⚙️ File Core Utama",
                    desc: "Backup index.js, handler.js, case.js, & package.json",
                    paths: ['index.js', 'handler.js', 'case.js', 'package.json']
                },
                lib: {
                    label: "📁 Folder lib",
                    desc: "Backup seluruh isi folder ./lib (termasuk database & menu)",
                    paths: ['lib']
                },
                scrape: {
                    label: "🕷️ Folder scrape",
                    desc: "Backup seluruh modul scraper & canvas (fakebca, fakegopay, brat, dll.)",
                    paths: ['scrape']
                },
                plugins: {
                    label: "🔌 Folder plugins",
                    desc: "Backup seluruh fitur di dalam folder ./plugins",
                    paths: ['plugins']
                },
                control: {
                    label: "🎛️ Folder control",
                    desc: "Backup konfigurasi di dalam folder ./control (settings.js)",
                    paths: ['control']
                },
                assets: {
                    label: "🎨 Folder assets",
                    desc: "Backup seluruh template gambar & font di ./assets",
                    paths: ['assets']
                }
            };

            if (!targetOpt || !BACKUP_TARGETS[targetOpt]) {
                const rows = Object.entries(BACKUP_TARGETS).map(([key, val]) => ({
                    header: "",
                    title: applyUserFont(val.label, m.sender),
                    description: applyUserFont(val.desc, m.sender),
                    id: `${prefix}backup ${key}`
                }));

                const bodyTxt = applyUserFont(
                    `*[ 🗄️ 𝙶𝚄𝚃𝚂 | 𝙼𝙳 𝙱𝙰𝙲𝙺𝚄𝙿 𝙼𝙰𝙽𝙰𝙶𝙴𝚁 ]*\n\n` +
                    `Silakan klik tombol di bawah untuk memilih folder atau file yang ingin di-backup:\n\n` +
                    `• *${prefix}backup all* — Semua File & Folder Penting\n` +
                    `• *${prefix}backup db* — Khusus Database (\`rpg.json\`, dll)\n` +
                    `• *${prefix}backup core* — File Utama (\`index\`, \`handler\`, \`case\`, \`package\`)\n` +
                    `• *${prefix}backup lib* — Folder \`./lib\`\n` +
                    `• *${prefix}backup scrape* — Folder \`./scrape\`\n` +
                    `• *${prefix}backup plugins* — Folder \`./plugins\`\n` +
                    `• *${prefix}backup control* — Folder \`./control\`\n` +
                    `• *${prefix}backup assets* — Folder \`./assets\``,
                    m.sender
                );

                try {
                    const interactiveBackup = {
                        body: { text: bodyTxt },
                        footer: { text: applyUserFont("GutS | MD Safe Backup System", m.sender) },
                        header: { hasMediaAttachment: false },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: applyUserFont("📂 Pilih Target Backup", m.sender),
                                        sections: [
                                            {
                                                title: applyUserFont("Daftar Modul & Folder", m.sender),
                                                rows
                                            }
                                        ]
                                    })
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: applyUserFont("⚡ Backup Database Cepat", m.sender),
                                        id: `${prefix}backup db`
                                    })
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: applyUserFont("📦 Full Backup Semua", m.sender),
                                        id: `${prefix}backup all`
                                    })
                                }
                            ],
                            messageParamsJson: "{}"
                        }
                    };

                    const genMsg = generateWAMessageFromContent(from, {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                interactiveMessage: interactiveBackup
                            }
                        }
                    }, { userJid: from });

                    return await sock.relayMessage(from, genMsg.message, { messageId: genMsg.key.id });
                } catch (errBtn) {
                    return reply(bodyTxt);
                }
            }

            try {
                await sock.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
                const spec = BACKUP_TARGETS[targetOpt];
                const existingPaths = spec.paths.filter(p => fs.existsSync(p));

                if (existingPaths.length === 0) {
                    return reply(`*[ ❌ 𝙱𝙰𝙲𝙺𝚄𝙿 GAGAL ]*\nFolder/file untuk kategori *${targetOpt}* tidak ditemukan di server!`);
                }

                const nowWib = new Date(Date.now() + 7 * 3600 * 1000);
                const stamp = `${nowWib.getUTCFullYear()}-${String(nowWib.getUTCMonth() + 1).padStart(2, '0')}-${String(nowWib.getUTCDate()).padStart(2, '0')}_${String(nowWib.getUTCHours()).padStart(2, '0')}-${String(nowWib.getUTCMinutes()).padStart(2, '0')}`;
                const pathArgs = existingPaths.map(p => `"${p}"`).join(' ');

                let archivePath = `./Backup_GutS_${targetOpt.toUpperCase()}_${stamp}.zip`;
                let mimeType = 'application/zip';

                try {
                    execSync(`zip -r -q "${archivePath}" ${pathArgs} -x "node_modules/*" "session/*" ".git/*" "*.npm/*"`, { stdio: 'ignore' });
                } catch (_) {
                    // Fallback otomatis ke .tar.gz jika container Pterodactyl tidak memiliki paket zip
                    archivePath = `./Backup_GutS_${targetOpt.toUpperCase()}_${stamp}.tar.gz`;
                    mimeType = 'application/gzip';
                    execSync(`tar --exclude="node_modules" --exclude="session" --exclude=".git" -czf "${archivePath}" ${pathArgs}`);
                }

                if (!fs.existsSync(archivePath)) {
                    throw new Error('Gagal membuat file arsip backup.');
                }

                const fileBuf = fs.readFileSync(archivePath);
                const sizeMB = (fileBuf.length / (1024 * 1024)).toFixed(2);
                const sizeKB = (fileBuf.length / 1024).toFixed(1);
                const sizeStr = fileBuf.length > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
                const fileName = path.basename(archivePath);

                fs.unlinkSync(archivePath);

                const caption =
                    `*[ ✅ 𝙱𝙰𝙲𝙺𝚄𝙿 𝙱𝙴𝚁𝙷𝙰𝚂𝙸𝙻 ]*\n\n` +
                    `• *Kategori:* ${spec.label}\n` +
                    `• *Isi:* ${existingPaths.map(p => `\`${p}\``).join(', ')}\n` +
                    `• *Ukuran:* ${sizeStr}\n` +
                    `• *Waktu:* ${stamp.replace('_', ' ')} WIB`;

                // Jika dijalankan di grup, kirim file backup ke Private Chat (DM) pengirim demi keamanan script!
                const destJid = isGroup ? m.sender : m.chat;

                await sock.sendMessage(destJid, {
                    document: fileBuf,
                    fileName,
                    mimetype: mimeType,
                    caption
                }, { quoted: m });

                await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

                if (isGroup) {
                    await reply(`*[ 🔒 𝙱𝙰𝙲𝙺𝚄𝙿 𝚃𝙴𝚁𝙺𝙸𝚁𝙸𝙼 𝙺𝙴 𝙿𝙲 ]*\nDemi keamanan script & database, file *${fileName}* (${sizeStr}) telah dikirim ke *Private Chat (DM)* kamu!`);
                }
            } catch (e) {
                console.error('[BACKUP ERROR]:', e);
                await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`*[ ❌ 𝙱𝙰𝙲𝙺𝚄𝙿 𝙴𝚁𝚁𝙾𝚁 ]*\n${e.message}`);
            }
        }
        break;

        case "ping":
        case "pinglive":
        case "serverinfo":
        case "monitor": {
            try {
                const latency = Math.max(1, Date.now() - (Number(m.messageTimestamp) * 1000));
                const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
                const rssMem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

                await sock.sendMessage(m.chat, {
                    disclaimerText: applyUserFont("GutS Server Monitor", m.sender),
                    headerText: applyUserFont("## ⚡ SERVER STATUS & PING", m.sender),
                    contentText: "---",
                    title: applyUserFont("System Metrics", m.sender),
                    table: [
                        ["Metric", "Value"],
                        ["Latency", `${latency} ms`],
                        ["Platform", `${os.platform()} (${os.arch()})`],
                        ["CPU Cores", `${os.cpus().length || 1} Cores`],
                        ["RAM (Heap / RSS)", `${heapUsed} MB / ${rssMem} MB`],
                        ["Node.js", process.version],
                        ["Bot Uptime", runtime(process.uptime())]
                    ],
                    footerText: applyUserFont("GutS | MD System", m.sender)
                }, { quoted: m });
            } catch (e) {
                reply(`*[ 𝙿𝙸𝙽𝙶 𝚂𝙴𝚁𝚅𝙴𝚁 ]*\n• *𝙻𝚊𝚝𝚎𝚗𝚌𝚢:* ${Date.now() - (Number(m.messageTimestamp) * 1000)} ms\n• *𝚄𝚙𝚝𝚒𝚖𝚎:* ${runtime(process.uptime())}`);
            }
        }
        break;

        // ── AUTO-CORRECT TYPO COMMAND (DID YOU MEAN) + TOMBOL QUICK REPLY ──
        default: {
            if (isCmd && command.length >= 2) {
                const allValidCmds = [...new Set([...ALL_CASE_COMMANDS, ...(groupExtra.pluginKeys || [])])];
                let bestMatch = null;
                let highestScore = 0;

                for (const valid of allValidCmds) {
                    const score = getStringSimilarity(command, valid);
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = valid;
                    }
                }

                if (bestMatch && highestScore >= 0.45 && bestMatch !== command) {
                    const pct = Math.round(highestScore * 100);
                    const fullSuggestedCmd = `${prefix}${bestMatch}${q ? ' ' + q : ''}`;
                    const typoMsg = applyUserFont(
                        `*[ 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙽𝙾𝚃 𝙵𝙾𝚄𝙽𝙳 ]*\nCommand *${prefix}${command}* does not exist.\n\n➠ *Did you mean:* ${prefix}${bestMatch}\n➠ *Similarity:* ${pct}%`,
                        m.sender
                    );

                    try {
                        const interactiveTypo = {
                            body: { text: typoMsg },
                            footer: { text: applyUserFont("𝙶𝚞𝚝𝚂 𝙰𝚞𝚝𝚘-𝙲𝚘𝚛𝚛𝚎𝚌𝚝", m.sender) },
                            header: { hasMediaAttachment: false },
                            nativeFlowMessage: {
                                buttons: [{
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: applyUserFont(`Run ${prefix}${bestMatch} (${pct}%)`, m.sender),
                                        id: fullSuggestedCmd
                                    })
                                }],
                                messageParamsJson: "{}"
                            }
                        };

                        const genTypo = generateWAMessageFromContent(from, {
                            viewOnceMessage: {
                                message: {
                                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                                    interactiveMessage: interactiveTypo
                                }
                            }
                        }, { userJid: from });

                        await sock.relayMessage(from, genTypo.message, { messageId: genTypo.key.id });
                    } catch (errBtn) {
                        await reply(typoMsg);
                    }
                }
            }
        }
    }
} catch (err) {
    console.log(util.format(err));
}
}
