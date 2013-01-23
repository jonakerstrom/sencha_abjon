Ext.define("abjon.view.Main", {
    extend: 'Ext.navigation.View',

    requires: ['abjon.view.List'],

    id: 'mainView',
    
    
    config: {
        
        fullscreen: true,
        items: [{
            xclass: 'abjon.view.List'
        }],
        
        navigationBar: {
            items: [{
                xtype: 'button',
                id: 'mapButton',
                iconCls: 'maps',
                iconMask: true,
                align: 'right'
            },{
                xtype: 'button',
                id: 'addButton',
                iconCls: 'add',
                iconMask: true,
                align: 'right'
            }]
        }
    }
});