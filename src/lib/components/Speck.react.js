import {Component} from 'react';
import PropTypes from 'prop-types';
import {
    speckRenderer,
    speckSystem,
    speckView,
    speckInteractions,
    speckPresetViews,
} from 'speck';

export default class Speck extends Component {

    constructor(props) {
        console.log('constructor');
        super(props);

        const {view} = this.props;

        this.state = {
            renderer: null,
            interactions: {
                buttonDown: false,
                lastX: 0.0,
                lastY: 0.0,
            },
            view: view ? Object.assign(speckView.new(), view) : {},
        };

        // setting refs in this way to allow for easier updating to
        // react 16
        this.setCanvasRef = e => {
            this.canvas = e;
        };
        this.setContainerRef = e => {
            this.container = e;
        };

        window.requestAnimationFrame(this.speckRender);

        this.speckRender = this.speckRender.bind(this);
        this.loadStructure = this.loadStructure.bind(this);

        // REMOVE
        window.speckky = this;
    }

    componentDidMount() {
        console.log('didmount');
        // add canvas, container, and renderer
        const canvas = this.canvas;
        const container = this.container;
        const resolution = 200;
        const aoResolution = 300;
        const renderer = new speckRenderer(canvas, resolution, aoResolution);

        // add event listeners
        const interactionHandler = new speckInteractions(
            this,
            renderer,
            container
        );

        this.setState({
                renderer,
            },
            () => this.loadStructure()
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log('willrecieveprops');
        const {presetView} = this.props;
        const {view} = this.state;

        // add the appropriate preset view, if that has recently changed
        if (presetView !== nextProps.presetView) {
            const v = Object.assign(
                view,
                speckPresetViews[nextProps.presetView]
            );
            this.setState({
                view: v,
            });
        }

        // finally apply the user-supplied view parameters
        if (
            Object.keys(view).length !== Object.keys(nextProps.view).length ||
                Object.keys(view).some(
                    propertyName =>
                        view[propertyName] !== nextProps.view[propertyName]
                )
        ) {
            const v = Object.assign(view, nextProps.view);
            this.setState({
                view: v,
            });
        }
    }

    componentDidUpdate() {
        console.log('didupdate');
        const {renderer, view} = this.state;

        if (view && renderer) {
            this.loadStructure();
        }
    }

    loadStructure() {
        const {data} = this.props;

        // avoid trying to load an empty system
        if (data.length === 0) {
            return;
        }

        const {view, renderer} = this.state;

        const system = speckSystem.new();
        for (let i = 0; i < data.length; i++) {
            // get the coordinate data
            const a = data[i];
            // add to the system
            speckSystem.addAtom(system, a.symbol, a.x, a.y, a.z);
        }

        speckSystem.center(system);
        speckSystem.calculateBonds(system);

        renderer.setSystem(system, view);

        // update the resolution
        renderer.setResolution(view.resolution, view.aoRes);

        this.speckRender();
    }

    speckRender() {
        const {renderer, view} = this.state;

        if (renderer && view) {
            renderer.reset();
            renderer.render(view);
        }
    }

    render() {
        console.log('render');
        const {id} = this.props;
        const {view} = this.state;

        const divStyle = {
            height: view.resolution,
            width: view.resolution,
        };

        return (
            <div id={id} ref={this.setContainerRef} style={divStyle}>
                <canvas
                    ref={this.setCanvasRef}
                    width={view.resolution}
                    height={view.resolution}
                />
            </div>
        );
    }
}

Speck.defaultProps = {
    view: speckView.new(),
    data: [],
};

Speck.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */

    id: PropTypes.string,

    /**
     * The xyz file data; a list of atoms such that each atom
     * has a dictionary defining the x, y, and z coordinates
     * along with the atom's symbol.
     */

    data: PropTypes.arrayOf(
        PropTypes.shape({
            symbol: PropTypes.string,
            x: PropTypes.number,
            y: PropTypes.number,
            z: PropTypes.number,
        })
    ),

    /**
     * The option of whether or not to allow scrolling to control
     * the zoom.
     */

    scrollZoom: PropTypes.bool,

    /**
     * An object that determines and controls various parameters
     * related to how the molecule is displayed.
     */
    view: PropTypes.shape({
        aspect: PropTypes.number,
        zoom: PropTypes.number,
        translation: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        atomScale: PropTypes.number,
        relativeAtomScale: PropTypes.number,
        bondScale: PropTypes.number,
        rotation: PropTypes.arrayOf(PropTypes.number),
        ao: PropTypes.number,
        aoRes: PropTypes.number,
        brightness: PropTypes.number,
        outline: PropTypes.number,
        spf: PropTypes.number,
        bonds: PropTypes.bool,
        bondThreshold: PropTypes.number,
        bondShade: PropTypes.number,
        atomShade: PropTypes.number,
        resolution: PropTypes.number,
        dofStrength: PropTypes.number,
        dofPosition: PropTypes.number,
        fxaa: PropTypes.number,
    }),

    /**
     * One of several pre-loaded views: default, stick-ball, toon,
     * and licorice
     */
    presetView: PropTypes.oneOf(['default', 'stickball', 'toon', 'licorice']),

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change.
     */

    setProps: PropTypes.func,
};
