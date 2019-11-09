import { createStackNavigator } from "react-navigation-stack";
import CreateItineraryStepper from './components/CreateItineraryStepper';

export default createStackNavigator({
    CreateItineraryStepper: {
        screen: CreateItineraryStepper, 
    },
}, 
{
    initialRouteName: "CreateItineraryStepper",
    defaultNavigationOptions: {
        header: null,
    }
});