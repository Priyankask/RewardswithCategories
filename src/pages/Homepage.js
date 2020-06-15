import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data } from "../data";
import UndoRedoControl from "../components/UndoRedoControl";
import { toast } from 'react-toastify';

const Homepage = () => {
    const [items, setItems] = useState(localStorage.getItem('savediteration') ?JSON.parse(localStorage.getItem('savediteration')) : data);
    const [dragEl, setDragEl] = useState(' ');
    const [pointer, setPointer] = useState(1);
    const onDrop = (item, status) => {
        if (item.status === 'status') {
            return
        }

        if (item.status === 'Reward') {
            onAddItem(item);
        }

        dragEl[dragEl.length-1].status = status;
        
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status });
            return [ ...newItems ];
        });

    };

    const setDragElement = (el,action) => setDragEl(prevState => {
        el.action = action;
        const newItems = [...prevState,el]
        return [ ...newItems ];
    });
    
    const onAddItem = item => {
        
        setItems(prevState => {
            
            const highestId = Math.max.apply(Math, prevState.map(i => i.id));
            const data = {
                id: highestId +1,
                status: item.status,
                action: "default",
                title: item.title,
                content: `R${item.title}`
            };
            return [
                data,
                ...prevState
            ];
        });
    };

    const Onremove = (item) =>{
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
            return [ ...newItems ];
        });
        setDragElement(item,'removed');
    }

    const onUndo = item =>{
        
        const currentEl = dragEl[dragEl.length-pointer];
        setPointer(prevState => {return prevState+1});
        if (pointer>0 && pointer<dragEl.length){
            if (currentEl.action === 'removed'){
                onAddItem(currentEl);
                //setPointer(prevState => {return prevState+1})*/
                currentEl.action = "default";
            }

            else if (currentEl.action === 'default'){
                /*Onremove(currentEl);
                setPointer(prevState => {return prevState+1})*/
                setItems(prevState => {
                    const newItems = prevState
                        .filter(i => i.id !== currentEl.id)
                    return [ ...newItems ];
                });
                currentEl.action = "removed";
            }
        }
    }
    
    const onRedo = item =>{
        const redo = pointer-1;
        const currentEl = dragEl[dragEl.length-redo];
        setPointer(prevState => {return prevState-1})
        if (pointer > 0 && pointer<dragEl.length){
            if (currentEl.action === 'default'){
                setItems(prevState => {
                    const newItems = prevState
                        .filter(i => i.id !== currentEl.id)
                    return [ ...newItems ];
                });
            }
            else if (currentEl.action === 'removed'){
                
                onAddItem(currentEl);
                currentEl.action = "default";
            }
        }
    }

    const onSave = e =>{
        localStorage.setItem('savediteration', JSON.stringify(items));
        toast.info("Successfully saved", {
            autoClose: 3000
          });
    }

    return (
        <div >
        <div className={"row"}>
            {["Reward", "C1", "C2", "C3","C4","C5"].map(status => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <div className={"col-group"}>
                            <h5 className={"col-header"}>{status.toUpperCase()}</h5>
                        </div>
                        <DropWrapper className ={`status-${status}`} onDrop={onDrop} status={status}>
                            <Col>
                                {items
                                    .filter(i => i.status === status)
                                    .map(i => (
                                        <Item
                                            key={i.id}
                                            item={i}
                                            data-testid="rewardItem"
                                            setDragElement={setDragElement}
                                            Onremove= {Onremove}
                                            
                                        />
                                        
                                    ))
                                    
                                }
                               
                            </Col>
                            
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
        <UndoRedoControl onUndo = {onUndo} onRedo = {onRedo} onSave = {onSave}/>
        </div>
    );
};

export default Homepage;