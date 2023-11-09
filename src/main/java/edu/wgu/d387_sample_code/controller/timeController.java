package edu.wgu.d387_sample_code.controller;


import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Clock;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class timeController {
    @CrossOrigin
    @GetMapping("/time")
    public JSONObject getTime(){
        LocalTime currentTimeET = LocalTime.now(Clock.system(ZoneId.of("America/New_York")));
        LocalTime currentTimeMT = LocalTime.now(Clock.system(ZoneId.of("America/Denver")));
        LocalTime currentTimeUTC = LocalTime.now(Clock.system(ZoneId.of("UTC")));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH.mm");

        JSONObject differentTimes = new JSONObject();

        //ET/MT/UTC
        differentTimes.put("ET", currentTimeET.format(formatter));
        differentTimes.put("MT", currentTimeMT.format(formatter));
        differentTimes.put("UTC", currentTimeUTC.format(formatter));
        
        return differentTimes;
    }
}
