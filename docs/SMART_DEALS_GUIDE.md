# Smart Deals Implementation Guide

## Overview
The "Smart Deals" section automatically displays products that have active discounts/sales pricing configured in your Medusa backend.

## How It Works

### 1. Automatic Detection
The system automatically detects discounted products by checking:
- If `calculated_price.price_type === "sale"`
- If there's a `percentage_diff` between original and calculated price

### 2. Smart Deals Section
Location: `src/modules/home/components/smart-deals-section/index.tsx`

```typescript
<SmartDealsSection region={region} limit={20} />
```

**Props:**
- `region` - The store region (required for pricing)
- `limit` - Maximum number of products to fetch (default: 20)

### 3. How to Set Up Deals in Medusa

There are several ways to create "deals" that will appear in Smart Deals:

#### Option A: Price Lists (Recommended)
1. In Medusa Admin, go to **Pricing** → **Price Lists**
2. Create a new price list with type `sale`
3. Add products/variants with discounted prices
4. Set start/end dates for the promotion
5. Products in active sale price lists will automatically appear

#### Option B: Manual Variant Pricing
1. Go to **Products** → Select a product
2. Edit variant pricing
3. Add a price with `price_list_type: "sale"`
4. The system will calculate the discount automatically

#### Option C: Via API
```typescript
// Create a sale price list
await medusa.admin.priceLists.create({
  name: "Black Friday Sale",
  type: "sale", // Important: must be "sale"
  prices: [
    {
      amount: 1999, // Discounted price
      variant_id: "variant_123",
      currency_code: "eur"
    }
  ],
  starts_at: "2024-11-24T00:00:00Z",
  ends_at: "2024-11-27T23:59:59Z"
})
```

## Styling

### Red Centered Title
The "Smart Deals" title is:
- **Centered** on the page
- **Red color** using `text-sales` (from your color palette)
- **Larger** (text-3xl) than category sections
- Has a **right arrow** link to view all deals

### Red Badge on Cards
Products in Smart Deals section show:
- Red "Smart Deals" badge overlay on product image
- Strike-through original price
- Bold red sale price

## Customization

### Change the limit of deals shown
```typescript
// In homepage template
<SmartDealsSection region={region} limit={30} />
```

### Filter by specific category
Edit `smart-deals-section/index.tsx`:
```typescript
const {
    response: { products: allProducts },
} = await listProducts({
    regionId: region.id,
    queryParams: {
        fields: "*variants.calculated_price,+variants.inventory_quantity",
        limit,
        category_id: ["cat_electronics"], // Add filter
    },
});
```

### Change the view-all link
```typescript
<LocalizedClientLink
    href="/store?on_sale=true" // Custom URL
    // or href="/collections/deals"
>
```

## Utilities

### `filterDiscountedProducts()`
Location: `src/lib/util/get-discounted-products.ts`

Filters an array of products to only include those with active discounts:
```typescript
import { filterDiscountedProducts } from "@lib/util/get-discounted-products";

const deals = filterDiscountedProducts(allProducts);
```

### `hasDiscount()`
Check if a single product has a discount:
```typescript
import { hasDiscount } from "@lib/util/get-discounted-products";

if (hasDiscount(product)) {
  // Show special treatment
}
```

## Testing

To test that Smart Deals appear:

1. **Ensure backend is running** with proper CORS/env
2. **Create a price list** with type "sale" in Medusa Admin
3. **Add products** to the price list with lower prices
4. **Reload the homepage** - discounted products should appear in Smart Deals
5. **Verify styling**:
   - Title is centered and red
   - Red "Smart Deals" badge on each card
   - Strike-through original price
   - Red sale price

## Troubleshooting

### Smart Deals section doesn't appear
- Check if you have products with `price_type: "sale"`
- Verify price lists are active (check start/end dates)
- Ensure `calculated_price` is included in query fields
- Check browser console for errors

### No red badge on cards
- Verify `showBadge={true}` prop is passed
- Check if `price_type === "sale"` for the product
- Inspect product data in browser DevTools

### Title not centered
- Clear browser cache
- Verify CSS classes: `flex items-center justify-center`
- Check if custom CSS is overriding styles

## Alternative: Manual Product Selection

If you want to manually curate deals instead of auto-detection:

1. Create a collection called "Smart Deals"
2. Add products manually in Medusa Admin
3. Update `SmartDealsSection` to use collection:

```typescript
const {
    response: { products },
} = await listProducts({
    regionId: region.id,
    queryParams: {
        collection_id: ["col_smart_deals"], // Your collection ID
        fields: "*variants.calculated_price,+variants.inventory_quantity",
        limit,
    },
});

// Use products directly (no filtering needed)
```

This gives you full control over which products appear, regardless of pricing.

