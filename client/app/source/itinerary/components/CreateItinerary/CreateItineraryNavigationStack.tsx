import { createStackNavigator } from "react-navigation-stack";
import GeneralInfoScreen from './components/GeneralInfo';
import SelectFilter from './components/SelectFilters';

export default createStackNavigator({
    GeneralInfo: {
        screen: GeneralInfoScreen, 
    },
    FilterSelection: {
        screen: SelectFilter,
    },
}, 
{
    initialRouteName: "GeneralInfo",
    defaultNavigationOptions: {
        header: null,
    }
});