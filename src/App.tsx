import "./App.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
    ExcalidrawArrowElement,
    ExcalidrawElement,
    ExcalidrawRectangleElement,
} from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";
import { useMemo } from "react";
import { nanoid } from "nanoid";

// Util types to remove the `readonly` requirement
// from https://stackoverflow.com/a/43001581
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

// Excalidraw enforces `readonly` on their properties, but we don't need to
// respect them when we're just creating the initialData, so we use the util
// types above to allow it.
type Rectangle = Writeable<ExcalidrawRectangleElement>;
type Arrow = Writeable<ExcalidrawArrowElement>;

// I got this data by using a console.log(elements) inside of the `onChange` event handler
const EXAMPLE_DATA: readonly ExcalidrawElement[] = [
    {
        id: "L6uI-cKAH9QcOua4x8JY8",
        type: "rectangle",
        x: 280.69140625,
        y: 199.43359375,
        width: 109.44921875,
        height: 106.51953125,
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: {
            type: 3,
        },
        seed: 714444702,
        version: 65,
        versionNonce: 1028844738,
        isDeleted: false,
        boundElements: [
            {
                id: "nY75bAu7eYFddF8J8LRR7",
                type: "arrow",
            },
        ],
        updated: 1695272958887,
        link: null,
        locked: false,
    },
    {
        id: "hgyDLIm07QmZ-ug-GN6iV",
        type: "rectangle",
        x: 519.0703125,
        y: 328.30078125,
        width: 158.7421875,
        height: 148.3828125,
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: {
            type: 3,
        },
        seed: 1004380062,
        version: 165,
        versionNonce: 119653918,
        isDeleted: false,
        boundElements: [
            {
                id: "nY75bAu7eYFddF8J8LRR7",
                type: "arrow",
            },
        ],
        updated: 1695272962927,
        link: null,
        locked: false,
    },
    {
        id: "nY75bAu7eYFddF8J8LRR7",
        type: "arrow",
        x: 401.62890625,
        y: 250.93915385199642,
        width: 103.89453125,
        height: 140.938108163638,
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: {
            type: 2,
        },
        seed: 2068072286,
        version: 303,
        versionNonce: 1222727326,
        isDeleted: false,
        boundElements: null,
        updated: 1695272962928,
        link: null,
        locked: false,
        points: [
            [0, 0],
            [103.89453125, 140.938108163638],
        ],
        lastCommittedPoint: null,
        startBinding: {
            elementId: "L6uI-cKAH9QcOua4x8JY8",
            focus: -0.7178864392344383,
            gap: 11.48828125,
        },
        endBinding: {
            elementId: "hgyDLIm07QmZ-ug-GN6iV",
            focus: -0.6347272675674849,
            gap: 13.546875,
        },
        startArrowhead: null,
        endArrowhead: "arrow",
    },
];

// This creates a square using default params
function createSquare(
    element: Partial<Rectangle> &
        Pick<Rectangle, "x" | "y" | "width" | "height">,
): Rectangle {
    return {
        id: nanoid(),
        type: "rectangle",

        // These properties come from the `element` argument
        // x: 280.69140625,
        // y: 199.43359375,
        // width: 109.44921875,
        // height: 106.51953125,
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: {
            type: 3,
        },
        // TODO: Generate random number
        seed: 714444702,
        version: 65,
        versionNonce: 1028844738,
        // TODO: Generate random number
        isDeleted: false,
        boundElements: [
            // {
            //     id: "nY75bAu7eYFddF8J8LRR7",
            //     type: "arrow",
            // },
        ],
        updated: Date.now(),
        link: null,
        locked: false,

        // This will replace any property above with the property of the given element
        ...element,
    };
}

function createArrow(from: Rectangle, to: Rectangle): Arrow {
    const id = nanoid();

    // Add arrow ID to boxes
    from.boundElements = [
        ...(from.boundElements ?? []),
        { id: id, type: "arrow" },
    ];
    to.boundElements = [...(to.boundElements ?? []), { id: id, type: "arrow" }];

    // Return arrow
    return {
        id: id,
        type: "arrow",
        // TODO: calculate x, y, width, height and points
        x: Math.min(from.x, to.x),
        y: Math.min(from.y, to.y),
        width: Math.abs(to.x - from.x),
        height: Math.abs(to.y - from.y),
        points: [
            // This is wrong, it only works if box1 is above and to the left of box2
            [0, 0],
            [Math.abs(to.x - from.x), Math.abs(to.y - from.y)],
        ],

        // Default properties
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: {
            type: 2,
        },
        // TODO: random number
        seed: 2068072286,
        version: 303,
        // TODO: random number
        versionNonce: 1222727326,
        isDeleted: false,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        lastCommittedPoint: null,
        startBinding: {
            // This binds to the "from" box
            elementId: from.id,
            // TODO: No idea what these numbers do, figure it out and calculate them
            focus: -0.7178864392344383,
            gap: 11.48828125,
        },
        endBinding: {
            elementId: to.id,
            // TODO: No idea what these numbers do, figure it out and calculate them
            focus: -0.6347272675674849,
            gap: 13.546875,
        },
        startArrowhead: null,
        endArrowhead: "arrow",
    };
}

function App() {
    const initialData = useMemo((): ExcalidrawInitialDataState => {
        const box1 = createSquare({
            x: 200,
            y: 200,
            width: 100,
            height: 100,
        });
        const box2 = createSquare({
            x: 400,
            y: 200,
            width: 100,
            height: 100,
        });
        return {
            elements: [box1, box2, createArrow(box1, box2)],
        };
    }, []);
    return (
        <>
            <h1>Excalidraw Test</h1>
            <div style={{ height: "640px", width: "800px" }}>
                <Excalidraw
                    onChange={(elements) => console.log(elements)}
                    initialData={initialData}
                />
            </div>
        </>
    );
}

export default App;
