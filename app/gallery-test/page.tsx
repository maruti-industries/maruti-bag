import { readSheetRows } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryTestPage() {
  const result = await readSheetRows("Gallery")
    .then((rows) => ({
      rows,
      error: null as string | null,
    }))
    .catch((error: unknown) => ({
      rows: [],
      error:
        error instanceof Error
          ? error.message
          : "Unknown Google Sheets error",
    }));

  if (result.error) {
    return (
      <main
        style={{
          padding: 40,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Google Sheets Connection Failed</h1>

        <pre
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 12,
            background: "#fff1f1",
            color: "#a40000",
            whiteSpace: "pre-wrap",
          }}
        >
          {result.error}
        </pre>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Raw Gallery Sheet Test</h1>

      <p>Total raw rows: {result.rows.length}</p>

      <pre
        style={{
          marginTop: 24,
          padding: 20,
          overflowX: "auto",
          borderRadius: 12,
          background: "#f4f4f4",
          whiteSpace: "pre-wrap",
        }}
      >
        {JSON.stringify(result.rows, null, 2)}
      </pre>
    </main>
  );
}