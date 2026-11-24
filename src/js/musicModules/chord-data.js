// Each chord has:
//   key   – internal name, unique only within its category
//   label – display HTML (static, author-controlled markup)
//   midi  – normalized pitch data
// Use chordId(category, key) wherever a chord needs a globally unique id.

// Stacked figured-bass figures, e.g. fig('6', '4') for a 6/4 inversion.
const fig = (top, bottom) =>
  `<span class="figures"><span>${top}</span><span>${bottom}</span></span>`;

export const chordId = (category, key) => `${category}:${key}`;

// Wrap a label in a single element so containers that use flexbox (e.g. the
// "keys" theme's buttons) treat it as one item and keep sup/figure alignment.
export const renderLabel = (label) => `<span class="chord-label">${label}</span>`;

export const chordData = {
  major_diatonic: {
    I: { label: 'I', midi: [0, 4, 7, 12] },
    ii: { label: 'ii', midi: [2, 5, 9, 14] },
    iii: { label: 'iii', midi: [4, 7, 11, 16] },
    IV: { label: 'IV', midi: [-7, -3, 0, 5] },
    V: { label: 'V', midi: [-5, -1, 2, 7] },
    vi: { label: 'vi', midi: [-3, 0, 4, 9] },
  },
  major_inversions: {
    I6: { label: 'I<sup>6</sup>', midi: [4, 7, 12, 19] },
    I64: { label: `I${fig('6', '4')}`, midi: [-5, 0, 4, 7] },
    ii6: { label: 'ii<sup>6</sup>', midi: [-7, -3, 2, 5] },
    IV6: { label: 'IV<sup>6</sup>', midi: [-3, 0, 5, 12] },
    IV64: { label: `IV${fig('6', '4')}`, midi: [0, 5, 9, 12] },
    V6: { label: 'V<sup>6</sup>', midi: [-1, 2, 7, 14] },
    V64: { label: `V${fig('6', '4')}`, midi: [2, 7, 11, 14] },
    viiº6: { label: 'vii<sup>°6</sup>', midi: [2, 5, 11, 14] },
  },
  minor_diatonic: {
    i: { label: 'i', midi: [0, 3, 7, 12] },
    iiº: { label: 'ii<sup>°</sup>', midi: [2, 5, 8, 14] },
    III: { label: 'III', midi: [3, 7, 10, 15] },
    iv: { label: 'iv', midi: [-7, -4, 0, 5] },
    V: { label: 'V', midi: [-5, -1, 2, 7] },
    VI: { label: 'VI', midi: [-4, 0, 3, 8] },
    VII: { label: 'VII', midi: [-2, 2, 5, 10] },
  },
  minor_inversions: {
    i6: { label: 'i<sup>6</sup>', midi: [3, 7, 12, 19] },
    i64: { label: `i${fig('6', '4')}`, midi: [-5, 0, 3, 7] },
    iiº6: { label: 'ii<sup>°6</sup>', midi: [-7, -4, 2, 5] },
    iv6: { label: 'iv<sup>6</sup>', midi: [-4, 0, 5, 12] },
    iv64: { label: `iv${fig('6', '4')}`, midi: [0, 5, 8, 12] },
    V6: { label: 'V<sup>6</sup>', midi: [-1, 2, 7, 14] },
    V64: { label: `V${fig('6', '4')}`, midi: [2, 7, 11, 14] },
    viiº6: { label: 'vii<sup>°6</sup>', midi: [2, 5, 11, 14] },
  },
  major_secondary_dominants: {
    V7_of_V: { label: 'V<sup>7</sup>/V', midi: [2, 6, 9, 12] },
    V7_of_IV: { label: 'V<sup>7</sup>/IV', midi: [0, 4, 7, 10] },
    V7_of_vi: { label: 'V<sup>7</sup>/vi', midi: [4, 8, 11, 14] },
    V7_of_ii: { label: 'V<sup>7</sup>/ii', midi: [-3, 1, 4, 7] },
    V7_of_iii: { label: 'V<sup>7</sup>/iii', midi: [-1, 3, 6, 9] },
  },
  minor_secondary_dominants: {
    V7_of_V: { label: 'V<sup>7</sup>/V', midi: [2, 6, 9, 12] },
    V7_of_iv: { label: 'V<sup>7</sup>/iv', midi: [0, 4, 7, 10] },
    V7_of_III: { label: 'V<sup>7</sup>/III', midi: [-2, 2, 5, 8] },
    V7_of_VI: { label: 'V<sup>7</sup>/VI', midi: [3, 7, 10, 13] },
    V7_of_VII: { label: 'V<sup>7</sup>/VII', midi: [5, 9, 12, 15] },
  },
  modal_borrowing_1: {
    iv: { label: 'iv', midi: [5, 8, 12, 17] },
    iiº6: { label: 'ii<sup>°6</sup>', midi: [5, 8, 14, 17] },
    viiº7: { label: 'vii<sup>°7</sup>', midi: [-1, 2, 5, 8] },
  },
  modal_borrowing_2: {
    bIII: { label: '<sup>♭</sup>III', midi: [3, 7, 10, 15] },
    bVI: { label: '<sup>♭</sup>VI', midi: [-4, 0, 3, 8] },
    bVII: { label: '<sup>♭</sup>VII', midi: [-2, 2, 5, 10] },
  },
  chromatic_predominants: {
    N6: { label: 'N<sup>6</sup>', midi: [5, 8, 13, 17] },
    It_aug6th: { label: 'It<sup>+6</sup>', midi: [-4, 0, 6, 12] },
    Fr_aug6th: { label: 'Fr<sup>+6</sup>', midi: [-4, 2, 6, 12] },
    Gr_aug6th: { label: 'Gr<sup>+6</sup>', midi: [-4, 3, 6, 12] },
  },
  altered_dominants: {
    V_aug: { label: 'V<sup>+</sup>', midi: [-5, -1, 3, 7] },
    V_sub6: { label: 'V<sup>sub6</sup>', midi: [-5, -1, 4, 7] },
    V7_sub6: { label: 'V<sup>7 sub6</sup>', midi: [-5, -1, 4, 5] },
  },
};
