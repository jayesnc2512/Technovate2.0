import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Button } from 'react-native';

const SettingsPage = () => {
  // States to handle settings preferences
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Handle toggle for Dark Mode
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  // Handle toggle for Notifications
  const toggleNotifications = () => setIsNotificationsEnabled((prevState) => !prevState);

  // Handle language selection
  const changeLanguage = (language) => setSelectedLanguage(language);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Dark Mode Setting */}
      <View style={styles.setting}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Notifications Setting */}
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Language Setting */}
      <View style={styles.setting}>
        <Text style={styles.settingText}>Language</Text>
        <Button
          title={selectedLanguage}
          onPress={() => changeLanguage(selectedLanguage === 'English' ? 'Spanish' : 'English')}
        />
      </View>

      {/* Reset Settings Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Reset Settings"
          color="red"
          onPress={() => {
            setIsDarkMode(false);
            setIsNotificationsEnabled(true);
            setSelectedLanguage('English');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default SettingsPage;
