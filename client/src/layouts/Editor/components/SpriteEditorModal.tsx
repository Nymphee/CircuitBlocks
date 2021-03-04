import React from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import "./spriteEditor.css";
import Grid from "./Grid";
import {Sprite} from "../index";


interface SpriteEditorModalProps {
    open: boolean;
    closeSpriteModal: () => void;
    saveCells: (cells: any, name: string) => void;
    spriteList: Sprite[];
    deleteAllSprites: () => void;
    deleteSprite: (index: number) => void;
    updateSprite: (cells: any, index: string, name: string) => void;
    saveSprites: (spriteList: any) => void;
}

interface SpriteEditorModalState {
    cellState: boolean[];
    spriteName: string;
    cellLayout: any;
    isEditSprite: boolean;
    spriteIndex: string;
    saveDisabled: boolean;
    editSpriteIndex: number;
    mutatedArray: any[];
}

const INIT_STATE: SpriteEditorModalState = {
    cellState: [],
    spriteName: "",
    cellLayout: [],
    isEditSprite: false,
    spriteIndex: "",
    saveDisabled: false,
    editSpriteIndex: -1,
    mutatedArray: [],
}

export class SpriteEditorModal extends React.Component<SpriteEditorModalProps, SpriteEditorModalState> {
    public childRef: any;

    constructor(props: SpriteEditorModalProps) {
        super(props);
        this.state = {
            ...INIT_STATE
        };
        this.childRef = React.createRef();

    }

    componentDidUpdate(prevProps: Readonly<SpriteEditorModalProps>, prevState: Readonly<SpriteEditorModalState>, snapshot?: any) {
        if (prevState.spriteName !== this.state.spriteName && this.state.saveDisabled === true && !this.state.isEditSprite) {
            this.setState({saveDisabled: false})
        }
        console.log(this.state.saveDisabled);
        if (this.state.saveDisabled === false && !this.state.isEditSprite) {
            for (let i = 0; i < this.props.spriteList.length; i++) {
                if (this.props.spriteList[i].name === this.state.spriteName) {
                    this.setState({saveDisabled: true})
                }
            }
        }
    }


    openSpriteDesign = (cellLayout: any) => {
        this.setState({cellLayout: cellLayout});
    }

    resetSprites() {
        this.props.deleteAllSprites();
        let sprite: any = []
        this.childRef.current.getAlert(sprite)
        this.setState({isEditSprite: false})
    }

    setEditSprite(sprite: any, index: any) {
        this.handleNameChange(sprite);
        this.childRef.current.getAlert(sprite.design)
        this.setState({
            isEditSprite: true,
            spriteName: sprite.name,
            spriteIndex: index,
            editSpriteIndex: this.props.spriteList.indexOf(sprite),
        })

    }

    editSprite() {
        this.props.updateSprite(this.state.cellState, this.state.spriteIndex, this.state.spriteName);
        this.setState({isEditSprite: false, editSpriteIndex: -1, spriteName: ""})
    }

    errors() {
        if (this.state.spriteName.length === 0) {
            return <div style={{color: "red", padding: 10}}>Name can't be empty</div>
        }
        if (this.state.spriteName.length > 10) {
            return <div style={{color: "red", padding: 10}}>Name can't be longer than 10 letters</div>
        }
        if (this.state.saveDisabled) {
            return <div style={{color: "red", padding: 10}}>Duplicate name</div>
        }

    }

    handleNameChange(sprite?: any, eventName?: string){
        let newName = eventName;
        if(sprite){
            let index = this.props.spriteList.findIndex((x) => x.name === sprite.name);
            let arr = [...this.props.spriteList];
            arr.splice(index, 1);
            this.setState({mutatedArray: arr});
        }
        for(let i = 0; i < this.state.mutatedArray.length; i++){
            console.log(this.state.mutatedArray[i].name, "  ", this.state.spriteName)
            if(this.state.mutatedArray[i].name === newName){
                this.setState({saveDisabled: true})
                return;
            } else {
                this.setState({saveDisabled: false})
            }
        }
    }

