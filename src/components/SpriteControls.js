// // // import React from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { selectSprite, toggleCollision } from "../redux/spritesSlice";
// // // import { AddSprites } from "./AddSprites";
// // // import SpriteCard from "./SpriteCard";


// // // const SpriteControls = () => {
// // //   const spritesState = useSelector((state) => state.sprites);
// // //   const sprites = spritesState.sprites;
// // //   const selectedSpritId = spritesState.selectedSpriteId
// // //   const dispatch = useDispatch();
// // //   return (
// // //     <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
// // //       <div className="flex justify-between items-center mb-2">
// // //         <p className="font-bold text-lg">Sprites</p>
// // //         <div className="flex gap-2">
// // //           <div className="flex items-center justify-between py-2 px-4 bg-white rounded-lg shadow-md">
// // //             <label htmlFor="enableCollision" className="text-gray-700 font-medium mr-4">
// // //               Swap Actions On Collision
// // //             </label>
// // //             <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
// // //               <input
// // //                 type="checkbox"
// // //                 id="enableCollision"
// // //                 className="opacity-0 w-0 h-0"
// // //                 checked={spritesState.showCollisionAnimation}
// // //                 onChange={(e) => {
// // //                   dispatch(toggleCollision({ showCollisionAnimation: e.target.checked }));
// // //                 }}
// // //               />
// // //               <label
// // //                 htmlFor="enableCollision"
// // //                 className={`absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${spritesState.showCollisionAnimation ? 'bg-blue-600' : 'bg-gray-300'
// // //                   }`}
// // //               >
// // //                 <span
// // //                   className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${spritesState.showCollisionAnimation ? 'transform translate-x-6' : ''
// // //                     }`}
// // //                 ></span>
// // //               </label>
// // //             </div>
// // //           </div>
// // //           <AddSprites />
// // //         </div>
// // //       </div>
// // //       <div className="flex gap-4 items-start overflow-x-auto">
// // //         <div className="flex gap-2">
// // //           {sprites.map((sprite, index) => (
// // //             <SpriteCard
// // //               key={index}
// // //               spriteName={sprite.name}
// // //               selected={sprite.id === selectedSpritId}
// // //               onClick={(e) => {
// // //                 e.preventDefault()
// // //                 dispatch(selectSprite(sprite.id))
// // //               }}
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default SpriteControls;


// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { selectSprite, toggleCollision, checkCollisionAndSwap ,deleteSprite} from "../redux/spritesSlice";
// // import { AddSprites } from "./AddSprites";
// // import SpriteCard from "./SpriteCard";

// // const detectCollisions = (sprites) => {
// //     const collidingPairs = [];

// //     for (let i = 0; i < sprites.length; i++) {
// //         for (let j = i + 1; j < sprites.length; j++) {
// //             if (checkCollision(sprites[i], sprites[j])) {
// //                 collidingPairs.push([sprites[i].id, sprites[j].id]);
// //             }
// //         }
// //     }

// //     return collidingPairs;
// // };

// // const SPRITE_WIDTH = 85;
// // const SPRITE_HEIGHT = 85;

// // const checkCollision = (sprite1, sprite2) => {
// //     const { x: x1, y: y1 } = sprite1.position;
// //     const { x: x2, y: y2 } = sprite2.position;
// //     return !(
// //         x1 > x2 + SPRITE_WIDTH ||
// //         x1 + SPRITE_WIDTH < x2 ||
// //         y1 > y2 + SPRITE_HEIGHT ||
// //         y1 + SPRITE_HEIGHT < y2
// //     );
// // };

// // const SpriteControls = () => {
// //     const spritesState = useSelector((state) => state.sprites);
// //     const sprites = spritesState.sprites;
// //     const selectedSpriteId = spritesState.selectedSpriteId;
// //     const dispatch = useDispatch();

// //     useEffect(() => {
// //         const shouldEnableCollision = true; // or any condition to enable collisions
// //         dispatch(toggleCollision({ showCollisionAnimation: shouldEnableCollision }));
// //     }, [dispatch]);

// //     const handleDelete = (spriteId) => {
// //         dispatch(deleteSprite({ id: spriteId })); // Dispatch the delete action
// //     };
// //     useEffect(() => {
// //         const checkForCollisions = () => {
// //             const collidingPairs = detectCollisions(sprites);

// //             // Dispatch swap actions for each pair of colliding sprites
// //             collidingPairs.forEach(([spriteId1, spriteId2]) => {
// //                 dispatch(checkCollisionAndSwap({ spriteId1, spriteId2 }));
// //             });
// //         };

// //         const intervalId = setInterval(checkForCollisions, 100); // Check every 100ms

