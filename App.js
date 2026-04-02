import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameProvider, useGame } from './src/context/GameContext';
import GameScreen from './src/screens/GameScreen';
import WeeklyReportScreen from './src/screens/WeeklyReportScreen';
import BankruptScreen from './src/screens/BankruptScreen';
import SplashScreen from './src/screens/SplashScreen';
import MenuScreen from './src/screens/MenuScreen';
import MapScreen from './src/screens/MapScreen';

function AppNavigator({ semanaActual, onMapPlay }) {
  const { state } = useGame();
  if (state.screen === 'weekly_report') return <WeeklyReportScreen />;
  if (state.screen === 'bankrupt') return <BankruptScreen />;
  return <GameScreen />;
}

function App() {
  const [screen, setScreen] = useState('splash');
  const [semanaActual, setSemanaActual] = useState(1);

  if (screen === 'splash') {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={() => setScreen('menu')} />
      </>
    );
  }

  if (screen === 'menu') {
    return (
      <>
        <StatusBar style="dark" />
        <MenuScreen onPlay={() => setScreen('map')} />
      </>
    );
  }

  if (screen === 'map') {
    return (
      <>
        <StatusBar style="dark" />
        <MapScreen
          semanaActual={semanaActual}
          onPlay={() => setScreen('game')}
        />
      </>
    );
  }

  return (
    <GameProvider>
      <StatusBar style="light" />
      <AppNavigator semanaActual={semanaActual} />
    </GameProvider>
  );
}

registerRootComponent(App);
export default App;
