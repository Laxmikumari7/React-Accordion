import data from "./data";
import { useState } from "react";
import "./styles.css";

export default function Accordian() {
    const [selected, setSelected] = useState(null); // For single selection
    const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Toggle between single and multi selection
    const [multiple, setMultiple] = useState([]); // For multi-selection

    // Handle single selection
    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    // Handle multi-selection
    function handleMultiSelection(getCurrentId) {
        if (multiple.includes(getCurrentId)) {
            // If the item is already selected, remove it from the array
            setMultiple(multiple.filter(id => id !== getCurrentId));
        } else {
            // Otherwise, add it to the array
            setMultiple([...multiple, getCurrentId]);
        }
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
            </button>
            
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map(dataItem => (
                        <div key={dataItem.id} className="item">
                            {/* Use the appropriate handler based on the selection mode */}
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () => handleMultiSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            
                            {/* For single selection */}
                            {!enableMultiSelection && selected === dataItem.id ? (
                                <div className="content">{dataItem.answer}</div>
                            ) : null}

                            {/* For multi-selection */}
                            {enableMultiSelection && multiple.includes(dataItem.id) ? (
                                <div className="content">{dataItem.answer}</div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div>No data found!</div>
                )}
            </div>
        </div>
    );
}
