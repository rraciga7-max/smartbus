# Smart Bus 360 - Design System & Token Documentation

Extracted directly from Google Stitch 2.0 Project `11671207388413086340`.

---

## 🎨 Color Tokens

### Primary Palette
- **Primary**: `#00288e` (Deep Blue)
- **Primary Container**: `#1e40af`
- **Primary Fixed**: `#dde1ff`
- **Primary Fixed Dim**: `#b8c4ff`
- **On Primary**: `#ffffff`
- **On Primary Container**: `#a8b8ff`
- **On Primary Fixed**: `#001453`

### Secondary Palette
- **Secondary**: `#9d4300` / `#5d5f5f`
- **Secondary Container**: `#dfe0e0`
- **Secondary Fixed**: `#ffdbca`
- **On Secondary**: `#ffffff`
- **On Secondary Container**: `#616363`

### Tertiary Palette
- **Tertiary**: `#25354a` / `#611e00`
- **Tertiary Container**: `#3c4c61`
- **Tertiary Fixed**: `#d3e4fe`
- **On Tertiary**: `#ffffff`
- **On Tertiary Container**: `#acbcd6`

### Surface & Background Tokens
- **Background**: `#f7f9fb`
- **Surface**: `#f7f9fb`
- **Surface Container Lowest**: `#ffffff` (Card background)
- **Surface Container Low**: `#f2f4f6`
- **Surface Container**: `#edeef0`
- **Surface Container High**: `#e6e8ea`
- **Surface Container Highest**: `#e0e3e5`
- **Surface Variant**: `#e0e3e5`
- **Surface Dim**: `#d8dadc`
- **On Surface**: `#191c1e`
- **On Surface Variant**: `#444653`
- **Outline**: `#757684`
- **Outline Variant**: `#c4c5d5`

### Fleet Status Indicators
- **Active (Green)**: `#10B981` (Container: `rgba(16, 185, 129, 0.1)`)
- **Idle (Amber)**: `#F59E0B` (Container: `rgba(245, 158, 11, 0.1)`)
- **Maintenance (Red)**: `#ba1a1a` (Container: `#ffdad6`, On Container: `#93000a`)

---

## 🔤 Typography

- **Font Family**: `Inter`, sans-serif
- **Icon Set**: Google Material Symbols Outlined
- **Display Large**: `32px` / `48px` (Line height: `40px` / `56px`, Font weight: `700`)
- **Headline Sm/Md/Lg**: `20px` / `24px` / `32px` (Font weight: `600`)
- **Title Lg/Md**: `18px` / `20px` (Font weight: `600`)
- **Body Lg/Md**: `16px` / `14px` (Font weight: `400`)
- **Label Md/Sm**: `12px` / `11px` (Font weight: `500` / `600`)

---

## 📐 Spacing & Layout Tokens

- **Margin Mobile**: `16px`
- **Margin Desktop**: `32px`
- **Gutter**: `24px`
- **Border Radius**:
  - Cards: `24px` (`rounded-[24px]`)
  - Buttons: `16px` (`rounded-[16px]` / `rounded-xl`)
  - Inputs: `9999px` / `16px` (`rounded-full` / `rounded-xl`)
  - Avatars & Badges: `9999px` (`rounded-full`)

---

## 📱 Responsive Behavior

- **Desktop (>= 1024px)**: Persistent left sidebar navigation (`w-64`), fixed top header, wide grid layout.
- **Tablet (768px - 1023px)**: Collapsible sidebar navigation (`w-20` / `w-64`), responsive 2-column bento grids.
- **Mobile (< 768px)**: Top header bar, fixed bottom tab navigation (`h-16 pb-safe`), single-column stacked card list.
