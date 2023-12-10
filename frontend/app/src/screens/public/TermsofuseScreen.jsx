import React from "react";
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider } from "@rneui/themed"; 

import theme from "../../theme";

const TermsOfUseScreen = () => {
    return (
        <ThemeProvider theme={theme}>
            <ScrollView>
                <View style={[theme.components.Card.style, styles.card]}>   
                    <Text style={theme.components.Subtitle.style}>
                        Terms of use
                    </Text>
                    <Text>
                        Version 0.0.4
                    </Text>
                    <Text style={styles.text}>
                        Welcome to Community! These Terms of Service ("Terms") govern your 
                        access to and use of the Community platform and services ("Service"). 
                        Please read these Terms carefully before using the Service.
                    </Text>
                    <Text style={[styles.text, styles.article]}>
                        1. Acceptance of Terms
                    </Text>

                    <Text style={styles.text}>
                        By accessing or using the Community Service, you agree to be bound 
                        by these Terms. If you do not agree to these Terms, please do not 
                        use the Service.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        2. User Eligibility
                    </Text>

                    <Text style={styles.text}>
                        You must be at least 13 years old to use the Community Service. If 
                        you are under 13, please do not use the Service.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        3. User Accounts
                    </Text>

                    <Text style={styles.text}>
                        To access certain features of the Service, you may need to create 
                        a user account. You are responsible for maintaining the confidentiality 
                        of your account credentials and for all activities that occur under 
                        your account.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        4. User Content
                    </Text>

                    <Text style={styles.text}>
                        You retain ownership of any content you submit, post, or display 
                        on or through the Community Service ("User Content"). By providing 
                        User Content, you grant Community a worldwide, non-exclusive, 
                        royalty-free license to use, reproduce, modify, adapt, publish, 
                        translate, distribute, and display such content.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        5. Code of Conduct
                    </Text>

                    <Text style={styles.text}>
                        You agree to use the Community Service in a manner consistent with 
                        all applicable laws and regulations. You will not engage in any 
                        activity that interferes with or disrupts the Service or its 
                        associated servers and networks.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        6. Privacy
                    </Text>

                    <Text style={styles.text}>
                        Your privacy is important to us. Please refer to our Privacy Policy 
                        to understand how we collect, use, and disclose information about you.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        7. Termination
                    </Text>

                    <Text style={styles.text}>
                        Community may terminate or suspend your access to the Service at 
                        any time, with or without cause. Upon termination, your right to 
                        use the Service will immediately cease.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        8. Disclaimer of Warranties
                    </Text>

                    <Text style={styles.text}>
                        The Community Service is provided "as is" and "as available" without 
                        any warranties of any kind, either express or implied.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        9. Limitation of Liability
                    </Text>

                    <Text style={styles.text}>
                        In no event shall Community be liable for any indirect, 
                        incidental, special, consequential, or punitive damages.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        10. Changes to Terms
                    </Text>

                    <Text style={styles.text}>
                        Community reserves the right to modify or revise these Terms at 
                        any time. We will provide notice of any changes, and your continued 
                        use of the Service after the effective date of the changes 
                        constitutes your acceptance.
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        11. Contact Us
                    </Text>

                    <Text style={styles.text}>
                        If you have any questions or concerns about these Terms, please 
                        contact us at [contact@email.com].
                    </Text>

                    <Text style={[styles.text, styles.article]}>
                        12. Agreement
                    </Text>

                    <Text style={styles.text}>
                        By using the Community Service, 
                        you agree to these Terms. Thank you for being part of our community!
                    </Text>
                </View>
            </ScrollView>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
        alignItems: 'center',
    },
    article: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
    }
});

export default TermsOfUseScreen;