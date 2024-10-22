import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatSprite from '../sprites/CatSprite';
import DogSprite from '../sprites/DogSprite';
import BirdSprite from '../sprites/BirdSprite';
import { selectSprite } from '../redux/spritesSlice';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites';

export const SpriteImage = ({ spriteId, styles, handleClick }) => {
    switch (spriteId) {
        case 1:
            return <CatSprite styles={styles} onClick={handleClick} />
        case 2:
            return <DogSprite styles={styles} onClick={handleClick} />
        case 3:
            return <BirdSprite styles={styles} onClick={handleClick} />
        default:
            return <></>
    }
}
const Sprite = ({ sprite, containerSize, onDragStart, onDrag }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(selectSprite(sprite.id));
    };

    const { left, top } = useMemo(() => {
        const centerX = containerSize.width / 2;
        const centerY = containerSize.height / 2;

        const spriteX = centerX + sprite.position.x - SPRITE_WIDTH / 2;
        const spriteY = centerY - sprite.position.y - SPRITE_HEIGHT / 2;

        return {
            left: spriteX,
            top: spriteY
        };
    }, [containerSize, sprite.position.x, sprite.position.y]);

    const handleDragStart = (e) => {
        onDragStart(sprite.id);
    };

    
    const isBorder = useSelector((state) => state.sprites.isBorder);
    const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);

    return (
        <div
            className={`absolute transition-transform duration-400  ${(selectedSpriteId===sprite.id & isBorder) ? "border-4 border-blue-200 rounded-lg" : ""}`}
            style={{
                transform: `translate(${left}px, ${top}px) rotate(${sprite.rotation}deg)`,
            }}
            draggable="true"
            onDragStart={handleDragStart}
            onDrag={onDrag}
        >
            <SpriteImage spriteName={sprite.name} spriteId={sprite.photoId} handleClick={handleClick} styles={{ width: SPRITE_WIDTH + "px", height: SPRITE_HEIGHT + "px" }} />
        </div>
    );
};

export default Sprite;
