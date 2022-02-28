import { mount } from "enzyme";

import { AuthContext } from "../../../../context/auth/AuthContext";
import PrivateRoutes from "../../../../routes/PrivateRoutes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <span>going out from here</span>,
}));

describe("Test in PrivateRoutes", () => {
  test("should show the component if user is authenticated ", () => {
    const contextValue = {
      user: {
        token: "token",
        logged: true,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <PrivateRoutes>
          <h1>Private component</h1>
        </PrivateRoutes>
      </AuthContext.Provider>
    );
    // expect(wrapper)

    expect(wrapper.text().trim()).toBe("Private component");
  });
  test("should block the content if user is not authenticated", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <PrivateRoutes>
          <h1>Private component</h1>
        </PrivateRoutes>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe("going out from here");
  });
});
