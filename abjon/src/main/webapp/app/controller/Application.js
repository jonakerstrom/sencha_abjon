Ext.define('abjon.controller.Application', {
    extend: 'Ext.app.Controller',

    
    config: {
        refs: {
            nav: '#mainView',
            addButton: '#addButton',
            articleList: '#articleList',
            searchField: '#searchfield',
            submitb: 'articledetailspage #submitbutton',
            mapButton: '#mapButton',
            googlemap: 'mapdetailspage #googlemap'
        },
        control: {
            addButton: {
                tap: 'onAddButtonTap'
            },
            searchField: {
                clearicontap: 'onSearchClearIconTap',
                keyup: 'onSearchKeyUp'
            },
            articleList: {
                select: 'onListSelect'
            },
            submitb: {
                tap: 'onSubmitButtonTap'
            },
            mapButton: {
                tap: 'onMapButtonTap'
            },
            'map' : {
                setcenter : 'dropPins'
                
            },
            nav: {
                back : 'backButtonHandler'
            }
            
            
        },
        markersArray : []
        
        
    },

    onAddButtonTap: function() {
        Ext.Msg.prompt('Lägg till en artikel.', 'Skriv artikeln här', this.onSubmitArticle, this, false, null, {
            autoCapitalize: true,
            placeHolder: 'Ingen felaktig information tack...'
        })
    },
 
    onSubmitArticle: function(buttonId, value) {
        if (buttonId == 'cancel') {
            return false;
        }
        var store = this.getArticleList().getStore();
        var once = false;
        var geo = new Ext.util.Geolocation({
            autoUpdate: true,
            allowHighAccuracy: true,
            listeners: {
                locationupdate: function(geo) {
                    
                      if(once == false)
                    {
                    
                        var newArticle = Ext.create('abjon.model.Article', {
                            article: value,
                            latitude:   geo.getLatitude(),
                            longitude:  geo.getLongitude()
                            });

                        once = true;

                        store.add(newArticle);
                        
                        store.sync();
                        
                        store.load(); // should this be nessesary?

                    }
                }
            }
        });
        
    },
    
    /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue();
        
        var store = this.getArticleList().getStore();

        //first clear any current filters on thes tore
        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('article').match(search);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        var store = this.getArticleList().getStore();
        store.clearFilter();
    },
    
    onSubmitButtonTap: function() 
    {
        var form = this.getNav().getActiveItem();
        var record = form.getRecord(); // get the underlying model instance

        form.updateRecord(record); // update the record with the form data
        var store = this.getArticleList().getStore();
        
        store.sync();
        
        
        
        
        this.getNav().pop();
        
        
        store.load(); // should this be nessesary?

    },
    
    onListSelect: function(view, record) {
       
        
       
        this.getNav().push({
            xtype: 'articledetailspage' 
        });
         
     
        var form = this.getNav().getActiveItem();
        
        var record = Ext.create('abjon.model.Article', {
            id : record.get('id'),
            article: record.get('article')
            
        });
       
        
        form.setRecord(record);
        
                
    },
    dropPins : function(component, map, geo, eOpts) {
        
        //var ref =  this;
        
        //if(ref != null)
        //{
            //only do this the first time? 
            //geo updates are constantly recieved so turn useCurrentLocation off
            var once = false;
              //Remove all markers from the map.
    /*            for(var i = 0; i < ref.getMarkersArray().length; i++) {
                        ref.getMarkersArray()[i].setMap(null);

                }
                ref.setMarkersArray(Array());
    */
              var bounds = new google.maps.LatLngBounds();
              var map_center = bounds.getCenter();
              var geoloc = new Ext.util.Geolocation({
                autoUpdate: true,
                allowHighAccuracy: true,
                listeners: {
                    locationupdate: function(geo) {

                      
                            var currentPosition = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
                            console.log("current lat : " + geo.getLatitude());
                            console.log("current long : " + geo.getLongitude());

                            if(once == false)
                            {
                                once = true;

                                var yourLocationMarker = new google.maps.Marker({
                                    position : currentPosition,
                                    title : 'Current Location',
                                    animation: google.maps.Animation.BOUNCE,
                                    map : map
                                });
                            //ref.getMarkersArray().push(yourLocationMarker);

                             }
                             bounds.extend(currentPosition);
                             map_center = bounds.getCenter();
                             map.setCenter(map_center);
                             map.panToBounds(bounds);
                             map.fitBounds(bounds)
                            


                      
                    }
                }
              });


/*
                var currentPosition = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
                            console.log("current lat : " + geo.getLatitude());
                            console.log("current long : " + geo.getLongitude());


                            var yourLocationMarker = new google.maps.Marker({
                                    position : currentPosition,
                                    title : 'Current Location',
                                    animation: google.maps.Animation.DROP,
                                    map : map
                                });
                                
                                //                         ref.getMarkersArray().push(yourLocationMarker);
*/
            
           
            for (i=0; i<Ext.getStore('Articles').getData().length; i++){

                var data = Ext.getStore('Articles').getData().items[i].data;
                if(data.latitude!=null && data.latitude!='undefined' && data.longitude != null && data.longitude!='undefined')
                {
                    console.log("lat : " + data.latitude);
                    console.log("long : " + data.longitude);
                    console.log("article : " + data.article);
                    var googlepos = new google.maps.LatLng(data.latitude,data.longitude);
                    new google.maps.Marker({
                        position: googlepos,
                        // icon: image,
                        map: map,
                        title: data.article
                        //,
                        //animation: google.maps.Animation.BOUNCE
                    });

         //           ref.getMarkersArray().push(googlepos);
                    bounds.extend(googlepos);
                }
            }
            
         
            map_center = bounds.getCenter();
            map.setCenter(map_center);
            map.panToBounds(bounds);
            map.fitBounds(bounds)
   

            

        //}
           
         
    
    },
    
    onMapButtonTap: function(container) {
        container.disable();
        this.getNav().add({xtype: 'mapdetailspage'});
        
        
        
    },
    backButtonHandler: function(button){
        
        this.getMapButton().enable();
        //var mapview = this.getNav().getActiveItem();
        // this.getNav().pop();
        
        this.getNav().remove({xtype: 'mapdetailspage'});
        
    }

    


});