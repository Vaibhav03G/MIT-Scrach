// import React, { useMemo, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import SpriteCard from './SpriteCard';
// import allSprites from '../constants/sprites'
// import { addSprite } from '../redux/spritesSlice';
// export const AddSprites = () => {
//     const dispatch = useDispatch()
//     const sprites = useSelector((state) => state.sprites.sprites);
//     const availableSprites = useMemo(() => {
//         return allSprites.filter((currSprite) => !sprites.find(s => s.id === currSprite.id))
//     }, [sprites]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedSprite, setSelectedSprite] = useState({ id: null, name: null });
//     const handleAddSprite = () => {
//         if (selectedSprite.id) {
//             dispatch(addSprite({ name: selectedSprite.name, id: selectedSprite.id }));
//             setShowModal(false);
//             setSelectedSprite({ id: null, name: null });
//         }
//     };
//     return (
//         <>
//             <button
//                 className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//                 onClick={() => setShowModal(true)}
//             >
//                 Add Sprites
//             </button>
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white rounded-lg p-6 w-96">
//                         <h2 className="text-lg font-bold mb-4">Choose a Sprite</h2>
//                         {availableSprites.length > 0 ? <div className="grid grid-cols-3 gap-4">
//                             {availableSprites.map((sprite, index) => (
//                                 <SpriteCard
//                                     key={index}
//                                     spriteName={sprite.name}
//                                     selected={sprite.id === selectedSprite.id}
//                                     onClick={() => setSelectedSprite({ id: sprite.id, name: sprite.name })}
//                                     name="AddSprite"
//                                 />
//                             ))}
//                         </div> :
//                             <div>No New Sprites Available</div>}
//                         <div className="mt-4 flex justify-between">
//                             <button
//                                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//                                 onClick={handleAddSprite}
//                             >
//                                 Add Sprite
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpriteCard from './SpriteCard';
import allSprites from '../constants/sprites';
import { addSprite, renameSprite } from '../redux/spritesSlice';
import { unique } from 'webpack-merge';

export const AddSprites = () => {
    const dispatch = useDispatch();
    const sprites = useSelector((state) => state.sprites.sprites);
    const [showModal, setShowModal] = useState(false);
    const [selectedSprite, setSelectedSprite] = useState({ id: null, photoId: null, name: null });
    const [editingSpriteId, setEditingSpriteId] = useState(null); // Track the sprite being edited
    const [newName, setNewName] = useState(''); // Input value for renaming

    // Function to add a sprite with a unique ID
    const handleAddSprite = () => {
        if (selectedSprite.id) {
            const uniqueId = `${selectedSprite.id}-${Date.now()}`;
            dispatch(addSprite({ name: selectedSprite.name, id: uniqueId, photoId:selectedSprite.photoId }));
            setShowModal(false);
            setSelectedSprite({ id: null, name: null });
        }
    };

    // Function to rename the sprite using its unique ID
    const handleRenameSprite = (id) => {
        if (newName.trim() !== '') {
            dispatch(renameSprite({ id, newName }));
            setEditingSpriteId(null); // Close rename mode after saving
            setNewName(''); // Reset the input after renaming
        }
    };

    return (
        <>
            <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={() => setShowModal(true)}
            >
                Add Sprites
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Choose a Sprite</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {allSprites.map((sprite, index) => (
                                <SpriteCard
                                    key={index}
                                    spriteName={sprite.name}
                                    photoId={sprite.photoId}
                                    selected={sprite.id === selectedSprite.id}
                                    onClick={() => setSelectedSprite({ id: sprite.id, photoId: sprite.photoId, name: sprite.name })}
                                    name="AddSprite"
                                />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                onClick={handleAddSprite}
                            >
                                Add Sprite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display sprites with rename option */}
           
        </>
    );
};
