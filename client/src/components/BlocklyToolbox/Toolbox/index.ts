import {getToolbox as gcRingo} from "./Ringo"
import {getToolbox as gcNibble} from "./Nibble"
import {getToolbox as gcSpencer} from "./Spencer"
import {ToolboxCategory} from "../../Toolbox";

const Toolboxes: { [name: string]: () => ToolboxCategory[] } = {
    "cm:esp32:ringo": gcRingo,
    "cm:esp8266:nibble": gcNibble,
    "cm:esp32:spencer": gcSpencer,
}

export default Toolboxes;