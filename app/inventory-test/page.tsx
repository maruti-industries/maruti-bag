import { getInventoryProducts } from "@/lib/inventory";

export default async function InventoryTestPage() {
  const products = await getInventoryProducts();

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Inventory API Test</h1>

      <p>Total products: {products.length}</p>

      <pre
        style={{
          marginTop: "24px",
          padding: "20px",
          overflowX: "auto",
          borderRadius: "12px",
          background: "#f4f4f4",
          whiteSpace: "pre-wrap",
        }}
      >
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}