import React, { useState, useEffect, useRef } from "react";
//Dragger copied directly from https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929

class Dragger extends React.Component {
  state = {
    dragging: false,
    dragCounter: parseInt(0),
  };
  dropRef = React.createRef();
  wrapperRef = React.createRef();

  componentDidMount() {
    // if(this.props.showVideoDragging){
    let div = this.dropRef.current;
    this.dragCounter = 0;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
    // }
  }

  componentWillUnmount() {
    // if(this.props.showVideoDragging){
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
    // }
  }

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter = parseInt(this.dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter = this.dragCounter - 1;
    if (this.dragCounter > 0) return;
    if (this.dragCounter === 0) {
      this.setState({ dragging: false });
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
    // shouldOpen1 = true;
  };

  render() {
    return (
      <div
        // style={{ display: 'inline-block', position: 'relative'}}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 1px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 99,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "grey",
                fontSize: 16,
                fontWeight: "bold",
                height: "100%",
              }}
            >
              <div>Drop File Here</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default Dragger;
