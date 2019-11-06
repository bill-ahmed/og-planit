import { createStackNavigator } from "react-navigation-stack";
import GeneralInfoScreen from './components/GeneralInfo';

export default createStackNavigator({
    GeneralInfo: {
        screen: GeneralInfoScreen, 
        navigationOptions: {
        header: null,   // Remove all headers
      }}
}, 
{
    initialRouteName: "GeneralInfo",
});