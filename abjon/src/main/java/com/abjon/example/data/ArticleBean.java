package com.abjon.example.data;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import javax.ejb.Stateless;
import javax.enterprise.inject.Alternative;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.abjon.example.model.Article;


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