// //         return () => clearInterval(intervalId);
// //     }, [dispatch, sprites]);
// // const name="spritcontrol";
// //     return (
// //         <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
// //             <div className="flex   flex-col justify-between items-center mb-2">
// //                 <p className="font-bold text-lg">Sprites</p>
// //                 <div className="flex flex-col items-center overflow-x-auto">
// //                 <div className="flex gap-1">
// //                     <AddSprites />
// //                 </div>            
// //                     </div>

// //             </div>
// //             {/* <div className="flex gap-4 items-start overflow-x-auto">
// //                 <div className="flex gap-2">
// //                     {sprites.map((sprite, index) => (
// //                         // <SpriteCard
// //                         //     key={index}
// //                         //     spriteName={sprite.name}
// //                         //     selected={sprite.id === selectedSpriteId}
// //                         //     onClick={(e) => {
// //                         //         e.preventDefault();
// //                         //         dispatch(selectSprite(sprite.id));
// //                         //     }}
// //                         // />
// //                         <SpriteCard
// //                         key={sprite.id} // Make sure to use sprite.id here
// //                         spriteName={sprite.name}
// //                         selected={sprite.id === selectedSpriteId}
// //                         onClick={() => dispatch(selectSprite(sprite.id))}
// //                         onDelete={() => handleDelete(sprite.id)} // Pass the delete handler
// //                     />
// //                     ))}
// //                 </div>
// //             </div> */}
// //              <div className="flex gap-4 items-start overflow-x-auto">
// //                 <div className="flex gap-2">
// //                     {sprites.map((sprite) => (
// //                         <SpriteCard
// //                             key={sprite.id} // Make sure to use sprite.id here
// //                             spriteName={sprite.name}
// //                             selected={sprite.id === selectedSpriteId}
// //                             onClick={() => dispatch(selectSprite(sprite.id))}
// //                             onDelete={() => handleDelete(sprite.id)}
// //                             name={name} // Pass the delete handler
// //                         />
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SpriteControls;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSprite } from "../redux/spritesSlice";
// import { AddSprites } from "./AddSprites";
// import SpriteCard from "./SpriteCard";

// const SpriteControls = () => {
//   const spritesState = useSelector((state) => state.sprites);
//   const sprites = spritesState.sprites;
//   const selectedSpritId = spritesState.selectedSpriteId;
//   const dispatch = useDispatch();

//   return (
//     <div
//       className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2"
//       style={{ flex: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-2">
//         <p className="font-bold text-lg">Sprites</p>
//         <div className="flex gap-2">
//           <AddSprites />
//         </div>
//       </div>
//       <div className="flex gap-4 items-start overflow-x-auto">
//         <div className="flex gap-2">
//           {sprites.map((sprite, index) => (
//             <SpriteCard
//               key={index}
//               spriteName={sprite.name}
//               selected={sprite.id === selectedSpritId}
//               onClick={(e) => {
//                 e.preventDefault();
//                 dispatch(selectSprite(sprite.id));

//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpriteControls;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSprite, deleteSprite, setBorder } from "../redux/spritesSlice"; // Import deleteSprite
import { AddSprites } from "./AddSprites";
import SpriteCard from "./SpriteCard";

const SpriteControls = () => {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpriteId = spritesState.selectedSpriteId;
  const dispatch = useDispatch();
  const name = "spritcontrol";

  // Handler to delete a sprite by its ID
  const handleDelete = (id) => {
    dispatch(deleteSprite({ id })); // Dispatch delete action
  };

  return (
    <div className="flex flex-row gap-5 border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
      <div className="flex flex-col justify-center gap-5 items-center mb-2">
        <p className="font-bold text-lg">Sprites</p>
        <div className="flex flex-row items-center overflow-x-auto">
          <div className="flex gap-1">
            <AddSprites />
          </div>
        </div>

      </div>
      <div className="flex flex-row items-center overflow-x-auto">
        <div className="flex flex-row gap-1">
          {sprites.map((sprite) => (
            <SpriteCard
              key={sprite.id} // Make sure to use sprite.id here
              id={sprite.id}
              spriteName={sprite.name}
              photoId={sprite.photoId} // Pass sprite name
              spritePhotoId={sprite.photoId}
              selected={sprite.id === selectedSpriteId}
              onClick={() => {
                dispatch(selectSprite(sprite.id));
                dispatch(setBorder(true));
                setTimeout(() => {
                  dispatch(setBorder(false));
                }, 500);
              }}
              onDelete={() => handleDelete(sprite.id)} // Pass the delete handler
              name={name} // Pass the name prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpriteControls;
