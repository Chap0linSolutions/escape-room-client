export type coordinate = {
  x: number;
  y: number;
};

export type size = {
  w: number;
  h: number;
};

export type quad = [number, number];

export type keyAndIcon = {
  key: string;
  icon: string;
};

export type actionType = {
  sound: string;
  texts: string[];
  allowedDirections: string[];
};

export type positionType = {
  canvas: coordinate;
  map?: coordinate[];
  hitboxes?: coordinate[];
}