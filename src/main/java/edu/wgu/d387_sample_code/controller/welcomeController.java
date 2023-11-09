package edu.wgu.d387_sample_code.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.ResourceBundle;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class welcomeController {
    @CrossOrigin
    @GetMapping("/getBundleCA")
    public JSONObject welcome() throws IOException {

        JSONObject welcomeAPI = new JSONObject();

        try{
            InputStream stream = new ClassPathResource("welcome_fr_CA.properties").getInputStream();
            Properties properties = new Properties();
            properties.load(stream);

            welcomeAPI.put( "message", properties.getProperty("welcomeMessage"));
            return  welcomeAPI;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return welcomeAPI;
    }




    @GetMapping("/getBundleUS")
    @CrossOrigin
    public JSONObject welcome2() throws IOException {
        JSONObject welcomeAPI = new JSONObject();

        try {
        InputStream stream2 = new ClassPathResource("welcome_en_US.properties").getInputStream();
        Properties properties2 = new Properties();
        properties2.load(stream2);

        welcomeAPI.put( "message", properties2.getProperty("welcomeMessage"));
        return  welcomeAPI;

        }
        catch (Exception e) {
        e.printStackTrace();
        }
        return welcomeAPI;
    }
}

