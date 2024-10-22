// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addActionToSprite, deleteAction } from '../redux/spritesSlice.js';
// import { Trash } from 'lucide-react';
// import { SpriteImage } from './Sprite.js';
// import ActionInput from './ActionInput.js';

// const MidArea = () => {
//   const dispatch = useDispatch();
//   const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);
//   const selectedSprite = useSelector((state) =>
//     state.sprites.sprites.find(sprite => sprite.id === selectedSpriteId)
//   );

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const actionType = e.dataTransfer.getData('actionType');
//     const actionText = e.dataTransfer.getData('text');
//     const payload = JSON.parse(e.dataTransfer.getData('payload'));

//     if (selectedSpriteId) {
//       dispatch(addActionToSprite({ spriteId: selectedSpriteId, actionType, actionText, payload }));
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="flex-1 h-full overflow-auto bg-gray-100 p-6" onDrop={handleDrop} onDragOver={handleDragOver}>
//       <div className="bg-white rounded-lg shadow-md p-6">

//         {selectedSprite ? (
//           <>
//             <div className='flex gap-4'>
//               <h2 className="text-2xl flex font-bold text-gray-800 mb-4">Actions for Selected Sprite
//               </h2>
//               <div className='text-sm'><SpriteImage spriteName={selectedSprite.name} styles={{ width: "50px", height: "50px" }} /></div>
//             </div>
//             <div><h3>{selectedSprite.name}</h3></div>
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Actions:</h3>
//               <ul className="space-y-2">
//                 {selectedSprite.actions.map((action, index) => (
//                   <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 flex justify-between align-middle rounded-full text-sm">
//                     <ActionInput index={index} action={action} />
//                     <button onClick={(e) => {
//                       e.preventDefault();
//                       dispatch(deleteAction({ index }))
//                     }}
//                     >
//                       <Trash width={"18px"} color='red' />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div></>
//         ) : (
//           <p className="text-gray-600 italic mb-6">No sprite selected</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MidArea;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActionToSprite, deleteAction, renameSprite } from '../redux/spritesSlice.js';
import { Trash, Edit2 } from 'lucide-react';
import { SpriteImage } from './Sprite.js';
import ActionInput from './ActionInput.js';

const MidArea = () => {
  const dispatch = useDispatch();
  const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);
  const selectedSprite = useSelector((state) =>
    state.sprites.sprites.find(sprite => sprite.id === selectedSpriteId)
  );

  // Local state for rename functionality
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(selectedSprite?.name || "");

  const handleDrop = (e) => {
    e.preventDefault();
    const actionType = e.dataTransfer.getData('actionType');
    const actionText = e.dataTransfer.getData('text');
    const payload = JSON.parse(e.dataTransfer.getData('payload'));

    if (selectedSpriteId) {
      dispatch(addActionToSprite({ spriteId: selectedSpriteId, actionType, actionText, payload }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRenameSprite = () => {
    if (newName.trim() !== '') {
        dispatch(renameSprite({ newName }));
        // setEditingSpriteId(null); // Close rename mode after saving
        setNewName(''); // Reset the input after renaming
    }
    setIsRenaming(false)
};

  return (
    <div className="flex w-full h-full overflow-auto bg-gray-100 p-3" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="bg-white rounded-lg shadow-md p-6">

        {selectedSprite ? (
          <>
            <div className='flex gap-4'>
              <h2 className="text-2xl flex font-bold text-gray-800 mb-4">Actions for Selected Sprite</h2>
              <div className='text-sm'>
                <SpriteImage spriteId={selectedSprite.id} styles={{ width: "50px", height: "50px" }} />
              </div>
            </div>

            {/* Display rename input if renaming, otherwise show sprite name */}
            <div className="mb-4 flex items-center gap-4">
              {isRenaming ? (
                <>
                  <input 
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRenameSprite} // Handle blur event to finalize renaming
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSprite()} // Confirm rename with Enter key
                  />
                  <button onClick={() => setIsRenaming(false)} className="text-gray-500 hover:text-gray-700">
                    Cancel
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{selectedSprite.name}</h3>
                  <button onClick={() => { setIsRenaming(true); setNewName(selectedSprite.name); }} className="text-blue-500">
                    <Edit2 width={"18px"} />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Actions:</h3>
              <ul className="space-y-2">
                {selectedSprite.actions.map((action, index) => (
                  <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 flex justify-between align-middle rounded-full text-sm">
                    <ActionInput index={index} action={action} />
                    <button onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteAction({ index }))
                    }}>
                      <Trash width={"18px"} color='red' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-gray-600 italic mb-6">No sprite selected</p>
        )}
      </div>
    </div>
  );
};

export default MidArea;
