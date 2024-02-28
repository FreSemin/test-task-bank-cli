import { NO_DATA_TEXT } from '../constants/index.js';

export const logInfo = (data) => {
  if (data.length === 0) {
    console.log(NO_DATA_TEXT);

    return;
  }

  data.forEach((element) => {
    const groupName = element.name ? element.name : element.id;

    console.group(groupName);

    for (const [key, value] of Object.entries(element)) {
      console.log(`${key}: ${value}`);
    }

    console.groupEnd();
  });
};