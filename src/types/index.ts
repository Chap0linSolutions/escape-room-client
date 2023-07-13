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
  sound?: string;
  texts?: string[];
};

export type positionType = {
  canvas: coordinate; //absolute canvas coordinates (where the sprite will be drawn on map)
  map: coordinate; //coordinates relative to the tile map origin
  tiles?: coordinate[]; //coordinates relative to the 'map' attribute
  hitboxes?: coordinate[]; //hitbox relative to the 'map' attribute
  referenceTile?: coordinate;
};

export type hitbox = {
  offset: coordinate;
  size: number;
};

export type ToastProperties = {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
};

export type GameCallbacks = {
  showPopup: (fragment: any) => void;
  showToast: (toastParams: Partial<ToastProperties>) => void;
};

export type clickableArea = {
  coordinate: coordinate;
  radius: number;
};

export type interactiveCoords = {
  open: clickableArea[];
  close: clickableArea[];
};
