Ext.define('abjon.store.Articles', {
    extend: 'Ext.data.Store',

    id: 'Articles',
    
    requires: [
        'Ext.data.proxy.Rest'
    ],
 

    config: {
        model: 'abjon.model.Article',
        autoLoad: true,
        sorters: 'id',
        
        proxy: {
            type: 'rest',
            appendId: true,
            url : '/jboss-javaee6-webapp/rest/articles',
            reader: { type: 'json', rootProperty: 'article' },
            writer: {type: 'json'}   
        }
        
        
    /*
        proxy: {
            // type: 'jsonp',
            // url: 'http://localhost:8080/abjon/webresources/articles'
            appendId: true,
            type: 'rest',
            
            api: {
                create : '/abjon/webresources/articles/',
                read   : '/abjon/webresources/articles',
                update : '/abjon/webresources/articles/',
                destroy: '/abjon/webresources/articles/'
            }
        }
    */
    }
});