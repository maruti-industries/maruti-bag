const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

function readEnvFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value
      .replace(/\\n/g, '\n')
      .trim();
  }
  return values;
}

const env = readEnvFile(path.join(__dirname, '.env.local'));
const clientEmail = env.GOOGLE_SHEETS_CLIENT_EMAIL;
const privateKey = env.GOOGLE_SHEETS_PRIVATE_KEY;

console.log('clientEmailConfigured', Boolean(clientEmail));
console.log('privateKeyConfigured', Boolean(privateKey));
console.log('clientEmailSuffix', clientEmail?.endsWith('.iam.gserviceaccount.com'));
console.log('privateKeyHeader', privateKey?.startsWith('-----BEGIN PRIVATE KEY-----'));
console.log('privateKeyFooter', privateKey?.endsWith('-----END PRIVATE KEY-----'));

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

auth.authorize()
  .then(() => {
    console.log('jwt-authorized');
  })
  .catch((error) => {
    console.error('jwt-error', error.message);
    console.error(error);
    process.exit(1);
  });
