import "server-only";

import { JWT } from "google-auth-library";

export type GoogleSheetRow = Record<string, string>;

function cleanEnvValue(value: string | undefined) {
  return String(value ?? "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

function getCredentials() {
  const clientEmail = cleanEnvValue(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  );

  const rawPrivateKey = cleanEnvValue(
    process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  );

  const spreadsheetId = cleanEnvValue(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  );

  const privateKey = rawPrivateKey
    .replace(/\\n/g, "\n")
    .trim();

  if (!clientEmail) {
    throw new Error("GOOGLE_SHEETS_CLIENT_EMAIL is missing.");
  }

  if (!privateKey) {
    throw new Error("GOOGLE_SHEETS_PRIVATE_KEY is missing.");
  }

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is missing.");
  }

  if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
    throw new Error(
      "GOOGLE_SHEETS_PRIVATE_KEY has an invalid beginning.",
    );
  }

  if (!privateKey.endsWith("-----END PRIVATE KEY-----")) {
    throw new Error(
      "GOOGLE_SHEETS_PRIVATE_KEY has an invalid ending.",
    );
  }

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
  };
}

async function getAccessToken() {
  const { clientEmail, privateKey } = getCredentials();

  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });

  const tokenResult = await auth.getAccessToken();

  if (!tokenResult.token) {
    throw new Error(
      "Google authentication succeeded but no access token was returned.",
    );
  }

  return tokenResult.token;
}

export async function readSheetRows(
  sheetName: string,
): Promise<GoogleSheetRow[]> {
  const { spreadsheetId } = getCredentials();

  const accessToken = await getAccessToken();

  const range = encodeURIComponent(`'${sheetName}'!A:Z`);

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${spreadsheetId}/values/${range}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Google Sheets API returned ${response.status}: ${errorText}`,
    );
  }

  const data = (await response.json()) as {
    values?: unknown[][];
  };

  const values = data.values;

  if (!values || values.length < 2) {
    return [];
  }

  const [headerRow, ...dataRows] = values;

  const headers = headerRow.map((header) =>
    String(header ?? "").trim(),
  );

  return dataRows
    .filter((row) =>
      row.some(
        (cell) => String(cell ?? "").trim() !== "",
      ),
    )
    .map((row) => {
      const record: GoogleSheetRow = {};

      headers.forEach((header, index) => {
        if (!header) return;

        record[header] = String(
          row[index] ?? "",
        ).trim();
      });

      return record;
    });
}