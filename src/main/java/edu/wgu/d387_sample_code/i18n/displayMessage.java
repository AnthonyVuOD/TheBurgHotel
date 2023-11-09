package edu.wgu.d387_sample_code.i18n;

import java.util.ListResourceBundle;
import java.util.Locale;
import java.util.ResourceBundle;

public class displayMessage extends ListResourceBundle{

    public String getWelcomeMessage(){
        return "Hello";
    }

    @Override
    protected Object[][] getContents() {
        return new Object[0][];
    }
}
