package com.abjon.example.test;

import static org.junit.Assert.*;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

import javax.inject.Inject;

import org.jboss.arquillian.junit.Arquillian;
import org.junit.runner.RunWith;
import org.junit.Test;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;

import com.abjon.example.services.ASyncUDPSvr;

@RunWith(Arquillian.class) 
public class UDPServerTest {


//	@Inject
//	ASyncUDPSvr udpserver;
	
	 @Deployment
	    public static JavaArchive createDeployment() {
	        return ShrinkWrap.create(JavaArchive.class)
	            .addClass(ASyncUDPSvr.class)
	            .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	    }

	
	@Test
	public void test() throws Exception {
		// udpserver.process();
		
		DatagramSocket clientSocket = new DatagramSocket();
		
		InetAddress IPAddress = InetAddress.getByName("localhost");
		byte[] sendData = new byte[1024];
		byte[] receiveData = new byte[1024];
		String sentence = new String("*p,123456789,5722.1424N,01205.8790E,0.0,0.0,0016.8M");
		sendData = sentence.getBytes();
		DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPAddress, 15000);
		clientSocket.send(sendPacket);
		DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
		clientSocket.receive(receivePacket);
		String modifiedSentence = new String(receivePacket.getData());
		
		
		System.out.println("FROM SERVER:" + modifiedSentence);
		
		clientSocket.close();
		
		assertEquals("OK",modifiedSentence);
		
	}

}
