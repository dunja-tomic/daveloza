import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import {convertToA1Notation} from '../utils';

export interface SheetsResponse {
  range: string;
  majorDimension: string;
  values: [string[]];
}

export interface Error {
  error: {
    code: number;
    details: {};
    message: string;
    status: string;
  };
}

class API {
  spreadSheetId = Config.GOOGLE_SHEETS_SPREADSHEET_ID;
  key = Config.GOOGLE_SHEETS_SPREADSHEET_KEY;

  // This function will error out when we've hit the quota limit
  getAllData: () => Promise<SheetsResponse | Error> = async () => {
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadSheetId}/values/Sheet1` +
      `?valueRenderOption=FORMATTED_VALUE&majorDimension=COLUMNS&key=${this.key}`;

    const response = await fetch(url, {
      method: 'GET',
    });
    const responseJson = await response.json();
    return responseJson;
  };

  // Add a new product (a new row in the leftmost column) to the spreadsheet
  addProduct = async (productName: string) => {
    const currentUser = await GoogleSignin.getTokens();
    const accessToken = currentUser.accessToken;

    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadSheetId}/values/Sheet1:append` +
      '?valueInputOption=USER_ENTERED';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Host: 'sheets.googleapis.com',
      },
      body: JSON.stringify({
        values: [[productName]],
      }),
    });

    return response.status;
  };

  // Save values
  saveValues = async (data: string[], numberOfColumns: number) => {
    const currentUser = await GoogleSignin.getTokens();
    const accessToken = currentUser.accessToken;

    const a1NotationOfColumnToAddTo = convertToA1Notation(numberOfColumns, 0);

    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadSheetId}/values/Sheet1!${a1NotationOfColumnToAddTo}:append` +
      '?valueInputOption=USER_ENTERED';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Host: 'sheets.googleapis.com',
      },
      body: JSON.stringify({
        values: [data],
        majorDimension: 'COLUMNS',
      }),
    });

    return response.status;
  };
}

// SINGLETON //
const instance = new API();
Object.freeze(instance);

export default instance;
