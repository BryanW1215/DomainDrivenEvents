App.Layouts.Simulator.Edit =
{
    Drawers: {event: 'Collapse'},
    LeftDrawer: {event: 'SetPanels', value: 'user,strategies'},
    RightDrawer: {event: 'SetPanels', value: 'tests,activityfeed'},
    Workspace: [
        {event: 'SetPanels', value: 'Strategy,Test,RunTest'},
        {event: 'Disable', value: 'RunTest'},
        {event: 'SelectPanel', value: 'Strategy'}
    ]
};

