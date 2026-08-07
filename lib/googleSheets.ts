import { google } from "googleapis";

function normalizePrivateKey(rawPrivateKey: string): string {
  return rawPrivateKey
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n")
    .trim();
}

function getGoogleSheetsCredentials() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  const validationErrors: string[] = [];

  if (!clientEmail) {
    validationErrors.push(
      "Missing GOOGLE_SHEETS_CLIENT_EMAIL environment variable.",
    );
  } else if (!clientEmail.endsWith(".iam.gserviceaccount.com")) {
    validationErrors.push(
      "GOOGLE_SHEETS_CLIENT_EMAIL must end with .iam.gserviceaccount.com.",
    );
  }

  if (!privateKey) {
    validationErrors.push(
      "Missing GOOGLE_SHEETS_PRIVATE_KEY environment variable.",
    );
  } else {
    const normalizedPrivateKey = normalizePrivateKey(privateKey);

    if (!normalizedPrivateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
      validationErrors.push(
        "GOOGLE_SHEETS_PRIVATE_KEY does not start with the expected PEM header.",
      );
    }

    if (!normalizedPrivateKey.endsWith("-----END PRIVATE KEY-----")) {
      validationErrors.push(
        "GOOGLE_SHEETS_PRIVATE_KEY does not end with the expected PEM footer.",
      );
    }
  }

  if (!spreadsheetId) {
    validationErrors.push(
      "Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable.",
    );
  }

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.join(" "));
  }

  return {
    clientEmail: clientEmail!,
    privateKey: normalizePrivateKey(privateKey!),
    spreadsheetId: spreadsheetId!,
  };
}

async function getSheetsClient() {
  const { clientEmail, privateKey } = getGoogleSheetsCredentials();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  await auth.authorize();

  return google.sheets({
    version: "v4",
    auth,
  });
}

export type GoogleSheetRow = Record<string, string>;

export async function readSheetRows(
  sheetName: string,
): Promise<GoogleSheetRow[]> {
  try {
    const { spreadsheetId } = getGoogleSheetsCredentials();

    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A:Z`,
    });

    const values = response.data.values;

    if (!values || values.length < 2) {
      return [];
    }

    const [headerRow, ...dataRows] = values;

    const headers = headerRow.map((header) => String(header ?? "").trim());

    return dataRows
      .filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""))
      .map((row) => {
        const record: GoogleSheetRow = {};

        headers.forEach((header, index) => {
          if (!header) return;

          record[header] = String(row[index] ?? "").trim();
        });

        return record;
      });
  } catch {
    console.error(`[google-sheets] Failed to read "${sheetName}"`);
    throw new Error(`Unable to load sheet "${sheetName}" right now.`);
  }
}