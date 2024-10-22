import { v4 as uuid } from 'uuid'
const catId = uuid()
const dogId = uuid()
const birdId = uuid()

export const SPRITE_WIDTH = 85;
export const SPRITE_HEIGHT = 85;
export default [
    {
        id: 1,
        name: "cat",
        position: { x: 0, y: 0 },
        rotation: 0,
        photoId: 1,
        actions: [],
    },
    {
        id: 2,
        name: "dog",
        position: { x: 140, y: 0 },
        rotation: 0,
        photoId: 2,
        actions: [],
    },
    {
        id: 3,
        name: "bird",
        position: { x: 140, y: 0 },
        rotation: 0,
        photoId: 3,
        actions: [],
    }
]