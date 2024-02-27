import { NO_BANKS_TEXT } from '../constants/index.js';

export const logBanksInfo = (banks) => {
  if (banks.length === 0) {
    console.log(NO_BANKS_TEXT);

    return;
  }

  banks.forEach((bank) => {
    console.group(bank.name);

    for (const [key, value] of Object.entries(bank)) {
      console.log(`${key}: ${value}`);
    }

    console.groupEnd();
  });
};