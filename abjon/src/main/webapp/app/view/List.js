Ext.define('abjon.view.List', {
    extend: 'Ext.List',

    id: 'articleList',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging',
        'Ext.field.Search',
        'abjon.plugin.SlideToRemove'
    ],

   

    config: {
        title: 'Objekt',

        store: 'Articles',
        itemTpl: '<div>{id}, {article}</div>',
    
        deleteButton: {
            text  : 'Delete',
            ui    : 'decline-small',
            hidden: false
        },
        items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',

                    items: [
                        { xtype: 'spacer' },
                        {
                            xtype: 'searchfield',
                            id: 'searchfield',
                            placeHolder: 'Sök...'
                            
                        },
                        { xtype: 'spacer' }
                    ]
                }
            ],
         
       /*
            plugins: 
            [
                'pullrefresh',
                {
                    type: 'listpaging',
                    autoPaging: true
                   
                },
               
                
                
            
            ]
        */
            plugins: [
                  {
                      xclass: 'Ext.plugin.PullRefresh',
                      pullRefreshText: 'Dra nedåt för att uppdatera listan.',
                      refreshFn: function() {             
                        
                        Ext.getStore('Articles').load();
                      }
                      
                  },
                  {
                      type: 'slidetoremove',
                      removeText: 'Ta bort'
              
                  }
              ]
    }
    
        
});