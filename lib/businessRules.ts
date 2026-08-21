export const MINIMUM_ORDER_QUANTITY = 1_000;

const INVENTORY_COLOUR_CORRECTIONS: Record<string, string> = {
  "Coffe/Brown": "Coffee/Brown",
  "Neavy Blue": "Navy Blue",
};

export function normalizeInventoryColour(colour: string): string {
  const trimmedColour = colour.trim();
  return INVENTORY_COLOUR_CORRECTIONS[trimmedColour] ?? trimmedColour;
}

export function formatMoqCompact(): string {
  return `${MINIMUM_ORDER_QUANTITY.toLocaleString("en-IN")} pcs`;
}
