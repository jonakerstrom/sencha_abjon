Ext.define('abjon.plugin.SlideToRemove', {
	extend:'Ext.Component',
	alias:'plugin.slidetoremove',
       
        requires: ['Ext.Anim'],
       
	config: {
		removeText: 'Delete'
	},

	init: function(list) {
            
		list.on({
			itemswipe: this.showDelete,
			hide: this.closeDeletes,
			scope: this
		});
	},
	
	showDelete: function(view,index,target,rec,e) {
            
		var element = (!target.dom ? target.innerElement : target);
                
		if(element.dom.children.length == 1 && e.direction == 'left') {
			var deleteNode = element.dom.firstChild.cloneNode();
			deleteNode.id = Ext.id('','list-delete-comp-');
			deleteNode.setAttribute('style','width:100%;height:100%;left:100%;top:0px;overflow-x:hidden;position:absolute;padding:3px 8px 3px 8px;');
			Ext.get(deleteNode).addCls('list-delete');
			Ext.get(deleteNode).removeCls('x-list-item-body');		
			
			Ext.get(deleteNode).addListener('swipe',function(e,n){
				this.hideDelete(e,n);
			},this);
				
			element.dom.appendChild(deleteNode);
			element.dom.firstChild.setAttribute('style','position:relative;width:100%;');
			Ext.create('Ext.Button', {
				ui: 'decline',
				text: this.getRemoveText(),
				height: '100%',
				renderTo: deleteNode,
				handler: function(btn) {
					var parentEl = btn.element.getParent();
					parentEl.getParent().dom.style.removeProperty('-webkit-transform');
					parentEl.destroy();
					view.getStore().remove(rec);
                                        view.getStore().sync();
				},
				scope: this
			});
                        
			Ext.Anim.run(element,'slide', {
				out: true,
				duration: 500,
				autoClear: false
			});
		}
	},
	
	hideDelete: function(e,n) {
		if(e.direction == 'right' && Ext.get(n).up('.x-list-item-inner')) {
			Ext.Anim.run(Ext.get(n).up('.x-list-item-inner'),'slide', {
				out: false,
				duration: 500,
				autoClear: false,
				direction: 'right',
				after: function(el) {
					el.last().destroy();
				}
			});
		}
	},
	
	closeDeletes: function(view) {
		Ext.DomQuery.select('div[class*=list-delete]',view.element.dom).forEach(function(node){
			node.parentNode.style.removeProperty('-webkit-transform');						
			node.parentNode.removeChild(node);
		});
	}
});