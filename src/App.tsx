import { HomeScreen } from './components/HomeScreen';
import { AppStoreProvider } from './store/appStore';

export default function App() {
  return (
    <AppStoreProvider>
      <HomeScreen />
    </AppStoreProvider>
  );
}
