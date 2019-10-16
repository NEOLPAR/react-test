import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;

  expect(wrapper.contains(welcome)).toEqual(true);
  expect(wrapper).toContainReact(welcome); //jest-enzyme
});

test("Link renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
