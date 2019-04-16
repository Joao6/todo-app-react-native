import React from "react";
import { TouchableOpacity } from "react-native";
import { Header, Icon, Title, Body, Left } from "native-base";

const HeaderApp = props => {
  return (
    <Header>
      {props.left && (
        <Left>
          <TouchableOpacity onPress={() => props.leftAction()}>
            <Icon name="arrow-back" style={{ color: "#FFF" }} />
          </TouchableOpacity>
        </Left>
      )}
      <Body>
        <Title>Todo App</Title>
      </Body>
    </Header>
  );
};

export default HeaderApp;
