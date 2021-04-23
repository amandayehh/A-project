// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
    width: 190,
    height: 210,
});
let nodes = [];
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === "play/pause") {
        let root = figma.currentPage;
        //console.log(root);
        recurseFileTree(0, root);
        figma.ui.postMessage(nodes);
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
    }
};
function recurseFileTree(level, node) {
    // TODO: play note here instead of console
    //console.log(level + ": " + node.name);
    if (level != 0) {
        nodes.push([level, node.name]);
    }
    let children = node.children;
    if (children) {
        for (let i = children.length - 1; i >= 0; i--) {
            recurseFileTree(level + 1, children[i]);
        }
    }
}
