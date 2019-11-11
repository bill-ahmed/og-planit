import { createStackNavigator } from "react-navigation-stack";
import GMap from "../maps/components/GMap/GMap";

export default createStackNavigator({
    GMap: {
        screen: GMap, 
        navigationOptions: {
        header: null,   // Remove all headers
      }},
}, 
{
    initialRouteName: "GMap",
});
