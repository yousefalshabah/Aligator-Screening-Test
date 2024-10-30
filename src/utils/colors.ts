// src/utils/colors.ts
export const generateColorPalette = (count: number): string[] => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#36A2EB",
    "#4BC0C0",
    "#FF6384",
    "#9966FF",
    "#FF9F40",
  ];

  // Extend the colors if the count exceeds the palette length
  while (colors.length < count) {
    colors.push(
      "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
  }

  return colors.slice(0, count);
};
