import AppRouter from "../../../../routes/AppRouter";
import { mount } from "enzyme";
import { AuthContext } from "../../../../context/auth/AuthContext";
describe("Tests in AppRouter", () => {
  test("should show the login screen if the user is not authenticated ", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe("Login");
  });
  test("should show the home screen if the user is authenticated", () => {
    const contextValue = {
      user: {
        logged: true,
        token: "token",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".navbar").exists()).toBeTruthy();
  });
});
