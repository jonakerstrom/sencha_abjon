package com.abjon.example.utils;

import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.inject.Inject;

import com.abjon.example.controller.ArticleController;
import com.abjon.example.data.ArticleBean;
import com.abjon.example.model.Article;

public class GPSMessageParser {

/**
* GPS message
* *p,123456789,5722.1424N,01205.8790E,0.0,0.0,0016.8M
* Protocol command , UIID of unit , Lat ,Long,Speed,Direction,Elevation  

*/


   private double parseDegree(String Degree) throws Exception
   {
		
		// From lat ddmm.mmmmm and long dddmm.mmmm to decimal
		double dSign = 1;
		int lastIndex = Degree.length()-1;
		if(Degree.charAt(lastIndex)=='S' || Degree.charAt(lastIndex) == 'W')
		{
			dSign = -1;
		}
		
		int separator = Degree.indexOf(".");
		
		
		String firstPart = "";
		int pointer=0;
		String sepString = Degree.substring(0,separator);

		if(sepString.length() > 4)
		{
			// Longitude
			firstPart = RemoveLeadingZero(Degree.substring(0,3));
			pointer = 3;
		}
		else
		{
			// Latitude
			firstPart = RemoveLeadingZero(Degree.substring(0,2));
			pointer = 2;
		}
		
		String secondPart = Degree.substring(pointer, lastIndex);
		
		return(dSign*(Double.parseDouble(firstPart)+
					(Double.parseDouble(secondPart)/60)));
   }
   
   private String  RemoveLeadingZero(String strString)
   {
       
       while (strString.length() > 0 && strString.charAt(0) == '0') 
       {    
           strString = strString.substring(1);
       } 
       
       if(strString.length()==0)
       	strString = "0";
       
       return strString;
   }

   
   public void parse(String message) throws Exception
   {
       System.out.println("Message contents :" + message);
       String[] parts = message.split(",");
    
       String id = parts[1];
       
       double dLatitude=parseDegree(parts[2]);

       double dLongitude=parseDegree(parts[3]);

       // Ok we have successfully parsed lat / long this is npw considered viable data

  
       double dSpeed = 0;

       try
       {
           dSpeed = Double.parseDouble(parts[4]);
           // Convert speed from miles to km/h
           dSpeed = dSpeed * 1.60926;

       }
       catch(Exception e)
       {
           dSpeed = 0;

       }

       double dDir = 0;
       try
       {
           dDir = Double.parseDouble(parts[5]);
       }
       catch(Exception e)
       {
           dDir = 0;
       }
       
       String elevation = "0";
       try
       {

           elevation = parts[6];

           if(Character.isLetter(elevation.charAt(elevation.length()-1)))
           {
                   elevation = elevation.substring(0,elevation.length()-1);
           }
       }
       catch(Exception e)
       {
           elevation = "0";
       }
       
       ArticleController ac = new ArticleController();
       ac.addReading(id, dLatitude, dLongitude);
      
   }

}
