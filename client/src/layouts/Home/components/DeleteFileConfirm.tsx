import React, {Component} from "react";
import {Button, Dimmer} from "semantic-ui-react";
import {ModalBase} from "../../../components/Modal/Common";
import {publicDecrypt} from "crypto";

interface DeleteFileConfirmProps{
    deleteSketch: string;
    open: boolean;
    closeModalCallback: (option: string, deleteSketches: string) => void;
}

interface DeleteFileConfirmState{
}

export class DeleteFileConfirm extends Component<DeleteFileConfirmProps, DeleteFileConfirmState> {
    constructor(props: DeleteFileConfirmProps) {
        super(props);

    }
    public render() {
        return<Dimmer active={this.props.open}>
            <ModalBase>
                <h2>Are you sure you want to delete {this.props.deleteSketch}?  </h2>
                <Button negative onClick={() => this.props.closeModalCallback("delete", this.props.deleteSketch)}>Delete</Button>
                <Button onClick={() => this.props.closeModalCallback("cancel", this.props.deleteSketch)}>Cancel</Button>
            </ModalBase>
        </Dimmer>
    }
}