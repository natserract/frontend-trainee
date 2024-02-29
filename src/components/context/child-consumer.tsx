import {useComponentContext} from "./init-context";

export function ChildConsumer() {
    const { data, updateData } = useComponentContext();

    const handleUpdate = () => {
        updateData({
            title: "Alfin"
        });
    }

    return (
        <div>
            <h2>I'm a Child</h2>
            <div>
                {JSON.stringify(data)}
            </div>
            <button onClick={handleUpdate}>
                Update The Data
            </button>
        </div>
    )
}