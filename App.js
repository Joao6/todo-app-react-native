import React from "react";
import { AppLoading, Font } from "expo";
import { Root } from "native-base";

import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.loadAssets().then(this.onAssetsLoaded);
  }

  loadAssets = async () => {
    await Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
  };

  onAssetsLoaded = () => {
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
