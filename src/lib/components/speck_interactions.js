import {
    speckView,
} from 'speck';

/*
updateInteractionsCb
    gets called when interations are to be updated
    param1: object of format below
    {
        buttonDown: false,
        lastX: 0.0,
        lastY: 0.0
    }

updateViewCb
    returns object of view

rerenderViewCb
    gets called when a refresh view / rerender is required
    returns true
*/



//----------------------------------------------------------------------------//
// Private variables and functions                                            //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

const LEFT_MOUSE_BUTTON = 0;

const cloneObject = src =>
    Object.assign({}, src);

const interactionsObject = () => ({
    buttonDown: false,
    lastX: 0.0,
    lastY: 0.0
});

const eventFillInterationsObject = (e, buttonState) => {
    let tmp_interactions = interactionsObject();
    tmp_interactions.lastX = e.clientX;
    tmp_interactions.lastY = e.clientY;

    if(e.buttons !== undefined) {
        tmp_interactions.buttonDown = Boolean(e.buttons);
    }
    else {
        tmp_interactions.buttonDown = buttonState;
    }
    temp_interactions.buttonDown = Boolean(temp_interactions.buttonDown);
    return tmp_interactions;
}



//----------------------------------------------------------------------------//
// speckInteractions                                                          //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

const speckInterations = (renderer, container, cbObject) => {
    const cbObjectList = [
        'updateInteractions',
        'updateView',
        'rerenderView',
    ];
    let internalState = interactionsObject();

	////////////////////////////////////////////////////////////////////////////////
	/// Cleanup callback object

    if(typeof cbObject !== 'object') {
        cbObject = {};
    }

    for(var i = 0; i < cbObjectList.length; i++) {
        if(typeof cbObject[cbObjectList[i]] !== "function") {
            cbObject[cbObjectList[i]] = () => {/* no-op */};
        }
    }

    // end

    cbObject.updateInteractions(interactionsObject());

 //    component.setState({
    // interactions: {
    //     buttonDown: false,
    //     lastX: 0.0,
    //     lastY: 0.0
    // }
 //    });



	//----------------------------------------------------------------------------//
	// Register Event Listeners                                                   //
	//----------------------------------------------------------------------------//

	////////////////////////////////////////////////////////////////////////////////

    container.addEventListener("mousedown", e => {
        if(e.button == LEFT_MOUSE_BUTTON) {

            let tmp_interactions = eventFillInterationsObject(e, true);
            
         //    component.setState({
            // interactions: tmp_interactions,
            // refreshView: true
         //    });

            internalState = cloneObject(tmp_interactions);
            cbObject.updateInteractions(tmp_interactions);
            cbObject.rerenderView();
        }
    });

    ////////////////////////////////////////////////////////////////////////////////

    container.addEventListener("mouseup", e => {
	    if(e.button == LEFT_MOUSE_BUTTON) {

	        let tmp_interactions = eventFillInterationsObject(e, false);

	     //     component.setState({
	        // interactions: tmp_interactions,
	        // refreshView: true
	     //    });

            internalState = cloneObject(tmp_interactions);
	        cbObject.updateInteractions(tmp_interactions);
	        cbObject.rerenderView();
	    }
    });

    ////////////////////////////////////////////////////////////////////////////////

    container.addEventListener("mousemove", e => {

	    var tmp_interactions = eventFillInterationsObject(e);

	    if(!tmp_interactions.buttonDown){
	        return;
	    }
	    var dx = e.clientX - tmp_interactions.lastX;
	    var dy = e.clientY - tmp_interactions.lastY;
	    if(dx == 0 && dy == 0) {
	        return;
	    }

	    tmp_interactions.lastX = e.clientX;
	    tmp_interactions.lastY = e.clientY;

	    speckView.rotate(component.props.view, dx, dy);
	    
        internalState = cloneObject(tmp_interactions);
        cbObject.updateInteractions(tmp_interactions);
        cbObject.rerenderView();
    
    });

    ////////////////////////////////////////////////////////////////////////////////

    if(component.props.scrollZoom) {

	    container.addEventListener("wheel", e => {
	        
	        var wd = 0;
	        if (e.deltaY < 0) {
	            wd = 1;
	        }
	        else {
	        }
	            wd = -1;
	        component.props.view.zoom = component.props.view.zoom * (wd === 1 ? 1/0.9 : 0.9);

	        component.setState({
	        refreshView: true
	        });

	    }); 
    }
}



//----------------------------------------------------------------------------//
// Export                                                                     //
//----------------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////////////

export default speckInterations;
