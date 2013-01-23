Ext.define('abjon.view.GoogleMap', {
    extend: 'Ext.Panel',
    xtype: 'mapdetailspage',
    requires: [
        'Ext.Map'
    ],
    config:  {
        layout: 'card',
        fullscreen: true,
        items: [
            {
              xtype: 'map',
              itemId: 'googlemap',
              title : 'Locations',
              styleHtmlContent : true,
              useCurrentLocation: false,
             
              listeners: {
                 /* maprender : function(comp, map){
                     console.log("render");
                           this.fireEvent('setcenter', comp, map, this._geo);
                  }
                
                
                  ,*/
                  painted : function(){
                      console.log("render");
                           this.fireEvent('setcenter', this, this.getMap(), this._geo);
                  }
              }, 
              mapOptions: {
                    //disableDefaultUI: true
                      zoomControl: false,
                      //zoomControlOptions: {
                      //  style: google.maps.ZoomControlStyle.DEFAULT
                      //},
                      navigationControl: false
                      //navigationControlOptions: {
                      //    style: google.maps.NavigationControlStyle.DEFAULT
                      //},
                      //panControl: true,
                      //rotateControl: true,
                      //streetViewControl: false,
                      //mapTypeControl: true
                      //zoom: 2
                  }
            }]
    }
});
        
        
    
    /*
    
    
    extend: 'Ext.Map',
    requires: [
        'Ext.util.GeoLocation',
    ],
    xtype:'googlemap',
    config : {
        title : 'Locations',
        styleHtmlContent : true,
        useCurrentLocation: true,
        listeners: {
            maprender : function(comp, map){
               console.log("render");
                     this.fireEvent('setcenter', comp, map, this._geo);
            }
            //,
            //painted : function(){
            //    console.log("painted");
            //}
        },
        mapOptions: {
              //disableDefaultUI: true
            	zoomControl: false,
                //zoomControlOptions: {
                //  style: google.maps.ZoomControlStyle.DEFAULT
                //},
                navigationControl: false
                //navigationControlOptions: {
                //    style: google.maps.NavigationControlStyle.DEFAULT
                //},
                //panControl: true,
                //rotateControl: true,
                //streetViewControl: false,
                //mapTypeControl: true
                //zoom: 2
            }
    }
    /* 
    onGeoUpdate : function(geo) {
        if (geo) {
            this.fireEvent('setcenter', this, this.getMap(), geo);
        }
    }*/
    
//});


 
