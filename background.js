
let lastVisitedTabId;
let presentTabId;


// function to print the current tab
function printCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs[0].id, tabs[0].title);
    });
}

function switchToTab(tabId) {
    chrome.tabs.update(tabId, { active: true });
}

function returnLastTabId() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        return tabs[0].id;
    });
}


// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
    // update the last visited tab id
    lastVisitedTabId = presentTabId;
    presentTabId = activeInfo.tabId;

    console.log('Present tab id:', presentTabId);
});

// Listen for a new tab being created
chrome.tabs.onCreated.addListener(function (tab) {
    // Print the list of tabs in MRU order when a new tab is created
    //printTabsInMRUOrder();
    presentTabId = tab.id;
    printCurrentTab();
});

chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    switch (command) {
        case "switchTab":
            printCurrentTab();

            // print the last visited tab id
            console.log('Last visited tab id:', lastVisitedTabId);

            //presentTabId = returnLastTabId();
            console.log('Present tab id:', presentTabId);

            switchToTab(lastVisitedTabId);

            lastVisitedTabId = presentTabId;
            console.log('Last visited tab id:', lastVisitedTabId);

            printCurrentTab();

            break;
        default:
            break;
    }
}
);


// Print the list of tabs in MRU order when the extension is loaded
//printTabsInMRUOrder();

console.log('Hello from background.js');
// both presentTabId and lastVisitedTabId are undefined
console.log('Present tab id:', presentTabId);
console.log('Last visited tab id:', lastVisitedTabId);
