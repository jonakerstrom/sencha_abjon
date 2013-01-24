Ext.define('abjon.model.Article', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'auto',persist: false},
            'article',
            'latitude',
            'longitude'
        ]
    }
});