    checkName(event: any) {
        this.setState({spriteName: event.target.value});
        this.handleNameChange("", event.target.value);
    }

    saveToClickHandler(){
        this.setState({editSpriteIndex: -1, spriteName: ""})
        this.props.saveCells(this.state.cellState, this.state.spriteName)
    }


    public render() {

        const renderSprites = this.props.spriteList.map((sprite, index) => {
            return <div style={{display: "flex", width: "100%", padding: "2px 4px", float: "left"}}>
                <li key={index}
                    style={{ color: (index === this.state.editSpriteIndex) ? "red": ""}}
                    onClick={() => this.setEditSprite(sprite, index)}
                    className={"clickable"}>{index + 1} - {sprite.name}</li>
                <i className="close link icon" style={{position: "absolute", right: "10px"}}
                   onClick={() => this.props.deleteSprite(index)}></i></div>
        })


        return (
            <Dimmer active={this.props.open}>
                <ModalBase className={"large"} style={{height: "65vh", width: "60vw"}}>
                    <i className="close link icon" style={{right: 10, top: 10, position: "absolute"}}
                       onClick={() => this.props.closeSpriteModal()}/>
                    {this.state.isEditSprite ? <h2 style={{marginTop: 0}}>Edit {this.state.spriteName} - {this.state.spriteIndex + 1}</h2> :
                        <h2 style={{marginTop: 0}}>Create your sprite!</h2>}
                    <div style={{display: "inline-flex", position: "relative"}}>
                        <div>
                            <div style={{
                                width: "15em",
                                left: 10,
                                padding: 20,
                                marginTop: 5,
                                height: "18vw",
                                overflowY: "auto",
                                overflowX: "visible",
                                position: "relative",
                                border: "1px solid black",
                                maxWidth: "15em"
                            }}><h4>Your sprites:</h4>
                                <ul>
                                    {renderSprites}
                                </ul>

                            </div>
                            {this.state.isEditSprite ? <Button style={{ left: 10, position: "relative", margin: "auto", top: 10}} onClick={() => this.setState({isEditSprite: false, editSpriteIndex: -1, spriteName: ""})}
                                                               className={"buttonToSave"}> Add new
                                sprite </Button> : ""}
                        </div>

                        <div className={"app"}>
                            <Grid saveCells={(cells) => this.setState({cellState: cells})}
                                  cellLayout={this.state.cellLayout} ref={this.childRef}/>
                        </div>

                    </div>

                    <div style={{marginTop: 20}}>
                        {this.state.isEditSprite ?
                            <div>
                                <input
                                    style={{width: "48%", justifyContent: "center", margin: "auto", overflow: "hidden"}}
                                    value={this.state.spriteName} onChange={event => this.checkName(event)}/>
                                <Button className={"buttonToSave"}
                                        disabled={(this.state.spriteName.length > 10) || (this.state.spriteName.length === 0) || this.state.saveDisabled}
                                        onClick={() => this.editSprite()}>Save edit sprite</Button>

                            </div>
                            :
                            <div style={{marginTop: 55}}>
                                <input
                                    style={{width: "48%", justifyContent: "center", margin: "auto", overflow: "hidden"}}
                                    value={this.state.spriteName}
                                    onChange={(e) => this.setState({spriteName: e.target.value})}/>
                                <Button className={"buttonToSave"}
                                        disabled={(this.state.spriteName.length > 10) || (this.state.spriteName.length === 0) || this.state.saveDisabled}
                                        onClick={() => this.saveToClickHandler()}>Add
                                    new sprite</Button>
                            </div>

                        }

                        {this.errors() ? this.errors() : <div style={{height: "34px"}}></div>}
                        {/*<Button onClick={() => {
                            this.resetSprites()
                        }}>Reset all sprites</Button>
                        <Button onClick={() => {
                            this.props.saveSprites(this.props.spriteList)
                        }}>Save sprites</Button>*/}
                    </div>

                </ModalBase>
            </Dimmer>
        )

    }
}