package com.abjon.example.data;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.abjon.example.model.Article;

@LocalBean
@Stateless
public class ArticleBean extends AbstractFacade<Article> {
	
	@Inject
    private EntityManager em;


    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ArticleBean() {
        super(Article.class);
    }
   
}
