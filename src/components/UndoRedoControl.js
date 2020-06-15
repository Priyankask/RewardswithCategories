import React from 'react'

const UndoResetControl = ({ onSave, onUndo, onRedo }) => {
  
  const save = (item) =>{
    //console.log(`the item is${JSON.stringify(item)}`);
    onSave(item);
  }

  const undo = (item) =>{
    //onsole.log(`the item is${JSON.stringify(item)}`);
    onUndo(item);
  }

  const redo = (item) =>{
    onRedo(item);
  }

  return (
    <div className ="flex-container">
    <div className='flex-right'>
        <button type='button' onClick={save}>
          Save
        </button>
      </div>
      <div>
        <button type='button' onClick={redo}>
          Redo
        </button>
      </div>
      <div>
        <button type='button' onClick={undo}>
          Undo
        </button>
      </div>
    </div>
  );
};

export default UndoResetControl;