package com.abjon.example.controller;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;

import com.abjon.example.data.ArticleBean;
import com.abjon.example.model.Article;

@Named
@RequestScoped
public class ArticleController 
{

	 @Inject                                                          // 
	 private ArticleBean articleDao;

	 public void addReading(String id, double lat, double lon)
	 {

	       Article a = null;
	       try
	       {
	    	   a = articleDao.find(id);
	    	   
	       }
	       catch(Exception e)
	       {
	    	   a = null;
	       }
	       if(a!=null)
	       {
	    	   a.setArticle(id);
	    	   a.setLatitude(lat);
	    	   a.setLongitude(lon);
	    	   articleDao.edit(a);
	       }
	       else
	       {
	    	   a = new Article();
	    	   a.setArticle(id);
	    	   a.setArticle(id);
	    	   a.setLatitude(lat);
	    	   a.setLongitude(lon);
	    	   articleDao.create(a);
	       }
	       
	 }
	
	
}
