package com.abjon.example.services;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebServlet(name = "UDPServlet",loadOnStartup = 1)  
public class UDPServlet extends HttpServlet
{

		Object serviceInstance = null;
	
		protected void doGet(HttpServletRequest req, HttpServletResponse resp)

	         throws ServletException, IOException {

		}



	    @Override
	    public void init(ServletConfig cfg) throws javax.servlet.ServletException 
	    {
	        super.init(cfg);
	    	
	        try
	        {
	        	Object serviceInstance = ASyncUDPSvr.class.newInstance();
	        	
	        	ASyncUDPSvr.class.getMethod("start", new Class[] {}).invoke(serviceInstance,new Object[] {});
	        	System.out.println("Started UDP service.");
	        }
	        catch(Exception e)
	        {
	        	System.out.println("Unable to start UDP service.");
	        }

	     
	    }
		
	    @Override
	    public void destroy() 
	    {
	    	try {
                serviceInstance.getClass().getMethod("stop", new Class[] {}).invoke(serviceInstance,new Object[] {});                
                System.err.println("Stopped UDP service.");
            } catch(NoSuchMethodException e) {
               
            } catch(Exception e) {
               
            }

	    }

	 
	 
}
