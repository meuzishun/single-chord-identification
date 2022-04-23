const solfegeMap = {
  Do: 0,
  Di: 1,
  Ra: 1,
  Re: 2,
  Ri: 3,
  Me: 3,
  Mi: 4,
  Fa: 5,
  Fi: 6,
  Se: 6,
  Sol: 7,
  Si: 8,
  Le: 8,
  La: 9,
  Li: 10,
  Te: 10,
  Ti: 11,
};

const transpose = function (midi, interval) {
  return midi + interval;
};

const octaveUp = function (midi) {
  return transpose(midi, 12);
};

const octaveDown = function (midi) {
  return transpose(midi, -12);
};
