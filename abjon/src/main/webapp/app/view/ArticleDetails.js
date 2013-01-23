Ext.define('abjon.view.ArticleDetails', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.*',
        'Ext.data.*',
        'Ext.env.*',
        'Ext.field.Hidden',
        'Ext.field.Number'
    ],
    
    xtype: 'articledetailspage',

    
    config: {
        activeItem: 0,
        tabBar: {
            // docked: 'bottom',
            ui: 'neutral',
            layout: {
                pack: 'center'
            }
        },
       
        items: 
        [
        {
                xtype: 'fieldset',
                itemId: 'articleupdateformitem',      

                items: [
                   {
                    bindToModel: true,
                    xtype: 'hiddenfield',
                    name: 'id',
                    label: 'ID'
                    },
                    {
                        
                    bindToModel: true,
                    xtype: 'textfield',
                    name: 'article',
                    label: 'Artikel'
        
                    },
                    {
                        
                    bindToModel: true,
                    xtype: 'numberfield',
                    name: 'latitude',
                    label: 'Latitude'
        
                    },
                    {
                        
                    bindToModel: true,
                    xtype: 'numberfield',
                    name: 'longitude',
                    label: 'Longitude'
        
                    },
                    
                    {
                        xtype: 'button',
                        itemId: 'submitbutton',
                        text: 'Spara',
                        ui: 'confirm'
                     
                    }

                ]
            }
        ]
        
    }
    
    
     
       
});
