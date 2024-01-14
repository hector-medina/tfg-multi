import React from "react";
import { cleanup, render, fireEvent, debug } from "@testing-library/react-native";
import CustomButton from "./CustomButton";

afterEach(cleanup);

describe("CustomButton", () => {

  it("renders correctly with xl size", () => {
    const { getByText } = render(
      <CustomButton size="xl">
        XL Button
      </CustomButton>
    );
    const buttonElement = getByText("XL Button");
    expect(buttonElement).toBeDefined();
  });

  it("renders correctly with xs size", () => {
    const { getByText } = render(
      <CustomButton size="xs">
        XS Button
      </CustomButton>
    );
    const buttonElement = getByText("XS Button");
    expect(buttonElement).toBeDefined();
  });

  it("applies danger styles correctly", () => {
   
    const { getByText } = render(
      <CustomButton size="xs" danger>
        Danger Button
      </CustomButton>
    );

    const buttonElement = getByText('Danger Button');
    const buttonStyle = buttonElement.parent.parent.props.style;

    expect(buttonStyle.backgroundColor).toEqual('#dc3545');
    expect(buttonStyle.borderColor).toEqual('#dc3545');

  });

  it("applies cancel styles correctly", () => {
    const { getByText } = render(
      <CustomButton size="xs" cancel>
        Cancel Button
      </CustomButton>
    );
    const buttonElement = getByText("Cancel Button");
    const buttonStyle = buttonElement.parent.parent.props.style;

    expect(buttonStyle.backgroundColor).toEqual('#A9AAA9');
    expect(buttonStyle.borderColor).toEqual('#6c757d');
  });
  
  it("applies navbar styles correctly", () => {
    const { getByText } = render(
      <CustomButton size="xs" navbar>
        Navbar Button
      </CustomButton>
    );
    const buttonElement = getByText("Navbar Button");
    const buttonStyle = buttonElement.parent.parent.props.style;
  
    expect(buttonStyle.backgroundColor).toEqual('white');
    expect(buttonStyle.borderColor).toEqual('#6c757d');
  });
  
  it("applies navbar text styles correctly", () => {
    const { getByText } = render(
      <CustomButton size="xs" navbar>
        Navbar Text Button
      </CustomButton>
    );
    const buttonElement = getByText("Navbar Text Button");
    const textStyle = buttonElement.props.style;

    expect(textStyle.color).toEqual('#6c757d');
    expect(textStyle.paddingHorizontal).toEqual(0);
  });

  it("calls onPress callback when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton size="xs" onPressed={onPressMock}>
        Click Me
      </CustomButton>
    );
    const buttonElement = getByText("Click Me");
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});