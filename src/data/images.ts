export const images = [
  { name:'exterior', title:'The setting', alt:'Glazed contemporary villa and infinity pool overlooking blue-hour water and distant hills.', source:'Concept reference image' },
  { name:'living', title:'Light, lived in', alt:'Linen seating and a walnut coffee table beside full-height windows overlooking the water.', source:'AI-generated concept image' },
  { name:'dining', title:'Room to gather', alt:'Walnut dining table and upholstered chairs beneath a slim pendant, opening toward the pool.', source:'AI-generated concept image' },
  { name:'bedroom', title:'A quieter rhythm', alt:'Soft linen bed, walnut headboard and warm lamps beside glazing facing the evening water.', source:'AI-generated concept image' },
  { name:'terrace', title:'At the water’s edge', alt:'Two lounge chairs under a concrete canopy beside an infinity pool at dusk.', source:'AI-generated concept image' },
  { name:'detail', title:'Material language', alt:'Honed stone, warm timber and dark glazing meeting in soft architectural light.', source:'AI-generated concept image' },
] as const;
export type ImageName = typeof images[number]['name'];
export function imageInfo(name: ImageName) { return images.find(image => image.name === name)!; }
