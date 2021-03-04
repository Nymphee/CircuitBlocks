import React, {forwardRef, useImperativeHandle, useState} from "react";
import "./spriteEditor.css";


interface Props {
    saveCells: (cells: any) => void;
    cellLayout: any[];
}



const Grid = forwardRef((props: Props ,ref) => {
    const {saveCells, cellLayout} = props;

    useImperativeHandle(ref, () => ({
        getAlert(sprite: any){
            if(sprite.length !== 0){
                setCells(sprite);
            } else if (sprite.length === 0){
                setCells(initialCells)
            }
        }
    }));


    const initialCells = Array.from({length: 144}, () => ({
        on: false,
    }));
    const [cells, setCells] = useState(initialCells);

    React.useEffect(() => {
        if ( cells !== initialCells){
            saveCells(cells)
        }
    }, [cells])

    const updateCell = (i: any) => () => {
        setCells(cells.map((cell, cellIndex) => {
            if(cellIndex === i){
                return {
                    on: !cell.on
                }
            }
            return cell;
        }));
    }
    return <div className={"grid"}>
        {cells.map((cell, i)=> <div style={{background: cell.on ? "#e8df35" : "#fff"}} key={i} className={"cell"} onClick={updateCell(i)}/>)}
        {console.log(cellLayout.length)}
    </div>
})

export default Grid;