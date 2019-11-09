import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Itinerary } from "./components/Itinerary/Itinerary";
import CreateViews from "./components/card_list_views_events/CreateViews";

export default createStackNavigator({
    Itinerary: {
        screen: Itinerary, 
        navigationOptions: {
        header: null,   // Remove all headers
      }},
    ViewItineraryEvents: {
        screen: CreateViews,
        navigationOptions: {
            header: null,
        }
    }
}, 
{
    initialRouteName: "Itinerary",
});
