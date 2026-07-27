export const lerp = (a, b, t) => a + (b - a) * t;
export const lerpPoint = (p1, p2, t) => ({
  x: lerp(p1.x, p2.x, t),
  y: lerp(p1.y, p2.y, t),
});
export function smoothstep(edge0, edge1, x) {
  let t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}


export const randomBetween = (a, b) => a + Math.random() * (b - a);
const randomOS = Math.random() * 200;
export const hash = (x, os = randomOS) =>
  Math.abs(Math.sin((x + os) * 9174986346) * 1964286753) % 1;

export function getPoint(id, w) {
  return {
    x: id % w,
    y: Math.floor(id / w),
  };
}
export function getPointID(x, y, w) {
  return y * w + x;
}
export const getHorizontalEdgeId = (x, y, w) => y * w + x;
export const getVerticalEdgeId = (x, y, w, h) => w * h + w + (x * h + y);
export function getEdgeIDBetweenPoints(a, b, w, h) {
  // Check for horizontal adjacency
  if (a.y === b.y && Math.abs(a.x - b.x) === 1) {
    const canonicalX = Math.min(a.x, b.x);
    return getHorizontalEdgeId(canonicalX, a.y, w);
  }
  // Check for vertical adjacency
  if (a.x === b.x && Math.abs(a.y - b.y) === 1) {
    const canonicalY = Math.min(a.y, b.y);
    return getVerticalEdgeId(a.x, canonicalY, w, h);
  }

  console.warn("No edge between these points");
  return null;
}
export function getPointsForGridId(id, w, h) {
  const { x: col, y: row } = getPoint(id, w);
  // Each grid cell is defined by its top-left corner
  // The 4 points of the cell are: top-left, top-right, bottom-right, bottom-left
  return [
    { x: col, y: row }, // top left
    { x: col + 1, y: row }, // top right
    { x: col + 1, y: row + 1 }, // bottom right
    { x: col, y: row + 1 }, // bottom left
  ];
}
export function getEdgeIdsForGridId(id, w, h) {
  const points = getPointsForGridId(id, w, h);
  return [
    getEdgeIDBetweenPoints(points[0], points[1], w, h), // top edge
    getEdgeIDBetweenPoints(points[1], points[2], w, h), // right edge
    getEdgeIDBetweenPoints(points[2], points[3], w, h), // bottom edge
    getEdgeIDBetweenPoints(points[3], points[0], w, h), // left edge
  ];
}
export function drawCircle(toy, r, x, y, steps) {
  const TAU = Math.PI * 2;
  toy.pu();
  toy.jump(x, y - r);
  toy.pd();
  for (let i = 0; i < steps; i++) {
    toy.right(TAU / steps);
    toy.forward((TAU * r) / steps);
  }
}
export function drawGrid(toy, w, h, wFactor, hFactor) {
  for (let i = 0; i <= w; i++) {
    for (let j = 0; j <= h; j++) {
      drawCircle(toy, 5, i * wFactor, j * hFactor, 10);
    }
  }
}